import { usePlans } from "~/core/plan/UsePlans";
import { useRecipes } from "~/core/recipes/UseRecipes";
import { useShoppingList } from "~/core/shopping/UseShoppingList";
import type { ShoppingViewProps } from "~/views/shopping/ShoppingView";

/**
 * Wires the shopping page to the saved weeks and to the ticked-off lines.
 *
 * `recipes` comes from placeholder data until there is a recipes service —
 * swap `SampleRecipes` for a route loader and the view stays unchanged.
 */
export function useShoppingRoute(): ShoppingViewProps {
  const { plans, selectedWeekKey } = usePlans();
  const { checkedLines, toggleLine } = useShoppingList();

  const { recipes } = useRecipes();

  return {
    weekKey: selectedWeekKey,
    plan: plans[selectedWeekKey] ?? null,
    recipes,
    checkedLines,
    onToggleLine: toggleLine,
    onPrint: () => window.print(),
  };
}
