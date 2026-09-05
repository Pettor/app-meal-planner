import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { usePlanRoute } from "./-UsePlanRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { PlanView } from "~/views/plan/PlanView";

export const Route = createFileRoute("/_authenticated/plan")({
  component: PlanPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function PlanPageRoute(): ReactElement {
  useDocumentTitle("Plan");
  const props = usePlanRoute();

  return (
    <>
      <PlanView {...props} />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
