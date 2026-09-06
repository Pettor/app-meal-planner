import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { ConfirmDialog } from "~/components/feedback/confirm-dialog/ConfirmDialog";
import { TagBrowserDialog } from "~/components/feedback/tag-browser-dialog/TagBrowserDialog";
import type { Recipe, RecipeScope, RecipeTagCategory } from "~/core/recipes/RecipeTypes";
import { RecipeLibraryFilterBar } from "~/views/recipe-library/RecipeLibraryFilterBar";
import { RecipeLibraryGrid } from "~/views/recipe-library/RecipeLibraryGrid";
import { RecipeLibraryPageHeader } from "~/views/recipe-library/RecipeLibraryPageHeader";
import { useRecipeLibraryFilter } from "~/views/recipe-library/UseRecipeLibraryFilter";
import { useRecipeRemoval } from "~/views/recipe-library/UseRecipeRemoval";

export interface RecipeLibraryViewProps {
  recipes: Recipe[];
  /** The full community catalogue, so the pool can be filtered by any tag. */
  tagCatalogue: RecipeTagCategory[];
  initialScope?: RecipeScope;
  onOpenRecipe: (recipeId: string) => void;
  onAddRecipe: () => void;
  onSaveRecipe: (recipeId: string) => void;
  onRemoveRecipe: (recipeId: string) => void;
}

/** The recipe pool — everything the planner can draw from. */
export function RecipeLibraryView({
  recipes,
  tagCatalogue,
  initialScope = "mine",
  onOpenRecipe,
  onAddRecipe,
  onSaveRecipe,
  onRemoveRecipe,
}: RecipeLibraryViewProps): ReactElement {
  const intl = useIntl();
  const filter = useRecipeLibraryFilter(recipes, initialScope);
  const { scope, setScope, query, setQuery, selectedTags, toggleTag, availableTags, filtered } = filter;
  const { pendingRecipe, askToRemove, cancelRemoval, confirmRemoval } = useRecipeRemoval(recipes, onRemoveRecipe);

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-6 py-9">
      <RecipeLibraryPageHeader scope={scope} onScopeChange={setScope} onAddRecipe={onAddRecipe} />

      <RecipeLibraryFilterBar
        query={query}
        onQueryChange={setQuery}
        availableTags={availableTags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        onOpenTagBrowser={filter.openTagBrowser}
        hasTagFilter={filter.hasTagFilter}
        onClearTags={filter.clearTags}
      />

      <RecipeLibraryGrid
        recipes={filtered}
        scope={scope}
        onOpenRecipe={onOpenRecipe}
        onSaveRecipe={onSaveRecipe}
        onRemoveRecipe={askToRemove}
      />

      <TagBrowserDialog
        isOpen={filter.isTagBrowserOpen}
        description={intl.formatMessage({
          description: "RecipeLibraryView: body - filter tag browser description",
          defaultMessage: "Pick the tags to filter the pool by.",
          id: "v8xfAl",
        })}
        catalogue={tagCatalogue}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        onClose={filter.closeTagBrowser}
      />

      <ConfirmDialog
        isOpen={pendingRecipe !== null}
        title={intl.formatMessage({
          description: "RecipeLibraryView: heading - delete confirmation",
          defaultMessage: "Delete this recipe?",
          id: "cutHCN",
        })}
        subject={pendingRecipe?.title}
        body={intl.formatMessage({
          description: "RecipeLibraryView: body - delete confirmation",
          defaultMessage:
            "You wrote this one, so removing it deletes it for good. It will also be cleared from any planned day that used it.",
          id: "hladjf",
        })}
        confirmLabel={intl.formatMessage({
          description: "RecipeLibraryView: button - confirm delete",
          defaultMessage: "Delete it",
          id: "5Ahx+5",
        })}
        onConfirm={confirmRemoval}
        onCancel={cancelRemoval}
      />
    </div>
  );
}
