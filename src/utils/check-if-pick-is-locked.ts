import type { RouterOutput } from "../trpc";

export function checkIfPickIsLocked(data: RouterOutput["pool"]) {
  const { events, teamUserPicked, userPickResult } = data;
  const teamPickedInEvent = events.find((event) =>
    event.competitions[0]?.competitors.some(
      (competitor) => competitor.team.name === teamUserPicked,
    ),
  );
  const gameState = teamPickedInEvent?.competitions[0].status.type.name;
  const gameStartedOrFinished = gameState !== "STATUS_SCHEDULED";
  return (
    Boolean(teamUserPicked) &&
    gameStartedOrFinished &&
    userPickResult !== "TIED"
  );
}
