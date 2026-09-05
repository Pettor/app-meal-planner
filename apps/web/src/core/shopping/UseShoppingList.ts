import { useAtom } from "jotai";
import { checkedShoppingLinesAtom } from "~/core/shopping/ShoppingAtoms";

export interface UseShoppingListResult {
  /** Ticked lines, keyed by `ShoppingLine.key`. */
  checkedLines: Record<string, boolean>;
  toggleLine: (key: string) => void;
}

/** Read and write which shopping lines are ticked off. */
export function UseShoppingList(): UseShoppingListResult {
  const [checkedLines, setCheckedLines] = useAtom(checkedShoppingLinesAtom);

  function toggleLine(key: string): void {
    setCheckedLines((current) => ({ ...current, [key]: !current[key] }));
  }

  return { checkedLines, toggleLine };
}
