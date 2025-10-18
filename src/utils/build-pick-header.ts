import { Events } from "../pages/pool/backend";
import { members, picks } from "../schema";
import { checkIfPickIsLocked } from "./check-if-pick-is-locked";

export function buildPickHeader({
  events,
  userPick,
  eliminated,
}: {
  events: Events;
  userPick?: typeof picks.$inferSelect;
  eliminated: typeof members.eliminated.default;
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
    case "TIED":
      return `The ${userPick.teamPicked} tied their game! Pick one of the remaining underdogs if you can.`;
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
