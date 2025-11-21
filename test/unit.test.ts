import { describe, expect, test } from "bun:test";
import { checkIfAllAvailableTeamsAreLocked } from "src/pages/pool/backend/check-if-all-available-teams-are-locked";
import { getPreviouslyPickedTeamsForUser } from "src/pages/pool/backend/get-previously-picked-teams-for-user";

import { getEventButtons } from "../src/pages/pool/backend/get-event-buttons";
import { userEliminationStatus } from "../src/pages/pool/backend/user-elimination-status";
import { picks } from "../src/schema";
import { buildPickHeader } from "../src/utils/build-pick-header";
import { Events } from "../src/utils/fetch-current-games";
import { mockEspnResponse } from "./mocks";

describe("pick header", () => {
  test("pick has been made", () => {
    const result = buildPickHeader({
      userPick: {
        teamPicked: "Bills",
        result: "PENDING",
      } as typeof picks.$inferSelect,
      pickStatus: "PICKED",
    });
    expect(result).toEqual("You're riding with the Bills this week!");
  });

  test("pick is locked", () => {
    const result = buildPickHeader({
      userPick: {
        teamPicked: "49ers",
        result: "PENDING",
      } as typeof picks.$inferSelect,
      pickStatus: "LOCKED",
    });
    expect(result).toEqual("Your 49ers pick is locked. Good luck!");
  });

  test("you survived a week by winning", () => {
    const result = buildPickHeader({
      userPick: {
        teamPicked: "49ers",
        result: "WON",
      } as typeof picks.$inferSelect,
      pickStatus: "WON",
    });
    expect(result).toEqual("The 49ers won, and you're still alive!");
  });

  test("you survived a week by everyone losing with you", () => {
    const result = buildPickHeader({
      userPick: {
        teamPicked: "49ers",
        result: "LOST",
      } as typeof picks.$inferSelect,
      pickStatus: "LOST",
    });
    expect(result).toEqual("The 49ers lost, but you're still alive!");
  });

  test("you were eliminated from the pool", () => {
    const result = buildPickHeader({
      userPick: {
        teamPicked: "49ers",
        result: "LOST",
      } as typeof picks.$inferSelect,
      pickStatus: "ELIMINATED",
    });
    expect(result).toEqual("Sorry, you have been eliminated from this pool.");
  });

  test("you missed the deadline to make a pick", () => {
    const result = buildPickHeader({
      userPick: {
        teamPicked: "49ers",
        result: "PENDING",
      } as typeof picks.$inferSelect,
      pickStatus: "MISSED_DEADLINE",
    });
    expect(result).toEqual("You missed the deadline to make a pick this week.");
  });
});

describe("team buttons", () => {
  test("can only pick games not yet started", () => {
    const events = mockEspnResponse.events as Events;
    const buttons = getEventButtons({
      events,
      eliminated: false,
      previouslyPickedTeams: [],
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
      previouslyPickedTeams: [],
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
      previouslyPickedTeams: ["Jets"],
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
    const { eliminated, livesRemaining } = userEliminationStatus({
      username: "user1",
      picksForPoolAndSeason,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(eliminated).toBeFalse();
    expect(livesRemaining).toEqual(1);
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
        username: "user2",
        week: 3,
        teamPicked: "Bengals",
        result: "PENDING",
      },
    ] as (typeof picks.$inferSelect)[];
    const { eliminated, livesRemaining } = userEliminationStatus({
      username: "user1",
      picksForPoolAndSeason,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(eliminated).toBeTrue();
    expect(livesRemaining).toEqual(0);
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
    const { eliminated } = userEliminationStatus({
      username: "user1",
      picksForPoolAndSeason,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(eliminated).toBeFalse();
    const { eliminated: eliminatedNextWeek } = userEliminationStatus({
      username: "user1",
      picksForPoolAndSeason,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(eliminatedNextWeek).toBeFalse();
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
    const { eliminated } = userEliminationStatus({
      username: "user2",
      picksForPoolAndSeason,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(eliminated).toBeTrue();
    const { eliminated: eliminatedNextWeek } = userEliminationStatus({
      username: "user2",
      picksForPoolAndSeason,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(eliminatedNextWeek).toBeTrue();
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
    const { eliminated: user1Eliminated } = userEliminationStatus({
      username: "user1",
      picksForPoolAndSeason,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(user1Eliminated).toBeFalse();
    const { eliminated: user2Eliminated } = userEliminationStatus({
      username: "user2",
      picksForPoolAndSeason,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(user2Eliminated).toBeFalse();
  });

  test("failing to pick in a previous week in a pool with 2 lives does not eliminate user", () => {
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
        username: "user2",
        week: 3,
        teamPicked: "Bengals",
        result: "PENDING",
      },
    ] as (typeof picks.$inferSelect)[];
    const { eliminated: user1Eliminated } = userEliminationStatus({
      username: "user1",
      picksForPoolAndSeason,
      lives: 2,
      events: mockEspnResponse.events as Events,
    });
    expect(user1Eliminated).toBeFalse();
  });

  test("failing to pick in a previous week in a pool with 2 lives and then losing eliminates user", () => {
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
        result: "LOST",
      },
      {
        username: "user2",
        week: 3,
        teamPicked: "Bengals",
        result: "WON",
      },
    ] as (typeof picks.$inferSelect)[];
    const { eliminated: user1Eliminated } = userEliminationStatus({
      username: "user1",
      picksForPoolAndSeason,
      lives: 2,
      events: mockEspnResponse.events as Events,
    });
    expect(user1Eliminated).toBeTrue();
  });

  test("running out of teams to pick eliminates user", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user1",
        week: 2,
        teamPicked: "Jets",
        result: "WON",
      },
      {
        username: "user2",
        week: 2,
        teamPicked: "Giants",
        result: "WON",
      },
    ] as (typeof picks.$inferSelect)[];
    const events = (mockEspnResponse.events as Events).slice(0, 1);
    const { eliminated: user1Eliminated, livesRemaining: user1LivesRemaining } =
      userEliminationStatus({
        username: "user1",
        picksForPoolAndSeason,
        lives: 1,
        events,
      });
    expect(user1Eliminated).toBeTrue();
    expect(user1LivesRemaining).toEqual(0);

    const { eliminated: user2Eliminated, livesRemaining: user2LivesRemaining } =
      userEliminationStatus({
        username: "user2",
        picksForPoolAndSeason,
        lives: 1,
        events,
      });
    expect(user2Eliminated).toBeFalse();
    expect(user2LivesRemaining).toEqual(1);
  });

  test("running out of unlocked teams to pick detects lock out but does not eliminate user yet", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
    ] as (typeof picks.$inferSelect)[];
    // Create events where all games have started (STATUS_IN_PROGRESS)
    const events = (mockEspnResponse.events as Events).slice(0, 1).map((e) => ({
      ...e,
      competitions: e.competitions.map((c) => ({
        ...c,
        status: { type: { name: "STATUS_IN_PROGRESS" } },
      })),
    })) as Events;

    const { eliminated, livesRemaining } = userEliminationStatus({
      username: "user1",
      picksForPoolAndSeason,
      lives: 1,
      events,
    });

    const previouslyPickedTeams = getPreviouslyPickedTeamsForUser({
      username: "user1",
      picksForPoolAndSeason,
      events,
    });
    const userAllAvailableTeamsLocked = checkIfAllAvailableTeamsAreLocked({
      events,
      previouslyPickedTeams,
    });

    expect(userAllAvailableTeamsLocked).toBeTrue();
    expect(eliminated).toBeFalse(); // Not eliminated immediately, but can't pick
    expect(livesRemaining).toEqual(1);
  });

  test("everyone running out of teams to pick does not eliminate anyone", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user1",
        week: 2,
        teamPicked: "Jets",
        result: "WON",
      },
      {
        username: "user2",
        week: 2,
        teamPicked: "Jets",
        result: "WON",
      },
    ] as (typeof picks.$inferSelect)[];
    const events = (mockEspnResponse.events as Events).slice(0, 1);
    const { eliminated: user1Eliminated, livesRemaining: user1LivesRemaining } =
      userEliminationStatus({
        username: "user1",
        picksForPoolAndSeason,
        lives: 1,
        events,
      });
    expect(user1Eliminated).toBeFalse();
    expect(user1LivesRemaining).toEqual(1);

    const { eliminated: user2Eliminated, livesRemaining: user2LivesRemaining } =
      userEliminationStatus({
        username: "user2",
        picksForPoolAndSeason,
        lives: 1,
        events,
      });
    expect(user2Eliminated).toBeFalse();
    expect(user2LivesRemaining).toEqual(1);
  });

  test("everyone running out of teams and then picking the same team again that loses eliminates user", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user1",
        week: 2,
        teamPicked: "Jets",
        result: "WON",
      },
      {
        username: "user2",
        week: 2,
        teamPicked: "Jets",
        result: "WON",
      },
      {
        username: "user1",
        week: 3,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user2",
        week: 3,
        teamPicked: "Jets",
        result: "LOST",
      },
    ] as (typeof picks.$inferSelect)[];
    const events = (mockEspnResponse.events as Events).slice(0, 1);
    const { eliminated: user1Eliminated, livesRemaining: user1LivesRemaining } =
      userEliminationStatus({
        username: "user1",
        picksForPoolAndSeason,
        lives: 1,
        events,
      });
    expect(user1Eliminated).toBeFalse();
    expect(user1LivesRemaining).toEqual(1);

    const { eliminated: user2Eliminated, livesRemaining: user2LivesRemaining } =
      userEliminationStatus({
        username: "user2",
        picksForPoolAndSeason,
        lives: 1,
        events,
      });
    expect(user2Eliminated).toBeTrue();
    expect(user2LivesRemaining).toEqual(0);
  });
});

describe("forbidden teams", () => {
  test("returns the teams that the user has picked in previous weeks", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "Jets",
        result: "WON",
      },
    ] as (typeof picks.$inferSelect)[];
    const previouslyPickedTeams = getPreviouslyPickedTeamsForUser({
      username: "user1",
      picksForPoolAndSeason,
      events: mockEspnResponse.events as Events,
    });
    expect(previouslyPickedTeams).toEqual(["Bills"]);
  });

  test("excludes pending picks from forbidden teams", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "Giants",
        result: "WON",
      },
      {
        username: "user1",
        week: 2,
        teamPicked: "Jets",
        result: "PENDING",
      },
    ] as (typeof picks.$inferSelect)[];
    const previouslyPickedTeams = getPreviouslyPickedTeamsForUser({
      username: "user1",
      picksForPoolAndSeason,
      events: mockEspnResponse.events as Events,
    });
    expect(previouslyPickedTeams).toEqual(["Bills"]);
  });

  test("returns empty list when all users have picked all available teams", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user1",
        week: 2,
        teamPicked: "Jets",
        result: "WON",
      },
      {
        username: "user2",
        week: 2,
        teamPicked: "Jets",
        result: "WON",
      },
    ] as (typeof picks.$inferSelect)[];
    const events = (mockEspnResponse.events as Events).slice(0, 1);
    const previouslyPickedTeams = getPreviouslyPickedTeamsForUser({
      username: "user1",
      picksForPoolAndSeason,
      events,
    });
    expect(previouslyPickedTeams).toEqual([]);
  });

  test("returns all teams when not all users have picked all available teams", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "Giants",
        result: "WON",
      },
      {
        username: "user1",
        week: 2,
        teamPicked: "Jets",
        result: "WON",
      },
      {
        username: "user2",
        week: 2,
        teamPicked: "Jets",
        result: "WON",
      },
    ] as (typeof picks.$inferSelect)[];
    const events = (mockEspnResponse.events as Events).slice(0, 1);
    const previouslyPickedTeams = getPreviouslyPickedTeamsForUser({
      username: "user1",
      picksForPoolAndSeason,
      events,
    });
    expect(previouslyPickedTeams).toEqual(["Bills", "Jets"]);
  });

  test("returns the teams picked after all users picked all available teams", () => {
    const picksForPoolAndSeason = [
      {
        username: "user1",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user2",
        week: 1,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user1",
        week: 2,
        teamPicked: "Jets",
        result: "WON",
      },
      {
        username: "user2",
        week: 2,
        teamPicked: "Jets",
        result: "WON",
      },
      {
        username: "user1",
        week: 3,
        teamPicked: "Bills",
        result: "WON",
      },
      {
        username: "user2",
        week: 3,
        teamPicked: "Jets",
        result: "WON",
      },
    ] as (typeof picks.$inferSelect)[];
    const events = (mockEspnResponse.events as Events).slice(0, 1);
    const previouslyPickedTeams = getPreviouslyPickedTeamsForUser({
      username: "user1",
      picksForPoolAndSeason,
      events,
    });
    expect(previouslyPickedTeams).toEqual(["Bills"]);
    const previouslyPickedTeamsForUser2 = getPreviouslyPickedTeamsForUser({
      username: "user2",
      picksForPoolAndSeason,
      events,
    });
    expect(previouslyPickedTeamsForUser2).toEqual(["Jets"]);
  });
});
