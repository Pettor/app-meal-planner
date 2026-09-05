import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { loadWeekTargetAtom, recommendTargetAtom } from "~/core/community/CommunityAtoms";
import type { ProfileTab, SharedWeek } from "~/core/community/CommunityTypes";
import { UseCommunity } from "~/core/community/UseCommunity";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { UseRecipes } from "~/core/recipes/UseRecipes";
import { settingsModalAtom } from "~/core/settings/SettingsAtoms";
import type { ProfileViewProps } from "~/views/community/ProfileView";

/**
 * Wires one person's profile to the community store.
 *
 * Returns `null` when nobody matches the id, so the route can render a
 * not-found rather than a profile for a person who isn't there.
 */
export function UseProfileRoute(personId: string): ProfileViewProps | null {
  const navigate = useNavigate();
  const { me, weeks, isFollowing, toggleFollow, personById } = UseCommunity();
  const setRecommendTarget = useSetAtom(recommendTargetAtom);
  const setLoadWeekTarget = useSetAtom(loadWeekTargetAtom);
  const openSettings = useSetAtom(settingsModalAtom);
  const { recipes } = UseRecipes();

  const [tab, setTab] = useState<ProfileTab>("weeks");

  const person = personById(personId);
  if (!person) return null;

  return {
    person,
    isMe: person.id === me.id,
    isFollowing: isFollowing(person.id),
    tab,
    onTabChange: setTab,
    weeks: weeks.filter((week) => week.ownerId === person.id),
    recipes: recipes.filter((recipe) => recipe.author.id === person.id),
    allRecipes: recipes,
    onToggleFollow: () => toggleFollow(person.id),
    onEditProfile: () => openSettings({ isOpen: true, initialSection: "account" }),
    onBack: () => void navigate({ to: "/community" }),
    onOpenRecipe: (recipeId: string) => void navigate({ to: "/recipes/$recipeId", params: { recipeId } }),
    onRecommendWeek: (week: SharedWeek) => setRecommendTarget({ kind: "week", refId: week.id, title: week.title }),
    onRecommendRecipe: (recipe: Recipe) =>
      setRecommendTarget({ kind: "recipe", refId: recipe.id, title: recipe.title }),
    onUseWeek: (week: SharedWeek) => setLoadWeekTarget(week.id),
  };
}
