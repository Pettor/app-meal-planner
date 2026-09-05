import type { SavedPlan } from "~/core/plan/PlanTypes";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { formatAmount } from "~/core/recipes/RecipeUtils";
import type { ShoppingLine } from "~/core/shopping/ShoppingTypes";

/**
 * Rolls a planned week up into a shopping list.
 *
 * Each meal's ingredients are scaled from the recipe's own servings to the
 * number of people eating that meal, then summed per `item + unit` so "300 g
 * pasta" twice becomes one 600 g line. Slots without a recipe are skipped.
 */
export function buildShoppingList(plan: SavedPlan | null, recipes: Recipe[]): ShoppingLine[] {
  if (!plan) return [];

  const lines = new Map<string, ShoppingLine>();

  plan.draft.slots.forEach((slot) => {
    const recipe = recipes.find((candidate) => candidate.id === slot.recipeId);
    if (!recipe) return;

    const scale = slot.people / (recipe.servings || 1);
    recipe.ingredients.forEach((ingredient) => {
      const key = `${ingredient.item}|${ingredient.unit}`;
      const line = lines.get(key) ?? {
        key,
        item: ingredient.item,
        unit: ingredient.unit,
        quantity: 0,
        hasUnmeasured: false,
      };

      if (ingredient.quantity === null) line.hasUnmeasured = true;
      else line.quantity += ingredient.quantity * scale;

      lines.set(key, line);
    });
  });

  return [...lines.values()].sort((a, b) => a.key.localeCompare(b.key));
}

/**
 * The amount column for a line: "600 g", "2", or just the unit when nothing was
 * measured. A trailing "+" flags a line that also appears without an amount.
 */
export function formatShoppingAmount(line: ShoppingLine): string {
  if (!line.quantity) return line.unit;
  return `${formatAmount(line.quantity, line.unit)}${line.hasUnmeasured ? " +" : ""}`;
}
