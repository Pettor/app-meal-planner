import { atomWithStorage } from "jotai/utils";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";

/**
 * The ids of the recipes in the cook's own pool.
 *
 * The pool starts as whatever the sample data marks as theirs, and grows when
 * they save someone else's recipe — either one at a time from the library, or
 * a whole week's worth when they load a shared week.
 *
 * Persisted locally until `@package/api` grows a `Recipes` endpoint.
 */
export const savedRecipeIdsAtom = atomWithStorage<string[]>(
  "recipes.saved",
  SampleRecipes.filter((recipe) => recipe.isSaved).map((recipe) => recipe.id)
);
