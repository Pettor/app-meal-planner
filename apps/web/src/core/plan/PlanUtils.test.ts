import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PLAN_DAY_ORDER } from "./PlanTypes";
import type { PlanDay, PlanDraft, PlanSlot } from "./PlanTypes";
import {
  addDays,
  buildCalendarWeeks,
  buildPlanSlots,
  clonePlanDraft,
  DefaultPinnedTags,
  emptyPlanDraft,
  filledSlotCount,
  firstOfMonth,
  formatWeekRange,
  generatePlanSlots,
  isoWeekNumber,
  mondayOf,
  nextUnplannedWeekKey,
  offsetWeekKey,
  parseWeekKey,
  rerollRecipeId,
  shiftMonth,
  thisWeekKey,
  weekKeyOf,
  weekOffset,
} from "./PlanUtils";
import type { Recipe } from "~/core/recipes/RecipeTypes";

/** A Wednesday, so week-boundary maths has something to actually move. */
const WEDNESDAY = new Date(2026, 2, 11, 9, 30, 0, 0);

function makeRecipe(id: string, tags: string[]): Recipe {
  return {
    id,
    title: `Recipe ${id}`,
    tags,
    servings: 4,
    timeMinutes: 30,
    photoUrl: null,
    ingredients: [],
    steps: [],
    author: { id: "me", name: "Me", handle: "@me", avatarUrl: null, color: "#fff" },
    isSaved: true,
  };
}

describe("emptyPlanDraft", () => {
  it("offers every day, dinner only, for four people", () => {
    const draft = emptyPlanDraft();

    expect(draft.days.map((day) => day.day)).toEqual(PLAN_DAY_ORDER);
    expect(draft.days.every((day) => day.dinner && !day.lunch && day.people === 4)).toBe(true);
    expect(draft.slots).toEqual([]);
  });

  it("starts with the default quotas", () => {
    expect(emptyPlanDraft().quotas).toEqual([
      { tag: "vegetarian", mode: "atleast", n: 2 },
      { tag: "bbq", mode: "atleast", n: 1 },
    ]);
  });

  it("hands out a fresh copy of the quotas each time", () => {
    const first = emptyPlanDraft();
    const second = emptyPlanDraft();
    first.quotas[0]!.n = 99;

    expect(second.quotas[0]!.n).toBe(2);
  });
});

describe("DefaultPinnedTags", () => {
  it("offers the tags the quota step starts from", () => {
    expect(DefaultPinnedTags).toContain("vegetarian");
    expect(DefaultPinnedTags).toContain("bbq");
  });
});

describe("clonePlanDraft", () => {
  it("copies days, quotas and slots deeply", () => {
    const draft = emptyPlanDraft();
    draft.slots = [{ day: "monday", meal: "dinner", people: 4, recipeId: "r1" }];

    const clone = clonePlanDraft(draft);
    clone.days[0]!.people = 9;
    clone.quotas[0]!.n = 9;
    clone.slots[0]!.recipeId = "changed";

    expect(draft.days[0]!.people).toBe(4);
    expect(draft.quotas[0]!.n).toBe(2);
    expect(draft.slots[0]!.recipeId).toBe("r1");
  });
});

describe("buildPlanSlots", () => {
  it("makes one slot per meal a day calls for, lunch before dinner", () => {
    const days: PlanDay[] = [
      { day: "monday", lunch: true, dinner: true, people: 2 },
      { day: "tuesday", lunch: false, dinner: true, people: 3 },
      { day: "wednesday", lunch: false, dinner: false, people: 4 },
    ];

    expect(buildPlanSlots(days)).toEqual([
      { day: "monday", meal: "lunch", people: 2, recipeId: null },
      { day: "monday", meal: "dinner", people: 2, recipeId: null },
      { day: "tuesday", meal: "dinner", people: 3, recipeId: null },
    ]);
  });

  it("returns nothing when no day needs a meal", () => {
    expect(buildPlanSlots([{ day: "monday", lunch: false, dinner: false, people: 4 }])).toEqual([]);
  });
});

describe("generatePlanSlots", () => {
  const draft: PlanDraft = {
    days: [
      { day: "monday", lunch: false, dinner: true, people: 4 },
      { day: "tuesday", lunch: false, dinner: true, people: 4 },
      { day: "wednesday", lunch: false, dinner: true, people: 4 },
    ],
    quotas: [],
    slots: [],
  };

  it("fills every slot from the pool", () => {
    const recipes = [makeRecipe("a", ["meat"]), makeRecipe("b", ["fish"]), makeRecipe("c", ["vegetarian"])];
    const slots = generatePlanSlots(draft, recipes);

    expect(slots).toHaveLength(3);
    expect(slots.every((slot) => slot.recipeId !== null)).toBe(true);
  });

  it("leaves slots empty when there is nothing to draw from", () => {
    const slots = generatePlanSlots(draft, []);

    expect(slots).toHaveLength(3);
    expect(slots.every((slot) => slot.recipeId === null)).toBe(true);
  });

  it("returns nothing when no day needs a meal", () => {
    const noMeals: PlanDraft = { ...draft, days: [{ day: "monday", lunch: false, dinner: false, people: 4 }] };

    expect(generatePlanSlots(noMeals, [makeRecipe("a", [])])).toEqual([]);
  });

  it("honours an 'at least' quota by placing that many of the tag", () => {
    const quotaDraft: PlanDraft = { ...draft, quotas: [{ tag: "vegetarian", mode: "atleast", n: 2 }] };
    const recipes = [
      makeRecipe("v1", ["vegetarian"]),
      makeRecipe("v2", ["vegetarian"]),
      makeRecipe("m1", ["meat"]),
      makeRecipe("m2", ["meat"]),
    ];

    const slots = generatePlanSlots(quotaDraft, recipes);
    const vegetarianCount = slots.filter((slot) => slot.recipeId?.startsWith("v")).length;

    expect(vegetarianCount).toBeGreaterThanOrEqual(2);
  });

  it("respects an 'at most' cap while there are alternatives", () => {
    const quotaDraft: PlanDraft = { ...draft, quotas: [{ tag: "meat", mode: "atmost", n: 1 }] };
    const recipes = [
      makeRecipe("m1", ["meat"]),
      makeRecipe("v1", ["vegetarian"]),
      makeRecipe("v2", ["vegetarian"]),
      makeRecipe("v3", ["vegetarian"]),
    ];

    const slots = generatePlanSlots(quotaDraft, recipes);
    const meatCount = slots.filter((slot) => slot.recipeId === "m1").length;

    expect(meatCount).toBeLessThanOrEqual(1);
  });

  it("stops placing a quota tag no recipe carries", () => {
    const quotaDraft: PlanDraft = { ...draft, quotas: [{ tag: "nothing-has-this", mode: "atleast", n: 2 }] };
    const slots = generatePlanSlots(quotaDraft, [makeRecipe("a", ["meat"])]);

    expect(slots.every((slot) => slot.recipeId === "a")).toBe(true);
  });

  it("stops once every slot is spoken for, however large the quota", () => {
    const quotaDraft: PlanDraft = { ...draft, quotas: [{ tag: "meat", mode: "atleast", n: 99 }] };
    const slots = generatePlanSlots(quotaDraft, [makeRecipe("m1", ["meat"]), makeRecipe("m2", ["meat"])]);

    expect(slots).toHaveLength(3);
    expect(slots.every((slot) => slot.recipeId !== null)).toBe(true);
  });
});

describe("rerollRecipeId", () => {
  it("returns null when the pool is empty", () => {
    expect(rerollRecipeId([], "a")).toBeNull();
  });

  it("picks something other than the current recipe", () => {
    const recipes = [makeRecipe("a", []), makeRecipe("b", [])];

    expect(rerollRecipeId(recipes, "a")).toBe("b");
  });

  it("falls back to the only recipe there is", () => {
    expect(rerollRecipeId([makeRecipe("a", [])], "a")).toBe("a");
  });
});

describe("mondayOf", () => {
  it("walks back to the Monday of the week", () => {
    expect(weekKeyOf(mondayOf(WEDNESDAY))).toBe("2026-03-09");
  });

  it("leaves a Monday where it is", () => {
    const monday = new Date(2026, 2, 9, 23, 0, 0, 0);

    expect(weekKeyOf(mondayOf(monday))).toBe("2026-03-09");
  });

  it("treats Sunday as the end of the week, not the start", () => {
    const sunday = new Date(2026, 2, 15, 1, 0, 0, 0);

    expect(weekKeyOf(mondayOf(sunday))).toBe("2026-03-09");
  });
});

describe("addDays", () => {
  it("moves forwards across a month boundary", () => {
    expect(weekKeyOf(addDays(new Date(2026, 2, 30, 12), 3))).toBe("2026-04-02");
  });

  it("moves backwards", () => {
    expect(weekKeyOf(addDays(new Date(2026, 2, 2, 12), -3))).toBe("2026-02-27");
  });
});

describe("weekKeyOf", () => {
  it("pads month and day to two digits", () => {
    expect(weekKeyOf(new Date(2026, 0, 5, 12))).toBe("2026-01-05");
  });
});

describe("parseWeekKey", () => {
  it("round-trips a week key", () => {
    expect(weekKeyOf(parseWeekKey("2026-03-09"))).toBe("2026-03-09");
  });

  it("lands at midday so daylight-saving shifts cannot move the date", () => {
    expect(parseWeekKey("2026-03-09").getHours()).toBe(12);
  });

  it("falls back to the first of January on a malformed key", () => {
    // Year 0 is what a missing year parses to, which `Date` maps onto 1900.
    expect(weekKeyOf(parseWeekKey(""))).toBe("1900-01-01");
  });
});

describe("isoWeekNumber", () => {
  it("numbers a mid-March week", () => {
    expect(isoWeekNumber(new Date(2026, 2, 9, 12))).toBe(11);
  });

  it("puts 1 January 2026 in week 1", () => {
    expect(isoWeekNumber(new Date(2026, 0, 1, 12))).toBe(1);
  });

  it("puts 31 December 2024 in week 1 of the next year", () => {
    expect(isoWeekNumber(new Date(2024, 11, 31, 12))).toBe(1);
  });
});

describe("filledSlotCount", () => {
  it("counts only the slots with a recipe on them", () => {
    const slots: PlanSlot[] = [
      { day: "monday", meal: "dinner", people: 4, recipeId: "a" },
      { day: "tuesday", meal: "dinner", people: 4, recipeId: null },
      { day: "wednesday", meal: "dinner", people: 4, recipeId: "b" },
    ];

    expect(filledSlotCount(slots)).toBe(2);
  });
});

describe("formatWeekRange", () => {
  it("spans the Monday to the Sunday", () => {
    expect(formatWeekRange(new Date(2026, 2, 9, 12), "en-GB")).toBe("9 Mar – 15 Mar");
  });
});

describe("firstOfMonth", () => {
  it("moves to the first of the month", () => {
    expect(weekKeyOf(firstOfMonth(WEDNESDAY))).toBe("2026-03-01");
  });
});

describe("shiftMonth", () => {
  it("steps forward a month", () => {
    expect(weekKeyOf(shiftMonth(new Date(2026, 2, 1, 12), 1))).toBe("2026-04-01");
  });

  it("steps back across a year boundary", () => {
    expect(weekKeyOf(shiftMonth(new Date(2026, 0, 1, 12), -1))).toBe("2025-12-01");
  });
});

describe("buildCalendarWeeks", () => {
  it("covers the month in Monday-first rows of seven days", () => {
    const rows = buildCalendarWeeks(new Date(2026, 2, 1, 12));

    expect(rows.length).toBeGreaterThanOrEqual(4);
    expect(rows.length).toBeLessThanOrEqual(6);
    expect(rows.every((row) => row.days.length === 7)).toBe(true);
  });

  it("starts each row on the Monday it is keyed by", () => {
    const rows = buildCalendarWeeks(new Date(2026, 2, 1, 12));

    rows.forEach((row) => expect(row.days[0]!.dateKey).toBe(row.weekKey));
  });

  it("marks the days that fall outside the month", () => {
    const rows = buildCalendarWeeks(new Date(2026, 2, 1, 12));
    const allDays = rows.flatMap((row) => row.days);

    expect(allDays.some((day) => !day.isCurrentMonth)).toBe(true);
    expect(allDays.some((day) => day.isCurrentMonth)).toBe(true);
  });
});

describe("week keys relative to today", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(WEDNESDAY);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("thisWeekKey is the Monday of the current week", () => {
    expect(thisWeekKey()).toBe("2026-03-09");
  });

  it("offsetWeekKey steps whole weeks either way", () => {
    expect(offsetWeekKey(0)).toBe("2026-03-09");
    expect(offsetWeekKey(1)).toBe("2026-03-16");
    expect(offsetWeekKey(-2)).toBe("2026-02-23");
  });

  it("weekOffset reads the distance back out", () => {
    expect(weekOffset("2026-03-09")).toBe(0);
    expect(weekOffset("2026-03-16")).toBe(1);
    expect(weekOffset("2026-02-23")).toBe(-2);
  });

  it("nextUnplannedWeekKey opens on this week when nothing is planned", () => {
    expect(nextUnplannedWeekKey([])).toBe("2026-03-09");
  });

  it("nextUnplannedWeekKey skips the weeks already planned", () => {
    expect(nextUnplannedWeekKey(["2026-03-09", "2026-03-16"])).toBe("2026-03-23");
  });

  it("nextUnplannedWeekKey falls back to next week when a year is full", () => {
    const fullYear = Array.from({ length: 52 }, (_, offset) => offsetWeekKey(offset));

    expect(nextUnplannedWeekKey(fullYear)).toBe("2026-03-16");
  });

  it("marks today inside the calendar it builds", () => {
    const rows = buildCalendarWeeks(new Date(2026, 2, 1, 12));

    expect(rows.flatMap((row) => row.days).some((day) => day.isToday)).toBe(true);
  });
});
