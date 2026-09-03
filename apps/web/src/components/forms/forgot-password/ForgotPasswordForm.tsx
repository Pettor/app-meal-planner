import type { ReactElement } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, Form, Spinner } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { z } from "zod";
import { useFormValidation } from "../shared/FormValidation";
import { forgotPasswordFormMessages } from "./ForgotPasswordForm.messages";
import { InputField } from "~/components/input/input-field/InputField";

export interface FormForgotPassword {
  email: string;
}

export interface ForgotPasswordFormProps {
  loading: boolean;
  onSubmit: (data: FormForgotPassword) => void;
}

export function ForgotPasswordForm({ loading, onSubmit }: ForgotPasswordFormProps): ReactElement {
  const intl = useIntl();
  const { emailSchema } = useFormValidation();

  const schema = z.object({
    email: emailSchema,
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex w-full flex-col justify-center gap-4"
    >
      <form.Field
        name="email"
        children={(field) => (
          <InputField
            autoFocus
            field={field}
            type="email"
            fullWidth
            autoComplete="email"
            label={intl.formatMessage(forgotPasswordFormMessages.emailLabel)}
            placeholder={intl.formatMessage(forgotPasswordFormMessages.emailPlaceholder)}
            startContent={<EnvelopeIcon className="h-5 w-5" />}
            data-testid="forgot-password-form__email-input"
          />
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit]}
        children={([canSubmit]) => (
          <Button
            fullWidth
            isDisabled={!canSubmit || loading}
            variant="primary"
            type="submit"
            size="lg"
            onPress={() => form.handleSubmit()}
            aria-label={intl.formatMessage(forgotPasswordFormMessages.submitAriaLabel)}
            data-testid="forgot-password-form__submit-button"
          >
            {loading ? <Spinner size="sm" /> : intl.formatMessage(forgotPasswordFormMessages.submit)}
          </Button>
        )}
      />
    </Form>
  );
}
