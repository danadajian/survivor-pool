import { picks } from "../../../schema";
import { Events } from "../../../utils/fetch-current-games";

export function getForbiddenTeamsForUser({
  username,
  picksForPoolAndSeason,
  events,
}: {
  username: string;
  picksForPoolAndSeason: (typeof picks.$inferSelect)[];
  events: Events;
}): string[] {
  const completedPicksForPoolAndSeason = picksForPoolAndSeason.filter(
    (pick) => pick.result !== "PENDING",
  );

  if (completedPicksForPoolAndSeason.length === 0) {
    return [];
  }

  const teamsAvailableToPick = events.flatMap((event) =>
    event.competitions.flatMap((competition) =>
      competition.competitors.map((competitor) => competitor.team.name),
    ),
  );
  const teamsUserHasPicked = completedPicksForPoolAndSeason
    .filter((pick) => pick.username === username)
    .map((pick) => pick.teamPicked);

  const maxWeekWithResults = Math.max(
    ...completedPicksForPoolAndSeason.map((pick) => pick.week),
  );
  const picksFromRemainingUsers = completedPicksForPoolAndSeason.filter(
    (pick) => pick.week === maxWeekWithResults,
  );
  const remainingUsers = [
    ...new Set(picksFromRemainingUsers.map((pick) => pick.username)),
  ];
  const allRemainingUsersHavePickedAllAvailableTeams = remainingUsers.every(
    (user) => {
      const teamsUserHasPicked = completedPicksForPoolAndSeason
        .filter((pick) => pick.username === user)
        .map((pick) => pick.teamPicked);
      return teamsAvailableToPick.every((team) =>
        teamsUserHasPicked.includes(team),
      );
    },
  );

  if (allRemainingUsersHavePickedAllAvailableTeams) {
    const teamsUserHasPickedMoreThanOnce = teamsUserHasPicked.filter(
      (team) => teamsUserHasPicked.filter((t) => t === team).length > 1,
    );
    return [...new Set(teamsUserHasPickedMoreThanOnce)];
  }

  return completedPicksForPoolAndSeason
    .filter((pick) => pick.username === username)
    .map((pick) => pick.teamPicked);
}
