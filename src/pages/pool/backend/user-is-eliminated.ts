import { DEFAULT_LIVES } from "../../../constants";
import { picks } from "../../../schema";

export function userIsEliminated({
  username,
  currentWeek,
  picksForPoolAndSeason,
  lives = DEFAULT_LIVES,
}: {
  username: string;
  currentWeek: number;
  picksForPoolAndSeason: (typeof picks.$inferSelect)[];
  lives?: number;
}) {
  if (
    failedToPickInAPreviousWeek(picksForPoolAndSeason, username, currentWeek)
  ) {
    return true;
  }

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

  return lostPicksWhereSomeoneElseWonThatWeek.length === lives;
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
