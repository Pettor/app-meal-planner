import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { useSignUpRoute } from "./-UseSignUpRoute";
import { RouteError } from "~/core/routes/logic/RouteError";
import { SignUpView } from "~/views/sign-up/SignUpView";

export const Route = createFileRoute("/_public/sign-up")({
  component: SignUpPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function SignUpPageRoute(): ReactElement {
  const intl = useIntl();
  useDocumentTitle(
    intl.formatMessage({
      description: "SignUpPageRoute: title - browser tab",
      defaultMessage: "Sign Up",
      id: "NWkWOT",
    })
  );
  const signUpProps = useSignUpRoute();

  return <SignUpView {...signUpProps} />;
}
