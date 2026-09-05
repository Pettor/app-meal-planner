import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useInboxRoute } from "./-UseInboxRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { LoadWeekDialogController } from "~/components/feedback/load-week-dialog/LoadWeekDialogController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { InboxView } from "~/views/community/InboxView";

export const Route = createFileRoute("/_authenticated/community/inbox")({
  component: InboxPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function InboxPageRoute(): ReactElement {
  useDocumentTitle("Inbox");
  const props = useInboxRoute();

  return (
    <>
      <InboxView {...props} />
      <LoadWeekDialogController />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
