import { useMemo, useState } from "react";
import { useIntl } from "react-intl";
import type { IntlShape } from "react-intl";
import {
  PLAN_DAY_ORDER,
  type PlanDay,
  type PlanDayId,
  type PlanDraft,
  type PlanLayout,
  type PlanQuota,
  type PlanQuotaMode,
  type PlanSlot,
  type PlanStatus,
  type PlanWizardStep,
  type SavedPlan,
} from "~/core/plan/PlanTypes";
import {
  buildPlanSlots,
  clonePlanDraft,
  emptyPlanDraft,
  filledSlotCount,
  formatWeekRange,
  generatePlanSlots,
  isoWeekNumber,
  parseWeekKey,
  rerollRecipeId,
  weekOffset,
} from "~/core/plan/PlanUtils";
import { UseWeekPicker } from "~/core/plan/UseWeekPicker";
import type { UseWeekPickerResult } from "~/core/plan/UseWeekPicker";
import type { Recipe, RecipeTagCategory } from "~/core/recipes/RecipeTypes";
import { collectTags } from "~/core/recipes/RecipeUtils";
import { planDayName, planDayShortName, planMealName } from "~/views/plan/PlanDayLabels";

export interface PlanDayRowViewModel {
  day: string;
  people: number;
  isLunchOn: boolean;
  isDinnerOn: boolean;
  onToggleLunch: () => void;
  onToggleDinner: () => void;
  onIncreasePeople: () => void;
  onDecreasePeople: () => void;
}

export interface PlanQuotaRowViewModel {
  tag: string;
  n: number;
  modeLabel: string;
  onCycleMode: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export interface PlanTagPickViewModel {
  tag: string;
  countLabel: string;
  onAdd: () => void;
}

export interface PlanSlotViewModel {
  day: PlanDayId;
  dayLabel: string;
  mealLine: string;
  title: string;
  isFilled: boolean;
  tags: string[];
  photoUrl: string | null;
  onReroll: () => void;
  onSwap: () => void;
  onClear: () => void;
}

function formatTagCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
}

function quotaModeLabel(intl: IntlShape, mode: PlanQuotaMode): string {
  if (mode === "atleast")
    return intl.formatMessage({
      description: "UsePlanWizard: quota mode - at least",
      defaultMessage: "at least",
      id: "S7GRjF",
    });
  if (mode === "exactly")
    return intl.formatMessage({
      description: "UsePlanWizard: quota mode - exactly",
      defaultMessage: "exactly",
      id: "sHH80Y",
    });
  return intl.formatMessage({
    description: "UsePlanWizard: quota mode - at most",
    defaultMessage: "at most",
    id: "Xx19Uc",
  });
}

function nextQuotaMode(mode: PlanQuotaMode): PlanQuotaMode {
  if (mode === "atleast") return "exactly";
  if (mode === "exactly") return "atmost";
  return "atleast";
}

export interface UsePlanWizardResult {
  step: PlanWizardStep;
  stepEyebrow: string;
  stepTabs: { label: string; name: string; isActive: boolean }[];
  stepSubtitle: string;
  canGoBack: boolean;
  onBack: () => void;
  nextLabel: string;
  onNext: () => void;
  showSaveDraft: boolean;
  onSaveDraft: () => void;

  weekLine: string;
  hasExistingPlanForWeek: boolean;
  onOpenWeekPicker: () => void;

  weekPicker: UseWeekPickerResult;

  dayRows: PlanDayRowViewModel[];
  mealSummary: string;
  onApplyFirstDayToAll: () => void;

  quotaRows: PlanQuotaRowViewModel[];
  hasNoQuotas: boolean;
  quotaQuery: string;
  onQuotaQueryChange: (query: string) => void;
  isSearchingQuotaTags: boolean;
  quotaSearchResults: PlanTagPickViewModel[];
  hasNoQuotaSearchResults: boolean;
  createQuotaTagLabel: string;
  onCreateQuotaTag: () => void;
  yourTagChips: PlanTagPickViewModel[];
  popularTagChips: PlanTagPickViewModel[];

  isEditDefaultTagsOpen: boolean;
  onOpenEditDefaultTags: () => void;
  onCloseEditDefaultTags: () => void;
  pinnedTags: string[];
  onTogglePinnedTag: (tag: string) => void;

  isBrowseQuotaTagsOpen: boolean;
  onOpenBrowseQuotaTags: () => void;
  onCloseBrowseQuotaTags: () => void;
  quotaTagsInDraft: string[];
  onToggleQuotaTag: (tag: string) => void;

  mealsToFillCount: number;
  generateSummary: string;
  onGenerate: () => void;
  onStartEmpty: () => void;

  layout: PlanLayout;
  onLayoutChange: (layout: PlanLayout) => void;
  quotaStatus: string;
  onRerollAll: () => void;
  slotRows: PlanSlotViewModel[];
  gridDays: { dayLabel: string; slots: PlanSlotViewModel[] }[];

  isSwapOpen: boolean;
  swapTitle: string;
  swapResultsLabel: string;
  hasNoSwapResults: boolean;
  pickerQuery: string;
  onPickerQueryChange: (query: string) => void;
  pickerTagChips: { tag: string; isSelected: boolean; onToggle: () => void }[];
  swapOptions: { title: string; timeLabel: string; tags: string[]; onPick: () => void }[];
  onCloseSwap: () => void;
}

export interface UsePlanWizardOptions {
  /** The cook's own recipe pool — what the planner draws from. */
  recipes: Recipe[];
  tagCatalogue: RecipeTagCategory[];
  /** Tags offered first when setting quotas for a week. */
  pinnedTags: string[];
  /** Weeks already saved, so the wizard can reopen one instead of starting over. */
  plans: Record<string, SavedPlan>;
  /** The week the wizard opens on — the one the rest of the app is looking at. */
  initialWeekKey: string;
  /**
   * A week handed in from elsewhere — someone else's shared week the cook chose
   * to load. It opens straight on the review step, since the days and meals are
   * already decided; the cook is here to change them, not to start over.
   */
  initialDraft?: PlanDraft | null;
  onWeekSaved: (weekKey: string, status: PlanStatus, draft: PlanDraft) => void;
}

/** All the state and derived view-model data behind the "Plan a week" wizard. */
export function UsePlanWizard({
  recipes,
  tagCatalogue,
  pinnedTags: initialPinnedTags,
  plans,
  initialWeekKey,
  initialDraft = null,
  onWeekSaved,
}: UsePlanWizardOptions): UsePlanWizardResult {
  const intl = useIntl();
  const locale = intl.locale || "en-GB";

  const [weekKey, setWeekKey] = useState(initialWeekKey);
  const [step, setStep] = useState<PlanWizardStep>(initialDraft ? 4 : 1);
  const [draft, setDraft] = useState<PlanDraft>(() => {
    if (initialDraft) return clonePlanDraft(initialDraft);
    const saved = plans[initialWeekKey];
    return saved ? clonePlanDraft(saved.draft) : emptyPlanDraft();
  });
  const [layout, setLayout] = useState<PlanLayout>("rows");
  const [pinnedTags, setPinnedTags] = useState<string[]>(initialPinnedTags);

  const [swapSlotIndex, setSwapSlotIndex] = useState<number | null>(null);
  const [pickerQuery, setPickerQuery] = useState("");
  const [pickerTags, setPickerTags] = useState<string[]>([]);

  const [quotaQuery, setQuotaQuery] = useState("");
  const [isEditDefaultTagsOpen, setIsEditDefaultTagsOpen] = useState(false);
  const [isBrowseQuotaTagsOpen, setIsBrowseQuotaTagsOpen] = useState(false);

  function selectWeek(key: string): void {
    setWeekKey(key);
    setStep(1);
    const saved = plans[key];
    setDraft(saved ? clonePlanDraft(saved.draft) : emptyPlanDraft());
    setSwapSlotIndex(null);
  }

  // ── step navigation
  function commit(status: PlanStatus): void {
    onWeekSaved(weekKey, status, draft);
  }

  function generate(): void {
    setDraft((current) => ({ ...current, slots: generatePlanSlots(current, recipes) }));
    setStep(4);
  }

  function fillEmpty(): void {
    setDraft((current) => ({ ...current, slots: buildPlanSlots(current.days) }));
    setStep(4);
  }

  function goNext(): void {
    if (step === 4) {
      commit("final");
      return;
    }
    if (step === 3) {
      fillEmpty();
      return;
    }
    setStep((current) => (current + 1) as PlanWizardStep);
  }

  function goBack(): void {
    setStep((current) => Math.max(1, current - 1) as PlanWizardStep);
    setSwapSlotIndex(null);
  }

  const s1 = intl.formatMessage({
    description: "UsePlanWizard: step name - days and people",
    defaultMessage: "Days and people",
    id: "WoU2bE",
  });
  const s2 = intl.formatMessage({
    description: "UsePlanWizard: step name - tags and quotas",
    defaultMessage: "Tags and quotas",
    id: "MXHPQd",
  });
  const s3 = intl.formatMessage({
    description: "UsePlanWizard: step name - fill the week",
    defaultMessage: "Fill the week",
    id: "k1d8X/",
  });
  const s4 = intl.formatMessage({
    description: "UsePlanWizard: step name - refine and save",
    defaultMessage: "Refine and save",
    id: "RqxI1B",
  });
  const stepNames = [s1, s2, s3, s4];
  const stepLabelPrefix = intl.formatMessage({
    description: "UsePlanWizard: label - step prefix",
    defaultMessage: "Step",
    id: "ydH/Rp",
  });

  const monday = parseWeekKey(weekKey);
  const offset = weekOffset(weekKey);
  const relativeLabel =
    offset === 0
      ? intl.formatMessage({
          description: "UsePlanWizard: week - this week",
          defaultMessage: "This week",
          id: "boUY+d",
        })
      : offset === 1
        ? intl.formatMessage({
            description: "UsePlanWizard: week - next week",
            defaultMessage: "Next week",
            id: "vJpQgE",
          })
        : offset < 0
          ? intl.formatMessage({
              description: "UsePlanWizard: week - earlier week",
              defaultMessage: "Earlier week",
              id: "1Q/zEs",
            })
          : intl.formatMessage(
              { description: "UsePlanWizard: week - in n weeks", defaultMessage: "In {count} weeks", id: "Dr2bxg" },
              { count: offset }
            );

  const weekPicker = UseWeekPicker(
    weekKey,
    plans,
    selectWeek,
    PLAN_DAY_ORDER.map((day) => planDayShortName(intl, day))
  );

  const existingPlan = plans[weekKey];
  const stepEyebrow = intl.formatMessage(
    {
      description: "UsePlanWizard: eyebrow - step x of 4",
      defaultMessage: "{stepPrefix} {step} / 4 · {relative}",
      id: "4HkS5l",
    },
    { stepPrefix: stepLabelPrefix, step, relative: relativeLabel }
  );

  const planningWeekLabel = intl.formatMessage({
    description: "UsePlanWizard: label - planning",
    defaultMessage: "Planning",
    id: "n+07H2",
  });
  const weekWordLower = intl.formatMessage({
    description: "UsePlanWizard: label - week (lowercase)",
    defaultMessage: "week",
    id: "D6MFbP",
  });
  const weekLine = `${planningWeekLabel} ${weekWordLower} ${isoWeekNumber(monday)} · ${formatWeekRange(monday, locale)} · ${relativeLabel}`;

  // ── step 1: days and people
  const dayRows: PlanDayRowViewModel[] = draft.days.map((day, index) => ({
    day: planDayName(intl, day.day),
    people: day.people,
    isLunchOn: day.lunch,
    isDinnerOn: day.dinner,
    onToggleLunch: () => patchDay(index, { lunch: !day.lunch }),
    onToggleDinner: () => patchDay(index, { dinner: !day.dinner }),
    onIncreasePeople: () => patchDay(index, { people: day.people + 1 }),
    onDecreasePeople: () => patchDay(index, { people: Math.max(1, day.people - 1) }),
  }));

  function patchDay(index: number, patch: Partial<PlanDay>): void {
    setDraft((current) => ({ ...current, days: current.days.map((d, i) => (i === index ? { ...d, ...patch } : d)) }));
  }

  function applyFirstDayToAll(): void {
    setDraft((current) => {
      const first = current.days[0];
      if (!first) return current;
      return {
        ...current,
        days: current.days.map((d) => ({ ...d, lunch: first.lunch, dinner: first.dinner, people: first.people })),
      };
    });
  }

  const mealCount = draft.days.reduce((total, d) => total + (d.lunch ? 1 : 0) + (d.dinner ? 1 : 0), 0);
  const plateCount = draft.days.reduce((total, d) => total + ((d.lunch ? 1 : 0) + (d.dinner ? 1 : 0)) * d.people, 0);
  const mealsWord = intl.formatMessage({
    description: "UsePlanWizard: label - meals (lowercase)",
    defaultMessage: "meals",
    id: "4QBuuw",
  });
  const platesWord = intl.formatMessage({
    description: "UsePlanWizard: label - plates (lowercase)",
    defaultMessage: "plates",
    id: "TSlaTm",
  });
  const mealSummary = `${mealCount} ${mealsWord} · ${plateCount} ${platesWord}`;

  // ── step 2: tags and quotas
  function patchQuota(index: number, patch: Partial<PlanQuota>): void {
    setDraft((current) => ({
      ...current,
      quotas: current.quotas.map((q, i) => (i === index ? { ...q, ...patch } : q)),
    }));
  }

  const quotaRows: PlanQuotaRowViewModel[] = draft.quotas.map((quota, index) => ({
    tag: quota.tag,
    n: quota.n,
    modeLabel: quotaModeLabel(intl, quota.mode),
    onCycleMode: () => patchQuota(index, { mode: nextQuotaMode(quota.mode) }),
    onIncrease: () => patchQuota(index, { n: quota.n + 1 }),
    onDecrease: () => patchQuota(index, { n: Math.max(0, quota.n - 1) }),
    onRemove: () => setDraft((current) => ({ ...current, quotas: current.quotas.filter((_, i) => i !== index) })),
  }));

  function addQuota(tag: string): void {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed) return;
    setDraft((current) =>
      current.quotas.some((q) => q.tag === trimmed)
        ? current
        : { ...current, quotas: [...current.quotas, { tag: trimmed, mode: "atleast", n: 1 }] }
    );
    setPinnedTags((current) => (current.includes(trimmed) ? current : [...current, trimmed]));
    setQuotaQuery("");
  }

  const usedQuotaTags = new Set(draft.quotas.map((q) => q.tag));
  const catalogueFlat = useMemo(
    () => tagCatalogue.flatMap((group) => group.tags.map((t) => ({ tag: t.name, count: t.count }))),
    [tagCatalogue]
  );
  const quotaTagPool = useMemo(() => {
    const catalogueNames = new Set(catalogueFlat.map((t) => t.tag));
    const recipeOnly = collectTags(recipes)
      .filter((t) => !catalogueNames.has(t))
      .map((t) => ({ tag: t, count: 0 }));
    return [...catalogueFlat, ...recipeOnly];
  }, [catalogueFlat, recipes]);

  const trimmedQuotaQuery = quotaQuery.trim().toLowerCase();
  const isSearchingQuotaTags = trimmedQuotaQuery.length > 0;
  const quotaSearchResults: PlanTagPickViewModel[] = isSearchingQuotaTags
    ? quotaTagPool
        .filter((t) => !usedQuotaTags.has(t.tag) && t.tag.includes(trimmedQuotaQuery))
        .sort((a, b) => b.count - a.count)
        .slice(0, 24)
        .map((t) => ({ tag: t.tag, countLabel: formatTagCount(t.count), onAdd: () => addQuota(t.tag) }))
    : [];
  const hasNoQuotaSearchResults = isSearchingQuotaTags && quotaSearchResults.length === 0;
  const createQuotaTagLabel = intl.formatMessage(
    { description: "UsePlanWizard: label - create tag", defaultMessage: 'Create "{tag}"', id: "+ZerUA" },
    { tag: trimmedQuotaQuery }
  );

  const yourTagChips: PlanTagPickViewModel[] = pinnedTags
    .filter((tag) => !usedQuotaTags.has(tag))
    .map((tag) => ({
      tag,
      countLabel: formatTagCount(quotaTagPool.find((t) => t.tag === tag)?.count ?? 0),
      onAdd: () => addQuota(tag),
    }));

  const popularTagChips: PlanTagPickViewModel[] = quotaTagPool
    .filter((t) => !usedQuotaTags.has(t.tag) && !pinnedTags.includes(t.tag))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map((t) => ({ tag: t.tag, countLabel: formatTagCount(t.count), onAdd: () => addQuota(t.tag) }));

  // ── step 3: generate
  const quotaSummaryLine = draft.quotas
    .map((q) => `${quotaModeLabel(intl, q.mode)} ${q.n} ${q.tag}`)
    .join(
      intl.formatMessage({ description: "UsePlanWizard: separator - list join", defaultMessage: ", ", id: "1iDozp" })
    );
  const generateSummary = draft.quotas.length
    ? intl.formatMessage(
        { description: "UsePlanWizard: body - quotas summary", defaultMessage: "Quotas: {summary}.", id: "msjRYe" },
        { summary: quotaSummaryLine }
      )
    : intl.formatMessage({
        description: "UsePlanWizard: body - no quotas set",
        defaultMessage: "No quotas set, this will be a straight random draw.",
        id: "gLixRp",
      });

  // ── step 4: refine and save
  function patchSlot(index: number, patch: Partial<PlanSlot>): void {
    setDraft((current) => ({
      ...current,
      slots: current.slots.map((slot, i) => (i === index ? { ...slot, ...patch } : slot)),
    }));
  }

  function rerollSlot(index: number): void {
    setDraft((current) => {
      const target = current.slots[index];
      if (!target) return current;
      return {
        ...current,
        slots: current.slots.map((slot, i) =>
          i === index ? { ...slot, recipeId: rerollRecipeId(recipes, target.recipeId) } : slot
        ),
      };
    });
  }

  function openSwap(index: number): void {
    setSwapSlotIndex(index);
    setPickerQuery("");
    setPickerTags([]);
  }

  const emptyWord = intl.formatMessage({
    description: "UsePlanWizard: label - empty slot",
    defaultMessage: "empty",
    id: "z+Hjxf",
  });
  const filledWord = intl.formatMessage({
    description: "UsePlanWizard: label - filled",
    defaultMessage: "filled",
    id: "3x91xH",
  });

  function buildSlotViewModel(slot: PlanSlot, index: number): PlanSlotViewModel {
    const recipe = recipes.find((r) => r.id === slot.recipeId) ?? null;
    return {
      day: slot.day,
      dayLabel: planDayName(intl, slot.day),
      mealLine: `${planMealName(intl, slot.meal)} · ${slot.people}p`,
      title: recipe ? recipe.title : `— ${emptyWord} —`,
      isFilled: !!recipe,
      tags: recipe?.tags ?? [],
      photoUrl: recipe?.photoUrl ?? null,
      onReroll: () => rerollSlot(index),
      onSwap: () => openSwap(index),
      onClear: () => patchSlot(index, { recipeId: null }),
    };
  }

  const slotRows = draft.slots.map(buildSlotViewModel);
  const gridDays = PLAN_DAY_ORDER.map((day) => ({
    dayLabel: planDayShortName(intl, day),
    slots: slotRows.filter((slot) => slot.day === day),
  }));

  const filledCounts: Record<string, number> = {};
  draft.slots.forEach((slot) => {
    const recipe = recipes.find((r) => r.id === slot.recipeId);
    recipe?.tags.forEach((t) => {
      filledCounts[t] = (filledCounts[t] ?? 0) + 1;
    });
  });
  const quotaStatus = draft.quotas.length
    ? draft.quotas.map((q) => `${q.tag} ${filledCounts[q.tag] ?? 0}/${q.n}`).join("   ")
    : `${filledSlotCount(draft.slots)}/${draft.slots.length} ${filledWord}`;

  // ── swap dialog
  const activeSwapSlot = swapSlotIndex !== null ? draft.slots[swapSlotIndex] : null;
  const swapTitle = activeSwapSlot
    ? intl.formatMessage(
        {
          description: "UsePlanWizard: heading - swap for day meal",
          defaultMessage: "Pick a recipe: {day} {meal}",
          id: "roDpsD",
        },
        { day: planDayName(intl, activeSwapSlot.day), meal: planMealName(intl, activeSwapSlot.meal).toLowerCase() }
      )
    : intl.formatMessage({
        description: "UsePlanWizard: heading - pick a recipe",
        defaultMessage: "Pick a recipe",
        id: "knHoNi",
      });

  const trimmedPickerQuery = pickerQuery.trim().toLowerCase();
  const swapFiltered = recipes.filter(
    (r) =>
      (!trimmedPickerQuery || r.title.toLowerCase().includes(trimmedPickerQuery)) &&
      pickerTags.every((t) => r.tags.includes(t))
  );
  const swapResultsLabel = intl.formatMessage(
    {
      description: "UsePlanWizard: label - showing n of m recipes",
      defaultMessage: "showing {shown} of {total} recipes",
      id: "qw1WTq",
    },
    { shown: swapFiltered.length, total: recipes.length }
  );
  const allRecipeTags = useMemo(() => collectTags(recipes), [recipes]);

  function stepSubtitleFor(wizardStep: PlanWizardStep): string {
    switch (wizardStep) {
      case 1:
        return intl.formatMessage({
          description: "UsePlanWizard: step subtitle - days and people",
          defaultMessage: "Which meals you need, and for how many.",
          id: "xK01El",
        });
      case 2:
        return intl.formatMessage({
          description: "UsePlanWizard: step subtitle - tags and quotas",
          defaultMessage: "Steer the week with tags before anything is picked.",
          id: "WX9zeL",
        });
      case 3:
        return intl.formatMessage({
          description: "UsePlanWizard: step subtitle - fill the week",
          defaultMessage: "Randomize from the pool, or start from an empty week.",
          id: "1LATBW",
        });
      case 4:
        return intl.formatMessage({
          description: "UsePlanWizard: step subtitle - refine and save",
          defaultMessage: "Swap, reroll or clear anything before you save.",
          id: "OFKSs2",
        });
    }
  }

  return {
    step,
    stepEyebrow,
    stepTabs: stepNames.map((name, i) => ({ label: `${stepLabelPrefix} ${i + 1}`, name, isActive: step === i + 1 })),
    stepSubtitle: stepSubtitleFor(step),
    canGoBack: step > 1,
    onBack: goBack,
    nextLabel:
      step === 4
        ? intl.formatMessage({
            description: "UsePlanWizard: button - save week",
            defaultMessage: "Save week",
            id: "kzQS0T",
          })
        : step === 3
          ? intl.formatMessage({ description: "UsePlanWizard: button - skip", defaultMessage: "Skip", id: "yjaIrt" })
          : intl.formatMessage({
              description: "UsePlanWizard: button - continue",
              defaultMessage: "Continue",
              id: "RXoxJ3",
            }),
    onNext: goNext,
    showSaveDraft: step === 4,
    onSaveDraft: () => commit("draft"),

    weekLine,
    hasExistingPlanForWeek: !!existingPlan,
    onOpenWeekPicker: weekPicker.onOpen,
    weekPicker,

    dayRows,
    mealSummary,
    onApplyFirstDayToAll: applyFirstDayToAll,

    quotaRows,
    hasNoQuotas: draft.quotas.length === 0,
    quotaQuery,
    onQuotaQueryChange: setQuotaQuery,
    isSearchingQuotaTags,
    quotaSearchResults,
    hasNoQuotaSearchResults,
    createQuotaTagLabel,
    onCreateQuotaTag: () => addQuota(trimmedQuotaQuery),
    yourTagChips,
    popularTagChips,

    isEditDefaultTagsOpen,
    onOpenEditDefaultTags: () => setIsEditDefaultTagsOpen(true),
    onCloseEditDefaultTags: () => setIsEditDefaultTagsOpen(false),
    pinnedTags,
    onTogglePinnedTag: (tag) =>
      setPinnedTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag])),

    isBrowseQuotaTagsOpen,
    onOpenBrowseQuotaTags: () => setIsBrowseQuotaTagsOpen(true),
    onCloseBrowseQuotaTags: () => setIsBrowseQuotaTagsOpen(false),
    quotaTagsInDraft: draft.quotas.map((q) => q.tag),
    onToggleQuotaTag: (tag) =>
      setDraft((current) =>
        current.quotas.some((q) => q.tag === tag)
          ? { ...current, quotas: current.quotas.filter((q) => q.tag !== tag) }
          : { ...current, quotas: [...current.quotas, { tag, mode: "atleast", n: 1 }] }
      ),

    mealsToFillCount: mealCount,
    generateSummary,
    onGenerate: generate,
    onStartEmpty: fillEmpty,

    layout,
    onLayoutChange: setLayout,
    quotaStatus,
    onRerollAll: () => setDraft((current) => ({ ...current, slots: generatePlanSlots(current, recipes) })),
    slotRows,
    gridDays,

    isSwapOpen: swapSlotIndex !== null,
    swapTitle,
    swapResultsLabel,
    hasNoSwapResults: swapFiltered.length === 0,
    pickerQuery,
    onPickerQueryChange: setPickerQuery,
    pickerTagChips: allRecipeTags.map((tag) => ({
      tag,
      isSelected: pickerTags.includes(tag),
      onToggle: () =>
        setPickerTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag])),
    })),
    swapOptions: swapFiltered.map((recipe) => ({
      title: recipe.title,
      timeLabel: intl.formatMessage(
        {
          description: "UsePlanWizard: label - recipe time in swap list",
          defaultMessage: "{minutes} min",
          id: "5rT67q",
        },
        { minutes: recipe.timeMinutes }
      ),
      tags: recipe.tags,
      onPick: () => {
        if (swapSlotIndex === null) return;
        patchSlot(swapSlotIndex, { recipeId: recipe.id });
        setSwapSlotIndex(null);
      },
    })),
    onCloseSwap: () => setSwapSlotIndex(null),
  };
}
