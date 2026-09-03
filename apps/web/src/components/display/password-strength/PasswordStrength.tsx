import type { ReactElement } from "react";
import { ProgressBar } from "@heroui/react";
import { usePasswordStrength } from "./UsePasswordStrength";

export interface PasswordStrengthProps {
  password: string;
}

/** Inline strength meter shown under a new-password field. */
export function PasswordStrength({ password }: PasswordStrengthProps): ReactElement {
  const { percentage, color, label, meterLabel } = usePasswordStrength(password);

  return (
    <div className="flex items-center gap-2.5" data-testid="password-strength">
      <ProgressBar
        className="flex-1"
        aria-label={meterLabel}
        color={color}
        size="sm"
        value={percentage}
        data-testid="password-strength__meter"
      >
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <span className="text-muted min-w-[58px] text-right text-xs" data-testid="password-strength__label">
        {label}
      </span>
    </div>
  );
}
