import { defineConfig, devices } from "@playwright/experimental-ct-react";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright",
  outputDir: "./playwright/test-results",
  preserveOutput: "failures-only",
  retries: process.env.CI ? 2 : 0,
  projects: process.env.CI
    ? [
        {
          name: "chromium",
          use: { ...devices["iPhone 14 Pro"] },
        },
        {
          name: "chromium",
          use: { ...devices["Desktop Chrome"] },
        },
        {
          name: "webkit",
          use: { ...devices["iPhone 14 Pro"] },
        },
        {
          name: "webkit",
          use: { ...devices["Desktop Safari"] },
        },
      ]
    : [
        {
          name: "chromium",
          use: { ...devices["iPhone 14 Pro"] },
        },
      ],
});
