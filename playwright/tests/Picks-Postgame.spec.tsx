import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";

import { Pool } from "../../src/pages/pool/frontend";
import { MockProviders } from "../mock-providers";
import {
  basicGamesAndPicksResponse,
  responseWithPickAndResultsTeamLost,
  responseWithPickAndResultsTeamTied,
  responseWithPickAndResultsTeamWon,
  responseWithPickGameStarted,
} from "../mocks";
import { mockResponse } from "../utils";

test.beforeEach(async ({ page }) => {
  await mockResponse(page, "/trpc/pool*", basicGamesAndPicksResponse);
});

test.skip("prevents changing pick after picking a game that has started", async ({
  mount,
  page,
}) => {
  await page.route("/trpc/pool*", (route) =>
    route.fulfill({
      body: JSON.stringify(responseWithPickGameStarted),
    }),
  );
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

test.skip("prevents picking a game that has started", async ({
  mount,
  page,
}) => {
  await page.route("/trpc/pool*", (route) =>
    route.fulfill({
      body: JSON.stringify(basicGamesAndPicksResponse),
    }),
  );
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

test.skip("indicates when you survived a week", async ({ mount, page }) => {
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

test.skip("indicates when you have been eliminated", async ({
  mount,
  page,
}) => {
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

test.skip("indicates when your team tied and you need to pick an underdog", async ({
  mount,
  page,
}) => {
  await page.route("/trpc/pool*", (route) =>
    route.fulfill({
      body: JSON.stringify(responseWithPickAndResultsTeamTied),
    }),
  );
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
