import { describe, expect, it } from "vitest";
import type { FeedEntry, SharedWeek } from "./CommunityTypes";
import {
  buildFeed,
  feedEntryOwnerId,
  feedEntryTags,
  feedTagCounts,
  findRecipe,
  matchesTagFilter,
  sharedWeekDays,
  sharedWeekPhotos,
  sharedWeekRecipes,
  sharedWeekTags,
  WEEK_PHOTO_COUNT,
} from "./CommunityUtils";
import type { Recipe } from "~/core/recipes/RecipeTypes";

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function makeRecipe(
  id: string,
  tags: string[],
  options: { authorId?: string; photoUrl?: string | null; daysAgo?: number } = {}
): Recipe {
  return {
    id,
    title: `Recipe ${id}`,
    tags,
    servings: 4,
    timeMinutes: 30,
    photoUrl: options.photoUrl ?? null,
    daysAgo: options.daysAgo,
    ingredients: [],
    steps: [],
    author: {
      id: options.authorId ?? "p1",
      name: "Elin Håkansson",
      handle: "@elin",
      avatarUrl: null,
      color: "#fff",
    },
    isSaved: false,
  };
}

function makeWeek(recipeIds: string[], overrides: Partial<SharedWeek> = {}): SharedWeek {
  return {
    id: "w1",
    ownerId: "p1",
    daysAgo: 2,
    uses: 5,
    people: 4,
    title: "A good week",
    note: "Mostly fish.",
    recipeIds,
    ...overrides,
  };
}

describe("findRecipe", () => {
  const recipes = [makeRecipe("a", [])];

  it("finds a recipe by id", () => {
    expect(findRecipe(recipes, "a")?.id).toBe("a");
  });

  it("returns null for an id nothing matches", () => {
    expect(findRecipe(recipes, "nope")).toBeNull();
  });

  it("returns null when there is no id to look up", () => {
    expect(findRecipe(recipes, null)).toBeNull();
  });
});

describe("sharedWeekRecipes", () => {
  it("resolves the week in day order, seven long", () => {
    const recipes = [makeRecipe("a", []), makeRecipe("b", [])];
    const resolved = sharedWeekRecipes(makeWeek(["a", "b"]), recipes);

    expect(resolved).toHaveLength(7);
    expect(resolved[0]?.id).toBe("a");
    expect(resolved[1]?.id).toBe("b");
  });

  it("leaves a gap where the day has no recipe", () => {
    expect(sharedWeekRecipes(makeWeek([]), [])[0]).toBeNull();
  });

  it("leaves a gap for a recipe the cook cannot see", () => {
    expect(sharedWeekRecipes(makeWeek(["missing"]), [])[0]).toBeNull();
  });
});

describe("sharedWeekDays", () => {
  it("labels each day and names its recipe", () => {
    const days = sharedWeekDays(makeWeek(["a"]), [makeRecipe("a", [])], DAY_NAMES);

    expect(days[0]).toEqual({ day: "Mon", title: "Recipe a" });
  });

  it("marks an empty day with an em dash", () => {
    expect(sharedWeekDays(makeWeek([]), [], DAY_NAMES)[3]).toEqual({ day: "Thu", title: "—" });
  });

  it("clips a long day name to three letters", () => {
    expect(sharedWeekDays(makeWeek([]), [], ["Monday"])[0]?.day).toBe("Mon");
  });

  it("survives a day-name list that is too short", () => {
    expect(sharedWeekDays(makeWeek([]), [], [])[0]?.day).toBe("");
  });
});

describe("sharedWeekPhotos", () => {
  it("pads out to a fixed width when there are too few photos", () => {
    const photos = sharedWeekPhotos(makeWeek(["a"]), [makeRecipe("a", [], { photoUrl: "a.jpg" })]);

    expect(photos).toHaveLength(WEEK_PHOTO_COUNT);
    expect(photos[0]).toBe("a.jpg");
    expect(photos[1]).toBeNull();
  });

  it("takes only the first few when there are more", () => {
    const ids = ["a", "b", "c", "d", "e"];
    const recipes = ids.map((id) => makeRecipe(id, [], { photoUrl: `${id}.jpg` }));
    const photos = sharedWeekPhotos(makeWeek(ids), recipes);

    expect(photos).toEqual(["a.jpg", "b.jpg", "c.jpg", "d.jpg"]);
  });

  it("skips the days without a photo rather than leaving a hole", () => {
    const recipes = [makeRecipe("a", []), makeRecipe("b", [], { photoUrl: "b.jpg" })];

    expect(sharedWeekPhotos(makeWeek(["a", "b"]), recipes)[0]).toBe("b.jpg");
  });
});

describe("sharedWeekTags", () => {
  it("keeps the three most common tags", () => {
    const recipes = [
      makeRecipe("a", ["fish", "quick"]),
      makeRecipe("b", ["fish", "cheap"]),
      makeRecipe("c", ["fish", "quick", "bbq"]),
    ];

    expect(sharedWeekTags(makeWeek(["a", "b", "c"]), recipes)).toEqual(["fish", "quick", "bbq"]);
  });

  it("breaks a tie alphabetically", () => {
    const recipes = [makeRecipe("a", ["zebra", "apple"])];

    expect(sharedWeekTags(makeWeek(["a"]), recipes)).toEqual(["apple", "zebra"]);
  });

  it("returns nothing for a week whose recipes are all missing", () => {
    expect(sharedWeekTags(makeWeek(["missing"]), [])).toEqual([]);
  });
});

describe("buildFeed", () => {
  it("mixes weeks and other people's recipes, newest first", () => {
    const recipes = [makeRecipe("a", [], { daysAgo: 5 }), makeRecipe("mine", [], { authorId: "me", daysAgo: 0 })];
    const feed = buildFeed([makeWeek(["a"], { daysAgo: 1 })], recipes);

    expect(feed.map((entry) => entry.key)).toEqual(["week-w1", "recipe-a"]);
  });

  it("leaves the cook's own recipes out of the feed", () => {
    const feed = buildFeed([], [makeRecipe("mine", [], { authorId: "me" })]);

    expect(feed).toEqual([]);
  });

  it("treats a recipe with no age as brand new", () => {
    const feed = buildFeed([makeWeek([], { daysAgo: 3 })], [makeRecipe("a", [])]);

    expect(feed[0]?.key).toBe("recipe-a");
  });
});

describe("feedEntryTags", () => {
  it("summarises a week with its own tags", () => {
    const recipes = [makeRecipe("a", ["fish"])];
    const entry: FeedEntry = { kind: "week", key: "week-w1", daysAgo: 1, week: makeWeek(["a"]) };

    expect(feedEntryTags(entry, recipes)).toEqual(["fish"]);
  });

  it("reads a recipe entry's own tags", () => {
    const recipes = [makeRecipe("a", ["quick"])];
    const entry: FeedEntry = { kind: "recipe", key: "recipe-a", daysAgo: 1, recipeId: "a" };

    expect(feedEntryTags(entry, recipes)).toEqual(["quick"]);
  });

  it("returns nothing for a recipe that is not there", () => {
    const entry: FeedEntry = { kind: "recipe", key: "recipe-x", daysAgo: 1, recipeId: "x" };

    expect(feedEntryTags(entry, [])).toEqual([]);
  });
});

describe("feedEntryOwnerId", () => {
  it("credits a week to whoever shared it", () => {
    const entry: FeedEntry = { kind: "week", key: "week-w1", daysAgo: 1, week: makeWeek([], { ownerId: "p2" }) };

    expect(feedEntryOwnerId(entry, [])).toBe("p2");
  });

  it("credits a recipe to its author", () => {
    const entry: FeedEntry = { kind: "recipe", key: "recipe-a", daysAgo: 1, recipeId: "a" };

    expect(feedEntryOwnerId(entry, [makeRecipe("a", [], { authorId: "p3" })])).toBe("p3");
  });

  it("falls back to the cook for a recipe it cannot resolve", () => {
    const entry: FeedEntry = { kind: "recipe", key: "recipe-x", daysAgo: 1, recipeId: "x" };

    expect(feedEntryOwnerId(entry, [])).toBe("me");
  });
});

describe("feedTagCounts", () => {
  it("counts tags across the feed, most used first", () => {
    const recipes = [makeRecipe("a", ["fish", "quick"]), makeRecipe("b", ["fish"])];
    const feed = buildFeed([], recipes);

    expect(feedTagCounts(feed, recipes)).toEqual([
      { name: "fish", count: 2 },
      { name: "quick", count: 1 },
    ]);
  });

  it("breaks a tie alphabetically", () => {
    const recipes = [makeRecipe("a", ["zebra"]), makeRecipe("b", ["apple"])];
    const feed = buildFeed([], recipes);

    expect(feedTagCounts(feed, recipes).map((tag) => tag.name)).toEqual(["apple", "zebra"]);
  });
});

describe("matchesTagFilter", () => {
  const recipes = [makeRecipe("a", ["fish", "quick"])];
  const entry: FeedEntry = { kind: "recipe", key: "recipe-a", daysAgo: 1, recipeId: "a" };

  it("lets everything through when nothing is filtered on", () => {
    expect(matchesTagFilter(entry, recipes, [])).toBe(true);
  });

  it("requires every selected tag, not just one", () => {
    expect(matchesTagFilter(entry, recipes, ["fish", "quick"])).toBe(true);
    expect(matchesTagFilter(entry, recipes, ["fish", "bbq"])).toBe(false);
  });
});
