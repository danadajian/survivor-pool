import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";

import { Join } from "../../src/pages/join/frontend";
import { MockProviders } from "../mock-providers";
import { mockResponse } from "../utils";

test("join a pool", async ({ mount, page }) => {
  await mockResponse(page, "/trpc/joinPool*", { result: { data: {} } });

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
