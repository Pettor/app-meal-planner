import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { savedPlansAtom, selectedWeekKeyAtom } from "~/core/plan/PlanAtoms";
import type { PlanDraft, PlanStatus, SavedPlan } from "~/core/plan/PlanTypes";
import { clonePlanDraft, weekKeyOf } from "~/core/plan/PlanUtils";

export interface UsePlansResult {
  plans: Record<string, SavedPlan>;
  /** The week currently in focus across the planner and the week page. */
  selectedWeekKey: string;
  selectWeek: (weekKey: string) => void;
  savePlan: (weekKey: string, status: PlanStatus, draft: PlanDraft) => void;
  /** Promotes a draft week to a planned one, leaving its meals untouched. */
  publishPlan: (weekKey: string) => void;
}

/** Read and write the saved weeks, plus which week the app is currently on. */
export function UsePlans(): UsePlansResult {
  const plans = useAtomValue(savedPlansAtom);
  const setPlans = useSetAtom(savedPlansAtom);
  const [selectedWeekKey, selectWeek] = useAtom(selectedWeekKeyAtom);

  function savePlan(weekKey: string, status: PlanStatus, draft: PlanDraft): void {
    const savedAt = weekKeyOf(new Date());
    setPlans((current) => ({ ...current, [weekKey]: { status, draft: clonePlanDraft(draft), savedAt } }));
  }

  function publishPlan(weekKey: string): void {
    setPlans((current) => {
      const saved = current[weekKey];
      return saved ? { ...current, [weekKey]: { ...saved, status: "final" } } : current;
    });
  }

  return { plans, selectedWeekKey, selectWeek, savePlan, publishPlan };
}
