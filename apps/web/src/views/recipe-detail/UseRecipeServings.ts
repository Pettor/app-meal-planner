import { useMemo, useState } from "react";
import type { RecipeIngredient } from "~/core/recipes/RecipeTypes";
import { scaleIngredients } from "~/core/recipes/RecipeUtils";

export interface UseRecipeServingsResult {
  servings: number;
  increase: () => void;
  decrease: () => void;
  /** The recipe's ingredients scaled from its written servings to the chosen ones. */
  scaled: RecipeIngredient[];
}

/** The servings stepper on a recipe, and the ingredient amounts that follow from it. */
export function useRecipeServings(ingredients: RecipeIngredient[], writtenFor: number): UseRecipeServingsResult {
  const [servings, setServings] = useState(writtenFor);

  const scaled = useMemo(
    () => scaleIngredients(ingredients, writtenFor, servings),
    [ingredients, writtenFor, servings]
  );

  return {
    servings,
    increase: () => setServings((current) => current + 1),
    decrease: () => setServings((current) => Math.max(1, current - 1)),
    scaled,
  };
}
