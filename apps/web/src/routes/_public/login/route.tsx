import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { useLoginRoute } from "./-UseLoginRoute";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { LoginView } from "~/views/login/LoginView";

export const Route = createFileRoute("/_public/login")({
  component: LoginPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function LoginPageRoute(): ReactElement {
  const intl = useIntl();
  useDocumentTitle(
    intl.formatMessage({
      description: "LoginPageRoute: title - browser tab",
      defaultMessage: "Login",
      id: "5M8Wpq",
    })
  );
  const loginProps = useLoginRoute();

  return (
    <>
      <LoginView {...loginProps} />
      <SettingsModalController />
    </>
  );
}
