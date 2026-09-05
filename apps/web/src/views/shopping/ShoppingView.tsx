import type { ReactElement } from "react";
import { Card } from "@heroui/react";
import { useIntl } from "react-intl";
import type { SavedPlan } from "~/core/plan/PlanTypes";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { ShoppingListRow } from "~/views/shopping/ShoppingListRow";
import { ShoppingPageHeader } from "~/views/shopping/ShoppingPageHeader";
import { UseShoppingOverview } from "~/views/shopping/UseShoppingOverview";

export interface ShoppingViewProps {
  /** The week in view, keyed by its Monday (`YYYY-MM-DD`). */
  weekKey: string;
  /** The saved plan for that week, or `null` when it has never been planned. */
  plan: SavedPlan | null;
  /** The cook's own recipe pool — what the planned meals resolve against. */
  recipes: Recipe[];
  /** Ticked lines, keyed by `item|unit`. */
  checkedLines: Record<string, boolean>;
  onToggleLine: (key: string) => void;
  onPrint: () => void;
}

/** "Shopping list" — the planned week rolled up into one list to shop from. */
export function ShoppingView({
  weekKey,
  plan,
  recipes,
  checkedLines,
  onToggleLine,
  onPrint,
}: ShoppingViewProps): ReactElement {
  const intl = useIntl();
  const shopping = UseShoppingOverview(weekKey, plan, recipes, checkedLines);

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-6 py-9">
      <ShoppingPageHeader
        headingLead={shopping.headingLead}
        headingAccent={shopping.headingAccent}
        subtitle={shopping.subtitle}
        onPrint={onPrint}
      />

      <Card className="mx-auto mt-6.5 max-w-[43.75rem] overflow-hidden print:border-0 print:shadow-none">
        <Card.Content className="p-0">
          {shopping.lines.map((line) => (
            <ShoppingListRow key={line.key} line={line} onToggle={() => onToggleLine(line.key)} />
          ))}

          {shopping.isEmpty && (
            <p className="text-default-500 p-14 text-center">
              {intl.formatMessage({
                description: "ShoppingView: body - nothing to shop for",
                defaultMessage: "Plan a week first and the list builds itself.",
                id: "BwAKKu",
              })}
            </p>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}
