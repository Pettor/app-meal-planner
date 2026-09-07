import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { useRecipeDetailRoute } from "./-UseRecipeDetailRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { RecipeDetailView } from "~/views/recipe-detail/RecipeDetailView";

export const Route = createFileRoute("/_authenticated/recipes/$recipeId")({
  component: RecipeDetailPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function RecipeDetailPageRoute(): ReactElement {
  const intl = useIntl();
  const { recipeId } = Route.useParams();
  const props = useRecipeDetailRoute(recipeId);

  useDocumentTitle(
    props?.recipe.title ??
      intl.formatMessage({
        description: "RecipeDetailPageRoute: title - browser tab",
        defaultMessage: "Recipe",
        id: "VI9oEr",
      })
  );

  if (!props) throw notFound();

  return (
    <>
      <RecipeDetailView {...props} />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
