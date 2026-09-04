import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { ConfirmDialog } from "~/components/feedback/confirm-dialog/ConfirmDialog";
import type { Recipe, RecipeScope } from "~/core/recipes/RecipeTypes";
import type { RecipeEditViewProps } from "~/views/recipe-edit/RecipeEditView";
import { RecipeEditView } from "~/views/recipe-edit/RecipeEditView";
import { RecipeLibraryFilterBar } from "~/views/recipe-library/RecipeLibraryFilterBar";
import { RecipeLibraryGrid } from "~/views/recipe-library/RecipeLibraryGrid";
import { RecipeLibraryPageHeader } from "~/views/recipe-library/RecipeLibraryPageHeader";
import { UseRecipeLibraryFilter } from "~/views/recipe-library/UseRecipeLibraryFilter";
import { UseRecipeRemoval } from "~/views/recipe-library/UseRecipeRemoval";

export interface RecipeLibraryViewProps {
  recipes: Recipe[];
  initialScope?: RecipeScope;
  onOpenRecipe: (recipeId: string) => void;
  onAddRecipe: () => void;
  onSaveRecipe: (recipeId: string) => void;
  onRemoveRecipe: (recipeId: string) => void;
  /** The "add recipe" modal — open state and form props. */
  addRecipeModal: RecipeEditViewProps;
}

/** The recipe pool — everything the planner can draw from. */
export function RecipeLibraryView({
  recipes,
  initialScope = "mine",
  onOpenRecipe,
  onAddRecipe,
  onSaveRecipe,
  onRemoveRecipe,
  addRecipeModal,
}: RecipeLibraryViewProps): ReactElement {
  const intl = useIntl();
  const { scope, setScope, query, setQuery, selectedTags, toggleTag, availableTags, filtered } = UseRecipeLibraryFilter(
    recipes,
    initialScope
  );
  const { pendingRecipe, askToRemove, cancelRemoval, confirmRemoval } = UseRecipeRemoval(recipes, onRemoveRecipe);

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-6 py-9">
      <RecipeLibraryPageHeader scope={scope} onScopeChange={setScope} onAddRecipe={onAddRecipe} />

      <RecipeLibraryFilterBar
        query={query}
        onQueryChange={setQuery}
        availableTags={availableTags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
      />

      <RecipeLibraryGrid
        recipes={filtered}
        scope={scope}
        onOpenRecipe={onOpenRecipe}
        onSaveRecipe={onSaveRecipe}
        onRemoveRecipe={askToRemove}
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

      {addRecipeModal.isOpen && <RecipeEditView {...addRecipeModal} />}
    </div>
  );
}
