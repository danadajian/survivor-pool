import { and, eq } from "drizzle-orm";

import { db } from "../src/db";
import { fetchGames } from "../src/pages/pick/backend";
import { members, picks } from "../src/schema";

const results = await fetchGames();

const { events, season, week } = results;

const userPicks = await db
  .select()
  .from(picks)
  .where(and(eq(picks.week, week.number), eq(picks.season, season.year)));

function getWinnerValue(teamPicked: string) {
  const teamPickedInEvent = events.find(
    (event) =>
      event.competitions[0]?.competitors.some(
        (competitor) => competitor.team.name === teamPicked,
      ),
  );
  const teamPickedFromApi =
    teamPickedInEvent?.competitions[0]?.competitors.find(
      (competitor) => competitor.team.name === teamPicked,
    );
  return teamPickedFromApi &&
    "winner" in teamPickedFromApi &&
    typeof teamPickedFromApi.winner === "boolean"
    ? teamPickedFromApi.winner
    : undefined;
}

for (const { username, teamPicked, poolId } of userPicks) {
  const teamWon = getWinnerValue(teamPicked);
  if (typeof teamWon === "boolean") {
    console.log(`Eliminating user ${username} from poolId ${poolId}...`);
    await db
      .update(picks)
      .set({ teamWon })
      .where(
        and(
          eq(picks.username, username),
          eq(picks.poolId, poolId),
          eq(picks.week, week.number),
          eq(picks.season, season.year),
        ),
      );
    await db
      .update(members)
      .set({ eliminated: true })
      .where(and(eq(members.username, username), eq(members.poolId, poolId)));
  }
}
