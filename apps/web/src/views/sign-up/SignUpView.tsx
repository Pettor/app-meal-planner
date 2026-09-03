import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { AuthLayout } from "~/components/display/auth-layout/AuthLayout";
import { AuthSwitchPrompt } from "~/components/display/auth-layout/AuthSwitchPrompt";
import type { SignUpFormProps } from "~/components/forms/sign-up/SignUpForm";
import { SignUpForm } from "~/components/forms/sign-up/SignUpForm";

export interface SignUpViewProps {
  appName: string;
  signUpForm: SignUpFormProps;
  onBack: () => void;
}

export function SignUpView({ appName, signUpForm, onBack }: SignUpViewProps): ReactElement {
  const intl = useIntl();

  return (
    <AuthLayout
      appName={appName}
      title={intl.formatMessage({
        description: "SignUpView: heading - start planning",
        defaultMessage: "Start planning",
        id: "/BF4g+",
      })}
      subtitle={intl.formatMessage({
        description: "SignUpView: body - sign-up description",
        defaultMessage: "Set up an account, add a few recipes, and the first week plans itself.",
        id: "UMr38c",
      })}
      onBack={onBack}
      footer={
        <AuthSwitchPrompt
          text={intl.formatMessage({
            description: "SignUpView: body - sign-in prompt",
            defaultMessage: "Already cooking with us?",
            id: "JpnP8y",
          })}
          actionLabel={intl.formatMessage({
            description: "SignUpView: link - sign in",
            defaultMessage: "Sign in",
            id: "g/QbwD",
          })}
          onPress={onBack}
        />
      }
    >
      <SignUpForm {...signUpForm} />
    </AuthLayout>
  );
}
