import { mocksClient } from "@package/mocks";
import { expect, test } from "../fixtures";

test.describe("general.settings", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("opens settings modal, checks all sections and switches themes", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Recipes");
    }).toPass();

    // Open quick menu via avatar button, then open settings
    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("quick-menu__settings-button").click();

    // Settings dialog should be visible
    const dialog = page.getByRole("dialog", { name: "Settings" });
    await expect(dialog).toBeVisible();

    // All three section tabs should be present
    await expect(page.getByRole("tab", { name: "Account" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Appearance" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "About" })).toBeVisible();

    // Navigate to Appearance tab and cycle through themes
    await page.getByRole("tab", { name: "Appearance" }).click();

    await page.getByRole("radio", { name: "Light" }).click({ force: true });
    await expect(page.locator("html")).toHaveClass("light");

    await page.getByRole("radio", { name: "Dark" }).click({ force: true });
    await expect(page.locator("html")).toHaveClass("dark");

    // Auto resolves based on system preference — verify the radio is selected
    await page.getByRole("radio", { name: "Auto" }).click({ force: true });
    await expect(page.getByRole("radio", { name: "Auto" })).toBeChecked();

    // Navigate to Account tab and verify it becomes active
    await page.getByRole("tab", { name: "Account" }).click();
    await expect(page.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-selected", "true");

    // Navigate to About tab and verify it becomes active
    await page.getByRole("tab", { name: "About" }).click();
    await expect(page.getByRole("tab", { name: "About" })).toHaveAttribute("aria-selected", "true");

    // Close the modal
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });
});

test.describe("general.commandpalette", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("navigates to this week using command palette", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Recipes");
    }).toPass();

    // Open command palette via quick menu
    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("quick-menu__search-button").click();

    const search = page.getByTestId("command-palette__search");
    await expect(search).toBeVisible();

    // Search for the week command and execute it
    await search.fill("this week");
    const weekItem = page.getByTestId("command-palette__item-goto-week");
    await expect(weekItem).toBeVisible();
    await weekItem.click();

    await expect(async () => {
      expect(await page.title()).toBe("This week");
    }).toPass();
  });

  test("switches to dark theme via command palette", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Recipes");
    }).toPass();

    // Open command palette via quick menu
    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("quick-menu__search-button").click();

    const search = page.getByTestId("command-palette__search");
    await expect(search).toBeVisible();

    // Search for dark theme command and apply it
    await search.fill("dark");
    const darkItem = page.getByTestId("command-palette__item-theme-dark");
    await expect(darkItem).toBeVisible();
    await darkItem.click();

    await expect(page.locator("html")).toHaveClass("dark");
  });

  test("shows no results for unmatched search query", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Recipes");
    }).toPass();

    // Open command palette via quick menu
    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("quick-menu__search-button").click();

    const search = page.getByTestId("command-palette__search");
    await expect(search).toBeVisible();

    // Type a query that matches no commands
    await search.fill("zzznomatch");
    await expect(page.getByText("No commands found")).toBeVisible();
  });
});

test.describe("general.language", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("switches the interface to Swedish and back to English", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Recipes");
    }).toPass();

    // Open quick menu via avatar button, then open settings
    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("quick-menu__settings-button").click();

    await expect(page.getByRole("dialog", { name: "Settings" })).toBeVisible();

    // Pick Swedish from the Language section
    await page.getByRole("tab", { name: "Language" }).click();
    await page.getByRole("button", { name: "Svenska" }).click();

    // The modal around the toggle re-renders in Swedish
    await expect(page.getByRole("dialog", { name: "Inställningar" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Språk" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Utseende" })).toBeVisible();

    await page.keyboard.press("Escape");

    // …and so does the app behind it, including the document title
    await expect(async () => {
      expect(await page.title()).toBe("Recept");
    }).toPass();

    const nav = page.getByRole("navigation", { name: "Navigering" });
    await expect(nav.getByRole("button", { name: "Recept" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Planera" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Denna vecka" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Inköp" })).toBeVisible();

    // Swedish compounds the two-part page heading, so it must not read "Recept samling"
    await expect(page.getByRole("heading", { name: "Samlade recept" })).toBeVisible();

    // The choice is persisted, so it survives a reload
    await page.reload();
    await expect(async () => {
      expect(await page.title()).toBe("Recept");
    }).toPass();
    await expect(page.getByRole("heading", { name: "Samlade recept" })).toBeVisible();

    // Switching back leaves the app in English again
    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("quick-menu__settings-button").click();
    await page.getByRole("tab", { name: "Språk" }).click();
    await page.getByRole("button", { name: "English" }).click();

    await expect(page.getByRole("dialog", { name: "Settings" })).toBeVisible();
    await page.keyboard.press("Escape");

    await expect(async () => {
      expect(await page.title()).toBe("Recipes");
    }).toPass();
    await expect(page.getByRole("heading", { name: "Recipe pool" })).toBeVisible();
  });
});
