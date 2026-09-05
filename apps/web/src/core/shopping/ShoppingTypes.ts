/**
 * Domain types for the shopping list.
 *
 * The list is never stored — it is derived from the planned week and the recipe
 * pool every time it is read. Only the ticks the cook makes are persisted.
 */

/** One aggregated line: the same ingredient summed across every planned meal. */
export interface ShoppingLine {
  /** `item|unit` — stable across re-plans, so ticked lines stay ticked. */
  key: string;
  item: string;
  /** May be empty for countable items ("2 onions"). */
  unit: string;
  /** Summed, servings-scaled amount. `0` when every occurrence was written without one. */
  quantity: number;
  /** Whether at least one occurrence had no amount ("salt", "olive oil"). */
  hasUnmeasured: boolean;
}
