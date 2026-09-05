import { mocksClient } from "@package/mocks";
import type { Page } from "@playwright/test";
import { expect, test } from "../fixtures";

async function gotoPlan(page: Page): Promise<void> {
  await page.goto("/#/plan");
  await expect(async () => {
    expect(await page.title()).toBe("Plan");
  }).toPass();
}

/** Walks the wizard to the review step with a randomized week on it. */
async function randomizeWeek(page: Page): Promise<void> {
  await page.getByTestId("plan__next").click();
  await page.getByTestId("plan__next").click();
  await page.getByTestId("plan__randomize").click();
  await expect(page.getByTestId("plan__reroll-all")).toBeVisible();
}

test.describe("plan.days", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("sets which meals each day needs, and for how many", async ({ page }) => {
    await gotoPlan(page);

    // A fresh week is dinner every day, four people — seven meals, 28 plates.
    await expect(page.getByText("7 meals · 28 plates")).toBeVisible();

    await page.getByRole("button", { name: "Lunch" }).first().click();
    await expect(page.getByText("8 meals · 32 plates")).toBeVisible();

    await page.getByRole("button", { name: "More people on Monday" }).click();
    await expect(page.getByText("8 meals · 34 plates")).toBeVisible();

    await page.getByRole("button", { name: "Fewer people on Monday" }).click();
    await expect(page.getByText("8 meals · 32 plates")).toBeVisible();

    // Copying Monday's setup spreads lunch across the whole week.
    await page.getByRole("button", { name: "Copy Monday's setup to all days" }).click();
    await expect(page.getByText("14 meals · 56 plates")).toBeVisible();

    // A day with neither meal drops out of the count entirely.
    await page.getByRole("button", { name: "Lunch" }).first().click();
    await page.getByRole("button", { name: "Dinner" }).first().click();
    await expect(page.getByText("12 meals · 48 plates")).toBeVisible();
  });

  test("picks the week to plan from the calendar", async ({ page }) => {
    await gotoPlan(page);

    const weekLine = page.getByText(/^Planning week \d+ .* · This week$/);
    await expect(weekLine).toBeVisible();

    await page.getByTestId("plan__pick-week").click();
    const dialog = page.getByRole("dialog", { name: "Schedule" });
    await expect(dialog).toBeVisible();

    // The calendar can be walked a month either way and brought back to today.
    const month = dialog.getByText(/^\w+ \d{4}$/);
    const openingMonth = await month.textContent();

    await dialog.getByRole("button", { name: "Next month" }).click();
    await expect(month).not.toHaveText(openingMonth ?? "");

    await dialog.getByRole("button", { name: "Previous month" }).click();
    await expect(month).toHaveText(openingMonth ?? "");

    // Picking any week closes the calendar and moves the wizard onto it.
    await dialog.getByRole("button", { name: /^\d+ / }).last().click();
    await expect(dialog).toBeHidden();

    await page.getByTestId("plan__pick-week").click();
    await dialog.getByRole("button", { name: "Back to this week" }).click();
    await expect(dialog).toBeHidden();
    await expect(weekLine).toBeVisible();
  });
});

test.describe("plan.quotas", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("adjusts, cycles and removes the quotas on a week", async ({ page }) => {
    await gotoPlan(page);
    await page.getByTestId("plan__next").click();

    await expect(page.getByRole("heading", { name: "Quotas for the week" })).toBeVisible();

    // Each quota's mode cycles at least → exactly → at most → at least.
    const vegetarianMode = page.getByRole("button", { name: "at least" }).first();
    await vegetarianMode.click();
    await expect(page.getByRole("button", { name: "exactly" })).toBeVisible();
    await page.getByRole("button", { name: "exactly" }).click();
    await expect(page.getByRole("button", { name: "at most" })).toBeVisible();
    await page.getByRole("button", { name: "at most" }).click();

    await page.getByRole("button", { name: "More vegetarian" }).click();
    await page.getByRole("button", { name: "Fewer vegetarian" }).click();

    await page.getByRole("button", { name: "Remove bbq quota" }).click();
    await expect(page.getByRole("button", { name: "Remove bbq quota" })).toBeHidden();

    await page.getByRole("button", { name: "Remove vegetarian quota" }).click();
    await expect(page.getByText("No quotas yet, the week will be filled at random.")).toBeVisible();
  });

  test("adds a quota from your tags, from a search, and from a new tag", async ({ page }) => {
    await gotoPlan(page);
    await page.getByTestId("plan__next").click();

    // A pinned tag becomes a quota in one click, and leaves the chip list.
    await page.getByRole("button", { name: /^meat / }).click();
    await expect(page.getByRole("button", { name: "Remove meat quota" })).toBeVisible();

    const search = page.getByRole("textbox", { name: "Search community tags" });
    await search.fill("pasta");
    await page.getByRole("button", { name: /^pasta / }).click();
    await expect(page.getByRole("button", { name: "Remove pasta quota" })).toBeVisible();

    // A tag nobody in the community uses can still be created on the spot.
    await search.fill("zzznomatch");
    await expect(page.getByText("No community tag matches that.")).toBeVisible();
    await page.getByRole("button", { name: 'Create "zzznomatch"' }).click();
    await expect(page.getByRole("button", { name: "Remove zzznomatch quota" })).toBeVisible();
  });

  test("edits the pinned tags and browses the whole catalogue", async ({ page }) => {
    await gotoPlan(page);
    await page.getByTestId("plan__next").click();

    await page.getByRole("button", { name: "Edit your default tags" }).click();
    let dialog = page.getByRole("dialog", { name: "Community tags" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Done" }).click();
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: "Browse all tags" }).click();
    dialog = page.getByRole("dialog", { name: "Community tags" });
    await expect(dialog).toBeVisible();

    // Ticking a tag here adds it as a quota behind the dialog.
    await dialog.getByRole("button", { name: /^chicken/ }).click();
    await dialog.getByRole("button", { name: "Done" }).click();
    await expect(page.getByRole("button", { name: "Remove chicken quota" })).toBeVisible();
  });
});

test.describe("plan.fill", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("starts from an empty week and picks a recipe by hand", async ({ page }) => {
    await gotoPlan(page);
    await page.getByTestId("plan__next").click();
    await page.getByTestId("plan__next").click();

    await expect(page.getByRole("heading", { name: "7 meals to fill" })).toBeVisible();
    await page.getByTestId("plan__start-empty").click();

    // Nothing is filled in, so every one of the seven rows offers a recipe picker.
    const pickers = page.getByRole("button", { name: "Pick a recipe" });
    await expect(pickers).toHaveCount(7);
    await pickers.first().click();

    const dialog = page.getByRole("dialog", { name: /^Pick a recipe/ });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /Mushroom risotto/ }).click();

    await expect(dialog).toBeHidden();
    await expect(pickers).toHaveCount(6);
  });

  test("skipping the fill step leaves an empty week to refine", async ({ page }) => {
    await gotoPlan(page);
    await page.getByTestId("plan__next").click();
    await page.getByTestId("plan__next").click();

    await page.getByTestId("plan__next").click();
    await expect(page.getByTestId("plan__reroll-all")).toBeVisible();
  });
});

test.describe("plan.refine", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("rerolls, swaps and clears the meals on a randomized week", async ({ page }) => {
    await gotoPlan(page);
    await randomizeWeek(page);

    // Every slot is filled, so the quota status reads against the quotas.
    await expect(page.getByText(/vegetarian \d+\/2/)).toBeVisible();

    await page.getByRole("button", { name: "Reroll", exact: true }).first().click();
    await page.getByTestId("plan__reroll-all").click();

    // Clearing a slot empties that one row.
    await page.getByRole("button", { name: "Clear", exact: true }).first().click();
    await expect(page.getByRole("button", { name: "Pick a recipe" }).first()).toBeVisible();

    // The swap dialog filters the pool by search and by tag before picking.
    await page.getByRole("button", { name: "Swap", exact: true }).first().click();
    const dialog = page.getByRole("dialog", { name: /^Pick a recipe/ });
    await expect(dialog).toBeVisible();

    const search = dialog.getByRole("textbox", { name: "Search recipes" });
    await search.fill("zzznomatch");
    await expect(dialog.getByText("No recipes match that search.")).toBeVisible();

    await search.fill("");
    await dialog.getByRole("button", { name: "vegetarian", exact: true }).click();
    await dialog.getByRole("button", { name: /Red lentil dal/ }).click();
    await expect(dialog).toBeHidden();
  });

  test("switches the review between the list and the week grid", async ({ page }) => {
    await gotoPlan(page);
    await randomizeWeek(page);

    await page.getByRole("button", { name: "Week grid" }).click();
    await expect(page.getByRole("button", { name: "Week grid" })).toHaveAttribute("aria-pressed", "true");

    // The grid lays the same week out day by day, and still rerolls a single meal.
    await page.getByRole("button", { name: "Reroll", exact: true }).first().click();

    await page.getByRole("button", { name: "List" }).click();
    await expect(page.getByRole("button", { name: "List" })).toHaveAttribute("aria-pressed", "true");
  });

  test("steps back through the wizard without losing the week", async ({ page }) => {
    await gotoPlan(page);
    await randomizeWeek(page);

    await page.getByTestId("plan__back").click();
    await expect(page.getByRole("heading", { name: "7 meals to fill" })).toBeVisible();

    await page.getByTestId("plan__back").click();
    await expect(page.getByRole("heading", { name: "Quotas for the week" })).toBeVisible();

    await page.getByTestId("plan__back").click();
    await expect(page.getByText("7 meals · 28 plates")).toBeVisible();

    // Step 1 is the start, so there is nothing further back to go.
    await expect(page.getByTestId("plan__back")).toBeHidden();
  });

  test("saves the week as a draft and lands on the week page", async ({ page }) => {
    await gotoPlan(page);
    await randomizeWeek(page);

    await page.getByTestId("plan__save-draft").click();

    await expect(async () => {
      expect(await page.title()).toBe("This week");
    }).toPass();
    await expect(page.getByText("Still a draft.", { exact: false })).toBeVisible();
  });

  test("saves the week as planned and lands on the week page", async ({ page }) => {
    await gotoPlan(page);
    await randomizeWeek(page);

    await page.getByTestId("plan__next").click();

    await expect(async () => {
      expect(await page.title()).toBe("This week");
    }).toPass();
    await expect(page.getByRole("heading", { name: /^This week$/ })).toBeVisible();

    // Reopening the planner on a week that already has one continues it.
    await page.goto("/#/plan");
    await expect(page.getByText("This week already has a plan. Continuing edits it.")).toBeVisible();
  });
});
