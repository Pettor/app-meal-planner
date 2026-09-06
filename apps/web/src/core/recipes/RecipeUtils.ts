import { SampleTagCatalogue } from "~/core/recipes/RecipeSampleData";
import type { Recipe, RecipeIngredient, RecipeTagFamily } from "~/core/recipes/RecipeTypes";

/**
 * Tags are drawn identically everywhere; only a leading dot carries meaning, and
 * it encodes the tag's *family* rather than the tag itself. The family comes from
 * the group the tag sits under in the catalogue, so a tag added to "Diet" reads
 * as a diet tag without anyone maintaining a second list.
 */
const FAMILY_BY_GROUP: Record<string, RecipeTagFamily> = {
  Diet: "diet",
  "Main ingredient": "ing",
  Method: "method",
};

let familyByTag: Map<string, RecipeTagFamily> | null = null;

/** Effort and cost, mood, cuisine and the cook's own tags all read neutral. */
export function tagFamily(tag: string): RecipeTagFamily {
  if (!familyByTag) {
    familyByTag = new Map(
      SampleTagCatalogue.flatMap((category) =>
        category.tags.map((usage): [string, RecipeTagFamily] => [
          usage.name,
          FAMILY_BY_GROUP[category.group] ?? "other",
        ])
      )
    );
  }
  return familyByTag.get(tag) ?? "other";
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
