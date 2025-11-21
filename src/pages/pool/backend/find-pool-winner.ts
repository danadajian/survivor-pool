import { Events } from "src/utils/fetch-current-games";

import { members, picks } from "../../../schema";
import { userEliminationStatus } from "./user-elimination-status";

export async function findPoolWinner({
  picksForPoolAndSeason,
  poolMembers,
  lives,
  events,
}: {
  picksForPoolAndSeason: (typeof picks.$inferSelect)[];
  poolMembers: (typeof members.$inferSelect)[];
  lives: number;
  events: Events;
}) {
  const winners = poolMembers.filter(
    ({ username }) =>
      !userEliminationStatus({
        username,
        picksForPoolAndSeason,
        lives,
        events,
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
