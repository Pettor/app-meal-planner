/**
 * Domain types for the weekly meal plan wizard.
 *
 * These stand in for the API layer until `@package/api` grows a `Plans`
 * endpoint. The shapes mirror what the Meal Planner design reasons about, so
 * wiring them to a service later is a converter change, not a view change.
 */

export type PlanDayId = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

/** Fixed Monday-first order the design lays days out in. */
export const PLAN_DAY_ORDER: PlanDayId[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export type PlanMeal = "lunch" | "dinner";

/** How a quota's count is enforced when the planner fills empty slots. */
export type PlanQuotaMode = "atleast" | "exactly" | "atmost";

export interface PlanDay {
  day: PlanDayId;
  lunch: boolean;
  dinner: boolean;
  people: number;
}

export interface PlanQuota {
  tag: string;
  mode: PlanQuotaMode;
  n: number;
}

export interface PlanSlot {
  day: PlanDayId;
  meal: PlanMeal;
  people: number;
  recipeId: string | null;
}

export interface PlanDraft {
  days: PlanDay[];
  quotas: PlanQuota[];
  slots: PlanSlot[];
}

export type PlanWizardStep = 1 | 2 | 3 | 4;

/** How the filled week is reviewed on the last step. */
export type PlanLayout = "rows" | "grid";

export type PlanStatus = "draft" | "final";

/** A week that has been saved at least once, keyed by its Monday (`YYYY-MM-DD`). */
export interface SavedPlan {
  status: PlanStatus;
  draft: PlanDraft;
}
