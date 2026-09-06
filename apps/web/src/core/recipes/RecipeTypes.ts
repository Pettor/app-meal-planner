/**
 * Domain types for the recipe pool.
 *
 * These stand in for the API layer until `@package/api` grows a `Recipes`
 * endpoint. The shapes mirror what the Meal Planner design reasons about, so
 * wiring them to a service later is a converter change, not a view change.
 */

/**
 * Which family a tag belongs to. Tags all look alike now — only the leading dot
 * differs — so the family is the one thing colour still encodes.
 */
export type RecipeTagFamily = "diet" | "ing" | "method" | "other";

/** Whose recipes the library is showing: the cook's own pool, or everyone else's. */
export type RecipeScope = "mine" | "everyone";

export interface RecipeAuthor {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string | null;
  /** Fixed per-person avatar colour (CSS colour value), used when there's no photo. */
  color: string;
}

export interface RecipeIngredient {
  /** `null` for ingredients written without an amount ("salt", "olive oil"). */
  quantity: number | null;
  /** May be empty for countable items ("2 onions"). */
  unit: string;
  item: string;
}

export interface Recipe {
  id: string;
  title: string;
  tags: string[];
  /** The number of people the ingredient amounts are written for. */
  servings: number;
  timeMinutes: number;
  photoUrl: string | null;
  /** How long ago it was published, in days. Orders the community feed. */
  daysAgo?: number;
  ingredients: RecipeIngredient[];
  steps: string[];
  author: RecipeAuthor;
  /** Whether the signed-in cook has this recipe in their own pool. */
  isSaved: boolean;
}

/** One group in the community tag catalogue, e.g. "Diet" or "Cuisine". */
export interface RecipeTagCategory {
  group: string;
  tags: RecipeTagUsage[];
}

export interface RecipeTagUsage {
  name: string;
  /** How many community recipes carry the tag. */
  count: number;
}

/** A recipe read out of a photo, before the cook accepts it. */
export interface ScannedRecipe {
  title: string;
  tags: string[];
  servings: number;
  timeMinutes: number;
  photoUrl: string | null;
  ingredients: RecipeIngredient[];
  steps: string[];
}
