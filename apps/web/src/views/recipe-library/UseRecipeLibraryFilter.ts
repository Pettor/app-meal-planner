import { useMemo, useState } from "react";
import type { Recipe, RecipeScope } from "~/core/recipes/RecipeTypes";
import { collectTags } from "~/core/recipes/RecipeUtils";

export interface UseRecipeLibraryFilterResult {
  scope: RecipeScope;
  setScope: (scope: RecipeScope) => void;
  query: string;
  setQuery: (query: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  /**
   * The chips the filter bar offers: every tag in scope, plus any tag picked
   * from the full catalogue that no recipe in scope carries — otherwise a filter
   * that narrows the pool to nothing would have no chip to switch back off.
   */
  availableTags: string[];
  hasTagFilter: boolean;
  clearTags: () => void;
  /** The catalogue browser, for filtering by a tag beyond the ones in scope. */
  isTagBrowserOpen: boolean;
  openTagBrowser: () => void;
  closeTagBrowser: () => void;
  /** The recipes left after scope, search and tag filters. */
  filtered: Recipe[];
}

/**
 * Filter state for the recipe library: which pool you are looking at, the
 * search box, and the tag chips. All three narrow the same list.
 */
export function useRecipeLibraryFilter(recipes: Recipe[], initialScope: RecipeScope): UseRecipeLibraryFilterResult {
  const [scope, setScope] = useState<RecipeScope>(initialScope);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagBrowserOpen, setIsTagBrowserOpen] = useState(false);

  const inScope = useMemo(
    () =>
      scope === "mine"
        ? recipes.filter((recipe) => recipe.isSaved)
        : recipes.filter((recipe) => recipe.author.id !== "me"),
    [recipes, scope]
  );

  const availableTags = useMemo(() => {
    const inPool = collectTags(inScope);
    return [...inPool, ...selectedTags.filter((tag) => !inPool.includes(tag))];
  }, [inScope, selectedTags]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return inScope.filter(
      (recipe) =>
        (!needle || recipe.title.toLowerCase().includes(needle)) &&
        selectedTags.every((tag) => recipe.tags.includes(tag))
    );
  }, [inScope, query, selectedTags]);

  function toggleTag(tag: string): void {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]));
  }

  return {
    scope,
    setScope,
    query,
    setQuery,
    selectedTags,
    toggleTag,
    availableTags,
    hasTagFilter: selectedTags.length > 0,
    clearTags: () => setSelectedTags([]),
    isTagBrowserOpen,
    openTagBrowser: () => setIsTagBrowserOpen(true),
    closeTagBrowser: () => setIsTagBrowserOpen(false),
    filtered,
  };
}
