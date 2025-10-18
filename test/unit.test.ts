import { describe, expect, test } from "bun:test";

import {
  mockEspnResponse,
  mockEspnResponseWithResults,
} from "../playwright/mocks";
import { Events, getEventButtons } from "../src/pages/pool/backend";
import { picks } from "../src/schema";
import { buildPickHeader } from "../src/utils/build-pick-header";

describe("pick header", () => {
  test("pick has been made", () => {
    const result = buildPickHeader({
      events: mockEspnResponse.events as Events,
      userPick: {
        teamPicked: "Bills",
        result: "PENDING",
      } as typeof picks.$inferSelect,
      eliminated: false,
    });
    expect(result).toEqual("You're riding with the Bills this week!");
  });

  test("pick has been made secretly", () => {
    const result = buildPickHeader({
      events: mockEspnResponse.events as Events,
      userPick: {
        teamPicked: "Bills",
        result: "PENDING",
        pickIsSecret: true,
      } as typeof picks.$inferSelect,
      eliminated: false,
    });
    expect(result).toEqual(
      "You're riding with the Bills this week (secretly)!",
    );
  });

  test("pick is locked", () => {
    const result = buildPickHeader({
      events: mockEspnResponse.events as Events,
      userPick: {
        teamPicked: "49ers",
        result: "PENDING",
      } as typeof picks.$inferSelect,
      eliminated: false,
    });
    expect(result).toEqual("Your 49ers pick is locked. Good luck!");
  });

  test("you survived a week by winning", () => {
    const result = buildPickHeader({
      events: mockEspnResponse.events as Events,
      userPick: {
        teamPicked: "49ers",
        result: "WON",
      } as typeof picks.$inferSelect,
      eliminated: false,
    });
    expect(result).toEqual("The 49ers won, and you're still alive!");
  });

  test("you survived a week by everyone losing with you", () => {
    const result = buildPickHeader({
      events: mockEspnResponse.events as Events,
      userPick: {
        teamPicked: "49ers",
        result: "LOST",
      } as typeof picks.$inferSelect,
      eliminated: false,
    });
    expect(result).toEqual("The 49ers lost, but you're still alive!");
  });

  test("you were eliminated from the pool", () => {
    const result = buildPickHeader({
      events: mockEspnResponse.events as Events,
      userPick: {
        teamPicked: "49ers",
        result: "LOST",
      } as typeof picks.$inferSelect,
      eliminated: true,
    });
    expect(result).toEqual("Sorry, you have been eliminated from this pool.");
  });

  test("your team tied and you need to pick an underdog", () => {
    const result = buildPickHeader({
      events: mockEspnResponse.events as Events,
      userPick: {
        teamPicked: "49ers",
        result: "TIED",
      } as typeof picks.$inferSelect,
      eliminated: false,
    });
    expect(result).toEqual(
      "The 49ers tied their game! Pick one of the remaining underdogs if you can.",
    );
  });
});

describe("team buttons", () => {
  test("can only pick games not yet started", () => {
    const events = mockEspnResponse.events as Events;
    const buttons = getEventButtons({
      events,
      eliminated: false,
    });
    expect(
      buttons.find((button) => button.awayTeamButton.team?.name === "Bills")
        ?.awayTeamButton.buttonDisabled,
    ).toBeFalse();
    expect(
      buttons.find((button) => button.homeTeamButton.team?.name === "Jets")
        ?.homeTeamButton.buttonDisabled,
    ).toBeFalse();
    expect(
      buttons.find((button) => button.awayTeamButton.team?.name === "49ers")
        ?.awayTeamButton.buttonDisabled,
    ).toBeTrue();
  });

  test("prevents changing pick after picking a game that has started", () => {
    const events = mockEspnResponse.events as Events;
    const buttons = getEventButtons({
      events,
      userPick: {
        teamPicked: "49ers",
        result: "PENDING",
      } as typeof picks.$inferSelect,
      eliminated: false,
    });
    expect(
      buttons.find((button) => button.awayTeamButton.team?.name === "49ers")
        ?.awayTeamButton.buttonDisabled,
    ).toBeTrue();
    expect(
      buttons.find((button) => button.awayTeamButton.team?.name === "Bills")
        ?.awayTeamButton.buttonDisabled,
    ).toBeTrue();
    expect(
      buttons.find((button) => button.homeTeamButton.team?.name === "Jets")
        ?.homeTeamButton.buttonDisabled,
    ).toBeTrue();
  });

  test("prevents picking a team previously picked but allows picking the currently picked team", () => {
    const events = mockEspnResponse.events as Events;
    const buttons = getEventButtons({
      events,
      userPick: {
        result: "PENDING",
        teamPicked: "Bills",
      } as typeof picks.$inferSelect,
      forbiddenTeams: ["Jets"],
      eliminated: false,
    });
    expect(
      buttons.find((button) => button.awayTeamButton.team?.name === "Bills")
        ?.awayTeamButton.buttonDisabled,
    ).toBeFalse();
    expect(
      buttons.find((button) => button.homeTeamButton.team?.name === "Jets")
        ?.homeTeamButton.buttonDisabled,
    ).toBeTrue();
  });

  test("your team tied and you need to pick an underdog", () => {
    const events = mockEspnResponseWithResults.events as Events;
    const buttons = getEventButtons({
      events,
      userPick: {
        teamPicked: "49ers",
        result: "TIED",
      } as typeof picks.$inferSelect,
      eliminated: false,
    });
    expect(
      buttons.find((button) => button.awayTeamButton.team?.name === "Rams")
        ?.awayTeamButton.buttonDisabled,
    ).toBeFalse();
    expect(
      buttons.find((button) => button.homeTeamButton.team?.name === "Bengals")
        ?.homeTeamButton.buttonDisabled,
    ).toBeTrue();
  });
});
