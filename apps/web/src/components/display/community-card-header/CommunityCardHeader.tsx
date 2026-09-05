import type { ReactElement } from "react";
import clsx from "clsx";
import { UserAvatar } from "~/components/display/user-avatar/UserAvatar";
import type { CommunityPerson } from "~/core/community/CommunityTypes";

export interface CommunityCardHeaderProps {
  person: CommunityPerson;
  /** What they did, e.g. "shared a week". Sits beside the name on one line. */
  action?: string;
  /** Their handle, shown under the name instead of an action. */
  showHandle?: boolean;
  /** How long ago it happened, e.g. "2d ago". */
  ago: string;
  onOpenProfile: () => void;
  withBorder?: boolean;
  className?: string;
}

/**
 * The "who and when" row at the top of a community card. The feed and the
 * inbox read it as a sentence ("Elin shared a week"); the shared-weeks grid
 * stacks the handle under the name instead.
 */
export function CommunityCardHeader({
  person,
  action,
  showHandle = false,
  ago,
  onOpenProfile,
  withBorder = false,
  className,
}: CommunityCardHeaderProps): ReactElement {
  return (
    <div
      className={clsx(
        "flex items-center gap-[11px] px-[18px] py-3.5",
        withBorder && "border-border border-b",
        className
      )}
    >
      <UserAvatar name={person.name} avatarUrl={person.avatarUrl} color={person.color} size="md" />

      <span className={clsx("flex min-w-0 flex-1", showHandle ? "flex-col" : "flex-wrap items-baseline gap-1.5")}>
        <button
          type="button"
          onClick={onOpenProfile}
          className={clsx(
            "hover:text-accent cursor-pointer text-sm font-semibold transition-colors",
            showHandle && "text-left"
          )}
        >
          {person.name}
        </button>
        {showHandle ? (
          <span className="text-default-500 text-xs">{person.handle}</span>
        ) : (
          action && <span className="text-default-500 text-sm">{action}</span>
        )}
      </span>

      <span className="text-default-500 flex-none text-xs">{ago}</span>
    </div>
  );
}
