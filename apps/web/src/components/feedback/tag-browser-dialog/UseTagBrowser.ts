import { useMemo, useState } from "react";
import type { RecipeTagCategory } from "~/core/recipes/RecipeTypes";

export interface UseTagBrowserResult {
  query: string;
  setQuery: (query: string) => void;
  /** The catalogue narrowed to the query, with empty groups dropped. */
  groups: RecipeTagCategory[];
  hasResults: boolean;
  /** The query as a tag the cook could create, or `null` when it isn't usable. */
  creatableTag: string | null;
}

/** Search state for the community tag catalogue. */
export function useTagBrowser(catalogue: RecipeTagCategory[]): UseTagBrowserResult {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return catalogue;

    return catalogue
      .map((group) => ({ ...group, tags: group.tags.filter((tag) => tag.name.includes(needle)) }))
      .filter((group) => group.tags.length > 0);
  }, [catalogue, query]);

  const hasResults = groups.length > 0;
  const trimmed = query.trim().toLowerCase();
  const creatableTag = !hasResults && trimmed.length > 0 ? trimmed : null;

  return { query, setQuery, groups, hasResults, creatableTag };
}
