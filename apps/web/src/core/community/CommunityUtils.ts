import type { FeedEntry, FeedTagCount, SharedWeek, SharedWeekDay } from "~/core/community/CommunityTypes";
import { PLAN_DAY_ORDER } from "~/core/plan/PlanTypes";
import type { Recipe } from "~/core/recipes/RecipeTypes";

/** How many tags a shared week is summarised with before the list is cut off. */
const WEEK_TAG_LIMIT = 3;

/** How many photos the four-up strip on a shared week shows. */
export const WEEK_PHOTO_COUNT = 4;

/** Looks a recipe up across both the cook's own pool and the community's. */
export function findRecipe(recipes: Recipe[], recipeId: string | null): Recipe | null {
  if (!recipeId) return null;
  return recipes.find((recipe) => recipe.id === recipeId) ?? null;
}

/** The recipes a shared week is built from, in day order, gaps included. */
export function sharedWeekRecipes(week: SharedWeek, recipes: Recipe[]): (Recipe | null)[] {
  return PLAN_DAY_ORDER.map((_, index) => findRecipe(recipes, week.recipeIds[index] ?? null));
}

/**
 * The seven-day strip under a shared week. Days are labelled with the first
 * three letters of the localised day name so the cells stay narrow.
 */
export function sharedWeekDays(week: SharedWeek, recipes: Recipe[], dayNames: string[]): SharedWeekDay[] {
  return sharedWeekRecipes(week, recipes).map((recipe, index) => ({
    day: (dayNames[index] ?? "").slice(0, 3),
    title: recipe ? recipe.title : "—",
  }));
}

/** The first few photos in a shared week, padded out so the strip stays four wide. */
export function sharedWeekPhotos(week: SharedWeek, recipes: Recipe[]): (string | null)[] {
  const photos = sharedWeekRecipes(week, recipes)
    .map((recipe) => recipe?.photoUrl ?? null)
    .filter((photo): photo is string => photo !== null)
    .slice(0, WEEK_PHOTO_COUNT);

  return [...photos, ...Array<null>(Math.max(0, WEEK_PHOTO_COUNT - photos.length)).fill(null)];
}

/**
 * The handful of tags that describe a shared week. A week has seven recipes and
 * so a dozen tags between them — the most common few say the most about it.
 */
export function sharedWeekTags(week: SharedWeek, recipes: Recipe[]): string[] {
  const counts = new Map<string, number>();
  sharedWeekRecipes(week, recipes).forEach((recipe) => {
    recipe?.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
  });

  return [...counts.entries()]
    .sort(([aTag, aCount], [bTag, bCount]) => bCount - aCount || aTag.localeCompare(bTag))
    .slice(0, WEEK_TAG_LIMIT)
    .map(([tag]) => tag);
}

/** Every tag a feed entry carries — a week's summary tags, or a recipe's own. */
export function feedEntryTags(entry: FeedEntry, recipes: Recipe[]): string[] {
  if (entry.kind === "week") return sharedWeekTags(entry.week, recipes);
  return findRecipe(recipes, entry.recipeId)?.tags ?? [];
}

/**
 * The community feed: every shared week and every recipe published by someone
 * other than the cook, newest first.
 */
export function buildFeed(weeks: SharedWeek[], recipes: Recipe[]): FeedEntry[] {
  const weekEntries: FeedEntry[] = weeks.map((week) => ({
    kind: "week",
    key: `week-${week.id}`,
    daysAgo: week.daysAgo,
    week,
  }));

  const recipeEntries: FeedEntry[] = recipes
    .filter((recipe) => recipe.author.id !== "me")
    .map((recipe) => ({
      kind: "recipe",
      key: `recipe-${recipe.id}`,
      daysAgo: recipe.daysAgo ?? 0,
      recipeId: recipe.id,
    }));

  return [...weekEntries, ...recipeEntries].sort((a, b) => a.daysAgo - b.daysAgo);
}

/** Who published a feed entry. */
export function feedEntryOwnerId(entry: FeedEntry, recipes: Recipe[]): string {
  if (entry.kind === "week") return entry.week.ownerId;
  return findRecipe(recipes, entry.recipeId)?.author.id ?? "me";
}

/** Every tag used across a set of feed entries, most used first. */
export function feedTagCounts(entries: FeedEntry[], recipes: Recipe[]): FeedTagCount[] {
  const counts = new Map<string, number>();
  entries.forEach((entry) => {
    feedEntryTags(entry, recipes).forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
  });

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Whether an entry carries every tag the cook has filtered on. */
export function matchesTagFilter(entry: FeedEntry, recipes: Recipe[], selectedTags: string[]): boolean {
  if (selectedTags.length === 0) return true;
  const tags = feedEntryTags(entry, recipes);
  return selectedTags.every((tag) => tags.includes(tag));
}
