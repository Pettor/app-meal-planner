import type { ReactElement } from "react";
import { BookOpenIcon, CalendarIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useIntl } from "react-intl";
import type { SharedItemKind } from "~/core/community/CommunityTypes";

export interface CommunityBadgeProps {
  kind: SharedItemKind;
  className?: string;
}

/**
 * The pill sitting on a community card's photo, saying whether the card is a
 * whole week or a single recipe. The two read the same everywhere they appear,
 * so the feed, the profile and the weeks grid all share this.
 */
export function CommunityBadge({ kind, className }: CommunityBadgeProps): ReactElement {
  const intl = useIntl();

  const label =
    kind === "week"
      ? intl.formatMessage({
          description: "CommunityBadge: label - card holds a shared week",
          defaultMessage: "Week",
          id: "obJ2Hk",
        })
      : intl.formatMessage({
          description: "CommunityBadge: label - card holds a single recipe",
          defaultMessage: "Recipe",
          id: "jrlJwD",
        });

  const Icon = kind === "week" ? CalendarIcon : BookOpenIcon;

  return (
    <span
      className={clsx(
        "border-border bg-surface text-default-500 inline-flex items-center gap-1.5 rounded-full border",
        "px-2.5 py-[5px] text-xs font-semibold",
        className
      )}
    >
      <Icon className="h-[13px] w-[13px]" />
      {label}
    </span>
  );
}
