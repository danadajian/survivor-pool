import type { RouterOutput } from "../trpc";
import { checkIfPickIsLocked } from "./check-if-pick-is-locked";

export function buildPickHeader(
  data: RouterOutput["pool"],
  firstName?: string,
) {
  const { eliminated, teamUserPicked, userPickResult } = data;
  const pickIsLocked = checkIfPickIsLocked(data);

  if (eliminated) {
    return "Sorry, you have been eliminated from this pool.";
  }
  switch (userPickResult) {
    case "WON":
      return `The ${teamUserPicked} won, and you're still alive!`;
    case "LOST":
      return `The ${teamUserPicked} lost, but you're still alive!`;
    case "TIED":
      return `The ${teamUserPicked} tied their game! Pick any of the remaining underdogs.`;
    default:
      if (pickIsLocked) {
        return `Your ${teamUserPicked} pick is locked. Good luck!`;
      } else if (teamUserPicked) {
        return `You're riding with the ${teamUserPicked} this week!`;
      } else {
        return `Make your pick, ${firstName}!`;
      }
  }
}
