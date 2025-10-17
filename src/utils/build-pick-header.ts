import { Events, fetchPoolMembers } from "../pages/pool/backend";
import { picks } from "../schema";
import { checkIfPickIsLocked } from "./check-if-pick-is-locked";

export function buildPickHeader(
  events: Events,
  userPick: typeof picks.$inferSelect | undefined,
  poolMember: Awaited<ReturnType<typeof fetchPoolMembers>>[number],
) {
  const pickIsLocked = checkIfPickIsLocked(events, userPick);

  if (poolMember?.eliminated) {
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
        return `You're riding with the ${userPick.teamPicked} this week!`;
      } else {
        return undefined;
      }
  }
}
