import { useState, type ReactElement } from "react";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Checkbox,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxContent,
  Form,
  Label,
  Link,
  Spinner,
} from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { z } from "zod";
import { useFormValidation } from "../shared/FormValidation";
import { loginFormMessages } from "./LoginForm.messages";
import { InputField } from "~/components/input/input-field/InputField";

export interface FormLogin {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginFormProps {
  loading: boolean;
  onForgotPassword(): void;
  onSubmit: (data: FormLogin) => void;
}

export function LoginForm({ loading, onForgotPassword, onSubmit }: LoginFormProps): ReactElement {
  const intl = useIntl();
  const { emailSchema, passwordSchema } = useFormValidation();
  const [isVisible, setIsVisible] = useState(false);

  function toggleVisibility(): void {
    setIsVisible(!isVisible);
  }

  const schema = z.object({
    email: emailSchema,
    password: passwordSchema,
    remember: z.boolean(),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async (values) => {
      onSubmit(values.value);
    },
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col justify-center gap-4"
    >
      <form.Field
        name="email"
        children={(field) => {
          return (
            <InputField
              fullWidth
              autoFocus
              field={field}
              autoComplete="username"
              id={field.name}
              type="email"
              label={intl.formatMessage(loginFormMessages.emailLabel)}
              placeholder={intl.formatMessage(loginFormMessages.emailPlaceholder)}
              startContent={<EnvelopeIcon className="h-5 w-5" />}
              data-testid="login-form__email-input"
            />
          );
        }}
      />
      <form.Field
        name="password"
        children={(field) => (
          <InputField
            fullWidth
            field={field}
            autoComplete="current-password"
            type={isVisible ? "text" : "password"}
            label={intl.formatMessage(loginFormMessages.passwordLabel)}
            placeholder={intl.formatMessage(loginFormMessages.passwordPlaceholder)}
            startContent={<LockClosedIcon className="h-5 w-5" />}
            endContent={
              <button
                type="button"
                onClick={toggleVisibility}
                aria-label={intl.formatMessage(loginFormMessages.togglePasswordVisibility)}
              >
                {isVisible ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
              </button>
            }
            data-testid="login-form__password-input"
          />
        )}
      />
      <div className="flex w-full items-center justify-between gap-3">
        <form.Field
          name="remember"
          children={(field) => (
            <Checkbox id="remember" isSelected={field.state.value} onChange={(value) => field.handleChange(value)}>
              <CheckboxContent className="gap-2.5">
                <CheckboxControl>
                  <CheckboxIndicator />
                </CheckboxControl>
                <Label htmlFor="remember" className="text-muted text-sm whitespace-nowrap">
                  {intl.formatMessage(loginFormMessages.rememberMe)}
                </Label>
              </CheckboxContent>
            </Checkbox>
          )}
        />
        <Link className="cursor-pointer text-sm" onPress={onForgotPassword} data-testid="login-form__forgot-link">
          {intl.formatMessage(loginFormMessages.forgotPassword)}
        </Link>
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit]}
        children={([canSubmit]) => (
          <Button
            fullWidth
            isDisabled={!canSubmit || loading}
            variant="primary"
            size="lg"
            type="submit"
            onPress={() => form.handleSubmit()}
            data-testid="login-form__submit-button"
          >
            {loading ? <Spinner size="sm" /> : intl.formatMessage(loginFormMessages.submit)}
          </Button>
        )}
      />
    </Form>
  );
}
