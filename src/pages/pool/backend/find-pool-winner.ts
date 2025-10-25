import { members, picks } from "../../../schema";
import { userEliminationStatus } from "./user-elimination-status";

export async function findPoolWinner({
  currentWeek,
  picksForPoolAndSeason,
  poolMembers,
  weekStarted,
  lives,
}: {
  currentWeek: number;
  picksForPoolAndSeason: (typeof picks.$inferSelect)[];
  poolMembers: (typeof members.$inferSelect)[];
  weekStarted: number;
  lives: number;
}) {
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
