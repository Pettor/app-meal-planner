import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  weak: {
    description: "PasswordStrength: label - weak password",
    defaultMessage: "Weak",
    id: "mJwDf8",
  },
  fair: {
    description: "PasswordStrength: label - fair password",
    defaultMessage: "Fair",
    id: "FOXdqo",
  },
  good: {
    description: "PasswordStrength: label - good password",
    defaultMessage: "Good",
    id: "NxEir8",
  },
  strong: {
    description: "PasswordStrength: label - strong password",
    defaultMessage: "Strong",
    id: "AfOV1V",
  },
  meter: {
    description: "PasswordStrength: aria-label - strength meter",
    defaultMessage: "Password strength",
    id: "9Nktev",
  },
});

export type PasswordStrengthColor = "default" | "danger" | "warning" | "success";

export interface PasswordStrength {
  /** Raw score, 0–4. */
  score: number;
  /** Filled portion of the meter, 0–100. */
  percentage: number;
  color: PasswordStrengthColor;
  /** Empty while the field is untouched, so the meter reads as neutral. */
  label: string;
  meterLabel: string;
}

function scorePassword(password: string): number {
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  }
  if (password.length >= 12) {
    score += 1;
  }
  if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) {
    score += 1;
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  }

  return score;
}

export function usePasswordStrength(password: string): PasswordStrength {
  const intl = useIntl();
  const meterLabel = intl.formatMessage(messages.meter);

  if (!password) {
    return { score: 0, percentage: 0, color: "default", label: "", meterLabel };
  }

  const score = scorePassword(password);

  if (score <= 1) {
    return { score, percentage: 28, color: "danger", label: intl.formatMessage(messages.weak), meterLabel };
  }
  if (score === 2) {
    return { score, percentage: 58, color: "warning", label: intl.formatMessage(messages.fair), meterLabel };
  }
  if (score === 3) {
    return { score, percentage: 80, color: "success", label: intl.formatMessage(messages.good), meterLabel };
  }

  return { score, percentage: 100, color: "success", label: intl.formatMessage(messages.strong), meterLabel };
}
