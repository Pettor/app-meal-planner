import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

/**
 * Plans the week the app is currently on, through the wizard, and leaves the
 * browser on the week page.
 *
 * The plan store has no service behind it yet, so a planned week can only be
 * created the way a cook would — by walking the wizard. Specs for the week and
 * shopping pages need one to look at, so they start here.
 */
export async function planThisWeek(page: Page, status: "final" | "draft" = "final"): Promise<void> {
  await page.goto("/#/plan");
  await expect(async () => {
    expect(await page.title()).toBe("Plan");
  }).toPass();

  await page.getByTestId("plan__next").click();
  await page.getByTestId("plan__next").click();
  await page.getByTestId("plan__randomize").click();
  await expect(page.getByTestId("plan__reroll-all")).toBeVisible();

  await page.getByTestId(status === "final" ? "plan__next" : "plan__save-draft").click();

  await expect(async () => {
    expect(await page.title()).toBe("This week");
  }).toPass();
}
