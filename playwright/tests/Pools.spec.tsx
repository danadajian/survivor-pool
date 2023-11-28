import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";

import { Picks } from "../../src/pages/picks/frontend";
import { picksForPoolResponse } from "../../test/mocks";
import { MockProviders } from "../mock-providers";
import { mockResponse } from "../utils";

test("renders all picks for the week", async ({ mount, page }) => {
  await mockResponse(page, "/trpc/*", picksForPoolResponse);

  const component = await mount(
    <MockProviders initialEntries={["/picks/123"]}>
      <Picks />
    </MockProviders>,
  );
  await expect(
    component.getByRole("heading", { name: "Week 1 Picks" }),
  ).toBeVisible();
  await expect(component.getByRole("table")).toBeVisible();
  await expect(component.getByText("Test User1")).toBeVisible();
  await expect(component.getByText("Test User2")).toBeVisible();
});
