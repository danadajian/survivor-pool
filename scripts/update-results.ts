import { and, eq } from "drizzle-orm";

import { db } from "../src/db";
import { fetchCurrentGames } from "../src/pages/pick/backend";
import { members, picks } from "../src/schema";

const { events, season, week } = await fetchCurrentGames();

const userPicks = await db
  .select()
  .from(picks)
  .where(and(eq(picks.week, week.number), eq(picks.season, season.year)));

function getResult(teamPicked: string) {
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
  if (
    !teamPickedFromApi ||
    !("winner" in teamPickedFromApi) ||
    typeof teamPickedFromApi.winner !== "boolean"
  ) {
    return null;
  }

  return teamPickedFromApi.winner === true ? "WON" : "LOST";
}

for (const { username, teamPicked, poolId } of userPicks) {
  const result = getResult(teamPicked);
  await db
    .update(picks)
    .set({ result })
    .where(
      and(
        eq(picks.username, username),
        eq(picks.poolId, poolId),
        eq(picks.week, week.number),
        eq(picks.season, season.year),
      ),
    );
  if (result === "LOST") {
    console.log(`Eliminating user ${username} from poolId ${poolId}...`);
    await db
      .update(members)
      .set({ eliminated: true })
      .where(and(eq(members.username, username), eq(members.poolId, poolId)));
  }
}

process.exit(0);
