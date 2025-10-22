import { describe, expect, test } from "bun:test";

import {
  Events,
  getEventButtons,
  userIsEliminated,
} from "../src/pages/pool/backend";
import { picks } from "../src/schema";
import { buildPickHeader } from "../src/utils/build-pick-header";
import { mockEspnResponse } from "./mocks";

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
});

describe("team buttons", () => {
  test("can only pick games not yet started", () => {
    const events = mockEspnResponse.events as Events;
    const buttons = getEventButtons({
      events,
      eliminated: false,
      forbiddenTeams: [],
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
      forbiddenTeams: [],
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
});

describe("user elimination", () => {
  test("failure to pick in week 1 does not eliminate user", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "49ers",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "49ers",
        result: "WON",
      },
    ] as (typeof picks.$inferSelect)[];
    const result = userIsEliminated({
      username: "user1",
      currentWeek: 1,
      picksForPoolAndSeason,
    });
    expect(result).toBeFalse();
  });

  test("failure to pick in a previous week eliminates user", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "49ers",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "49ers",
        result: "WON",
      },
      {
        username: "user2",
        week: 2,
        teamPicked: "Eagles",
        result: "WON",
      },
      {
        username: "user1",
        week: 3,
        teamPicked: "Giants",
        result: "PENDING",
      },
      {
        username: "user3",
        week: 3,
        teamPicked: "Bengals",
        result: "PENDING",
      },
    ] as (typeof picks.$inferSelect)[];
    const result = userIsEliminated({
      username: "user1",
      currentWeek: 3,
      picksForPoolAndSeason,
    });
    expect(result).toBeTrue();
  });

  test("picking a winning team does not eliminate user", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "49ers",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "49ers",
        result: "WON",
      },
      {
        username: "user1",
        week: 2,
        teamPicked: "Giants",
        result: "WON",
      },
      {
        username: "user2",
        week: 2,
        teamPicked: "Eagles",
        result: "WON",
      },
    ] as (typeof picks.$inferSelect)[];
    const result = userIsEliminated({
      username: "user1",
      currentWeek: 3,
      picksForPoolAndSeason,
    });
    expect(result).toBeFalse();
    const resultNextWeek = userIsEliminated({
      username: "user1",
      currentWeek: 3,
      picksForPoolAndSeason,
    });
    expect(resultNextWeek).toBeFalse();
  });

  test("picking a losing team eliminates user", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "49ers",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "49ers",
        result: "WON",
      },
      {
        username: "user1",
        week: 2,
        teamPicked: "Giants",
        result: "WON",
      },
      {
        username: "user2",
        week: 2,
        teamPicked: "Eagles",
        result: "LOST",
      },
    ] as (typeof picks.$inferSelect)[];
    const result = userIsEliminated({
      username: "user2",
      currentWeek: 2,
      picksForPoolAndSeason,
    });
    expect(result).toBeTrue();
    const resultNextWeek = userIsEliminated({
      username: "user2",
      currentWeek: 3,
      picksForPoolAndSeason,
    });
    expect(resultNextWeek).toBeTrue();
  });

  test("failing to pick in a previous week when no one else picked does not eliminate user", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "49ers",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "49ers",
        result: "WON",
      },
      {
        username: "user1",
        week: 3,
        teamPicked: "Giants",
        result: "PENDING",
      },
      {
        username: "user2",
        week: 3,
        teamPicked: "Eagles",
        result: "PENDING",
      },
    ] as (typeof picks.$inferSelect)[];
    const resultUser1 = userIsEliminated({
      username: "user1",
      currentWeek: 3,
      picksForPoolAndSeason,
    });
    expect(resultUser1).toBeFalse();
    const resultUser2 = userIsEliminated({
      username: "user2",
      currentWeek: 3,
      picksForPoolAndSeason,
    });
    expect(resultUser2).toBeFalse();
  });
});
