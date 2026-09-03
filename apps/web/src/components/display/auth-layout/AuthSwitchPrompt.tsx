import type { ReactElement } from "react";
import { Link } from "@heroui/react";

export interface AuthSwitchPromptProps {
  text: string;
  actionLabel: string;
  onPress(): void;
}

/**
 * Footer row inside the auth card that switches between sign in, sign up and
 * password reset — a label flanked by separator rules, with the action as a link.
 */
export function AuthSwitchPrompt({ text, actionLabel, onPress }: AuthSwitchPromptProps): ReactElement {
  return (
    <div className="flex items-center gap-2.5 pt-0.5">
      <span className="bg-separator h-px flex-1" />
      <span className="text-muted text-sm">{text}</span>
      <Link className="cursor-pointer text-sm" onPress={onPress} data-testid="auth-switch-prompt__action">
        {actionLabel}
      </Link>
      <span className="bg-separator h-px flex-1" />
    </div>
  );
}
