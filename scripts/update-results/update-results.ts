import { and, eq } from "drizzle-orm";

import { db } from "../../src/db";
import { type Events } from "../../src/utils/fetch-current-games";
import { picks, pools } from "../../src/schema";
import { findPoolWinner } from "../../src/pages/pool/backend/find-pool-winner";

export async function updateResults(
  events: Events,
  pickDate: string,
  season: number,
) {
  const pendingUserPicksThisWeek = await db.query.picks.findMany({
    where: and(
      eq(picks.pickDate, pickDate),
      eq(picks.season, season),
      eq(picks.result, "PENDING"),
    ),
  });
  const allPoolMembers = await db.query.members.findMany();

  for (const { username, poolId } of allPoolMembers) {
    const userPick = pendingUserPicksThisWeek.find(
      (pick) => pick.poolId === poolId && pick.username === username,
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
          eq(picks.pickDate, pickDate),
          eq(picks.season, season),
          eq(picks.result, "PENDING"),
        ),
      );
  }

  const poolIds = [...new Set(allPoolMembers.map((member) => member.poolId))];
  for (const poolId of poolIds) {
    const pool = await db.query.pools.findFirst({
      where: and(eq(pools.id, poolId), eq(pools.season, season)),
    });
    if (!pool || pool.poolWinner) {
      continue;
    }

    const poolMembers = allPoolMembers.filter(
      (member) => member.poolId === poolId,
    );
    if (!poolMembers.length) {
      continue;
    }

    const picksForPoolAndSeason = await db.query.picks.findMany({
      where: and(eq(picks.poolId, poolId), eq(picks.season, season)),
    });

    const poolWinner = await findPoolWinner({
      picksForPoolAndSeason,
      poolMembers,
      lives: pool.lives,
      events,
    });

    if (poolWinner) {
      await db
        .update(pools)
        .set({ poolWinner: poolWinner.username })
        .where(eq(pools.id, poolId));
    }
  }
}

function getResult(teamPicked: string, events: Events) {
  const teamPickedInEvent = events.find((event) =>
    event.competitions[0]?.competitors.some(
      (competitor) => competitor.team.name === teamPicked,
    ),
  );
  const competitors = teamPickedInEvent?.competitions[0]?.competitors;
  const teamPickedFromApi = competitors?.find(
    (competitor) => competitor.team.name === teamPicked,
  );
  const eventHasEnded = teamPickedFromApi && "winner" in teamPickedFromApi;
  if (!eventHasEnded) {
    return "PENDING";
  }

  return teamPickedFromApi.winner === true ? "WON" : "LOST";
}
