import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";

import { Home } from "../../src/pages/home/frontend";
import { MockProviders } from "../mock-providers";
import { poolsForUserResponse } from "../mocks";
import { mockResponse } from "../utils";

test("should display available pools", async ({ mount, page }) => {
  await mockResponse(page, "/trpc/poolsForUser*", poolsForUserResponse);

  const component = await mount(
    <MockProviders initialEntries={["/"]}>
      <Home />
    </MockProviders>,
  );
  await expect(
    component.getByRole("heading", { name: "Welcome to Survivor Pool!" }),
  ).toBeVisible();
  await expect(component.getByRole("button", { name: "Pool 1" })).toBeVisible();
  await expect(component.getByRole("button", { name: "Pool 2" })).toBeVisible();
});
