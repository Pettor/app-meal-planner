import { mocksClient } from "@package/mocks";
import { expect, test } from "../fixtures";

/** Waits for the app shell to settle on the recipe library before a test touches it. */
async function gotoLibrary(page: import("@playwright/test").Page): Promise<void> {
  await page.goto("/");
  await expect(async () => {
    expect(await page.title()).toBe("Recipes");
  }).toPass();
}

test.describe("recipes.library", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("filters the cook's own pool by search and by tag", async ({ page }) => {
    await gotoLibrary(page);

    // The library opens on "Mine" — the recipes the planner draws from.
    await expect(page.getByTestId("recipe-card__r1")).toBeVisible();
    await expect(page.getByTestId("recipe-card__r3")).toBeVisible();

    const search = page.getByRole("textbox", { name: "Search recipes" });
    await search.fill("risotto");
    await expect(page.getByTestId("recipe-card__r3")).toBeVisible();
    await expect(page.getByTestId("recipe-card__r1")).toBeHidden();

    // A search nothing matches falls through to the empty state.
    await search.fill("zzznomatch");
    await expect(page.getByText("No recipes match that search.")).toBeVisible();

    await search.fill("");
    await expect(page.getByTestId("recipe-card__r1")).toBeVisible();

    // Tag chips narrow the same list.
    const vegetarianChip = page.getByRole("button", { name: "vegetarian", exact: true });
    await vegetarianChip.click();
    await expect(page.getByTestId("recipe-card__r1")).toBeVisible();
    await expect(page.getByTestId("recipe-card__r2")).toBeHidden();

    await vegetarianChip.click();
    await expect(page.getByTestId("recipe-card__r2")).toBeVisible();
  });

  test("saves a community recipe into the cook's own pool", async ({ page }) => {
    await gotoLibrary(page);

    await page.getByRole("button", { name: "Everyone", exact: true }).click();

    // Someone else's recipe is offered with a save action rather than a remove one.
    const save = page.getByTestId("recipe-card__save--c1");
    await expect(save).toBeVisible();
    await save.click();

    await expect(page.getByTestId("recipe-card__save--c1")).toBeHidden();
    await expect(page.getByTestId("recipe-card__c1").getByText("In your recipes")).toBeVisible();

    // And it is now part of the cook's own pool.
    await page.getByRole("button", { name: "Mine", exact: true }).click();
    await expect(page.getByTestId("recipe-card__c1")).toBeVisible();
  });

  test("asks before deleting one of the cook's own recipes", async ({ page }) => {
    await gotoLibrary(page);

    await page.getByTestId("recipe-card__remove--r6").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText("Delete this recipe?")).toBeVisible();

    // Backing out leaves the recipe where it was.
    await dialog.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByTestId("recipe-card__r6")).toBeVisible();

    await page.getByTestId("recipe-card__remove--r6").click();
    await page.getByTestId("confirm-dialog__confirm").click();
    await expect(page.getByTestId("recipe-card__r6")).toBeHidden();
  });

  test("opens the add-recipe form over the library and closes it again", async ({ page }) => {
    await gotoLibrary(page);

    await page.getByTestId("recipe-library__add-recipe").click();

    const dialog = page.getByRole("dialog", { name: "New recipe" });
    await expect(dialog).toBeVisible();

    // A new recipe has no tags yet, so saving is refused and says why.
    await page.getByTestId("recipe-edit__save").click();
    await expect(dialog).toBeVisible();
    await expect(page.getByTestId("recipe-edit__tag-error")).toBeVisible();

    // Picking a tag clears the error and lets the save through.
    await dialog.getByRole("button", { name: "vegetarian", exact: true }).click();
    await expect(page.getByTestId("recipe-edit__tag-error")).toBeHidden();

    await page.getByTestId("recipe-edit__save").click();
    await expect(dialog).toBeHidden();

    await page.getByTestId("recipe-library__add-recipe").click();
    await expect(dialog).toBeVisible();
    await page.getByTestId("recipe-edit__cancel").click();
    await expect(dialog).toBeHidden();
  });
});

test.describe("recipes.detail", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("scales a recipe to the number of people cooking", async ({ page }) => {
    await gotoLibrary(page);

    await page
      .getByTestId("recipe-card__r3")
      .getByRole("button", { name: /^Open / })
      .click();

    await expect(async () => {
      expect(await page.title()).toBe("Mushroom risotto");
    }).toPass();

    const servings = page.getByTestId("recipe-detail__servings");
    await expect(servings).toHaveText("4 people");

    await page.getByRole("button", { name: "Cook for more people" }).click();
    await expect(servings).toHaveText("5 people");

    await page.getByRole("button", { name: "Cook for fewer people" }).click();
    await page.getByRole("button", { name: "Cook for fewer people" }).click();
    await expect(servings).toHaveText("3 people");

    await page.getByTestId("recipe-detail__back").click();
    await expect(async () => {
      expect(await page.title()).toBe("Recipes");
    }).toPass();
  });

  test("offers a save action on a recipe the cook does not own", async ({ page }) => {
    await page.goto("/#/recipes/c4");

    await expect(async () => {
      expect(await page.title()).toBe("Smoked pork shoulder");
    }).toPass();

    await expect(page.getByTestId("recipe-detail__save")).toBeVisible();
    await expect(page.getByTestId("recipe-detail__remove")).toBeHidden();
  });

  test("shows a not-found page for a recipe that does not exist", async ({ page }) => {
    await page.goto("/#/recipes/does-not-exist");

    await expect(page.getByText("Something went wrong!")).toBeVisible();
  });
});

test.describe("recipes.edit", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("edits ingredients, steps and tags on an existing recipe", async ({ page }) => {
    await page.goto("/#/recipes/edit/r1");

    await expect(async () => {
      expect(await page.title()).toBe("Edit recipe");
    }).toPass();

    // The form opens on the recipe as it stands.
    await expect(page.getByRole("textbox", { name: "Title" })).toHaveValue("Red lentil dal");

    await page.getByRole("textbox", { name: "Ingredient 1", exact: true }).fill("split red lentils");

    const ingredientCountBefore = await page.getByRole("textbox", { name: /^Ingredient \d+$/ }).count();
    await page.getByTestId("recipe-edit__add-ingredient").click();
    await expect(page.getByRole("textbox", { name: /^Ingredient \d+$/ })).toHaveCount(ingredientCountBefore + 1);

    await page.getByRole("button", { name: `Remove ingredient ${ingredientCountBefore + 1}` }).click();
    await expect(page.getByRole("textbox", { name: /^Ingredient \d+$/ })).toHaveCount(ingredientCountBefore);

    const stepCountBefore = await page.getByRole("textbox", { name: /^Step \d+$/ }).count();
    await page.getByTestId("recipe-edit__add-step").click();
    await expect(page.getByRole("textbox", { name: /^Step \d+$/ })).toHaveCount(stepCountBefore + 1);

    // A tag typed by hand joins the chips above.
    await page.getByRole("textbox", { name: "New tag" }).fill("leftovers");
    await page.getByTestId("recipe-edit__add-tag").click();
    await expect(page.getByRole("button", { name: "leftovers", exact: true })).toHaveAttribute("aria-pressed", "true");

    await page.getByTestId("recipe-edit__save").click();

    // Saving takes the cook back to the recipe it belongs to.
    await expect(async () => {
      expect(await page.title()).toBe("Red lentil dal");
    }).toPass();
  });

  test("browses the community tag catalogue from the form", async ({ page }) => {
    await page.goto("/#/recipes/edit/r1");

    await expect(async () => {
      expect(await page.title()).toBe("Edit recipe");
    }).toPass();

    await page.getByRole("button", { name: "Browse all tags" }).click();

    const dialog = page.getByRole("dialog", { name: "Community tags" });
    await expect(dialog).toBeVisible();

    const search = dialog.getByRole("textbox", { name: "Search community tags" });
    await search.fill("zzznomatch");
    await expect(dialog.getByText("No community tag matches that.")).toBeVisible();

    await search.fill("");
    await dialog.getByRole("button", { name: "Done" }).click();
    await expect(dialog).toBeHidden();
  });

  test("reads a recipe out of a photo and drops it into the form", async ({ page }) => {
    await page.goto("/#/recipes/edit/r1");

    await expect(async () => {
      expect(await page.title()).toBe("Edit recipe");
    }).toPass();

    await page.getByTestId("recipe-edit__open-scan").click();

    const dialog = page.getByRole("dialog", { name: "Scan a recipe" });
    await expect(dialog).toBeVisible();

    await dialog.locator('input[type="file"]').setInputFiles({
      name: "page.png",
      mimeType: "image/png",
      // A 1x1 PNG — the scan is simulated, so only the file's presence matters.
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
        "base64"
      ),
    });

    await expect(page.getByTestId("recipe-scan-dialog__use")).toBeVisible({ timeout: 10000 });
    await page.getByTestId("recipe-scan-dialog__use").click();

    await expect(dialog).toBeHidden();
    // The scanned recipe has replaced what was in the form.
    await expect(page.getByRole("textbox", { name: "Title" })).not.toHaveValue("Red lentil dal");
  });

  test("cancelling the form goes back to the recipe", async ({ page }) => {
    await page.goto("/#/recipes/edit/r2");

    await expect(async () => {
      expect(await page.title()).toBe("Edit recipe");
    }).toPass();

    await page.getByTestId("recipe-edit__cancel").click();

    await expect(async () => {
      expect(await page.title()).toBe("Lamb skewers on the grill");
    }).toPass();
  });

  test("deleting a recipe returns to the library", async ({ page }) => {
    await page.goto("/#/recipes/edit/r2");

    await expect(async () => {
      expect(await page.title()).toBe("Edit recipe");
    }).toPass();

    await page.getByTestId("recipe-edit__delete").click();

    await expect(async () => {
      expect(await page.title()).toBe("Recipes");
    }).toPass();
  });
});
