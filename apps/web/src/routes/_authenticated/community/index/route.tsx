import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { useCommunityRoute } from "./-UseCommunityRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { LoadWeekDialogController } from "~/components/feedback/load-week-dialog/LoadWeekDialogController";
import { RecommendDialogController } from "~/components/feedback/recommend-dialog/RecommendDialogController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { CommunityView } from "~/views/community/CommunityView";

export const Route = createFileRoute("/_authenticated/community/")({
  component: CommunityPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function CommunityPageRoute(): ReactElement {
  const intl = useIntl();
  useDocumentTitle(
    intl.formatMessage({
      description: "CommunityPageRoute: title - browser tab",
      defaultMessage: "Community",
      id: "FXgFP3",
    })
  );
  const props = useCommunityRoute();

  return (
    <>
      <CommunityView {...props} />
      <RecommendDialogController />
      <LoadWeekDialogController />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
