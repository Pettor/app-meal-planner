import { useMemo } from "react";
import { useAtom } from "jotai";
import { savedRecipeIdsAtom } from "~/core/recipes/RecipeAtoms";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface UseRecipesResult {
  /** Every recipe the app knows about, with `isSaved` reflecting the cook's pool. */
  recipes: Recipe[];
  /** Just the cook's own — what the planner and the shopping list draw from. */
  savedRecipes: Recipe[];
  isSaved: (recipeId: string) => boolean;
  saveRecipe: (recipeId: string) => void;
  /** Saves several at once, e.g. everything a shared week needs. */
  saveRecipes: (recipeIds: string[]) => void;
  removeRecipe: (recipeId: string) => void;
}

/**
 * The recipe pool, and which of it the cook owns.
 *
 * `SampleRecipes` stands in for a recipes service, but which recipes are the
 * cook's own is real state — saving someone else's recipe has to stick — so
 * that half lives in an atom and is layered over the sample data here.
 */
export function UseRecipes(): UseRecipesResult {
  const [savedIds, setSavedIds] = useAtom(savedRecipeIdsAtom);

  const recipes = useMemo(
    () => SampleRecipes.map((recipe) => ({ ...recipe, isSaved: savedIds.includes(recipe.id) })),
    [savedIds]
  );

  const savedRecipes = useMemo(() => recipes.filter((recipe) => recipe.isSaved), [recipes]);

  function saveRecipes(recipeIds: string[]): void {
    setSavedIds((current) => [...current, ...recipeIds.filter((id) => !current.includes(id))]);
  }

  return {
    recipes,
    savedRecipes,
    isSaved: (recipeId) => savedIds.includes(recipeId),
    saveRecipe: (recipeId) => saveRecipes([recipeId]),
    saveRecipes,
    removeRecipe: (recipeId) => setSavedIds((current) => current.filter((id) => id !== recipeId)),
  };
}
