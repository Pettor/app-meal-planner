import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { useRecipeLibraryRoute } from "./-UseRecipeLibraryRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { RecipeEditView } from "~/views/recipe-edit/RecipeEditView";
import { RecipeLibraryView } from "~/views/recipe-library/RecipeLibraryView";

export const Route = createFileRoute("/_authenticated/")({
  component: RecipeLibraryPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function RecipeLibraryPageRoute(): ReactElement {
  const intl = useIntl();
  useDocumentTitle(
    intl.formatMessage({
      description: "RecipeLibraryPageRoute: title - browser tab",
      defaultMessage: "Recipes",
      id: "piJxzj",
    })
  );
  const { library, addRecipeModal } = useRecipeLibraryRoute();

  return (
    <>
      <RecipeLibraryView {...library} />
      {addRecipeModal.isOpen && <RecipeEditView {...addRecipeModal} />}
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
