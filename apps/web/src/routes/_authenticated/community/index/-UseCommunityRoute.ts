import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { loadWeekTargetAtom, recommendTargetAtom } from "~/core/community/CommunityAtoms";
import type { CommunityTab, SharedWeek } from "~/core/community/CommunityTypes";
import { useCommunity } from "~/core/community/UseCommunity";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { useRecipes } from "~/core/recipes/UseRecipes";
import type { CommunityViewProps } from "~/views/community/CommunityView";

/**
 * Wires the community page to the follow list and to navigation.
 *
 * `recipes` comes from placeholder data until there is a recipes service —
 * the whole pool is passed in, not just the cook's own, because a shared week
 * is built from other people's recipes.
 */
export function useCommunityRoute(): CommunityViewProps {
  const navigate = useNavigate();
  const { people, weeks, following, toggleFollow, personById } = useCommunity();
  const setRecommendTarget = useSetAtom(recommendTargetAtom);
  const setLoadWeekTarget = useSetAtom(loadWeekTargetAtom);
  const { recipes } = useRecipes();

  const [tab, setTab] = useState<CommunityTab>("feed");

  return {
    tab,
    onTabChange: setTab,
    people,
    weeks,
    recipes,
    following,
    personById,
    onToggleFollow: toggleFollow,
    onOpenProfile: (personId: string) => void navigate({ to: "/community/$personId", params: { personId } }),
    onOpenRecipe: (recipeId: string) => void navigate({ to: "/recipes/$recipeId", params: { recipeId } }),
    onOpenInbox: () => void navigate({ to: "/community/inbox" }),
    onRecommendWeek: (week: SharedWeek) => setRecommendTarget({ kind: "week", refId: week.id, title: week.title }),
    onRecommendRecipe: (recipe: Recipe) =>
      setRecommendTarget({ kind: "recipe", refId: recipe.id, title: recipe.title }),
    onUseWeek: (week: SharedWeek) => setLoadWeekTarget(week.id),
  };
}
