import type { ReactElement } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Alert, Button } from "@heroui/react";
import { useIntl } from "react-intl";
import { AuthLayout } from "~/components/display/auth-layout/AuthLayout";
import { AuthSwitchPrompt } from "~/components/display/auth-layout/AuthSwitchPrompt";
import type { LoginFormProps } from "~/components/forms/login/LoginForm";
import { LoginForm } from "~/components/forms/login/LoginForm";

const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

export interface LoginViewProps {
  appName: string;
  loginForm: LoginFormProps;
  error?: string;
  onSettings(): void;
  onSignUp(): void;
}

export function LoginView({ appName, loginForm, error, onSettings, onSignUp }: LoginViewProps): ReactElement {
  const intl = useIntl();

  return (
    <AuthLayout
      appName={appName}
      title={intl.formatMessage({
        description: "LoginView: heading - welcome back",
        defaultMessage: "Welcome back",
        id: "ciI966",
      })}
      subtitle={intl.formatMessage({
        description: "LoginView: body - sign in tagline",
        defaultMessage: "Sign in and pick up where the week left off.",
        id: "oJDoLK",
      })}
      headerAction={
        <Button
          isIconOnly
          variant="ghost"
          onPress={onSettings}
          aria-label={intl.formatMessage({
            description: "LoginView: aria-label - settings button",
            defaultMessage: "Settings",
            id: "WYAsZQ",
          })}
          data-testid="login-view__settings-button"
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </Button>
      }
      banner={
        <>
          {IS_DEMO_MODE && (
            <Alert status="warning">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Description>
                  {intl.formatMessage({
                    description: "LoginView: body - demo mode banner",
                    defaultMessage:
                      "Demo build. Any valid email and a password of at least 8 characters will get you in.",
                    id: "sscg0N",
                  })}
                </Alert.Description>
              </Alert.Content>
            </Alert>
          )}
          {error && (
            <Alert status="danger" data-testid="login-view__error">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Description>{error}</Alert.Description>
              </Alert.Content>
            </Alert>
          )}
        </>
      }
      footer={
        <AuthSwitchPrompt
          text={intl.formatMessage({
            description: "LoginView: body - sign-up prompt",
            defaultMessage: "New here?",
            id: "U3f1k3",
          })}
          actionLabel={intl.formatMessage({
            description: "LoginView: link - create an account",
            defaultMessage: "Create an account",
            id: "rFtjCS",
          })}
          onPress={onSignUp}
        />
      }
    >
      <LoginForm {...loginForm} />
    </AuthLayout>
  );
}
