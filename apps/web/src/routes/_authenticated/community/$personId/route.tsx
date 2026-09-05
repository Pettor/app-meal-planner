import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useProfileRoute } from "./-UseProfileRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { LoadWeekDialogController } from "~/components/feedback/load-week-dialog/LoadWeekDialogController";
import { RecommendDialogController } from "~/components/feedback/recommend-dialog/RecommendDialogController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { ProfileView } from "~/views/community/ProfileView";

export const Route = createFileRoute("/_authenticated/community/$personId")({
  component: ProfilePageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function ProfilePageRoute(): ReactElement {
  const { personId } = Route.useParams();
  const props = useProfileRoute(personId);

  useDocumentTitle(props?.person.name ?? "Profile");

  if (!props) throw notFound();

  return (
    <>
      <ProfileView {...props} />
      <RecommendDialogController />
      <LoadWeekDialogController />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
