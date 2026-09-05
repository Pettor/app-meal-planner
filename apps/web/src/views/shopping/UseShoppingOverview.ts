import { useIntl } from "react-intl";
import type { SavedPlan } from "~/core/plan/PlanTypes";
import { formatWeekRange, isoWeekNumber, parseWeekKey } from "~/core/plan/PlanUtils";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { buildShoppingList, formatShoppingAmount } from "~/core/shopping/ShoppingUtils";

export interface ShoppingLineViewModel {
  key: string;
  item: string;
  /** Right-hand column, e.g. "600 g" or "2 +". */
  amount: string;
  isChecked: boolean;
}

export interface UseShoppingOverviewResult {
  /** Plain first half of the page heading, e.g. "Shopping". */
  headingLead: string;
  /** Gradient second half, e.g. "list". */
  headingAccent: string;
  /** "week 14 · 3 Apr – 9 Apr · 23 lines for the planned week" */
  subtitle: string;
  lines: ShoppingLineViewModel[];
  isEmpty: boolean;
}

/** Everything the shopping page renders, derived from the week in view and its saved plan. */
export function UseShoppingOverview(
  weekKey: string,
  plan: SavedPlan | null,
  recipes: Recipe[],
  checkedLines: Record<string, boolean>
): UseShoppingOverviewResult {
  const intl = useIntl();
  const locale = intl.locale || "en-GB";

  const monday = parseWeekKey(weekKey);
  const weekWordLower = intl.formatMessage({
    description: "UseShoppingOverview: label - week (lowercase)",
    defaultMessage: "week",
    id: "0PDyPk",
  });
  const weekRange = `${weekWordLower} ${isoWeekNumber(monday)} · ${formatWeekRange(monday, locale)}`;

  const shoppingLines = buildShoppingList(plan, recipes);

  return {
    headingLead: intl.formatMessage({
      description: "UseShoppingOverview: heading - shopping",
      defaultMessage: "Shopping",
      id: "1wtnNI",
    }),
    headingAccent: intl.formatMessage({
      description: "UseShoppingOverview: heading accent - list",
      defaultMessage: "list",
      id: "L8K0gq",
    }),
    subtitle: shoppingLines.length
      ? intl.formatMessage(
          {
            description: "UseShoppingOverview: subtitle - line count for the planned week",
            defaultMessage: "{weekRange} · {count} lines for the planned week",
            id: "xxU9J8",
          },
          { weekRange, count: shoppingLines.length }
        )
      : intl.formatMessage(
          {
            description: "UseShoppingOverview: subtitle - no week planned",
            defaultMessage: "{weekRange} · No week planned",
            id: "3ytiPV",
          },
          { weekRange }
        ),
    lines: shoppingLines.map((line) => ({
      key: line.key,
      item: line.item,
      amount: formatShoppingAmount(line),
      isChecked: !!checkedLines[line.key],
    })),
    isEmpty: shoppingLines.length === 0,
  };
}
