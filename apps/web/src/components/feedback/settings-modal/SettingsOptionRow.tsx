import type { ReactElement, ReactNode } from "react";
import clsx from "clsx";

export interface SettingsOptionRowProps {
  icon: ReactNode;
  label: string;
  /** Trailing aside, e.g. "follows your OS". Only where there is something to add. */
  note?: string;
  isSelected: boolean;
  onSelect: () => void;
}

/**
 * One pickable preference — icon, name, and a muted aside.
 *
 * The settings sections that offer a short list of mutually exclusive choices
 * all use this row, so appearance and language read as the same control.
 */
export function SettingsOptionRow({ icon, label, note, isSelected, onSelect }: SettingsOptionRowProps): ReactElement {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
      className={clsx(
        "flex w-full cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors",
        "focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2",
        isSelected
          ? "border-accent bg-accent/10 text-accent"
          : "border-border bg-surface hover:border-accent hover:bg-surface-secondary"
      )}
    >
      <span className="flex size-4.75 shrink-0 items-center justify-center">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      {note && <span className="text-muted ml-auto text-xs">{note}</span>}
    </button>
  );
}
