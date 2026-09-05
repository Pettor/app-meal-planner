import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useRecipeEditRoute } from "./-UseRecipeEditRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { RecipeEditView } from "~/views/recipe-edit/RecipeEditView";

export const Route = createFileRoute("/_authenticated/recipes/edit/$recipeId")({
  component: EditRecipePageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function EditRecipePageRoute(): ReactElement {
  const { recipeId } = Route.useParams();
  const props = useRecipeEditRoute(recipeId);

  useDocumentTitle("Edit recipe");

  // Remounting on the id keeps the draft in step when moving between recipes.
  return (
    <>
      <RecipeEditView key={recipeId} isOpen {...props} />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
