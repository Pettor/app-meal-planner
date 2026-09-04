import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SampleRecipes, SampleScannedRecipe, SampleTagCatalogue, SuggestedTags } from "~/core/recipes/RecipeSampleData";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { emptyRecipeDraft } from "~/views/recipe-edit/RecipeDraft";
import type { RecipeLibraryViewProps } from "~/views/recipe-library/RecipeLibraryView";

/**
 * Wires the recipe library to navigation.
 *
 * `recipes` comes from placeholder data until there is a recipes service —
 * swap `SampleRecipes` for a route loader and the view stays unchanged.
 *
 * "Add recipe" opens as a modal over the library (matching the design)
 * rather than navigating to a separate page, so its open state lives here.
 */
export function UseRecipeLibraryRoute(): RecipeLibraryViewProps {
  const navigate = useNavigate();
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);

  const recipes: Recipe[] = SampleRecipes;

  return {
    recipes,
    onOpenRecipe: (recipeId) => void navigate({ to: "/recipes/$recipeId", params: { recipeId } }),
    onAddRecipe: () => setIsAddRecipeOpen(true),
    onSaveRecipe: (recipeId) => console.info("Save recipe", recipeId),
    onRemoveRecipe: (recipeId) => console.info("Remove recipe", recipeId),
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
