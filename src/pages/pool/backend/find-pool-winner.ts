import { eq } from "drizzle-orm";

import { db } from "../../../db";
import { members, picks } from "../../../schema";
import { userEliminationStatus } from "./user-elimination-status";

export async function findPoolWinner({
  poolId,
  currentWeek,
  picksForPoolAndSeason,
  weekStarted,
  lives,
}: {
  poolId: string;
  currentWeek: number;
  picksForPoolAndSeason: (typeof picks.$inferSelect)[];
  weekStarted: number;
  lives: number;
}) {
  const poolMembers = await db.query.members.findMany({
    where: eq(members.poolId, poolId),
  });
  const winners = poolMembers.filter(
    ({ username }) =>
      !userEliminationStatus({
        username,
        currentWeek,
        weekStarted,
        picksForPoolAndSeason,
        lives,
      }).eliminated,
  );
  if (
    poolMembers.length > 1 &&
    picksForPoolAndSeason.length > 0 &&
    winners.length === 1
  ) {
    return winners[0];
  }
  return undefined;
}
