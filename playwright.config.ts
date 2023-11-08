import { defineConfig, devices } from "@playwright/experimental-ct-react";

type Device = keyof typeof devices;
const devicesToTest: Device[] = [
  "iPhone 14 Pro",
  "Desktop Chrome",
  "Desktop Safari",
];

function deviceToProject(device: Device) {
  return {
    name: device as string,
    use: devices[device],
  };
}

export default defineConfig({
  testDir: "./playwright",
  outputDir: "./playwright/test-results",
  preserveOutput: "failures-only",
  retries: process.env.CI ? 2 : 0,
  projects: devicesToTest.map(deviceToProject),
});
