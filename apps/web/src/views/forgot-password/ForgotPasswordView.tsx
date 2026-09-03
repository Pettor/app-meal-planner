import type { ReactElement } from "react";
import { Alert, Button } from "@heroui/react";
import { useIntl } from "react-intl";
import { AuthLayout } from "~/components/display/auth-layout/AuthLayout";
import { AuthSwitchPrompt } from "~/components/display/auth-layout/AuthSwitchPrompt";
import type { ForgotPasswordFormProps } from "~/components/forms/forgot-password/ForgotPasswordForm";
import { ForgotPasswordForm } from "~/components/forms/forgot-password/ForgotPasswordForm";

export interface ForgotPasswordViewProps {
  appName: string;
  resetForm: ForgotPasswordFormProps;
  /** Set once the reset link has been requested — swaps the form for a confirmation. */
  sentToEmail?: string;
  onBack: () => void;
}

export function ForgotPasswordView({ appName, resetForm, sentToEmail, onBack }: ForgotPasswordViewProps): ReactElement {
  const intl = useIntl();

  if (sentToEmail) {
    return (
      <AuthLayout
        appName={appName}
        title={intl.formatMessage({
          description: "ForgotPasswordView: heading - check your inbox",
          defaultMessage: "Check your inbox",
          id: "KcvnhR",
        })}
        subtitle={intl.formatMessage({
          description: "ForgotPasswordView: body - reset link sent",
          defaultMessage: "The link only works once, so open it on the device you want to sign in on.",
          id: "qOKlGC",
        })}
        onBack={onBack}
      >
        <div className="flex flex-col gap-4">
          <Alert status="success" data-testid="forgot-password-view__sent">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>
                {intl.formatMessage(
                  {
                    description: "ForgotPasswordView: body - reset link confirmation",
                    defaultMessage: "If {email} has an account, a reset link is on its way. It expires in an hour.",
                    id: "JeUYrQ",
                  },
                  { email: <strong key="email">{sentToEmail}</strong> }
                )}
              </Alert.Description>
            </Alert.Content>
          </Alert>
          <Button
            fullWidth
            variant="secondary"
            size="lg"
            onPress={onBack}
            data-testid="forgot-password-view__back-to-sign-in"
          >
            {intl.formatMessage({
              description: "ForgotPasswordView: button - back to sign in",
              defaultMessage: "Back to sign in",
              id: "Hfzkvj",
            })}
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      appName={appName}
      title={intl.formatMessage({
        description: "ForgotPasswordView: heading - reset your password",
        defaultMessage: "Reset your password",
        id: "JR/fbW",
      })}
      subtitle={intl.formatMessage({
        description: "ForgotPasswordView: body - reset instructions",
        defaultMessage: "Enter the email you signed up with and we'll send a link to set a new password.",
        id: "H8obuS",
      })}
      onBack={onBack}
      footer={
        <AuthSwitchPrompt
          text={intl.formatMessage({
            description: "ForgotPasswordView: body - sign-in prompt",
            defaultMessage: "Remembered it?",
            id: "Rk6Lk7",
          })}
          actionLabel={intl.formatMessage({
            description: "ForgotPasswordView: link - sign in",
            defaultMessage: "Sign in",
            id: "tGl7PF",
          })}
          onPress={onBack}
        />
      }
    >
      <ForgotPasswordForm {...resetForm} />
    </AuthLayout>
  );
}
