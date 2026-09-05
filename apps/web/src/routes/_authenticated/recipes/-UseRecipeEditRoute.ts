import { useNavigate } from "@tanstack/react-router";
import { SampleScannedRecipe, SampleTagCatalogue, SuggestedTags } from "~/core/recipes/RecipeSampleData";
import { UseRecipes } from "~/core/recipes/UseRecipes";
import type { RecipeDraft } from "~/views/recipe-edit/RecipeDraft";
import { emptyRecipeDraft, recipeToDraft } from "~/views/recipe-edit/RecipeDraft";
import type { RecipeEditViewProps } from "~/views/recipe-edit/RecipeEditView";

/**
 * Wires the "edit recipe" route's form. `isOpen` is left to the caller — the
 * edit route is always open, the library's "add recipe" modal toggles its own.
 *
 * Saving and deleting are logged until there is a recipes service.
 */
export function UseRecipeEditRoute(recipeId: string): Omit<RecipeEditViewProps, "isOpen"> {
  const navigate = useNavigate();

  const { recipes } = UseRecipes();
  const existing = recipes.find((recipe) => recipe.id === recipeId);
  const initialDraft: RecipeDraft = existing ? recipeToDraft(existing) : emptyRecipeDraft();

  function goBack(): void {
    void navigate({ to: "/recipes/$recipeId", params: { recipeId } });
  }

  return {
    initialDraft,
    isExistingRecipe: Boolean(existing),
    suggestedTags: SuggestedTags,
    tagCatalogue: SampleTagCatalogue,
    sampleScanResult: SampleScannedRecipe,
    onSave: (draft) => {
      console.info("Save recipe", draft);
      goBack();
    },
    onCancel: goBack,
    onDelete: () => {
      console.info("Delete recipe", recipeId);
      void navigate({ to: "/" });
    },
  };
}
