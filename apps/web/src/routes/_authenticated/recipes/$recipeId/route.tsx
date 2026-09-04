import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { UseRecipeDetailRoute } from "./-UseRecipeDetailRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { RecipeDetailView } from "~/views/recipe-detail/RecipeDetailView";

export const Route = createFileRoute("/_authenticated/recipes/$recipeId")({
  component: RecipeDetailPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function RecipeDetailPageRoute(): ReactElement {
  const { recipeId } = Route.useParams();
  const props = UseRecipeDetailRoute(recipeId);

  useDocumentTitle(props?.recipe.title ?? "Recipe");

  if (!props) throw notFound();

  return (
    <>
      <RecipeDetailView {...props} />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
