import { useState } from "react";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface UseRecipeRemovalResult {
  /** The recipe awaiting confirmation, or `null` when the dialog is closed. */
  pendingRecipe: Recipe | null;
  askToRemove: (recipeId: string) => void;
  cancelRemoval: () => void;
  confirmRemoval: () => void;
}

/** Holds the "are you sure?" step between clicking remove and actually removing. */
export function UseRecipeRemoval(
  recipes: Recipe[],
  onRemoveRecipe: (recipeId: string) => void
): UseRecipeRemovalResult {
  const [pendingId, setPendingId] = useState<string | null>(null);

  const pendingRecipe = pendingId === null ? null : (recipes.find((recipe) => recipe.id === pendingId) ?? null);

  function confirmRemoval(): void {
    if (pendingId !== null) onRemoveRecipe(pendingId);
    setPendingId(null);
  }

  return {
    pendingRecipe,
    askToRemove: setPendingId,
    cancelRemoval: () => setPendingId(null),
    confirmRemoval,
  };
}
