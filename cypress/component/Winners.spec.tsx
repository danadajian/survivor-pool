import type { TRPCResponse } from "@trpc/server/rpc";
import React from "react";

import { Winners } from "../../src/pages/winners/frontend";
import type { RouterOutput } from "../../src/trpc";
import { MockProviders } from "../support/mock-providers";

const winnersResponse: TRPCResponse<RouterOutput["winners"]> = {
  result: {
    data: {
      seasons: [2024],
      winners: [
        {
          poolId: "pool-1",
          poolName: "Legends League",
          sport: "nfl",
          season: 2024,
          poolStart: "Week 1",
          poolEnd: "Week 10",
          winner: "Alex Smith",
        },
        {
          poolId: "pool-2",
          poolName: "Champions Circle",
          sport: "nfl",
          season: 2024,
          poolStart: "Week 1",
          poolEnd: "Week 12",
          winner: "Jamie Taylor",
        },
      ],
    },
  },
};

describe("winners page", () => {
  it("displays all pool winners", () => {
    cy.intercept("/trpc/winners*", { body: winnersResponse });

    cy.mount(
      <MockProviders initialEntries={["/winners"]}>
        <Winners />
      </MockProviders>,
    );

    cy.findByRole("heading", { name: "Pool Winners" }).should("be.visible");
    cy.findByText("Legends League").should("be.visible");
    cy.findByText("Alex Smith").should("be.visible");
    cy.findByText("Champions Circle").should("be.visible");
    cy.findByText("Jamie Taylor").should("be.visible");
  });
});
