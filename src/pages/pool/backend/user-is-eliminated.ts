import { picks } from "../../../schema";

export function userIsEliminated({
  username,
  currentWeek,
  picksForPoolAndSeason,
}: {
  username: string;
  currentWeek: number;
  picksForPoolAndSeason: (typeof picks.$inferSelect)[];
}) {
  if (
    failedToPickInAPreviousWeek(picksForPoolAndSeason, username, currentWeek)
  ) {
    return true;
  }

  const allUserPicks = picksForPoolAndSeason.filter(
    (pick) => pick.username === username,
  );
  const newestUserPick = allUserPicks
    .toSorted((a, b) => b.week - a.week)
    .find(Boolean);
  const mostRecentUserPickWasLoss = newestUserPick?.result === "LOST";
  const atLeastOneUserWonThatWeek = picksForPoolAndSeason
    .filter((pick) => pick.week === newestUserPick?.week)
    .some((pick) => pick.result === "WON");

  return mostRecentUserPickWasLoss && atLeastOneUserWonThatWeek;
}

function failedToPickInAPreviousWeek(
  picksForPoolAndSeason: (typeof picks.$inferSelect)[],
  username: string,
  week: number,
) {
  const userPicks = picksForPoolAndSeason.filter(
    (pick) => pick.username === username,
  );
  const weeksUserPicked = userPicks.map((pick) => pick.week);
  const weeksEveryoneElsePicked = picksForPoolAndSeason
    .filter((pick) => pick.username !== username)
    .map((pick) => pick.week);
  const allWeeksUntilCurrentWeek = Array.from(
    { length: week - 1 },
    (_, i) => i + 1,
  );
  const userPickedInEachPreviousWeek = allWeeksUntilCurrentWeek.every(
    (week) =>
      weeksUserPicked.includes(week) || !weeksEveryoneElsePicked.includes(week),
  );
  return !userPickedInEachPreviousWeek;
}
