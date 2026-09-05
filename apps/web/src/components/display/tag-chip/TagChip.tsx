import type { ReactElement } from "react";
import { Chip } from "@heroui/react";
import { tagTone } from "~/core/recipes/RecipeUtils";

export interface TagChipProps {
  tag: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * A recipe tag. Tags are the vocabulary the planner reasons with, so their
 * colour is derived from the tag itself rather than passed in per usage.
 */
export function TagChip({ tag, size = "sm", className }: TagChipProps): ReactElement {
  return (
    <Chip size={size} variant="soft" color={tagTone(tag)} className={className}>
      {tag}
    </Chip>
  );
}
