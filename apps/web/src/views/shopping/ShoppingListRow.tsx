import type { ReactElement } from "react";
import { Checkbox } from "@heroui/react";
import clsx from "clsx";
import type { ShoppingLineViewModel } from "~/views/shopping/UseShoppingOverview";

export interface ShoppingListRowProps {
  line: ShoppingLineViewModel;
  onToggle: () => void;
}

/** One ingredient on the list — tap anywhere on the row to tick it off. */
export function ShoppingListRow({ line, onToggle }: ShoppingListRowProps): ReactElement {
  return (
    <Checkbox
      isSelected={line.isChecked}
      onChange={() => onToggle()}
      className="border-separator hover:bg-surface-secondary/60 w-full border-b transition-colors last:border-b-0"
    >
      <Checkbox.Content
        data-testid="shopping-list__row"
        className="flex w-full items-center gap-3.5 px-5.5 py-3.25 text-left font-normal"
      >
        <Checkbox.Control className="size-[19px] rounded-[5px]">
          <Checkbox.Indicator />
        </Checkbox.Control>

        <span className={clsx("flex-1 text-base", line.isChecked ? "text-default-500" : "text-foreground")}>
          {line.item}
        </span>

        <span className="text-default-500 text-sm font-medium tabular-nums">{line.amount}</span>
      </Checkbox.Content>
    </Checkbox>
  );
}
