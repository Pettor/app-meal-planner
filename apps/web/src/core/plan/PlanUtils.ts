import { PLAN_DAY_ORDER } from "~/core/plan/PlanTypes";
import type { PlanDay, PlanDraft, PlanQuota, PlanSlot, SavedPlan } from "~/core/plan/PlanTypes";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface PlanCalendarDay {
  dateKey: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface PlanCalendarWeekRow {
  weekKey: string;
  weekNumber: number;
  days: PlanCalendarDay[];
}

const MS_PER_DAY = 86400000;

/** Default quotas offered on a fresh week — nudges the randomizer without locking anything in. */
const DEFAULT_QUOTAS: PlanQuota[] = [
  { tag: "vegetarian", mode: "atleast", n: 2 },
  { tag: "bbq", mode: "atleast", n: 1 },
];

/**
 * Tags offered first in "Your tags" when setting quotas for a week. Distinct from the
 * recipe editor's suggested tags — a different set of defaults for a different surface.
 */
export const DefaultPinnedTags = ["vegetarian", "meat", "fish", "bbq", "quick", "cheap"];

export function emptyPlanDraft(): PlanDraft {
  return {
    days: PLAN_DAY_ORDER.map((day) => ({ day, lunch: false, dinner: true, people: 4 })),
    quotas: DEFAULT_QUOTAS.map((quota) => ({ ...quota })),
    slots: [],
  };
}

export function clonePlanDraft(draft: PlanDraft): PlanDraft {
  return {
    days: draft.days.map((day) => ({ ...day })),
    quotas: draft.quotas.map((quota) => ({ ...quota })),
    slots: draft.slots.map((slot) => ({ ...slot })),
  };
}

/** One row per meal the days call for — the shell the wizard fills in. */
export function buildPlanSlots(days: PlanDay[]): PlanSlot[] {
  const slots: PlanSlot[] = [];
  days.forEach((day) => {
    if (day.lunch) slots.push({ day: day.day, meal: "lunch", people: day.people, recipeId: null });
    if (day.dinner) slots.push({ day: day.day, meal: "dinner", people: day.people, recipeId: null });
  });
  return slots;
}

/** Picks a random item from a non-empty array — callers are responsible for the non-empty guarantee. */
function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T;
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = items.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i] as T;
    shuffled[i] = shuffled[j] as T;
    shuffled[j] = temp;
  }
  return shuffled;
}

/**
 * Fills every slot from the recipe pool, favouring "at least" quotas first and
 * respecting "at most" caps, then falling back to a plain random draw.
 */
export function generatePlanSlots(draft: PlanDraft, recipes: Recipe[]): PlanSlot[] {
  const slots = buildPlanSlots(draft.days);
  if (recipes.length === 0 || slots.length === 0) return slots;

  const counts: Record<string, number> = {};
  const used = new Set<string>();

  function capOf(tag: string): number {
    const quota = draft.quotas.find((q) => q.tag === tag && q.mode === "atmost");
    return quota ? quota.n : Infinity;
  }

  function pick(candidates: Recipe[]): Recipe | null {
    if (candidates.length === 0) return null;
    const underCap = candidates.filter((r) => r.tags.every((t) => (counts[t] ?? 0) < capOf(t)));
    const base = underCap.length ? underCap : candidates;
    const fresh = base.filter((r) => !used.has(r.id));
    const pool = fresh.length ? fresh : base;
    const chosen = randomItem(pool);
    used.add(chosen.id);
    chosen.tags.forEach((t) => {
      counts[t] = (counts[t] ?? 0) + 1;
    });
    return chosen;
  }

  const order = shuffle(slots.map((_, index) => index));
  const assigned = new Map<number, string | null>();
  draft.quotas
    .filter((quota) => quota.mode !== "atmost")
    .forEach((quota) => {
      for (let i = 0; i < quota.n; i++) {
        const slotIndex = order.find((index) => !assigned.has(index));
        if (slotIndex === undefined) break;
        const chosen = pick(recipes.filter((r) => r.tags.includes(quota.tag)));
        if (!chosen) break;
        assigned.set(slotIndex, chosen.id);
      }
    });

  return slots.map((slot, index) => {
    if (assigned.has(index)) return { ...slot, recipeId: assigned.get(index) ?? null };
    return { ...slot, recipeId: pick(recipes)?.id ?? null };
  });
}

/** A different recipe for one slot — excludes its current pick when there's a choice. */
export function rerollRecipeId(recipes: Recipe[], currentRecipeId: string | null): string | null {
  if (recipes.length === 0) return null;
  const candidates = recipes.filter((r) => r.id !== currentRecipeId);
  const pool = candidates.length ? candidates : recipes;
  return randomItem(pool).id;
}

export function mondayOf(date: Date): Date {
  const monday = new Date(date.getTime());
  monday.setHours(12, 0, 0, 0);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return monday;
}

export function addDays(date: Date, amount: number): Date {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + amount);
  return result;
}

/** `YYYY-MM-DD` of a week's Monday — the key a saved plan is stored under. */
export function weekKeyOf(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function parseWeekKey(key: string): Date {
  const [year = 0, month = 1, day = 1] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

export function isoWeekNumber(date: Date): number {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - week1.getTime()) / MS_PER_DAY - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export function thisWeekKey(): string {
  return weekKeyOf(mondayOf(new Date()));
}

/**
 * The week "Plan a new week" should open on: the first week from this one
 * forward that has nothing saved yet, falling back to next week.
 */
export function nextUnplannedWeekKey(plannedWeekKeys: string[]): string {
  const planned = new Set(plannedWeekKeys);
  const monday = mondayOf(new Date());
  for (let offset = 0; offset < 52; offset++) {
    const key = weekKeyOf(addDays(monday, offset * 7));
    if (!planned.has(key)) return key;
  }
  return weekKeyOf(addDays(monday, 7));
}

export function offsetWeekKey(offsetWeeks: number): string {
  return weekKeyOf(addDays(mondayOf(new Date()), offsetWeeks * 7));
}

/** Weeks in whole units from the current week — 0 is this week, negative is in the past. */
export function weekOffset(weekKey: string): number {
  return Math.round((parseWeekKey(weekKey).getTime() - mondayOf(new Date()).getTime()) / (MS_PER_DAY * 7));
}

export function formatWeekRange(monday: Date, locale = "en-GB"): string {
  const sunday = addDays(monday, 6);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  return `${monday.toLocaleDateString(locale, opts)} – ${sunday.toLocaleDateString(locale, opts)}`;
}

/** Meals actually filled in for a week, e.g. for a calendar day's "planned" dot. */
export function filledSlotCount(slots: PlanSlot[]): number {
  return slots.filter((slot) => slot.recipeId).length;
}

export function firstOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 12);
}

export function shiftMonth(monthFirst: Date, deltaMonths: number): Date {
  return new Date(monthFirst.getFullYear(), monthFirst.getMonth() + deltaMonths, 1, 12);
}

/** Up to six Monday-first week rows covering a month, for the week-picker calendar. */
export function buildCalendarWeeks(monthFirst: Date): PlanCalendarWeekRow[] {
  const rows: PlanCalendarWeekRow[] = [];
  const todayKey = weekKeyOf(new Date());
  let cursor = mondayOf(monthFirst);
  for (let row = 0; row < 6; row++) {
    const days: PlanCalendarDay[] = PLAN_DAY_ORDER.map((_, i) => {
      const date = addDays(cursor, i);
      return {
        dateKey: weekKeyOf(date),
        dayNumber: date.getDate(),
        isCurrentMonth: date.getMonth() === monthFirst.getMonth(),
        isToday: weekKeyOf(date) === todayKey,
      };
    });
    rows.push({ weekKey: weekKeyOf(cursor), weekNumber: isoWeekNumber(cursor), days });
    cursor = addDays(cursor, 7);
    if (cursor.getMonth() !== monthFirst.getMonth() && cursor > monthFirst) break;
  }
  return rows;
}

/** Colour of a week's status dot — grey when unplanned, amber for a draft, green once final. */
export function weekStatusDotClassName(plan: SavedPlan | null | undefined): string {
  if (!plan) return "bg-default-300";
  return plan.status === "final" ? "bg-success" : "bg-warning";
}
