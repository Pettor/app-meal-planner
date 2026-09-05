import { describe, expect, it } from "vitest";
import { buildShoppingList, formatShoppingAmount } from "./ShoppingUtils";
import type { PlanSlot, SavedPlan } from "~/core/plan/PlanTypes";
import type { Recipe, RecipeIngredient } from "~/core/recipes/RecipeTypes";

function makeRecipe(id: string, servings: number, ingredients: RecipeIngredient[]): Recipe {
  return {
    id,
    title: `Recipe ${id}`,
    tags: [],
    servings,
    timeMinutes: 30,
    photoUrl: null,
    ingredients,
    steps: [],
    author: { id: "me", name: "Me", handle: "@me", avatarUrl: null, color: "#fff" },
    isSaved: true,
  };
}

function makePlan(slots: PlanSlot[]): SavedPlan {
  return { status: "final", savedAt: "2026-03-09", draft: { days: [], quotas: [], slots } };
}

const PASTA = makeRecipe("pasta", 4, [
  { quantity: 300, unit: "g", item: "pasta" },
  { quantity: null, unit: "", item: "salt" },
]);

describe("buildShoppingList", () => {
  it("returns nothing when no week is planned", () => {
    expect(buildShoppingList(null, [PASTA])).toEqual([]);
  });

  it("scales a meal's ingredients to the people eating it", () => {
    const plan = makePlan([{ day: "monday", meal: "dinner", people: 2, recipeId: "pasta" }]);
    const lines = buildShoppingList(plan, [PASTA]);

    expect(lines.find((line) => line.item === "pasta")?.quantity).toBe(150);
  });

  it("sums the same ingredient across meals", () => {
    const plan = makePlan([
      { day: "monday", meal: "dinner", people: 4, recipeId: "pasta" },
      { day: "tuesday", meal: "dinner", people: 4, recipeId: "pasta" },
    ]);

    expect(buildShoppingList(plan, [PASTA]).find((line) => line.item === "pasta")?.quantity).toBe(600);
  });

  it("keeps the same item under different units apart", () => {
    const cream = makeRecipe("cream", 4, [{ quantity: 2, unit: "dl", item: "pasta" }]);
    const plan = makePlan([
      { day: "monday", meal: "dinner", people: 4, recipeId: "pasta" },
      { day: "tuesday", meal: "dinner", people: 4, recipeId: "cream" },
    ]);

    expect(buildShoppingList(plan, [PASTA, cream]).filter((line) => line.item === "pasta")).toHaveLength(2);
  });

  it("flags an ingredient written without an amount", () => {
    const plan = makePlan([{ day: "monday", meal: "dinner", people: 4, recipeId: "pasta" }]);

    expect(buildShoppingList(plan, [PASTA]).find((line) => line.item === "salt")?.hasUnmeasured).toBe(true);
  });

  it("skips a slot with no recipe on it", () => {
    const plan = makePlan([{ day: "monday", meal: "dinner", people: 4, recipeId: null }]);

    expect(buildShoppingList(plan, [PASTA])).toEqual([]);
  });

  it("skips a slot whose recipe is not in the pool", () => {
    const plan = makePlan([{ day: "monday", meal: "dinner", people: 4, recipeId: "gone" }]);

    expect(buildShoppingList(plan, [PASTA])).toEqual([]);
  });

  it("treats a recipe written for nobody as written for one", () => {
    const odd = makeRecipe("odd", 0, [{ quantity: 10, unit: "g", item: "yeast" }]);
    const plan = makePlan([{ day: "monday", meal: "dinner", people: 3, recipeId: "odd" }]);

    expect(buildShoppingList(plan, [odd])[0]?.quantity).toBe(30);
  });

  it("sorts the lines by their key", () => {
    const plan = makePlan([{ day: "monday", meal: "dinner", people: 4, recipeId: "pasta" }]);

    expect(buildShoppingList(plan, [PASTA]).map((line) => line.item)).toEqual(["pasta", "salt"]);
  });
});

describe("formatShoppingAmount", () => {
  it("renders a measured line with its unit", () => {
    expect(
      formatShoppingAmount({ key: "pasta|g", item: "pasta", unit: "g", quantity: 600, hasUnmeasured: false })
    ).toBe("600 g");
  });

  it("renders a countable line without a unit", () => {
    expect(formatShoppingAmount({ key: "onion|", item: "onion", unit: "", quantity: 2, hasUnmeasured: false })).toBe(
      "2"
    );
  });

  it("falls back to the unit when nothing was measured", () => {
    expect(
      formatShoppingAmount({ key: "salt|to taste", item: "salt", unit: "to taste", quantity: 0, hasUnmeasured: true })
    ).toBe("to taste");
  });

  it("flags a line that also turns up without an amount", () => {
    expect(
      formatShoppingAmount({ key: "oil|dl", item: "olive oil", unit: "dl", quantity: 1, hasUnmeasured: true })
    ).toBe("1 dl +");
  });
});
