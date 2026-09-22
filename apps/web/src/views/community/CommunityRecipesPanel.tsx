import type { ReactElement } from "react";
import { Card } from "@heroui/react";
import { useIntl } from "react-intl";
import { RecipeCard } from "~/components/display/recipe-card/RecipeCard";
import { SearchField } from "~/components/input/input-field/SearchField";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { useCommunityRecipes } from "~/views/community/UseCommunityRecipes";

export interface CommunityRecipesPanelProps {
  /** The whole pool — the panel picks everyone else's out of it. */
  recipes: Recipe[];
  onOpenRecipe: (recipeId: string) => void;
  onSaveRecipe: (recipeId: string) => void;
}

/** "Recipes" — everything the community has shared, and the way into your own pool. */
export function CommunityRecipesPanel({
  recipes,
  onOpenRecipe,
  onSaveRecipe,
}: CommunityRecipesPanelProps): ReactElement {
  const intl = useIntl();
  const { query, setQuery, filtered } = useCommunityRecipes(recipes);

  return (
    <div className="mx-auto mt-5 w-full max-w-[72.5rem]">
      <div className="mb-3.5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-base font-semibold">
            {intl.formatMessage({
              description: "CommunityRecipesPanel: heading - community recipes",
              defaultMessage: "Every recipe shared in the community",
              id: "enU9AY",
            })}
          </div>
          <p className="text-default-500 mt-1 text-sm">
            {intl.formatMessage({
              description: "CommunityRecipesPanel: body - community recipes",
              defaultMessage: "Save the ones you want into your own pool. Only your own pool feeds the planner.",
              id: "l/VXob",
            })}
          </p>
        </div>
        <SearchField
          value={query}
          onChange={setQuery}
          className="w-full sm:w-62.5"
          placeholder={intl.formatMessage({
            description: "CommunityRecipesPanel: placeholder - search recipes",
            defaultMessage: "e.g. lasagna, soup, pancakes",
            id: "KqGSN8",
          })}
          ariaLabel={intl.formatMessage({
            description: "CommunityRecipesPanel: aria-label - search recipes",
            defaultMessage: "Search community recipes",
            id: "TszJF4",
          })}
        />
      </div>

      {filtered.length === 0 ? (
        <Card variant="secondary" className="mt-5 p-11 text-center">
          <p className="text-default-500">
            {intl.formatMessage({
              description: "CommunityRecipesPanel: body - no recipes match",
              defaultMessage: "No recipes match that search.",
              id: "9IUKsT",
            })}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(15.75rem,1fr))] gap-4">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} showSaveAction onOpen={onOpenRecipe} onSave={onSaveRecipe} />
          ))}
        </div>
      )}
    </div>
  );
}
