import { mocksClient } from "@package/mocks";
import { planThisWeek } from "../plan-a-week";
import { expect, test } from "../fixtures";

test.describe("shopping.list", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("has nothing to shop for until a week is planned", async ({ page }) => {
    await page.goto("/#/shopping");
    await expect(async () => {
      expect(await page.title()).toBe("Shopping list");
    }).toPass();

    await expect(page.getByText("Plan a week first and the list builds itself.")).toBeVisible();
    await expect(page.getByText("· No week planned")).toBeVisible();
    await expect(page.getByTestId("shopping-list__row")).toHaveCount(0);
  });

  test("rolls the planned week up into a list to shop from", async ({ page }) => {
    await planThisWeek(page);

    await page.goto("/#/shopping");
    await expect(async () => {
      expect(await page.title()).toBe("Shopping list");
    }).toPass();

    const rows = page.getByTestId("shopping-list__row");
    await expect(rows.first()).toBeVisible();
    const lineCount = await rows.count();
    expect(lineCount).toBeGreaterThan(0);
    await expect(page.getByText(`· ${lineCount} lines for the planned week`)).toBeVisible();

    // Ticking a line off survives a reload — the ticks are the only part stored.
    await rows.first().click();
    await expect(page.getByRole("checkbox").first()).toBeChecked();

    await page.reload();
    await expect(page.getByRole("checkbox").first()).toBeChecked();

    await rows.first().click();
    await expect(page.getByRole("checkbox").first()).not.toBeChecked();
  });

  test("prints the list", async ({ page }) => {
    // window.print() would block the browser on a native dialog.
    await page.addInitScript(() => {
      window.print = (): void => {
        (window as unknown as { __printed?: boolean }).__printed = true;
      };
    });

    await page.goto("/#/shopping");
    await expect(async () => {
      expect(await page.title()).toBe("Shopping list");
    }).toPass();

    await page.getByTestId("shopping-page__print-list").click();

    expect(await page.evaluate(() => (window as unknown as { __printed?: boolean }).__printed)).toBe(true);
  });
});
