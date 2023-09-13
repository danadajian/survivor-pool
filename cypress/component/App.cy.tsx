import { App } from "../../src/frontend/app";
import { mockEspnResponse, mockPick } from "../../src/backend/mocks";

describe("App.cy.tsx", () => {
  beforeEach(() => {
    cy.intercept("/trpc/games*", {
      body: { result: { data: { games: mockEspnResponse } } },
    });
  });

  it("renders without picks", () => {
    cy.mount(<App />);

    cy.findByRole("heading", { name: "Survivor Pool 2023" }).should(
      "be.visible",
    );
    cy.findByRole("heading", { name: "Week 1" }).should("be.visible");
    cy.findByRole("heading", { name: "Make your pick!" }).should("be.visible");
  });

  it("can make a pick", () => {
    cy.intercept("/trpc/makePick*", { body: { result: { data: {} } } }).as(
      "makePick",
    );
    cy.mount(<App />);

    cy.findByRole("button", { name: /Chiefs/ })
      .should("be.visible")
      .click();
    cy.findByRole("heading", { name: "Confirm pick" }).should("be.visible");
    cy.findByText(/Are you sure you want to pick the Chiefs?/).should(
      "be.visible",
    );
    cy.intercept("/trpc/games*", {
      body: { result: { data: { games: mockEspnResponse, pick: mockPick } } },
    });
    cy.findByRole("button", { name: "Lock it in" }).click();
    cy.findByRole("button", { name: /Chiefs/ }).should("be.disabled");
    cy.findByRole("heading", { name: "You're riding with the Chiefs!" }).should(
      "be.visible",
    );
  });
});
