import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { UseRecipeLibraryRoute } from "./-UseRecipeLibraryRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { RecipeLibraryView } from "~/views/recipe-library/RecipeLibraryView";

export const Route = createFileRoute("/_authenticated/")({
  component: RecipeLibraryPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function RecipeLibraryPageRoute(): ReactElement {
  useDocumentTitle("Recipes");
  const props = UseRecipeLibraryRoute();

  return (
    <>
      <RecipeLibraryView {...props} />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
