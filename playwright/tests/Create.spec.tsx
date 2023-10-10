import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";

import { Create } from "../../src/pages/create/frontend";
import { MockProviders } from "../mock-providers";

test("create a pool", async ({ mount, page }) => {
  await page.route("/trpc/createPool*", (route) =>
    route.fulfill({
      body: JSON.stringify({ result: { data: { poolId: 123 } } }),
    }),
  );

  const component = await mount(
    <MockProviders>
      <Create />
    </MockProviders>,
  );
  await expect(
    component.getByRole("heading", { name: "Create New Pool" }),
  ).toBeVisible();
  await component.getByLabel("Pool Name").fill("Test Pool");
  await component.getByRole("button", { name: "Create" }).click();
  await expect(
    component.getByRole("heading", { name: "Test Pool created successfully!" }),
  ).toBeVisible();
});
