import { useState, type ReactElement } from "react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Checkbox,
  CheckboxContent,
  CheckboxControl,
  CheckboxIndicator,
  Form,
  Label,
  Spinner,
} from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { z } from "zod";
import { useFormValidation } from "../shared/FormValidation";
import { signUpFormMessages } from "./SignUpForm.messages";
import { PasswordStrength } from "~/components/display/password-strength/PasswordStrength";
import { InputField } from "~/components/input/input-field/InputField";

export interface FormSignUp {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormProps {
  loading: boolean;
  onSubmit: (data: FormSignUp) => void;
}

export function SignUpForm({ loading, onSubmit }: SignUpFormProps): ReactElement {
  const intl = useIntl();
  const { emailSchema, passwordSchema } = useFormValidation();
  const [isVisible, setIsVisible] = useState(false);

  function toggleVisibility(): void {
    setIsVisible(!isVisible);
  }

  const schema = z.object({
    userName: z.string().min(1, intl.formatMessage(signUpFormMessages.userNameRequired)),
    email: emailSchema,
    password: passwordSchema,
    acceptedTerms: z.boolean().refine((accepted) => accepted, {
      message: intl.formatMessage(signUpFormMessages.termsRequired),
    }),
  });

  const form = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      acceptedTerms: false,
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      // The API confirms the password server-side; a single field plus the
      // strength meter and visibility toggle covers it on the client.
      onSubmit({
        userName: value.userName,
        email: value.email,
        password: value.password,
        confirmPassword: value.password,
      });
    },
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex w-full flex-col gap-4"
    >
      <form.Field
        name="userName"
        children={(field) => (
          <InputField
            autoFocus
            fullWidth
            field={field}
            type="text"
            autoComplete="name"
            startContent={<UserIcon className="h-5 w-5" />}
            label={intl.formatMessage(signUpFormMessages.userNameLabel)}
            placeholder={intl.formatMessage(signUpFormMessages.userNamePlaceholder)}
            data-testid="sign-up-form__username-input"
          />
        )}
      />
      <form.Field
        name="email"
        children={(field) => (
          <InputField
            fullWidth
            field={field}
            type="email"
            autoComplete="email"
            startContent={<EnvelopeIcon className="h-5 w-5" />}
            label={intl.formatMessage(signUpFormMessages.emailLabel)}
            placeholder={intl.formatMessage(signUpFormMessages.emailPlaceholder)}
            data-testid="sign-up-form__email-input"
          />
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <div className="flex flex-col gap-2">
            <InputField
              fullWidth
              field={field}
              type={isVisible ? "text" : "password"}
              autoComplete="new-password"
              startContent={<LockClosedIcon className="h-5 w-5" />}
              endContent={
                <button
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={intl.formatMessage(signUpFormMessages.togglePasswordVisibility)}
                >
                  {isVisible ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                </button>
              }
              label={intl.formatMessage(signUpFormMessages.passwordLabel)}
              placeholder={intl.formatMessage(signUpFormMessages.passwordPlaceholder)}
              data-testid="sign-up-form__password-input"
            />
            <PasswordStrength password={field.state.value} />
          </div>
        )}
      />
      <form.Field
        name="acceptedTerms"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <div className="flex flex-col gap-1">
              <Checkbox
                id="acceptedTerms"
                isInvalid={isInvalid}
                isSelected={field.state.value}
                onChange={(value) => field.handleChange(value)}
                data-testid="sign-up-form__terms-checkbox"
              >
                <CheckboxContent className="items-start gap-2.5">
                  <CheckboxControl className="mt-0.5">
                    <CheckboxIndicator />
                  </CheckboxControl>
                  <Label htmlFor="acceptedTerms" className="text-muted text-sm">
                    {intl.formatMessage(signUpFormMessages.terms)}
                  </Label>
                </CheckboxContent>
              </Checkbox>
              {isInvalid && (
                <span className="text-danger text-xs" role="alert" data-testid="sign-up-form__terms-error">
                  {intl.formatMessage(signUpFormMessages.termsRequired)}
                </span>
              )}
            </div>
          );
        }}
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
            data-testid="sign-up-form__submit-button"
          >
            {loading ? <Spinner size="sm" /> : intl.formatMessage(signUpFormMessages.submit)}
          </Button>
        )}
      />
    </Form>
  );
}
