import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { mocksClient } from "@package/mocks";
import { expect, test as base, type Page } from "@playwright/test";
import { MOCK_ADMIN_API_PORT } from "../wait-for-port";

export { expect };

/**
 * Point the admin API client at this project's mock server — it defaults to the
 * 3110 the config moves away from. Configured here because every spec imports
 * this module.
 */
mocksClient.configClient({ port: MOCK_ADMIN_API_PORT });

/**
 * Custom Playwright test fixture that collects Istanbul coverage data from
 * `window.__coverage__` after each test when COVERAGE env var is set.
 *
 * Coverage JSON files are written to `.nyc_output/` for later merging via
 * the global coverage teardown.
 */
export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await use(page);

    if (process.env.COVERAGE) {
      const coverage = await page.evaluate(
        () => (window as unknown as { __coverage__?: Record<string, unknown> }).__coverage__
      );

      if (coverage) {
        const outputDir = path.resolve(process.cwd(), ".nyc_output");
        mkdirSync(outputDir, { recursive: true });
        const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        writeFileSync(path.join(outputDir, `${uniqueId}.json`), JSON.stringify(coverage));
      }
    }
  },
});
