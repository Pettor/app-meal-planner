import { mocksClient } from "@package/mocks";
import type { Page } from "@playwright/test";
import { expect, test } from "../fixtures";

async function gotoCommunity(page: Page): Promise<void> {
  await page.goto("/#/community");
  await expect(async () => {
    expect(await page.title()).toBe("Community");
  }).toPass();
}

test.describe("community.feed", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("moves between the feed, the people and every shared week", async ({ page }) => {
    await gotoCommunity(page);

    await expect(page.getByRole("button", { name: "Feed", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("button", { name: "Use this week" }).first()).toBeVisible();

    await page.getByRole("button", { name: "People", exact: true }).click();
    await expect(page.getByText("Weeknight cooking for four. Fish at least twice a week.")).toBeVisible();

    await page.getByRole("button", { name: "Shared weeks", exact: true }).click();
    await expect(page.getByText("Grill and smoke week")).toBeVisible();

    await page.getByRole("button", { name: "Feed", exact: true }).click();
    await expect(page.getByText("shared a week").first()).toBeVisible();
  });

  test("narrows the feed to the people you follow, and by tag", async ({ page }) => {
    await gotoCommunity(page);

    // Marcus is not followed by default, so his posts drop out of the narrowed feed.
    await expect(page.getByText("Marcus Reid").first()).toBeVisible();
    await page.getByRole("button", { name: "Following only" }).click();
    await expect(page.getByText("Marcus Reid")).toHaveCount(0);

    await page.getByRole("button", { name: "Everyone", exact: true }).click();
    await expect(page.getByText("Marcus Reid").first()).toBeVisible();

    // Tag chips carry a count and stack with each other.
    await page.getByRole("button", { name: /^bbq / }).click();
    await expect(page.getByRole("button", { name: "Clear" })).toBeVisible();
    await expect(page.getByText("Meatless, still filling")).toHaveCount(0);

    await page.getByRole("button", { name: "Clear" }).click();
    await expect(page.getByText("Meatless, still filling")).toBeVisible();
  });

  test("says so when nobody you follow has shared anything", async ({ page }) => {
    await gotoCommunity(page);

    // Unfollow everyone, then narrow the feed to the people you follow.
    await page.getByRole("button", { name: "People", exact: true }).click();
    for (const person of ["p1", "p3"]) {
      await page.getByTestId(`person-card__follow--${person}`).click();
    }

    await page.getByRole("button", { name: "Feed", exact: true }).click();
    await page.getByRole("button", { name: "Following only" }).click();

    await expect(page.getByText("Nothing from the people you follow yet.")).toBeVisible();
  });

  test("follows and unfollows someone from the people list", async ({ page }) => {
    await gotoCommunity(page);
    await page.getByRole("button", { name: "People", exact: true }).click();

    const marcus = page.getByTestId("person-card__follow--p2");
    await expect(marcus).toHaveText("Follow");

    await marcus.click();
    await expect(marcus).toHaveText("Following");

    // The choice sticks across a reload — it is real state, not view state.
    await page.reload();
    await page.getByRole("button", { name: "People", exact: true }).click();
    await expect(page.getByTestId("person-card__follow--p2")).toHaveText("Following");

    await page.getByTestId("person-card__follow--p2").click();
    await expect(page.getByTestId("person-card__follow--p2")).toHaveText("Follow");
  });

  test("opens a recipe and a profile from the feed", async ({ page }) => {
    await gotoCommunity(page);

    await page.getByRole("link", { name: "Elin Håkansson" }).first().click();
    await expect(async () => {
      expect(await page.title()).toBe("Elin Håkansson");
    }).toPass();

    await page.getByTestId("profile__back").click();
    await expect(async () => {
      expect(await page.title()).toBe("Community");
    }).toPass();

    await page.getByRole("button", { name: "View recipe" }).first().click();
    await expect(page.getByTestId("recipe-detail__back")).toBeVisible();
  });
});

test.describe("community.recommend", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("sends a week on to someone you follow", async ({ page }) => {
    await gotoCommunity(page);

    await page.getByRole("button", { name: "Recommend" }).first().click();
    const dialog = page.getByRole("dialog", { name: "Recommend" });
    await expect(dialog).toBeVisible();

    // Nothing can be sent until a recipient is picked.
    await expect(page.getByTestId("recommend-dialog__send")).toBeDisabled();

    await dialog.getByRole("textbox", { name: "Add a note" }).fill("Worth a go on Thursday.");
    await page.getByTestId("recommend-dialog__target--p1").click();
    await expect(page.getByTestId("recommend-dialog__send")).toBeEnabled();

    await page.getByTestId("recommend-dialog__send").click();
    await expect(dialog).toBeHidden();
  });

  test("backing out of the recommend dialog sends nothing", async ({ page }) => {
    await gotoCommunity(page);

    await page.getByRole("button", { name: "Recommend" }).first().click();
    const dialog = page.getByRole("dialog", { name: "Recommend" });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "Cancel" }).click();
    await expect(dialog).toBeHidden();
  });
});

test.describe("community.useweek", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("loads someone else's week into the planner", async ({ page }) => {
    await gotoCommunity(page);

    await page.getByRole("button", { name: "Use this week" }).first().click();
    const dialog = page.getByRole("dialog", { name: "Load this week?" });
    await expect(dialog).toBeVisible();

    // The dialog says what loading it will cost in new recipes.
    await expect(dialog.getByText(/^Adds \d+ recipes you don't have yet/)).toBeVisible();

    await dialog.getByRole("button", { name: "Cancel" }).click();
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: "Use this week" }).first().click();
    await page.getByTestId("load-week-dialog__confirm").click();

    // The week opens straight on the review step of the wizard.
    await expect(async () => {
      expect(await page.title()).toBe("Plan");
    }).toPass();
    await expect(page.getByTestId("plan__reroll-all")).toBeVisible();
    await expect(page.getByRole("button", { name: "Swap", exact: true }).first()).toBeVisible();
  });
});

test.describe("community.profile", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("shows someone's weeks and recipes, and follows them", async ({ page }) => {
    await page.goto("/#/community/p2");
    await expect(async () => {
      expect(await page.title()).toBe("Marcus Reid");
    }).toPass();

    await expect(page.getByRole("button", { name: /^Shared weeks \(\d+\)$/ })).toHaveAttribute("aria-pressed", "true");

    await page.getByTestId("profile__follow").click();
    await expect(page.getByTestId("profile__follow")).toHaveText("Following");

    await page.getByRole("button", { name: /^Recipes \(\d+\)$/ }).click();
    await expect(page.getByText("Smoked pork shoulder")).toBeVisible();

    await page.getByRole("button", { name: "View recipe" }).first().click();
    await expect(page.getByTestId("recipe-detail__back")).toBeVisible();
  });

  test("offers to edit your own profile rather than follow it", async ({ page }) => {
    await page.goto("/#/community/me");
    await expect(async () => {
      expect(await page.title()).toBe("Petter");
    }).toPass();

    await expect(page.getByText("This is you")).toBeVisible();
    await expect(page.getByTestId("profile__follow")).toBeHidden();

    // Editing the profile is the settings modal's account section.
    await page.getByRole("button", { name: "Edit avatar and name" }).click();
    await expect(page.getByRole("dialog", { name: "Settings" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-selected", "true");
  });

  test("shows a not-found page for somebody who is not there", async ({ page }) => {
    await page.goto("/#/community/nobody");

    await expect(page.getByText("Something went wrong!")).toBeVisible();
  });
});

test.describe("community.inbox", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("saves a recommended recipe and dismisses the rest", async ({ page }) => {
    await gotoCommunity(page);

    await page.getByTestId("community__open-inbox").click();
    await expect(async () => {
      expect(await page.title()).toBe("Inbox");
    }).toPass();

    // Accepting a recipe recommendation saves it and clears the item.
    const recipeItem = page.getByTestId("inbox-card__n2");
    await expect(recipeItem).toBeVisible();
    await page.getByTestId("inbox-card__accept--n2").click();
    await expect(recipeItem).toBeHidden();

    await page.getByTestId("inbox-card__dismiss--n3").click();
    await expect(page.getByTestId("inbox-card__n3")).toBeHidden();

    await page.getByTestId("inbox__back").click();
    await expect(async () => {
      expect(await page.title()).toBe("Community");
    }).toPass();
  });

  test("accepting a recommended week hands it to the load dialog", async ({ page }) => {
    await page.goto("/#/community/inbox");
    await expect(async () => {
      expect(await page.title()).toBe("Inbox");
    }).toPass();

    await page.getByTestId("inbox-card__accept--n1").click();

    // It goes back to the community page and asks before loading anything.
    await expect(page.getByRole("dialog", { name: "Load this week?" })).toBeVisible();
  });

  test("empties out once everything has been dealt with", async ({ page }) => {
    await page.goto("/#/community/inbox");
    await expect(async () => {
      expect(await page.title()).toBe("Inbox");
    }).toPass();

    for (const item of ["n1", "n2", "n3"]) {
      await page.getByTestId(`inbox-card__dismiss--${item}`).click();
    }

    await expect(page.getByText("Nothing in your inbox.")).toBeVisible();
  });

  test("reaches the inbox and a profile from the navbar", async ({ page }) => {
    await gotoCommunity(page);

    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("navbar__inbox").click();
    await expect(async () => {
      expect(await page.title()).toBe("Inbox");
    }).toPass();

    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("navbar__my-profile").click();
    await expect(page.getByText("This is you")).toBeVisible();
  });
});
