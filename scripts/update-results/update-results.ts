import { and, eq } from "drizzle-orm";

import { db } from "../../src/db";
import { type Events } from "../../src/pages/pool/backend";
import { members, picks } from "../../src/schema";

export async function updateResults(
  events: Events,
  week: number,
  season: number,
) {
  const membersStillAlive = await db
    .select()
    .from(members)
    .where(eq(members.eliminated, false));
  const allUserPicks = await db
    .select()
    .from(picks)
    .where(eq(picks.season, season));

  for (const { username, poolId } of membersStillAlive) {
    if (failedToPickLastWeek(allUserPicks, username, week)) {
      await eliminateUser(username, poolId);
      continue;
    }

    const userPicksForPoolId = allUserPicks.filter(
      (pick) => pick.week === week && pick.poolId === poolId,
    );
    const userPick = userPicksForPoolId.find(
      (pick) => pick.username === username,
    );
    if (!userPick?.teamPicked) {
      continue;
    }

    const result = getResult(userPick.teamPicked, events);
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
          eq(picks.week, week),
          eq(picks.season, season),
        ),
      );

    const atLeastOneUserWon = userPicksForPoolId.some(
      (pick) => pick.result === "WON",
    );
    if (result === "LOST" && atLeastOneUserWon) {
      await eliminateUser(username, poolId);
    }
  }
}

function getResult(teamPicked: string, events: Events) {
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

function failedToPickLastWeek(
  allUserPicks: (typeof picks.$inferSelect)[],
  username: string,
  week: number,
) {
  return (
    week > 1 &&
    !allUserPicks.some((pick) => pick.username === username && pick.week < week)
  );
}
