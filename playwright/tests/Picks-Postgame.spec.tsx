import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";

import { Pool } from "../../src/pages/pool/frontend";
import { MockProviders } from "../mock-providers";
import {
  basicGamesAndPicksResponse,
  responseWithPick,
  responseWithPickAndResultsTeamLost,
  responseWithPickAndResultsTeamTied,
  responseWithPickAndResultsTeamWon,
} from "../mocks";
import { mockResponse } from "../utils";

test.beforeEach(async ({ page }) => {
  await mockResponse(page, "/trpc/pool*", basicGamesAndPicksResponse);
  await page.evaluate(() => {
    Date.now = () =>
      new Date(
        "Mon Sep 6 2023 21:50:04 GMT-0500 (Central Daylight Time)",
      ).getTime();
  });
});

test("prevents changing pick after picking a game that has started", async ({
  mount,
  page,
}) => {
  await page.route("/trpc/pool*", (route) =>
    route.fulfill({
      body: JSON.stringify(responseWithPick),
    }),
  );
  await page.evaluate(() => {
    Date.now = () =>
      new Date(
        "Mon Sep 10 2023 17:50:04 GMT-0500 (Central Daylight Time)",
      ).getTime();
  });
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pool />
    </MockProviders>,
  );

  await expect(component.getByRole("button", { name: /49ers/ })).toBeDisabled();
  await expect(component.getByRole("button", { name: /Bills/ })).toBeDisabled();
  await expect(component.getByRole("button", { name: /Jets/ })).toBeDisabled();
  await expect(
    component.getByRole("heading", {
      name: "Your 49ers pick is locked. Good luck!",
    }),
  ).toBeVisible();
});

test("prevents picking a game that has started", async ({ mount, page }) => {
  await page.route("/trpc/pool*", (route) =>
    route.fulfill({
      body: JSON.stringify(basicGamesAndPicksResponse),
    }),
  );
  await page.evaluate(() => {
    Date.now = () =>
      new Date(
        "Mon Sep 10 2023 17:50:04 GMT-0500 (Central Daylight Time)",
      ).getTime();
  });
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pool />
    </MockProviders>,
  );

  await expect(component.getByRole("button", { name: /49ers/ })).toBeDisabled();
  await expect(component.getByRole("button", { name: /Bills/ })).toBeEnabled();
  await expect(
    component.getByRole("heading", { name: "Make your pick, Test!" }),
  ).toBeVisible();
});

test("indicates when you survived a week", async ({ mount, page }) => {
  await page.route("/trpc/pool*", (route) =>
    route.fulfill({
      body: JSON.stringify(responseWithPickAndResultsTeamWon),
    }),
  );
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pool />
    </MockProviders>,
  );

  await expect(
    component.getByRole("heading", {
      name: "The 49ers won, and you're still alive!",
    }),
  ).toBeVisible();
});

test("indicates when you have been eliminated", async ({ mount, page }) => {
  await page.route("/trpc/pool*", (route) =>
    route.fulfill({
      body: JSON.stringify(responseWithPickAndResultsTeamLost),
    }),
  );
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pool />
    </MockProviders>,
  );

  await expect(
    component.getByRole("heading", {
      name: "Sorry, you have been eliminated from this pool.",
    }),
  ).toBeVisible();
});

test("indicates when your team tied and you need to pick an underdog", async ({
  mount,
  page,
}) => {
  await page.route("/trpc/pool*", (route) =>
    route.fulfill({
      body: JSON.stringify(responseWithPickAndResultsTeamTied),
    }),
  );
  await page.evaluate(() => {
    Date.now = () =>
      new Date(
        "Mon Sep 23 2023 17:50:04 GMT-0500 (Central Daylight Time)",
      ).getTime();
  });
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pool />
    </MockProviders>,
  );

  await expect(
    component.getByRole("heading", {
      name: "The 49ers tied their game! Pick one of the remaining underdogs if you can.",
    }),
  ).toBeVisible();
  await expect(component.getByRole("button", { name: /Rams/ })).toBeEnabled();
  await expect(
    component.getByRole("button", { name: /Bengals/ }),
  ).toBeDisabled();
});
