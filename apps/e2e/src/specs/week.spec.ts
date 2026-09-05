import { mocksClient } from "@package/mocks";
import type { Page } from "@playwright/test";
import { planThisWeek } from "../plan-a-week";
import { expect, test } from "../fixtures";

async function gotoWeek(page: Page): Promise<void> {
  await page.goto("/#/week");
  await expect(async () => {
    expect(await page.title()).toBe("This week");
  }).toPass();
}

test.describe("week.empty", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("invites the cook to plan a week that has none", async ({ page }) => {
    await gotoWeek(page);

    await expect(page.getByRole("heading", { name: "No week planned yet" })).toBeVisible();
    await expect(page.getByText("· not planned")).toBeVisible();

    // With nothing planned there is nothing to print or edit either.
    await expect(page.getByRole("button", { name: "Print week" })).toBeHidden();
    await expect(page.getByRole("button", { name: "Edit week" })).toBeHidden();

    await page.getByTestId("week-page__plan-week").click();
    await expect(async () => {
      expect(await page.title()).toBe("Plan");
    }).toPass();
  });

  test("steps between weeks and back to this one", async ({ page }) => {
    await gotoWeek(page);

    const subtitle = page.getByText(/^week \d+ · /);
    const openingWeek = await subtitle.textContent();

    await page.getByRole("button", { name: "Next week" }).click();
    await expect(page.getByRole("heading", { name: "Next week" })).toBeVisible();

    await page.getByRole("button", { name: "Previous week" }).click();
    await expect(subtitle).toHaveText(openingWeek ?? "");

    // Two weeks back is neither "this" nor "next", so it reads as a week number.
    await page.getByRole("button", { name: "Previous week" }).click();
    await page.getByRole("button", { name: "Previous week" }).click();
    await expect(page.getByRole("heading", { name: /^Week \d+$/ })).toBeVisible();
  });
});

test.describe("week.planned", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("shows the planned week, its figures and its meals", async ({ page }) => {
    await planThisWeek(page);

    await expect(page.getByText("across the week")).toBeVisible();
    await expect(page.getByText("portions in total")).toBeVisible();
    await expect(page.getByText("of all meals")).toBeVisible();
    await expect(page.getByText(/· 7 meals · 28 plates · planned /)).toBeVisible();

    // Every day of the week is on the page, with its meals under it.
    await expect(page.getByText("Monday", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Sunday", { exact: true }).first()).toBeVisible();

    // A meal card opens the recipe behind it.
    await page
      .getByRole("button", { name: /^Open / })
      .first()
      .click();
    await expect(page.getByTestId("recipe-detail__back")).toBeVisible();
  });

  test("marks a draft week as planned", async ({ page }) => {
    await planThisWeek(page, "draft");

    await expect(page.getByText("Still a draft.", { exact: false })).toBeVisible();
    await expect(page.getByText("· draft")).toBeVisible();

    await page.getByRole("button", { name: "Mark as planned" }).click();

    await expect(page.getByText("Still a draft.", { exact: false })).toBeHidden();
    await expect(page.getByText(/· planned /)).toBeVisible();
  });

  test("edits the week in view and plans a new one from it", async ({ page }) => {
    await planThisWeek(page);

    // "Edit week" reopens the same week in the wizard, on its saved days.
    await page.getByRole("button", { name: "Edit week" }).click();
    await expect(page.getByText("This week already has a plan. Continuing edits it.")).toBeVisible();

    await gotoWeek(page);

    // "Plan a new week" jumps to the first week with nothing on it.
    await page.getByTestId("week-page__plan-week").click();
    await expect(async () => {
      expect(await page.title()).toBe("Plan");
    }).toPass();
    await expect(page.getByText("This week already has a plan. Continuing edits it.")).toBeHidden();
  });

  test("prints the week", async ({ page }) => {
    // window.print() would block the browser on a native dialog.
    await page.addInitScript(() => {
      window.print = (): void => {
        (window as unknown as { __printed?: boolean }).__printed = true;
      };
    });

    await planThisWeek(page);
    await page.getByRole("button", { name: "Print week" }).click();

    expect(await page.evaluate(() => (window as unknown as { __printed?: boolean }).__printed)).toBe(true);
  });

  test("picks another week from the calendar", async ({ page }) => {
    await planThisWeek(page);

    await page
      .locator("main")
      .getByRole("button", { name: /^This week$/ })
      .click();
    const dialog = page.getByRole("dialog", { name: "Schedule" });
    await expect(dialog).toBeVisible();

    // A finalised week carries a green status dot in the calendar, and each of
    // its planned days is dotted underneath.
    await expect(dialog.locator("span.bg-success").first()).toBeVisible();
    await expect(dialog.locator("span.bg-accent.opacity-100")).toHaveCount(7);

    await dialog.getByRole("button", { name: /^\d+ / }).first().click();
    await expect(dialog).toBeHidden();
  });
});
