import { useCallback } from "react";
import { useAtom, useSetAtom } from "jotai";
import { followingAtom, inboxAtom, pendingSharedPlanAtom } from "~/core/community/CommunityAtoms";
import { SampleCommunityPeople, SampleSharedWeeks } from "~/core/community/CommunitySampleData";
import type { CommunityPerson, InboxItem, SharedWeek } from "~/core/community/CommunityTypes";
import { sharedWeekRecipes } from "~/core/community/CommunityUtils";
import type { PlanDraft } from "~/core/plan/PlanTypes";
import { PLAN_DAY_ORDER } from "~/core/plan/PlanTypes";
import { SampleAuthorMe } from "~/core/recipes/RecipeSampleData";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface UseCommunityResult {
  /** The signed-in cook, shaped like anyone else in the community. */
  me: CommunityPerson;
  people: CommunityPerson[];
  weeks: SharedWeek[];
  inbox: InboxItem[];
  unreadCount: number;
  following: string[];
  isFollowing: (personId: string) => boolean;
  toggleFollow: (personId: string) => void;
  personById: (personId: string) => CommunityPerson | null;
  weekById: (weekId: string) => SharedWeek | null;
  /** Marks everything in the inbox as read — called when the inbox is opened. */
  markInboxRead: () => void;
  /** Drops an item from the inbox, whether it was accepted or dismissed. */
  removeInboxItem: (itemId: string) => void;
  /** Turns a shared week into a plan draft and hands it to the planner. */
  loadSharedWeek: (week: SharedWeek, recipes: Recipe[]) => void;
}

/** The cook's own community profile, drawn from the recipe author they publish as. */
const me: CommunityPerson = {
  ...SampleAuthorMe,
  bio: "Plans the week on Sunday and mostly sticks to it.",
  followsMe: false,
};

/** Read and write who the cook follows, plus their inbox of recommendations. */
export function useCommunity(): UseCommunityResult {
  const [following, setFollowing] = useAtom(followingAtom);
  const [inbox, setInbox] = useAtom(inboxAtom);
  const setPendingSharedPlan = useSetAtom(pendingSharedPlanAtom);

  function isFollowing(personId: string): boolean {
    return following.includes(personId);
  }

  function toggleFollow(personId: string): void {
    setFollowing((current) =>
      current.includes(personId) ? current.filter((id) => id !== personId) : [...current, personId]
    );
  }

  function personById(personId: string): CommunityPerson | null {
    if (personId === me.id) return me;
    return SampleCommunityPeople.find((person) => person.id === personId) ?? null;
  }

  function weekById(weekId: string): SharedWeek | null {
    return SampleSharedWeeks.find((week) => week.id === weekId) ?? null;
  }

  // Stable so the inbox route can mark-as-read from an effect without lying about its deps.
  const markInboxRead = useCallback((): void => {
    setInbox((current) =>
      current.some((item) => !item.isRead) ? current.map((item) => ({ ...item, isRead: true })) : current
    );
  }, [setInbox]);

  function removeInboxItem(itemId: string): void {
    setInbox((current) => current.filter((item) => item.id !== itemId));
  }

  function loadSharedWeek(week: SharedWeek, recipes: Recipe[]): void {
    const draft: PlanDraft = {
      days: PLAN_DAY_ORDER.map((day) => ({ day, lunch: false, dinner: true, people: week.people })),
      quotas: [],
      slots: PLAN_DAY_ORDER.map((day, index) => ({
        day,
        meal: "dinner" as const,
        people: week.people,
        recipeId: sharedWeekRecipes(week, recipes)[index]?.id ?? null,
      })),
    };
    setPendingSharedPlan(draft);
  }

  return {
    me,
    people: SampleCommunityPeople,
    weeks: SampleSharedWeeks,
    inbox,
    unreadCount: inbox.filter((item) => !item.isRead).length,
    following,
    isFollowing,
    toggleFollow,
    personById,
    weekById,
    markInboxRead,
    removeInboxItem,
    loadSharedWeek,
  };
}
