import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { UseShoppingRoute } from "./-UseShoppingRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { ShoppingView } from "~/views/shopping/ShoppingView";

export const Route = createFileRoute("/_authenticated/shopping")({
  component: ShoppingPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function ShoppingPageRoute(): ReactElement {
  useDocumentTitle("Shopping list");
  const props = UseShoppingRoute();

  return (
    <>
      <ShoppingView {...props} />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
