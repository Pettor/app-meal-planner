import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { SavedPlan } from "~/core/plan/PlanTypes";
import { thisWeekKey } from "~/core/plan/PlanUtils";

/**
 * Every week saved at least once, keyed by its Monday (`YYYY-MM-DD`).
 *
 * Persisted locally until `@package/api` grows a `Plans` endpoint — the planner
 * writes here and the week page reads from it, so the two stay in step.
 */
export const savedPlansAtom = atomWithStorage<Record<string, SavedPlan>>("plans", {});

/** The week both the planner and the week page are looking at. */
export const selectedWeekKeyAtom = atom<string>(thisWeekKey());
