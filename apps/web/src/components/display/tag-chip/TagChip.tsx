import type { ReactElement, ReactNode } from "react";
import clsx from "clsx";
import type { RecipeTagFamily } from "~/core/recipes/RecipeTypes";
import { tagFamily } from "~/core/recipes/RecipeUtils";

export interface TagChipProps {
  tag: string;
  /**
   * Makes the tag interactive — same identity, larger hit area. Omit it and the
   * tag renders as a plain label.
   */
  onPress?: () => void;
  /** Only meaningful together with `onPress`. */
  isSelected?: boolean;
  /** Trailing detail, e.g. a usage count or a remove affordance. */
  endContent?: ReactNode;
  className?: string;
}

/** The dot is the only thing that varies: it encodes the tag's family. */
const DOT_BY_FAMILY: Record<RecipeTagFamily, string> = {
  diet: "bg-success",
  ing: "bg-danger",
  method: "bg-warning",
  other: "bg-muted/55",
};

/**
 * A recipe tag — one primitive for every tag in the app. Shape and colour never
 * vary by context or by which tag it is, so a wall of tags reads as one list
 * rather than a scatter of colours; only the leading dot distinguishes diet from
 * main ingredient from method.
 */
export function TagChip({ tag, onPress, isSelected = false, endContent, className }: TagChipProps): ReactElement {
  const base = clsx(
    "border-border inline-flex items-center gap-1.5 rounded-full border leading-none font-medium whitespace-nowrap",
    onPress
      ? "h-8 cursor-pointer px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      : "bg-surface-secondary text-foreground h-6 px-2.25 text-xs",
    onPress &&
      (isSelected
        ? "bg-accent border-accent text-accent-foreground hover:brightness-105"
        : "bg-surface text-foreground hover:bg-surface-secondary hover:border-accent"),
    className
  );

  const content = (
    <>
      <span
        className={clsx(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          isSelected ? "bg-accent-foreground/85" : DOT_BY_FAMILY[tagFamily(tag)]
        )}
      />
      {tag}
      {endContent && (
        <span className={clsx("text-xs font-normal tabular-nums", isSelected ? "opacity-70" : "text-muted")}>
          {endContent}
        </span>
      )}
    </>
  );

  if (!onPress) {
    return <span className={base}>{content}</span>;
  }

  return (
    <button type="button" className={base} onClick={onPress} aria-pressed={isSelected}>
      {content}
    </button>
  );
}
