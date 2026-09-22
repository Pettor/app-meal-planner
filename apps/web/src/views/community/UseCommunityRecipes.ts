import { useMemo, useState } from "react";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface UseCommunityRecipesResult {
  query: string;
  setQuery: (query: string) => void;
  /** Everyone else's recipes, narrowed by the search box. */
  filtered: Recipe[];
}

/** Search state for the community's shared recipes. */
export function useCommunityRecipes(recipes: Recipe[]): UseCommunityRecipesResult {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return recipes.filter(
      (recipe) => recipe.author.id !== "me" && (!needle || recipe.title.toLowerCase().includes(needle))
    );
  }, [recipes, query]);

  return { query, setQuery, filtered };
}
