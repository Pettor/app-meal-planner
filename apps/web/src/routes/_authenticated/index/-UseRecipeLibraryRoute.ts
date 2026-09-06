import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SampleScannedRecipe, SampleTagCatalogue, SuggestedTags } from "~/core/recipes/RecipeSampleData";
import { useRecipes } from "~/core/recipes/UseRecipes";
import { emptyRecipeDraft } from "~/views/recipe-edit/RecipeDraft";
import type { RecipeEditViewProps } from "~/views/recipe-edit/RecipeEditView";
import type { RecipeLibraryViewProps } from "~/views/recipe-library/RecipeLibraryView";

export interface UseRecipeLibraryRouteResult {
  library: RecipeLibraryViewProps;
  /** The "add recipe" modal the route mounts over the library. */
  addRecipeModal: RecipeEditViewProps;
}

/**
 * Wires the recipe library to navigation.
 *
 * The recipes themselves come from placeholder data until there is a recipes
 * service; which of them are the cook's own is real state, held by `useRecipes`.
 *
 * "Add recipe" opens as a modal over the library (matching the design)
 * rather than navigating to a separate page, so its open state lives here.
 */
export function useRecipeLibraryRoute(): UseRecipeLibraryRouteResult {
  const navigate = useNavigate();
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
  const { recipes, saveRecipe, removeRecipe } = useRecipes();

  return {
    library: {
      recipes,
      tagCatalogue: SampleTagCatalogue,
      onOpenRecipe: (recipeId) => void navigate({ to: "/recipes/$recipeId", params: { recipeId } }),
      onAddRecipe: () => setIsAddRecipeOpen(true),
      onSaveRecipe: saveRecipe,
      onRemoveRecipe: removeRecipe,
    },
    addRecipeModal: {
      isOpen: isAddRecipeOpen,
      initialDraft: emptyRecipeDraft(),
      isExistingRecipe: false,
      suggestedTags: SuggestedTags,
      tagCatalogue: SampleTagCatalogue,
      sampleScanResult: SampleScannedRecipe,
      onSave: (draft) => {
        console.info("Save recipe", draft);
        setIsAddRecipeOpen(false);
      },
      onCancel: () => setIsAddRecipeOpen(false),
      onDelete: () => setIsAddRecipeOpen(false),
    },
  };
}
