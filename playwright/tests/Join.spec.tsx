import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";

import { Join } from "../../src/pages/join/frontend";
import { MockProviders } from "../mock-providers";

test("join a pool", async ({ mount, page }) => {
  await page.route("/trpc/joinPool*", (route) =>
    route.fulfill({
      body: JSON.stringify({ result: { data: {} } }),
    }),
  );

  const component = await mount(
    <MockProviders initialEntries={["/join/123"]}>
      <Join />
    </MockProviders>,
  );
  await expect(
    component.getByRole("heading", { name: "Join New Pool" }),
  ).toBeVisible();
  await component.getByRole("button", { name: "Join" }).click();
  await expect(
    component.getByRole("heading", { name: "You have joined the pool!" }),
  ).toBeVisible();
});
