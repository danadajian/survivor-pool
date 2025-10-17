import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";

import { Pool } from "../../src/pages/pool/frontend";
import { MockProviders } from "../mock-providers";
import {
  basicGamesAndPicksResponse,
  responseWithPickAndResultsTeamTied,
  responseWithPickGameStarted,
} from "../mocks";
import { mockResponse } from "../utils";

test.beforeEach(async ({ page }) => {
  await mockResponse(page, "/trpc/pool*", basicGamesAndPicksResponse);
});

test("prevents changing pick after picking a game that has started", async ({
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
});

test("prevents picking a game that has started", async ({ mount, page }) => {
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
  const component = await mount(
    <MockProviders initialEntries={["/pick/123"]}>
      <Pool />
    </MockProviders>,
  );

  await expect(component.getByRole("button", { name: /Rams/ })).toBeEnabled();
  await expect(
    component.getByRole("button", { name: /Bengals/ }),
  ).toBeDisabled();
});
