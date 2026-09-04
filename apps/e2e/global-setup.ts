import { chromium } from "@playwright/test";
import { MOCK_ADMIN_API_PORT, waitForPort } from "./wait-for-port";

async function globalSetup(): Promise<void> {
  const browser = await chromium.launch({
    args: ["--ignore-certificate-errors"],
  });
  const page = await browser.newPage();

  // Wait for the server to respond
  await page.goto("https://localhost:4240", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });

  await browser.close();

  // Specs drive route variants through the Mocks Server admin API, so it has to
  // be up before the first test — Playwright's webServer only waits on the app.
  await waitForPort(MOCK_ADMIN_API_PORT, "127.0.0.1", 60_000);
}

export default globalSetup;
