import { useNavigate } from "@tanstack/react-router";
import { nextUnplannedWeekKey } from "~/core/plan/PlanUtils";
import { usePlans } from "~/core/plan/UsePlans";
import { useRecipes } from "~/core/recipes/UseRecipes";
import type { WeekViewProps } from "~/views/week/WeekView";

/**
 * Wires the week page to the saved weeks and to navigation.
 *
 * `recipes` comes from placeholder data until there is a recipes service —
 * swap `SampleRecipes` for a route loader and the view stays unchanged.
 */
export function useWeekRoute(): WeekViewProps {
  const navigate = useNavigate();
  const { plans, selectedWeekKey, selectWeek, publishPlan } = usePlans();

  const { recipes } = useRecipes();

  return {
    weekKey: selectedWeekKey,
    plan: plans[selectedWeekKey] ?? null,
    recipes,
    onOpenRecipe: (recipeId) => void navigate({ to: "/recipes/$recipeId", params: { recipeId } }),
    onEditWeek: () => void navigate({ to: "/plan" }),
    onPlanWeek: () => {
      // "Edit week" reopens the week in view; "Plan a new week" jumps to the next free one.
      if (plans[selectedWeekKey]) selectWeek(nextUnplannedWeekKey(Object.keys(plans)));
      void navigate({ to: "/plan" });
    },
    onPublishWeek: () => publishPlan(selectedWeekKey),
    onPrint: () => window.print(),
  };
}
