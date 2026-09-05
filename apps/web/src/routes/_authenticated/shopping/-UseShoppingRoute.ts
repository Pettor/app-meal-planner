import { UsePlans } from "~/core/plan/UsePlans";
import { UseRecipes } from "~/core/recipes/UseRecipes";
import { UseShoppingList } from "~/core/shopping/UseShoppingList";
import type { ShoppingViewProps } from "~/views/shopping/ShoppingView";

/**
 * Wires the shopping page to the saved weeks and to the ticked-off lines.
 *
 * `recipes` comes from placeholder data until there is a recipes service —
 * swap `SampleRecipes` for a route loader and the view stays unchanged.
 */
export function UseShoppingRoute(): ShoppingViewProps {
  const { plans, selectedWeekKey } = UsePlans();
  const { checkedLines, toggleLine } = UseShoppingList();

  const { recipes } = UseRecipes();

  return {
    weekKey: selectedWeekKey,
    plan: plans[selectedWeekKey] ?? null,
    recipes,
    checkedLines,
    onToggleLine: toggleLine,
    onPrint: () => window.print(),
  };
}
