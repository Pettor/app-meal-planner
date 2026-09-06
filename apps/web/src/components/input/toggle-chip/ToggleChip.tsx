import type { ReactNode, ReactElement } from "react";
import { ToggleButton } from "@heroui/react";
import clsx from "clsx";

export interface ToggleChipProps {
  label: string;
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
  /** Rendered after the label, e.g. a usage count. */
  endContent?: ReactNode;
  className?: string;
}

/**
 * A small selectable pill, used for scope switches and tag filters. Wraps
 * HeroUI's `ToggleButton` so every filter surface in the app reads the same.
 */
export function ToggleChip({ label, isSelected, onChange, endContent, className }: ToggleChipProps): ReactElement {
  return (
    <ToggleButton
      size="sm"
      variant="default"
      isSelected={isSelected}
      onChange={onChange}
      className={clsx("toggle-selected-accent gap-1.5 rounded-full", className)}
    >
      {label}
      {endContent}
    </ToggleButton>
  );
}
