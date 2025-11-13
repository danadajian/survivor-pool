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
  const teamsAvailableToPick = events.flatMap((event) =>
    event.competitions.flatMap((competition) =>
      competition.competitors.map((competitor) => competitor.team.name),
    ),
  );
  const teamsUserHasPicked = picksForPoolAndSeason
    .filter((pick) => pick.username === username)
    .map((pick) => pick.teamPicked);

  const maxWeekWithResults = Math.max(
    ...picksForPoolAndSeason
      .filter((pick) => pick.result !== "PENDING")
      .map((pick) => pick.week),
  );
  const picksFromRemainingUsers = picksForPoolAndSeason.filter(
    (pick) => pick.week === maxWeekWithResults,
  );
  const remainingUsers = [
    ...new Set(picksFromRemainingUsers.map((pick) => pick.username)),
  ];
  const allRemainingUsersHavePickedAllAvailableTeams = remainingUsers.every(
    (user) => {
      const teamsUserHasPicked = picksForPoolAndSeason
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

  return picksForPoolAndSeason
    .filter((pick) => pick.username === username)
    .map((pick) => pick.teamPicked);
}
