import { describe, expect, it } from "vitest";
import type { Recipe, RecipeIngredient } from "./RecipeTypes";
import { authorInitials, collectTags, formatAmount, scaleIngredients, tagTone } from "./RecipeUtils";

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

describe("tagTone", () => {
  it("reads diet tags as green", () => {
    expect(tagTone("vegetarian")).toBe("success");
    expect(tagTone("vegan")).toBe("success");
  });

  it("reads meat as red and fish as accent", () => {
    expect(tagTone("meat")).toBe("danger");
    expect(tagTone("fish")).toBe("accent");
  });

  it("falls back to neutral for anything unrecognised", () => {
    expect(tagTone("something-else")).toBe("default");
  });
});

describe("formatAmount", () => {
  it("returns just the unit when there is no quantity", () => {
    expect(formatAmount(null, "to taste")).toBe("to taste");
  });

  it("joins the quantity and the unit", () => {
    expect(formatAmount(300, "g")).toBe("300 g");
  });

  it("drops the unit for countable items", () => {
    expect(formatAmount(2, "")).toBe("2");
  });

  it("rounds a scaled amount to two decimals", () => {
    expect(formatAmount(225.0000001, "g")).toBe("225 g");
    expect(formatAmount(66.666666, "g")).toBe("66.67 g");
  });
});

describe("scaleIngredients", () => {
  const ingredients: RecipeIngredient[] = [
    { quantity: 300, unit: "g", item: "pasta" },
    { quantity: null, unit: "", item: "salt" },
  ];

  it("scales measured amounts and leaves unmeasured ones alone", () => {
    expect(scaleIngredients(ingredients, 4, 2)).toEqual([
      { quantity: 150, unit: "g", item: "pasta" },
      { quantity: null, unit: "", item: "salt" },
    ]);
  });

  it("scales up as well as down", () => {
    expect(scaleIngredients(ingredients, 4, 6)[0]!.quantity).toBe(450);
  });

  it("treats a recipe written for nobody as written for one", () => {
    expect(scaleIngredients(ingredients, 0, 2)[0]!.quantity).toBe(600);
  });

  it("leaves the originals untouched", () => {
    scaleIngredients(ingredients, 4, 8);

    expect(ingredients[0]!.quantity).toBe(300);
  });
});

describe("collectTags", () => {
  it("gathers every distinct tag, alphabetically", () => {
    const recipes = [makeRecipe("a", ["meat", "quick"]), makeRecipe("b", ["quick", "cheap"])];

    expect(collectTags(recipes)).toEqual(["cheap", "meat", "quick"]);
  });

  it("returns nothing for an empty pool", () => {
    expect(collectTags([])).toEqual([]);
  });
});

describe("authorInitials", () => {
  it("takes the first letter of each name", () => {
    expect(authorInitials("Petter Hancock")).toBe("PH");
  });

  it("stops at two letters", () => {
    expect(authorInitials("Ada Grace King Lovelace")).toBe("AG");
  });

  it("handles a single name", () => {
    expect(authorInitials("Ada")).toBe("A");
  });

  it("survives an empty name", () => {
    expect(authorInitials("")).toBe("");
  });

  it("ignores the gaps in a doubly-spaced name", () => {
    expect(authorInitials("Ada  Lovelace")).toBe("AL");
  });
});
