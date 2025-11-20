import { and, eq, isNotNull } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import * as v from "valibot";

import { db } from "../../db";
import { members, pools } from "../../schema";
import { buildUserDisplayName } from "../../utils/build-user-display-name";

export const fetchPoolWinnersInput = v.object({
  username: v.string(),
});

export async function fetchPoolWinners({
  username,
}: v.InferInput<typeof fetchPoolWinnersInput>) {
  const winnerMember = alias(members, "winner_member");

  const poolRows = await db
    .select({
      poolId: pools.id,
      poolName: pools.name,
      season: pools.season,
      poolStarted: pools.poolStarted,
      poolEnded: pools.poolEnded,
      poolWinner: pools.poolWinner,
      sport: pools.sport,
      winnerFirstName: winnerMember.firstName,
      winnerLastName: winnerMember.lastName,
    })
    .from(pools)
    .innerJoin(
      members,
      and(eq(members.poolId, pools.id), eq(members.username, username)),
    )
    .leftJoin(
      winnerMember,
      and(
        eq(winnerMember.poolId, pools.id),
        eq(winnerMember.username, pools.poolWinner),
      ),
    )
    .where(isNotNull(pools.poolWinner));

  const winners = poolRows.map((pool) => ({
    poolId: pool.poolId,
    poolName: pool.poolName,
    season: pool.season,
    sport: pool.sport,
    poolStarted: pool.poolStarted,
    poolEnded: pool.poolEnded,
    winner: buildUserDisplayName({
      username: pool.poolWinner!,
      firstName: pool.winnerFirstName,
      lastName: pool.winnerLastName,
    }),
  }));

  return {
    seasons: [...new Set(poolRows.map((pool) => pool.season))].sort(
      (a, b) => b - a,
    ),
    winners: winners.sort((a, b) => a.poolName.localeCompare(b.poolName)),
  };
}
