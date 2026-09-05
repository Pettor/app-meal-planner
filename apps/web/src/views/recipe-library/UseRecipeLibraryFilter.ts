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
  /** Every tag in scope, offered as filter chips. */
  availableTags: string[];
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

  const inScope = useMemo(
    () =>
      scope === "mine"
        ? recipes.filter((recipe) => recipe.isSaved)
        : recipes.filter((recipe) => recipe.author.id !== "me"),
    [recipes, scope]
  );

  const availableTags = useMemo(() => collectTags(inScope), [inScope]);

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

  return { scope, setScope, query, setQuery, selectedTags, toggleTag, availableTags, filtered };
}
