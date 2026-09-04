import { useNavigate } from "@tanstack/react-router";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import type { RecipeDetailViewProps } from "~/views/recipe-detail/RecipeDetailView";

/**
 * Wires a single recipe to navigation.
 *
 * The recipe is looked up in placeholder data until there is a recipes service.
 */
export function UseRecipeDetailRoute(recipeId: string): RecipeDetailViewProps | null {
  const navigate = useNavigate();

  const recipe: Recipe | undefined = SampleRecipes.find((candidate) => candidate.id === recipeId);
  if (!recipe) return null;

  return {
    recipe,
    onBack: () => void navigate({ to: "/" }),
    onEdit: (id) => void navigate({ to: "/recipes/edit/$recipeId", params: { recipeId: id } }),
    onRecommend: (id) => console.info("Recommend recipe", id),
    onSave: (id) => console.info("Save recipe", id),
    onRemove: (id) => console.info("Remove recipe", id),
    onPrint: () => window.print(),
    onOpenAuthor: (authorId) => console.info("Open author", authorId),
  };
}
