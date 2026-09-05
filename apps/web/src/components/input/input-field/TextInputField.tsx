import type { ChangeEvent, ReactElement } from "react";
import type { InputProps } from "@heroui/react";
import { Description, FieldError, Input, Label, TextField } from "@heroui/react";

export interface TextInputFieldProps extends Omit<InputProps, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  description?: string;
  errorMessage?: string;
  /** Falls back to `label` — supply one when the field is unlabelled. */
  ariaLabel?: string;
  className?: string;
}

/**
 * A controlled single-line field with a label and optional hint.
 *
 * Use this for plain component state. `InputField` is the TanStack Form flavour
 * and expects a `field` API instead.
 */
export function TextInputField({
  value,
  onChange,
  label,
  description,
  errorMessage,
  ariaLabel,
  className,
  ...rest
}: TextInputFieldProps): ReactElement {
  return (
    <TextField
      className={className}
      aria-label={label ? undefined : ariaLabel}
      isInvalid={Boolean(errorMessage)}
      validationBehavior="aria"
    >
      {label && <Label>{label}</Label>}
      <Input
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        {...rest}
      />
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </TextField>
  );
}
