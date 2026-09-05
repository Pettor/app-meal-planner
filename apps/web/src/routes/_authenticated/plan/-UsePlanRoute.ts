import { toast } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import type { PlanDraft, PlanStatus } from "~/core/plan/PlanTypes";
import { DefaultPinnedTags } from "~/core/plan/PlanUtils";
import { UsePlans } from "~/core/plan/UsePlans";
import { SampleRecipes, SampleTagCatalogue } from "~/core/recipes/RecipeSampleData";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import type { PlanViewProps } from "~/views/plan/PlanView";

/**
 * Wires the plan wizard to the saved weeks and to navigation.
 *
 * `recipes` comes from placeholder data until there is a recipes service —
 * swap `SampleRecipes` for a route loader and the view stays unchanged. Only
 * the cook's own saved recipes are offered, matching what the planner draws from.
 */
export function UsePlanRoute(): PlanViewProps {
  const navigate = useNavigate();
  const intl = useIntl();
  const { plans, selectedWeekKey, selectWeek, savePlan } = UsePlans();

  const recipes: Recipe[] = SampleRecipes.filter((recipe) => recipe.isSaved);

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
    recipes,
    tagCatalogue: SampleTagCatalogue,
    pinnedTags: DefaultPinnedTags,
    plans,
    initialWeekKey: selectedWeekKey,
    onWeekSaved: handleWeekSaved,
  };
}
