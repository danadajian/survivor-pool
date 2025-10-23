import { picks } from "../schema";
import { Events } from "./fetch-current-games";

export function checkIfPickIsLocked({
  events,
  userPick,
}: {
  events: Events;
  userPick?: typeof picks.$inferSelect;
}) {
  const teamPickedInEvent = events.find((event) =>
    event.competitions[0]?.competitors.some(
      (competitor) => competitor.team.name === userPick?.teamPicked,
    ),
  );
  const gameState = teamPickedInEvent?.competitions[0]?.status.type.name;
  const gameStartedOrFinished = gameState !== "STATUS_SCHEDULED";
  return Boolean(userPick?.teamPicked) && gameStartedOrFinished;
}
