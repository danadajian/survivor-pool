import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";

import { Pools } from "../../src/pages/pools/frontend";
import { picksForPoolResponse } from "../../test/mocks";
import { MockProviders } from "../mock-providers";

test("renders all picks for the week", async ({ mount, page }) => {
  await page.route("/trpc/picksForPool*", (route) =>
    route.fulfill({
      body: JSON.stringify(picksForPoolResponse),
    }),
  );

  const component = await mount(
    <MockProviders initialEntries={["/pools/123"]}>
      <Pools />
    </MockProviders>,
  );
  await expect(
    component.getByRole("heading", { name: "Week 1 Picks" }),
  ).toBeVisible();
  await expect(component.getByRole("table")).toBeVisible();
  await expect(component.getByText("Test User1")).toBeVisible();
  await expect(component.getByText("Test User2")).toBeVisible();
});
