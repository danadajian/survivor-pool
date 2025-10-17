import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";

import { Pool } from "../../src/pages/pool/frontend";
import { MockProviders } from "../mock-providers";
import {
  basicGamesAndPicksPreseasonResponse,
  basicGamesAndPicksResponse,
  responseWithPick,
  responseWithPickAndForbiddenTeams,
  responseWithSecretPick,
} from "../mocks";
import { mockResponse } from "../utils";

test.beforeEach(async ({ page }) => {
  await mockResponse(page, "/trpc/pool*", basicGamesAndPicksResponse);
});

test("renders without picks", async ({ mount }) => {
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pool />
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
  await mockResponse(page, "/trpc/makePick*", { result: { data: {} } });

  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pool />
    </MockProviders>,
  );
  await component.getByRole("button", { name: /Bills/ }).click();
  await expect(
    page.getByRole("heading", { name: "Confirm pick" }),
  ).toBeVisible();
  await expect(
    page.getByText(/Are you sure you want to pick the Bills?/),
  ).toBeVisible();
  await expect(
    page.getByRole("switch", { name: "Make pick secret" }),
  ).not.toBeChecked();
  await page.route("/trpc/pool*", (route) =>
    route.fulfill({
      body: JSON.stringify(responseWithPick),
    }),
  );
  await page.getByRole("button", { name: "Lock it in" }).click();
  await expect(
    component.getByRole("heading", {
      name: "You're riding with the Bills this week!",
    }),
  ).toBeVisible();
});

test("prevents picking a team previously picked but allows picking the currently picked team", async ({
  mount,
  page,
}) => {
  await mockResponse(page, "/trpc/pool*", responseWithPickAndForbiddenTeams);
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pool />
    </MockProviders>,
  );

  await expect(component.getByRole("button", { name: /Bills/ })).toBeEnabled();
  await expect(component.getByRole("button", { name: /Jets/ })).toBeDisabled();
});

test("sets secret toggle state for secret pick", async ({ mount, page }) => {
  await mockResponse(page, "/trpc/pool*", responseWithSecretPick);
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pool />
    </MockProviders>,
  );

  await component.getByRole("button", { name: /Bills/ }).click();
  await expect(
    page.getByRole("heading", { name: "Confirm pick" }),
  ).toBeVisible();
  await expect(
    page.getByRole("switch", { name: "Make pick secret" }),
  ).toBeChecked();
});

test("shows no picks during preseason", async ({ mount, page }) => {
  await mockResponse(page, "/trpc/pool*", basicGamesAndPicksPreseasonResponse);

  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pool />
    </MockProviders>,
  );
  await expect(
    component.getByRole("heading", { name: "Test Pool 2023" }),
  ).toBeVisible();
  await expect(
    component.getByRole("heading", {
      name: "Hang tight! The season hasn't started yet.",
    }),
  ).toBeVisible();
});
