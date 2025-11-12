import { Events } from "src/utils/fetch-current-games";

import { picks } from "../../../schema";

export function userEliminationStatus({
  username,
  currentWeek,
  picksForPoolAndSeason,
  weekStarted,
  lives,
  events,
}: {
  username: string;
  currentWeek: number;
  picksForPoolAndSeason: (typeof picks.$inferSelect)[];
  weekStarted: number;
  lives: number;
  events: Events;
}) {
  const userPicksThatLost = picksForPoolAndSeason.filter(
    (pick) => pick.username === username && pick.result === "LOST",
  );
  const lostPicksWhereSomeoneElseWonThatWeek = userPicksThatLost.filter(
    (userPick) =>
      picksForPoolAndSeason
        .filter(
          (pick) => pick.week === userPick.week && pick.username !== username,
        )
        .some((pick) => pick.result === "WON"),
  );
  const numberOfWeeksFailedToPick = getNumberOfWeeksFailedToPick(
    picksForPoolAndSeason,
    username,
    currentWeek,
    weekStarted,
  );
  const livesLost =
    lostPicksWhereSomeoneElseWonThatWeek.length + numberOfWeeksFailedToPick;

  const teamsAvailableToPick = events.flatMap((event) =>
    event.competitions.flatMap((competition) =>
      competition.competitors.map((competitor) => competitor.team.name),
    ),
  );
  const teamsUserHasPicked = picksForPoolAndSeason
    .filter((pick) => pick.username === username)
    .map((pick) => pick.teamPicked);

  const otherUsernames = [
    ...new Set(
      picksForPoolAndSeason
        .filter((pick) => pick.username !== username)
        .map((pick) => pick.username),
    ),
  ];
  const noOtherUserHasTeamsToPick = otherUsernames.every((otherUser) => {
    const teamsOtherUserHasPicked = picksForPoolAndSeason
      .filter((pick) => pick.username === otherUser)
      .map((pick) => pick.teamPicked);
    return teamsAvailableToPick.every((team) =>
      teamsOtherUserHasPicked.includes(team),
    );
  });
  const userHasNoTeamsToPick = teamsAvailableToPick.every((team) =>
    teamsUserHasPicked.includes(team),
  );
  const userRanOutOfTeams = userHasNoTeamsToPick && !noOtherUserHasTeamsToPick;

  return {
    eliminated: userRanOutOfTeams || livesLost >= lives,
    livesRemaining: userRanOutOfTeams ? 0 : Math.max(lives - livesLost, 0),
  };
}

function getNumberOfWeeksFailedToPick(
  picksForPoolAndSeason: (typeof picks.$inferSelect)[],
  username: string,
  currentWeek: number,
  weekStarted: number,
) {
  const userPicks = picksForPoolAndSeason.filter(
    (pick) => pick.username === username,
  );
  const weeksUserPicked = userPicks.map((pick) => pick.week);
  const weeksEveryoneElsePicked = picksForPoolAndSeason
    .filter((pick) => pick.username !== username)
    .map((pick) => pick.week);
  const allWeeksFromWeekStartedToCurrentWeek = Array.from(
    { length: currentWeek - weekStarted },
    (_, i) => i + weekStarted,
  );
  const weeksUserFailedToPickWhenSomeoneElsePicked =
    allWeeksFromWeekStartedToCurrentWeek.filter(
      (week) =>
        !weeksUserPicked.includes(week) &&
        weeksEveryoneElsePicked.includes(week),
    );
  return weeksUserFailedToPickWhenSomeoneElsePicked.length;
}
