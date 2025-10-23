import { picks } from "../../../schema";

export function userIsEliminated({
  username,
  currentWeek,
  picksForPoolAndSeason,
  weekStarted,
  lives,
}: {
  username: string;
  currentWeek: number;
  picksForPoolAndSeason: (typeof picks.$inferSelect)[];
  weekStarted: number;
  lives: number;
}) {
  const allUserPicks = picksForPoolAndSeason.filter(
    (pick) => pick.username === username,
  );
  const userPicksThatLost = allUserPicks.filter(
    (pick) => pick.result === "LOST",
  );
  const lostPicksWhereSomeoneElseWonThatWeek = userPicksThatLost.filter(
    (userPick) =>
      picksForPoolAndSeason
        .filter(
          (pick) => pick.week === userPick.week && pick.username !== username,
        )
        .some((pick) => pick.result === "WON"),
  );

  return (
    lostPicksWhereSomeoneElseWonThatWeek.length +
      numberOfWeeksFailedToPick(
        picksForPoolAndSeason,
        username,
        currentWeek,
        weekStarted,
      ) >=
    lives
  );
}

function numberOfWeeksFailedToPick(
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
    { length: currentWeek - weekStarted + 1 },
    (_, i) => i + weekStarted,
  );
  return allWeeksFromWeekStartedToCurrentWeek.filter(
    (week) =>
      !weeksUserPicked.includes(week) && weeksEveryoneElsePicked.includes(week),
  ).length;
}
