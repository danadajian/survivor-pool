import type { RouterOutput } from "../trpc";
import { gameHasStartedOrFinished } from "./game-has-started-or-finished";

export function checkIfPickIsLocked(data: RouterOutput["pool"]) {
  const { events, teamUserPicked, userPickResult } = data;
  const teamPickedInEvent = events.find((event) =>
    event.competitions[0]?.competitors.some(
      (competitor) => competitor.team.name === teamUserPicked,
    ),
  );
  const gameTime = teamPickedInEvent?.date;
  return (
    Boolean(teamUserPicked) &&
    gameHasStartedOrFinished(gameTime) &&
    userPickResult !== "TIED"
  );
}
