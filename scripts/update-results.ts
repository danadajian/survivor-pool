import { and, eq } from "drizzle-orm";

import { db } from "../src/db";
import { fetchCurrentGames } from "../src/pages/pool/backend";
import { members, picks } from "../src/schema";

const { events, season, week } = await fetchCurrentGames();

const userPicks = await db
  .select()
  .from(picks)
  .where(and(eq(picks.week, week.number), eq(picks.season, season.year)));

const membersStillAlive = await db
  .select()
  .from(members)
  .where(eq(members.eliminated, false));

function getResult(teamPicked: string) {
  const teamPickedInEvent = events.find((event) =>
    event.competitions[0]?.competitors.some(
      (competitor) => competitor.team.name === teamPicked,
    ),
  );
  const teamPickedFromApi =
    teamPickedInEvent?.competitions[0]?.competitors.find(
      (competitor) => competitor.team.name === teamPicked,
    );
  const eventHasEnded = teamPickedFromApi && "winner" in teamPickedFromApi;
  if (!eventHasEnded) {
    return "PENDING";
  }

  return teamPickedFromApi.winner === true ? "WON" : "LOST";
}

async function eliminateUser(username: string, poolId: string) {
  console.log(`Eliminating user ${username} from poolId ${poolId}...`);
  await db
    .update(members)
    .set({ eliminated: true })
    .where(and(eq(members.username, username), eq(members.poolId, poolId)));
}

for (const { username, poolId } of membersStillAlive) {
  const userPicksForPoolId = userPicks.filter((pick) => pick.poolId === poolId);
  const userPick = userPicksForPoolId.find(
    (pick) => pick.username === username,
  );
  if (!userPick?.teamPicked) {
    continue;
  }

  const result = getResult(userPick.teamPicked);
  console.log(
    `Updating ${username}'s pick ${userPick.teamPicked} to ${result}...`,
  );
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

  const atLeastOneUserWon = userPicksForPoolId.some(
    (pick) => pick.result === "WON",
  );
  if (result === "LOST" && atLeastOneUserWon) {
    await eliminateUser(username, poolId);
  }
}

process.exit(0);
