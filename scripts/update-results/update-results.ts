import { and, eq } from "drizzle-orm";

import { db } from "../../src/db";
import { type Events } from "../../src/utils/fetch-current-games";
import { picks } from "../../src/schema";

export async function updateResults(
  events: Events,
  week: number,
  season: number,
) {
  const pendingUserPicksThisWeek = await db.query.picks.findMany({
    where: and(
      eq(picks.week, week),
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
          eq(picks.week, week),
          eq(picks.season, season),
          eq(picks.result, "PENDING"),
        ),
      );
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
