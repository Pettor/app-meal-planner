import type { RecipeAuthor } from "~/core/recipes/RecipeTypes";

/**
 * Domain types for the community — the people you follow, the weeks they
 * share, and the recommendations they send you.
 *
 * These stand in for the API layer until `@package/api` grows a `Community`
 * endpoint. The shapes mirror what the Meal Planner design reasons about, so
 * wiring them to a service later is a converter change, not a view change.
 */

/** Which section of the community page is showing. */
export type CommunityTab = "feed" | "people" | "weeks";

/** Which half of someone's profile is showing. */
export type ProfileTab = "weeks" | "recipes";

/** Whether the feed shows everyone or only the people you follow. */
export type FeedScope = "all" | "following";

/** The two things people share: a whole week, or a single recipe. */
export type SharedItemKind = "week" | "recipe";

export interface CommunityPerson extends RecipeAuthor {
  bio: string;
  /** Whether they already follow the signed-in cook. */
  followsMe: boolean;
}

/** A week someone published to the community. */
export interface SharedWeek {
  id: string;
  ownerId: string;
  /** How long ago it was shared, in days. */
  daysAgo: number;
  /** How many cooks have loaded it into their own planner. */
  uses: number;
  /** How many people it was written to feed. */
  people: number;
  title: string;
  note: string;
  /** One recipe per day, Monday first. May contain ids the cook doesn't own. */
  recipeIds: string[];
}

/** One cell in a shared week's seven-day strip. */
export interface SharedWeekDay {
  /** Three-letter day name, e.g. "Mon". */
  day: string;
  /** The recipe's title, or an em dash when the day is empty. */
  title: string;
}

/** A recommendation someone sent straight to the cook. */
export interface InboxItem {
  id: string;
  kind: SharedItemKind;
  /** Who sent it. */
  fromId: string;
  /** The shared week or community recipe being recommended. */
  refId: string;
  daysAgo: number;
  isRead: boolean;
  note: string;
}

/** One entry in the community feed — either a shared week or a new recipe. */
export type FeedEntry =
  | { kind: "week"; key: string; daysAgo: number; week: SharedWeek }
  | { kind: "recipe"; key: string; daysAgo: number; recipeId: string };

/** A tag offered as a feed filter, with how many entries carry it. */
export interface FeedTagCount {
  name: string;
  count: number;
}
