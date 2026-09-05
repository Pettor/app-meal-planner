import { mocksClient } from "@package/mocks";
import type { Page } from "@playwright/test";
import { expect, test } from "../fixtures";

/** Lands on the login page by making the silent token refresh fail. */
async function gotoLogin(page: Page): Promise<void> {
  await page.goto("/");
  await expect(async () => {
    expect(await page.title()).toBe("Login");
  }).toPass();
}

/*
 * These suites switch route variants away from the defaults. The mock server is
 * shared state across the whole run, so put them back afterwards or the next
 * spec file inherits a failing login.
 */
test.afterEach(async () => {
  await mocksClient.restoreRouteVariants();
});

test.describe("auth.loginerrors", () => {
  test.beforeEach(async () => {
    await mocksClient.useRouteVariant("Tokens_Refresh:400-json-status-400-no-error");
  });

  test("reports a rejected login rather than letting it through", async ({ page }) => {
    await mocksClient.useRouteVariant("Tokens_GetToken:400-json-status-400-no-error");
    await gotoLogin(page);

    await page.getByTestId("login-form__email-input").fill("root@admin.com");
    await page.getByTestId("login-form__password-input").fill("wrong-password");
    await page.getByTestId("login-form__submit-button").click();

    await expect(page.getByTestId("login-view__error")).toBeVisible();
    expect(await page.title()).toBe("Login");
  });

  test("reports a login the service could not answer", async ({ page }) => {
    await mocksClient.useRouteVariant("Tokens_GetToken:400-json-code-20-server-error");
    await gotoLogin(page);

    await page.getByTestId("login-form__email-input").fill("root@admin.com");
    await page.getByTestId("login-form__password-input").fill("password");
    await page.getByTestId("login-form__submit-button").click();

    await expect(page.getByTestId("login-view__error")).toBeVisible();
  });

  test("moves between login, sign-up and forgot password", async ({ page }) => {
    await gotoLogin(page);

    await page.getByTestId("login-form__forgot-link").click();
    await expect(async () => {
      expect(await page.title()).toBe("Forgot Password");
    }).toPass();

    await page.getByTestId("auth-layout__back-button").click();
    await expect(async () => {
      expect(await page.title()).toBe("Login");
    }).toPass();

    await page.getByTestId("auth-switch-prompt__action").click();
    await expect(async () => {
      expect(await page.title()).toBe("Sign Up");
    }).toPass();

    await page.getByTestId("auth-layout__back-button").click();
    await expect(async () => {
      expect(await page.title()).toBe("Login");
    }).toPass();
  });

  test("opens the appearance settings from the login page", async ({ page }) => {
    await gotoLogin(page);

    await page.getByTestId("login-view__settings-button").click();

    await expect(page.getByRole("dialog", { name: "Settings" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Appearance" })).toHaveAttribute("aria-selected", "true");
  });
});

test.describe("auth.forgotpassword", () => {
  test.beforeEach(async () => {
    await mocksClient.useRouteVariant("Tokens_Refresh:400-json-status-400-no-error");
  });

  test("confirms the reset mail and comes back to sign in", async ({ page }) => {
    await page.goto("/#/forgot-password");
    await expect(async () => {
      expect(await page.title()).toBe("Forgot Password");
    }).toPass();

    await page.getByTestId("forgot-password-form__email-input").fill("root@admin.com");
    await page.getByTestId("forgot-password-form__submit-button").click();

    await expect(page.getByTestId("forgot-password-view__sent")).toBeVisible();

    await page.getByTestId("forgot-password-view__back-to-sign-in").click();
    await expect(async () => {
      expect(await page.title()).toBe("Login");
    }).toPass();
  });

  test("says so when the reset request is refused", async ({ page }) => {
    await mocksClient.useRouteVariant("Users_ForgotPassword:400-json-status-400-no-error");

    await page.goto("/#/forgot-password");
    await expect(async () => {
      expect(await page.title()).toBe("Forgot Password");
    }).toPass();

    await page.getByTestId("forgot-password-form__email-input").fill("root@admin.com");
    await page.getByTestId("forgot-password-form__submit-button").click();

    // A refused request must not be reported as a mail on its way.
    await expect(page.getByText("Something went wrong. Please try again.").first()).toBeVisible();
    await expect(page.getByTestId("forgot-password-view__sent")).toBeHidden();
  });
});

test.describe("auth.signuperrors", () => {
  test.beforeEach(async () => {
    await mocksClient.useRouteVariant("Tokens_Refresh:400-json-status-400-no-error");
    await mocksClient.useRouteVariant("Users_SelfRegister:400-json-status-400-no-error");
  });

  test("says so when the sign-up is refused", async ({ page }) => {
    await page.goto("/#/sign-up");
    await expect(async () => {
      expect(await page.title()).toBe("Sign Up");
    }).toPass();

    await page.getByTestId("sign-up-form__username-input").fill("new@user.com");
    await page.getByTestId("sign-up-form__email-input").fill("new@user.com");
    await page.getByTestId("sign-up-form__password-input").fill("password123");
    await page.getByTestId("sign-up-form__terms-checkbox").click({ force: true });
    await page.getByTestId("sign-up-form__submit-button").click();

    // The failure is reported and the cook stays on the form, not signed in.
    await expect(page.getByText("Something went wrong. Please try again.").first()).toBeVisible();
    expect(await page.title()).toBe("Sign Up");
  });
});
