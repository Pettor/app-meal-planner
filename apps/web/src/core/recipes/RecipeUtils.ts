import type { Recipe, RecipeIngredient, RecipeTagTone } from "~/core/recipes/RecipeTypes";

/**
 * Tags carry meaning, so a handful of them get a fixed colour: diet tags read
 * green, meat reads red, and so on. Anything else falls back to neutral.
 */
const TAG_TONES: Record<string, RecipeTagTone> = {
  vegetarian: "success",
  vegan: "success",
  cheap: "success",
  meat: "danger",
  beef: "danger",
  fish: "accent",
  seafood: "accent",
  quick: "accent",
  bbq: "warning",
  expensive: "warning",
  spicy: "warning",
  comfort: "default",
};

export function tagTone(tag: string): RecipeTagTone {
  return TAG_TONES[tag] ?? "default";
}

/**
 * Renders a scaled ingredient amount. Quantities are rounded to two decimals so
 * that scaling a recipe written for 4 down to 3 reads "225 g", not "225.0000001 g".
 */
export function formatAmount(quantity: number | null, unit: string): string {
  if (quantity === null) return unit;
  const rounded = String(Math.round(quantity * 100) / 100);
  return unit ? `${rounded} ${unit}` : rounded;
}

/** Scales a recipe's ingredients from its written servings to the chosen ones. */
export function scaleIngredients(
  ingredients: RecipeIngredient[],
  writtenFor: number,
  scaleTo: number
): RecipeIngredient[] {
  const factor = scaleTo / (writtenFor || 1);
  return ingredients.map((ingredient) => ({
    ...ingredient,
    quantity: ingredient.quantity === null ? null : ingredient.quantity * factor,
  }));
}

/** Every distinct tag used across a set of recipes, alphabetically. */
export function collectTags(recipes: Recipe[]): string[] {
  const seen = new Set<string>();
  recipes.forEach((recipe) => recipe.tags.forEach((tag) => seen.add(tag)));
  return [...seen].sort((a, b) => a.localeCompare(b));
}

/** Initials for an author without an avatar image, e.g. "Petter Hancock" -> "PH". */
export function authorInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
