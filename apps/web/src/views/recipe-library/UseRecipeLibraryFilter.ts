import { useMemo, useState } from "react";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface UseRecipeLibraryFilterResult {
  query: string;
  setQuery: (query: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  /**
   * The chips the filter row offers: the cook's default tags, plus any tag
   * picked from the full catalogue that isn't one of them — otherwise a filter
   * that narrows the pool to nothing would have no chip to switch back off.
   */
  quickTags: string[];
  hasTagFilter: boolean;
  clearTags: () => void;
  /** The catalogue browser, for filtering by a tag beyond the default ones. */
  isTagBrowserOpen: boolean;
  openTagBrowser: () => void;
  closeTagBrowser: () => void;
  /** The cook's own pool, before search and tag filters narrow it. */
  pool: Recipe[];
  /** The recipes left after search and tag filters. */
  filtered: Recipe[];
}

/**
 * Filter state for the recipe library: the search box and the tag chips, both
 * narrowing the same list.
 *
 * The pool is only ever the cook's own recipes — everyone else's live in the
 * community, which the panel links out to.
 */
export function useRecipeLibraryFilter(recipes: Recipe[], pinnedTags: string[]): UseRecipeLibraryFilterResult {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagBrowserOpen, setIsTagBrowserOpen] = useState(false);

  const pool = useMemo(() => recipes.filter((recipe) => recipe.isSaved), [recipes]);

  const quickTags = useMemo(
    () => [...pinnedTags, ...selectedTags.filter((tag) => !pinnedTags.includes(tag))],
    [pinnedTags, selectedTags]
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return pool.filter(
      (recipe) =>
        (!needle || recipe.title.toLowerCase().includes(needle)) &&
        selectedTags.every((tag) => recipe.tags.includes(tag))
    );
  }, [pool, query, selectedTags]);

  function toggleTag(tag: string): void {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]));
  }

  return {
    query,
    setQuery,
    selectedTags,
    toggleTag,
    quickTags,
    hasTagFilter: selectedTags.length > 0,
    clearTags: () => setSelectedTags([]),
    isTagBrowserOpen,
    openTagBrowser: () => setIsTagBrowserOpen(true),
    closeTagBrowser: () => setIsTagBrowserOpen(false),
    pool,
    filtered,
  };
}
