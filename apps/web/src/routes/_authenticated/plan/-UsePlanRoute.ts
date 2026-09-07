import { useEffect, useState } from "react";
import { toast } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useIntl } from "react-intl";
import { pendingSharedPlanAtom } from "~/core/community/CommunityAtoms";
import type { PlanDraft, PlanStatus } from "~/core/plan/PlanTypes";
import { usePlans } from "~/core/plan/UsePlans";
import { SampleTagCatalogue } from "~/core/recipes/RecipeSampleData";
import { useRecipes } from "~/core/recipes/UseRecipes";
import { useDefaultTags } from "~/core/settings/UseDefaultTags";
import type { PlanViewProps } from "~/views/plan/PlanView";

/**
 * Wires the plan wizard to the saved weeks and to navigation.
 *
 * `recipes` comes from placeholder data until there is a recipes service —
 * swap `SampleRecipes` for a route loader and the view stays unchanged. Only
 * the cook's own saved recipes are offered, matching what the planner draws from.
 */
export function usePlanRoute(): PlanViewProps {
  const navigate = useNavigate();
  const intl = useIntl();
  const { plans, selectedWeekKey, selectWeek, savePlan } = usePlans();
  const [pendingSharedPlan, setPendingSharedPlan] = useAtom(pendingSharedPlanAtom);

  /*
   * A shared week is handed over once. Taking a copy and clearing the atom
   * means a later visit to the planner opens on the cook's own week again
   * rather than replaying someone else's.
   */
  const [initialDraft] = useState(pendingSharedPlan);
  useEffect(() => {
    if (pendingSharedPlan) setPendingSharedPlan(null);
  }, [pendingSharedPlan, setPendingSharedPlan]);

  const { savedRecipes } = useRecipes();
  const { pinnedTags, togglePinnedTag } = useDefaultTags();

  function handleWeekSaved(weekKey: string, status: PlanStatus, draft: PlanDraft): void {
    savePlan(weekKey, status, draft);
    selectWeek(weekKey);
    toast(
      status === "final"
        ? intl.formatMessage({
            description: "UsePlanRoute: toast - week saved",
            defaultMessage: "Week saved.",
            id: "DAg4rT",
          })
        : intl.formatMessage({
            description: "UsePlanRoute: toast - week saved as draft",
            defaultMessage: "Saved as a draft.",
            id: "seJTd5",
          })
    );
    void navigate({ to: "/week" });
  }

  return {
    recipes: savedRecipes,
    tagCatalogue: SampleTagCatalogue,
    pinnedTags,
    onTogglePinnedTag: togglePinnedTag,
    plans,
    initialWeekKey: selectedWeekKey,
    initialDraft,
    onWeekSaved: handleWeekSaved,
  };
}
