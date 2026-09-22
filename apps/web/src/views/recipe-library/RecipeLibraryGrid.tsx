import type { ReactElement } from "react";
import { Card } from "@heroui/react";
import { useIntl } from "react-intl";
import { RecipeCard } from "~/components/display/recipe-card/RecipeCard";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface RecipeLibraryGridProps {
  recipes: Recipe[];
  onOpenRecipe: (recipeId: string) => void;
  onRemoveRecipe: (recipeId: string) => void;
}

export function RecipeLibraryGrid({ recipes, onOpenRecipe, onRemoveRecipe }: RecipeLibraryGridProps): ReactElement {
  const intl = useIntl();

  if (recipes.length === 0) {
    return (
      <Card variant="secondary" className="mt-6 p-11 text-center">
        <p className="text-default-500">
          {intl.formatMessage({
            description: "RecipeLibraryGrid: body - no recipes match",
            defaultMessage: "No recipes match that search.",
            id: "zEtRE9",
          })}
        </p>
      </Card>
    );
  }

  return (
    <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(15.75rem,1fr))] gap-4.5">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onOpen={onOpenRecipe} onRemove={onRemoveRecipe} />
      ))}
    </div>
  );
}
