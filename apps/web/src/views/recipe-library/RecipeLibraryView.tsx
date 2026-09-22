import { useState } from "react";
import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { ConfirmDialog } from "~/components/feedback/confirm-dialog/ConfirmDialog";
import { TagBrowserDialog } from "~/components/feedback/tag-browser-dialog/TagBrowserDialog";
import type { Recipe, RecipeTagCategory } from "~/core/recipes/RecipeTypes";
import { RecipeLibraryFindPanel } from "~/views/recipe-library/RecipeLibraryFindPanel";
import { RecipeLibraryGrid } from "~/views/recipe-library/RecipeLibraryGrid";
import { RecipeLibraryPageHeader } from "~/views/recipe-library/RecipeLibraryPageHeader";
import { useRecipeLibraryFilter } from "~/views/recipe-library/UseRecipeLibraryFilter";
import { useRecipeRemoval } from "~/views/recipe-library/UseRecipeRemoval";

export interface RecipeLibraryViewProps {
  recipes: Recipe[];
  /** The full community catalogue, so the pool can be filtered by any tag. */
  tagCatalogue: RecipeTagCategory[];
  /** The cook's default tags — the quick filters the panel offers. */
  pinnedTags: string[];
  onTogglePinnedTag: (tag: string) => void;
  onOpenRecipe: (recipeId: string) => void;
  onAddRecipe: () => void;
  onRemoveRecipe: (recipeId: string) => void;
  onBrowseCommunity: () => void;
}

/** The recipe pool — the cook's own recipes, which are what the planner draws from. */
export function RecipeLibraryView({
  recipes,
  tagCatalogue,
  pinnedTags,
  onTogglePinnedTag,
  onOpenRecipe,
  onAddRecipe,
  onRemoveRecipe,
  onBrowseCommunity,
}: RecipeLibraryViewProps): ReactElement {
  const intl = useIntl();
  const filter = useRecipeLibraryFilter(recipes, pinnedTags);
  const { query, setQuery, selectedTags, toggleTag, quickTags, filtered, pool } = filter;
  const { pendingRecipe, askToRemove, cancelRemoval, confirmRemoval } = useRecipeRemoval(recipes, onRemoveRecipe);
  const [isDefaultTagBrowserOpen, setIsDefaultTagBrowserOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-6 py-9">
      <RecipeLibraryPageHeader onAddRecipe={onAddRecipe} />

      <RecipeLibraryFindPanel
        query={query}
        onQueryChange={setQuery}
        shownCount={filtered.length}
        totalCount={pool.length}
        onBrowseCommunity={onBrowseCommunity}
        quickTags={quickTags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        onOpenTagBrowser={filter.openTagBrowser}
        onEditDefaultTags={() => setIsDefaultTagBrowserOpen(true)}
        hasTagFilter={filter.hasTagFilter}
        onClearTags={filter.clearTags}
      />

      <RecipeLibraryGrid recipes={filtered} onOpenRecipe={onOpenRecipe} onRemoveRecipe={askToRemove} />

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

      <TagBrowserDialog
        isOpen={isDefaultTagBrowserOpen}
        description={intl.formatMessage({
          description: "RecipeLibraryView: body - default tag browser description",
          defaultMessage: "Pick the tags you filter by most. They stay on the pool as quick filters.",
          id: "rSPz2r",
        })}
        catalogue={tagCatalogue}
        selectedTags={pinnedTags}
        onToggleTag={onTogglePinnedTag}
        onClose={() => setIsDefaultTagBrowserOpen(false)}
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
