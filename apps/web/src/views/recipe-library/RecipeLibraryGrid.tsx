import type { ReactElement } from "react";
import { Card } from "@heroui/react";
import { useIntl } from "react-intl";
import { RecipeCard } from "~/components/display/recipe-card/RecipeCard";
import type { Recipe, RecipeScope } from "~/core/recipes/RecipeTypes";

export interface RecipeLibraryGridProps {
  recipes: Recipe[];
  scope: RecipeScope;
  onOpenRecipe: (recipeId: string) => void;
  onSaveRecipe: (recipeId: string) => void;
  onRemoveRecipe: (recipeId: string) => void;
}

export function RecipeLibraryGrid({
  recipes,
  scope,
  onOpenRecipe,
  onSaveRecipe,
  onRemoveRecipe,
}: RecipeLibraryGridProps): ReactElement {
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
    <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(15.75rem,1fr))] gap-4.5">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          showSaveAction={scope === "everyone"}
          onOpen={onOpenRecipe}
          onSave={onSaveRecipe}
          onRemove={onRemoveRecipe}
        />
      ))}
    </div>
  );
}
