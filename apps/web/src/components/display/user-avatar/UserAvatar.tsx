import type { ReactElement } from "react";
import { Avatar } from "@heroui/react";
import clsx from "clsx";
import { authorInitials } from "~/core/recipes/RecipeUtils";

export type UserAvatarSize = "xs" | "sm" | "md" | "lg";

export interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  /** Fixed per-person colour (CSS colour value) for the initials disc. Falls back to a generic tint. */
  color?: string;
  size?: UserAvatarSize;
  className?: string;
}

const SIZE_CLASSES: Record<UserAvatarSize, string> = {
  xs: "h-5 w-5 text-[8px]",
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-sm",
};

/**
 * A cook's avatar: their photo when they have one, their initials on a
 * colour-coded disc when they don't — each person keeps the same colour
 * everywhere they're shown, so `color` should come from their profile data
 * rather than being derived per usage.
 */
export function UserAvatar({ name, avatarUrl, color, size = "sm", className }: UserAvatarProps): ReactElement {
  return (
    <Avatar className={clsx("shrink-0 font-bold", !color && "bg-accent/15 text-accent", SIZE_CLASSES[size], className)}>
      {avatarUrl && <Avatar.Image src={avatarUrl} alt={name} />}
      <Avatar.Fallback
        className={clsx("font-bold", color ? "text-white" : undefined)}
        style={color ? { backgroundColor: color } : undefined}
      >
        {authorInitials(name)}
      </Avatar.Fallback>
    </Avatar>
  );
}
