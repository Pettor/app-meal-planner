import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { UseWeekRoute } from "./-UseWeekRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { WeekView } from "~/views/week/WeekView";

export const Route = createFileRoute("/_authenticated/week")({
  component: WeekPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function WeekPageRoute(): ReactElement {
  useDocumentTitle("This week");
  const props = UseWeekRoute();

  return (
    <>
      <WeekView {...props} />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
