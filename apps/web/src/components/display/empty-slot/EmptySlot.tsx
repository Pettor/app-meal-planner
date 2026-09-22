import type { ReactElement } from "react";
import clsx from "clsx";

export interface EmptySlotProps {
  /** What is missing, e.g. "Nothing planned". */
  label: string;
  className?: string;
}

/**
 * The dashed placeholder that stands in for a meal a day does not have. It sits
 * inside a day's body alongside real meal cards, so it is inset and dashed
 * rather than flush — an empty day still reads as a day with room in it.
 */
export function EmptySlot({ label, className }: EmptySlotProps): ReactElement {
  return (
    <span
      className={clsx(
        "border-border text-default-500 flex flex-1 items-center justify-center rounded-lg border border-dashed px-3.5 py-6.5 text-center text-xs",
        "[background-image:radial-gradient(color-mix(in_oklch,var(--muted)_30%,transparent)_1px,transparent_1px)] [background-size:12px_12px]",
        className
      )}
    >
      {label}
    </span>
  );
}
