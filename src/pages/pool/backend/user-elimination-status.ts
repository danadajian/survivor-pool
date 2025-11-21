import { Events } from "src/utils/fetch-current-games";

import { picks } from "../../../schema";
import { getPreviouslyPickedTeamsForUser } from "./get-previously-picked-teams-for-user";

export function userEliminationStatus({
  username,
  picksForPoolAndSeason,
  lives,
  events,
}: {
  username: string;
  picksForPoolAndSeason: (typeof picks.$inferSelect)[];
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
          (pick) =>
            pick.pickDate === userPick.pickDate && pick.username !== username,
        )
        .some((pick) => pick.result === "WON"),
  );
  const numberOfWeeksFailedToPick = getNumberOfWeeksFailedToPick(
    picksForPoolAndSeason,
    username,
  );
  const livesLost =
    lostPicksWhereSomeoneElseWonThatWeek.length + numberOfWeeksFailedToPick;

  const teamsAvailableToPick = events.flatMap((event) =>
    event.competitions.flatMap((competition) =>
      competition.competitors.map((competitor) => competitor.team.name),
    ),
  );

  const previouslyPickedTeams = getPreviouslyPickedTeamsForUser({
    username,
    picksForPoolAndSeason,
    events,
  });
  const userHasNoTeamsToPick = teamsAvailableToPick.every((team) =>
    previouslyPickedTeams.includes(team),
  );

  return {
    eliminated: userHasNoTeamsToPick || livesLost >= lives,
    livesRemaining: userHasNoTeamsToPick ? 0 : Math.max(lives - livesLost, 0),
  };
}

function getNumberOfWeeksFailedToPick(
  picksForPoolAndSeason: (typeof picks.$inferSelect)[],
  username: string,
) {
  const weeksUserPicked = picksForPoolAndSeason
    .filter((pick) => pick.username === username)
    .map((pick) => pick.pickDate);
  const weeksEveryoneElsePicked = picksForPoolAndSeason
    .filter((pick) => pick.username !== username)
    .map((pick) => pick.pickDate);

  const allWeeksWithCompletedPicks = picksForPoolAndSeason
    .filter((pick) => pick.result !== "PENDING")
    .map((pick) => pick.pickDate);
  const uniqueWeeksWithCompletedPicks = [
    ...new Set(allWeeksWithCompletedPicks),
  ];

  const weeksUserFailedToPickWhenSomeoneElsePicked =
    uniqueWeeksWithCompletedPicks.filter(
      (week) =>
        !weeksUserPicked.includes(week) &&
        weeksEveryoneElsePicked.includes(week),
    );
  return weeksUserFailedToPickWhenSomeoneElsePicked.length;
}
