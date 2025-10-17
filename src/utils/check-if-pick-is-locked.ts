import { Events } from "../pages/pool/backend";
import { picks } from "../schema";

export function checkIfPickIsLocked({
  events,
  teamUserPicked,
  userPickResult,
}: {
  events: Events;
  teamUserPicked: typeof picks.teamPicked.default;
  userPickResult: typeof picks.result.default;
}) {
  const teamPickedInEvent = events.find((event) =>
    event.competitions[0]?.competitors.some(
      (competitor) => competitor.team.name === teamUserPicked,
    ),
  );
  const gameState = teamPickedInEvent?.competitions[0].status.type.name;
  const gameStartedOrFinished = gameState !== "STATUS_SCHEDULED";
  return Boolean(
    teamUserPicked && gameStartedOrFinished && userPickResult !== "TIED",
  );
}
