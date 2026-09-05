import type { ReactElement } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { ShoppingLineViewModel } from "~/views/shopping/UseShoppingOverview";

export interface ShoppingListRowProps {
  line: ShoppingLineViewModel;
  onToggle: () => void;
}

/** One ingredient on the list — tap anywhere on the row to tick it off. */
export function ShoppingListRow({ line, onToggle }: ShoppingListRowProps): ReactElement {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={line.isChecked}
      onClick={onToggle}
      data-testid="shopping-list__row"
      className="border-separator hover:bg-surface-secondary/60 flex w-full items-center gap-3.5 border-b px-5.5 py-3.25 text-left transition-colors last:border-b-0"
    >
      <span
        className={clsx(
          "border-border flex h-[19px] w-[19px] flex-none items-center justify-center rounded-[5px] border",
          line.isChecked ? "bg-accent text-accent-foreground" : "bg-field"
        )}
      >
        <CheckIcon className={clsx("h-3 w-3", line.isChecked ? "opacity-100" : "opacity-0")} strokeWidth={2.5} />
      </span>

      <span className={clsx("flex-1 text-base", line.isChecked ? "text-default-500" : "text-foreground")}>
        {line.item}
      </span>

      <span className="text-default-500 text-sm font-medium tabular-nums">{line.amount}</span>
    </button>
  );
}
