import { toast } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import type { PlanStatus } from "~/core/plan/PlanTypes";
import { DefaultPinnedTags } from "~/core/plan/PlanUtils";
import { SampleRecipes, SampleTagCatalogue } from "~/core/recipes/RecipeSampleData";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import type { PlanViewProps } from "~/views/plan/PlanView";

/**
 * Wires the plan wizard to navigation.
 *
 * `recipes` comes from placeholder data until there is a recipes service —
 * swap `SampleRecipes` for a route loader and the view stays unchanged. Only
 * the cook's own saved recipes are offered, matching what the planner draws from.
 */
export function UsePlanRoute(): PlanViewProps {
  const navigate = useNavigate();
  const intl = useIntl();

  const recipes: Recipe[] = SampleRecipes.filter((recipe) => recipe.isSaved);

  function handleWeekSaved(weekKey: string, status: PlanStatus): void {
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
    console.info("Save week plan", weekKey, status);
    void navigate({ to: "/" });
  }

  return {
    recipes,
    tagCatalogue: SampleTagCatalogue,
    pinnedTags: DefaultPinnedTags,
    onWeekSaved: handleWeekSaved,
  };
}
