import { mocksClient } from "@package/mocks";
import { expect, test } from "../fixtures";

test.describe("dashboard.panels", () => {
  test.beforeEach(async ({ page }) => {
    await mocksClient.restoreRouteVariants();
    await page.goto("/#/dashboard");
    await expect(async () => {
      expect(await page.title()).toBe("Dashboard");
    }).toPass();
  });

  test("shows the headline metrics and the revenue chart", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Key Metrics" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Revenue overview" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Revenue and expenses chart" })).toBeVisible();

    // The chart redraws for each range the panel offers.
    for (const range of ["30d", "3m", "12m", "6m"]) {
      await page.getByRole("button", { name: range, exact: true }).click();
      await expect(page.getByRole("img", { name: "Revenue and expenses chart" })).toBeVisible();
    }
  });

  test("filters and sorts the transactions table", async ({ page }) => {
    const rows = page.getByRole("button", { name: "Row actions" });
    await expect(rows).toHaveCount(7);

    await page.getByRole("button", { name: "Completed 4" }).click();
    await expect(rows).toHaveCount(4);

    await page.getByRole("button", { name: "Pending 2" }).click();
    await expect(rows).toHaveCount(2);

    await page.getByRole("button", { name: "All 7" }).click();
    await expect(rows).toHaveCount(7);

    // Searching narrows the same list.
    await page.getByRole("textbox", { name: "Search transactions" }).fill("Maya");
    await expect(rows).toHaveCount(1);
    await page.getByRole("textbox", { name: "Search transactions" }).fill("");

    // Each sortable column can be clicked, and clicking again reverses it.
    for (const column of ["Customer", "Amount", "Date"]) {
      await page.getByRole("button", { name: column, exact: true }).click();
      await page.getByRole("button", { name: column, exact: true }).click();
    }
    await expect(rows).toHaveCount(7);
  });

  test("shows the insight banner and its actions", async ({ page }) => {
    await expect(page.getByText("Revenue is 20.1% above target this month", { exact: false })).toBeVisible();
    await expect(page.getByText("Conversion rate slipped 0.3pp", { exact: false })).toBeVisible();

    // Neither action is wired to anything yet, so this only checks they are offered.
    await expect(page.getByRole("button", { name: "View analysis" })).toBeEnabled();
    await expect(page.locator("main").getByRole("button", { name: "Dismiss" })).toBeEnabled();
  });

  test("offers the header and engagement panels", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Filters" })).toBeEnabled();
    await expect(page.getByRole("button", { name: "Export report" })).toBeEnabled();

    await expect(page.getByRole("heading", { name: "Engagement" })).toBeVisible();
    await expect(page.getByText("Acquisition channels")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Activity feed" })).toBeVisible();
  });
});
