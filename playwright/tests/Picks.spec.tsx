import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";

import { Pick } from "../../src/pages/pick/frontend";
import {
  basicGamesAndPicksResponse,
  responseWithPick,
  responseWithPickAndForbiddenTeams,
  responseWithPickAndResultsTeamLost,
  responseWithPickAndResultsTeamWon,
} from "../../test/mocks";
import { MockProviders } from "../mock-providers";

test.beforeEach(async ({ page }) => {
  await page.route("/trpc/pick*", (route) =>
    route.fulfill({
      body: JSON.stringify(basicGamesAndPicksResponse),
    }),
  );
  await page.evaluate(() => {
    Date.now = () =>
      new Date(
        "Mon Sep 6 2023 21:50:04 GMT-0500 (Central Daylight Time)",
      ).getTime();
  });
});

test("renders without picks", async ({ mount }) => {
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pick />
    </MockProviders>,
  );
  await expect(
    component.getByRole("heading", { name: "Test Pool 2023" }),
  ).toBeVisible();
  await expect(
    component.getByRole("heading", { name: "Week 1" }),
  ).toBeVisible();
  await expect(
    component.getByRole("heading", { name: "Make your pick, Test!" }),
  ).toBeVisible();
  await expect(
    component.getByRole("heading", { name: "BUF -2.0" }),
  ).toBeVisible();
});

test("can make a pick", async ({ mount, page }) => {
  await page.route("/trpc/pick*", (route) =>
    route.fulfill({
      body: JSON.stringify(basicGamesAndPicksResponse),
    }),
  );
  await page.route("/trpc/makePick*", (route) =>
    route.fulfill({
      body: JSON.stringify({ result: { data: {} } }),
    }),
  );

  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pick />
    </MockProviders>,
  );
  await component.getByRole("button", { name: /49ers/ }).click();
  await expect(
    page.getByRole("heading", { name: "Confirm pick" }),
  ).toBeVisible();
  await expect(
    page.getByText(/Are you sure you want to pick the 49ers?/),
  ).toBeVisible();
  await page.route("/trpc/pick*", (route) =>
    route.fulfill({
      body: JSON.stringify(responseWithPick),
    }),
  );
  await page.getByRole("button", { name: "Lock it in" }).click();
  await expect(component.getByRole("button", { name: /49ers/ })).toBeDisabled();
  await expect(
    component.getByRole("heading", {
      name: "You're riding with the 49ers this week!",
    }),
  ).toBeVisible();
});

test("prevents picking the same team twice", async ({ mount, page }) => {
  await page.route("/trpc/pick*", (route) =>
    route.fulfill({
      body: JSON.stringify(responseWithPickAndForbiddenTeams),
    }),
  );
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pick />
    </MockProviders>,
  );

  await expect(component.getByRole("button", { name: /49ers/ })).toBeDisabled();
  await expect(component.getByRole("button", { name: /Bills/ })).toBeDisabled();
  await expect(component.getByRole("button", { name: /Jets/ })).toBeDisabled();
  await expect(
    component.getByRole("heading", {
      name: "You're riding with the 49ers this week!",
    }),
  ).toBeVisible();
});

test("prevents changing pick after picking a game that has started", async ({
  mount,
  page,
}) => {
  await page.route("/trpc/pick*", (route) =>
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
      <Pick />
    </MockProviders>,
  );

  await expect(component.getByRole("button", { name: /49ers/ })).toBeDisabled();
  await expect(
    component.getByRole("heading", {
      name: "Your 49ers pick is locked. Good luck!",
    }),
  ).toBeVisible();
});

test("prevents picking a game that has started", async ({ mount, page }) => {
  await page.route("/trpc/pick*", (route) =>
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
      <Pick />
    </MockProviders>,
  );

  await expect(component.getByRole("button", { name: /49ers/ })).toBeDisabled();
  await expect(component.getByRole("button", { name: /Bills/ })).toBeEnabled();
  await expect(
    component.getByRole("heading", { name: "Make your pick, Test!" }),
  ).toBeVisible();
});

test("indicates when you survived a week", async ({ mount, page }) => {
  await page.route("/trpc/pick*", (route) =>
    route.fulfill({
      body: JSON.stringify(responseWithPickAndResultsTeamWon),
    }),
  );
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pick />
    </MockProviders>,
  );

  await expect(
    component.getByRole("heading", {
      name: "The 49ers won, and you're still alive!",
    }),
  ).toBeVisible();
});

test("indicates when you have been eliminated", async ({ mount, page }) => {
  await page.route("/trpc/pick*", (route) =>
    route.fulfill({
      body: JSON.stringify(responseWithPickAndResultsTeamLost),
    }),
  );
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pick />
    </MockProviders>,
  );

  await expect(
    component.getByRole("heading", {
      name: "Sorry, you have been eliminated from this pool.",
    }),
  ).toBeVisible();
});
