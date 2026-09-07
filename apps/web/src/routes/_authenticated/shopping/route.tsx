import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { useShoppingRoute } from "./-UseShoppingRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { ShoppingView } from "~/views/shopping/ShoppingView";

export const Route = createFileRoute("/_authenticated/shopping")({
  component: ShoppingPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function ShoppingPageRoute(): ReactElement {
  const intl = useIntl();
  useDocumentTitle(
    intl.formatMessage({
      description: "ShoppingPageRoute: title - browser tab",
      defaultMessage: "Shopping list",
      id: "vW2JQR",
    })
  );
  const props = useShoppingRoute();

  return (
    <>
      <ShoppingView {...props} />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
