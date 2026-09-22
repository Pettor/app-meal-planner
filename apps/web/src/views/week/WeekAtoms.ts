import { atom } from "jotai";
import type { WeekLayout } from "~/core/plan/PlanTypes";

/**
 * Which layout the week page is showing. Session-scoped like the week in view:
 * the choice follows the cook from week to week, but does not outlive the tab.
 */
export const weekLayoutAtom = atom<WeekLayout>("table");
