import { eq } from "drizzle-orm";

import { db } from "../../../db";
import { members, picks } from "../../../schema";
import { userIsEliminated } from "./user-is-eliminated";

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
      !userIsEliminated({
        username,
        currentWeek,
        weekStarted,
        picksForPoolAndSeason,
        lives,
      }),
  );
  if (picksForPoolAndSeason.length > 0 && winners.length === 1) {
    return winners[0];
  }
  return undefined;
}
