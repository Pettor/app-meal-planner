import { useIntl } from "react-intl";
import type { IntlShape } from "react-intl";
import { planDayName, planMealName, planPeopleLabel } from "~/core/plan/PlanDayLabels";
import { PLAN_DAY_ORDER } from "~/core/plan/PlanTypes";
import type { PlanDayId, SavedPlan } from "~/core/plan/PlanTypes";
import { addDays, formatWeekRange, isoWeekNumber, parseWeekKey, weekKeyOf, weekOffset } from "~/core/plan/PlanUtils";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import type { WeekStatAccent } from "~/views/week/WeekStatCard";

export interface WeekMealViewModel {
  mealLabel: string;
  /** Dinner and lunch are colour-coded so a day reads at a glance. */
  isDinner: boolean;
  peopleLabel: string;
  title: string;
  tags: string[];
  photoUrl: string | null;
  onOpen: () => void;
}

export interface WeekDayViewModel {
  day: PlanDayId;
  dayLabel: string;
  dateNumber: string;
  monthLabel: string;
  peopleLabel: string;
  isToday: boolean;
  meals: WeekMealViewModel[];
}

export interface WeekStatViewModel {
  label: string;
  value: string;
  note: string;
  accent: WeekStatAccent;
}

export interface UseWeekOverviewResult {
  /** Plain first half of the page heading, e.g. "This". */
  headingLead: string;
  /** Gradient second half, e.g. "week" or the week number. */
  headingAccent: string;
  /** "week 14 · 3 Apr – 9 Apr · 7 meals · 28 plates · planned 2026-09-05" */
  subtitle: string;
  /** Short relative name for the week switcher, e.g. "This week". */
  switcherLabel: string;
  /** "week 14 · 3 Apr – 9 Apr" — the switcher's hover hint. */
  weekRange: string;
  statusDotClassName: string;
  hasPlan: boolean;
  isDraft: boolean;
  stats: WeekStatViewModel[];
  days: WeekDayViewModel[];
  previousWeekKey: string;
  nextWeekKey: string;
}

function relativeWeekLabel(intl: IntlShape, offset: number, weekNumber: number): string {
  if (offset === 0)
    return intl.formatMessage({
      description: "UseWeekOverview: week - this week",
      defaultMessage: "This week",
      id: "VH4+fJ",
    });
  if (offset === 1)
    return intl.formatMessage({
      description: "UseWeekOverview: week - next week",
      defaultMessage: "Next week",
      id: "RM/2hE",
    });
  return intl.formatMessage(
    { description: "UseWeekOverview: week - week number", defaultMessage: "Week {number}", id: "Zra8aV" },
    { number: weekNumber }
  );
}

/** Everything the "This week" page renders, derived from the week in view and its saved plan. */
export function useWeekOverview(
  weekKey: string,
  plan: SavedPlan | null,
  recipes: Recipe[],
  onOpenRecipe: (recipeId: string) => void
): UseWeekOverviewResult {
  const intl = useIntl();
  const locale = intl.locale || "en-GB";

  const monday = parseWeekKey(weekKey);
  const offset = weekOffset(weekKey);
  const weekNumber = isoWeekNumber(monday);
  const todayKey = weekKeyOf(new Date());

  const weekWordLower = intl.formatMessage({
    description: "UseWeekOverview: label - week (lowercase)",
    defaultMessage: "week",
    id: "eJW9+3",
  });
  const weekRange = `${weekWordLower} ${weekNumber} · ${formatWeekRange(monday, locale)}`;

  const headingLead =
    offset === 0
      ? intl.formatMessage({ description: "UseWeekOverview: heading - this", defaultMessage: "This", id: "R366Cn" })
      : offset === 1
        ? intl.formatMessage({ description: "UseWeekOverview: heading - next", defaultMessage: "Next", id: "6WmLIf" })
        : intl.formatMessage({ description: "UseWeekOverview: heading - week", defaultMessage: "Week", id: "d2RFeo" });
  const headingAccent =
    offset === 0 || offset === 1
      ? intl.formatMessage({
          description: "UseWeekOverview: heading accent - week",
          defaultMessage: "week",
          id: "GOl4iB",
        })
      : String(weekNumber);

  const filledSlots = plan ? plan.draft.slots.filter((slot) => slot.recipeId) : [];
  const plateCount = filledSlots.reduce((total, slot) => total + slot.people, 0);
  const vegetarianCount = filledSlots.filter((slot) =>
    recipes.find((recipe) => recipe.id === slot.recipeId)?.tags.includes("vegetarian")
  ).length;

  const mealsWord = intl.formatMessage({
    description: "UseWeekOverview: label - meals (lowercase)",
    defaultMessage: "meals",
    id: "5TOztL",
  });
  const platesWord = intl.formatMessage({
    description: "UseWeekOverview: label - plates (lowercase)",
    defaultMessage: "plates",
    id: "gbsl0Q",
  });

  const statusLine = !plan
    ? intl.formatMessage({
        description: "UseWeekOverview: status - not planned",
        defaultMessage: "not planned",
        id: "RjKbi8",
      })
    : plan.status === "draft"
      ? intl.formatMessage({ description: "UseWeekOverview: status - draft", defaultMessage: "draft", id: "hQzv4A" })
      : intl.formatMessage(
          {
            description: "UseWeekOverview: status - planned on date",
            defaultMessage: "planned {date}",
            id: "BYRWhm",
          },
          { date: plan.savedAt }
        );

  const subtitle = plan
    ? `${weekRange} · ${filledSlots.length} ${mealsWord} · ${plateCount} ${platesWord} · ${statusLine}`
    : `${weekRange} · ${statusLine}`;

  const stats: WeekStatViewModel[] = plan
    ? [
        {
          label: intl.formatMessage({
            description: "UseWeekOverview: stat - meals",
            defaultMessage: "Meals",
            id: "wF9nyw",
          }),
          value: String(filledSlots.length),
          note: intl.formatMessage({
            description: "UseWeekOverview: stat note - meals",
            defaultMessage: "across the week",
            id: "QTJfGJ",
          }),
          accent: "accent",
        },
        {
          label: intl.formatMessage({
            description: "UseWeekOverview: stat - plates",
            defaultMessage: "Plates",
            id: "KQh2NF",
          }),
          value: String(plateCount),
          note: intl.formatMessage({
            description: "UseWeekOverview: stat note - plates",
            defaultMessage: "portions in total",
            id: "vwEhWA",
          }),
          accent: "success",
        },
        {
          label: intl.formatMessage({
            description: "UseWeekOverview: stat - vegetarian",
            defaultMessage: "Vegetarian",
            id: "xcITGP",
          }),
          value: filledSlots.length ? `${Math.round((vegetarianCount / filledSlots.length) * 100)}%` : "0%",
          note: intl.formatMessage({
            description: "UseWeekOverview: stat note - vegetarian",
            defaultMessage: "of all meals",
            id: "zIZybl",
          }),
          accent: "violet",
        },
      ]
    : [];

  const days: WeekDayViewModel[] = plan
    ? plan.draft.days.map((row) => {
        const date = addDays(monday, PLAN_DAY_ORDER.indexOf(row.day));
        return {
          day: row.day,
          dayLabel: planDayName(intl, row.day),
          dateNumber: String(date.getDate()),
          monthLabel: date.toLocaleDateString(locale, { month: "short" }),
          peopleLabel: planPeopleLabel(intl, row.people),
          isToday: weekKeyOf(date) === todayKey,
          meals: plan.draft.slots
            .filter((slot) => slot.day === row.day)
            .flatMap((slot) => {
              const recipe = recipes.find((r) => r.id === slot.recipeId);
              if (!recipe) return [];
              return [
                {
                  mealLabel: planMealName(intl, slot.meal),
                  isDinner: slot.meal === "dinner",
                  peopleLabel: planPeopleLabel(intl, slot.people),
                  title: recipe.title,
                  tags: recipe.tags,
                  photoUrl: recipe.photoUrl,
                  onOpen: () => onOpenRecipe(recipe.id),
                } satisfies WeekMealViewModel,
              ];
            }),
        };
      })
    : [];

  return {
    headingLead,
    headingAccent,
    subtitle,
    switcherLabel: relativeWeekLabel(intl, offset, weekNumber),
    weekRange,
    statusDotClassName: !plan ? "bg-default-300" : plan.status === "final" ? "bg-success" : "bg-warning",
    hasPlan: !!plan,
    isDraft: plan?.status === "draft",
    stats,
    days,
    previousWeekKey: weekKeyOf(addDays(monday, -7)),
    nextWeekKey: weekKeyOf(addDays(monday, 7)),
  };
}
