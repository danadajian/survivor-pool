import { Events } from "../pages/pool/backend";
import { picks } from "../schema";
import { checkIfPickIsLocked } from "./check-if-pick-is-locked";

export function buildPickHeader({
  events,
  userPick,
  eliminated,
}: {
  events: Events;
  userPick?: typeof picks.$inferSelect;
  eliminated: boolean;
}) {
  const pickIsLocked = checkIfPickIsLocked({
    events,
    userPick,
  });

  if (eliminated) {
    return "Sorry, you have been eliminated from this pool.";
  }
  switch (userPick?.result) {
    case "WON":
      return `The ${userPick.teamPicked} won, and you're still alive!`;
    case "LOST":
      return `The ${userPick.teamPicked} lost, but you're still alive!`;
    default:
      if (pickIsLocked) {
        return `Your ${userPick?.teamPicked} pick is locked. Good luck!`;
      } else if (userPick?.teamPicked) {
        return `You're riding with the ${userPick.teamPicked} this week${userPick.pickIsSecret ? " (secretly)" : ""}!`;
      } else {
        return undefined;
      }
  }
}
