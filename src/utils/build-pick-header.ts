import { Events } from "../pages/pool/backend";
import { members, picks } from "../schema";
import { checkIfPickIsLocked } from "./check-if-pick-is-locked";

export function buildPickHeader({
  events,
  teamUserPicked,
  userPickResult,
  eliminated,
}: {
  events: Events;
  teamUserPicked: typeof picks.teamPicked.default;
  userPickResult: typeof picks.result.default;
  eliminated: typeof members.eliminated.default;
}) {
  const pickIsLocked = checkIfPickIsLocked({
    events,
    teamUserPicked,
    userPickResult,
  });

  if (eliminated) {
    return "Sorry, you have been eliminated from this pool.";
  }
  switch (userPickResult) {
    case "WON":
      return `The ${teamUserPicked} won, and you're still alive!`;
    case "LOST":
      return `The ${teamUserPicked} lost, but you're still alive!`;
    case "TIED":
      return `The ${teamUserPicked} tied their game! Pick one of the remaining underdogs if you can.`;
    default:
      if (pickIsLocked) {
        return `Your ${teamUserPicked} pick is locked. Good luck!`;
      } else if (teamUserPicked) {
        return `You're riding with the ${teamUserPicked} this week!`;
      } else {
        return undefined;
      }
  }
}
