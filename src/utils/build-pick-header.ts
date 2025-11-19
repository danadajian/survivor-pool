import { picks } from "../schema";
import { PickStatus } from "./get-pick-status";

export function buildPickHeader({
  userPick,
  pickStatus,
  firstName,
}: {
  userPick?: typeof picks.$inferSelect;
  pickStatus: PickStatus;
  firstName?: string | null;
}) {
  switch (pickStatus) {
    case "ELIMINATED":
      return "Sorry, you have been eliminated from this pool.";
    case "WON":
      return `The ${userPick?.teamPicked} won, and you're still alive!`;
    case "LOST":
      return `The ${userPick?.teamPicked} lost, but you're still alive!`;
    case "LOCKED":
      return `Your ${userPick?.teamPicked} pick is locked. Good luck!`;
    case "PICKED":
      return `You're riding with the ${userPick?.teamPicked} this week!`;
    default:
      return `Make your pick, ${firstName ?? userPick?.username}!`;
  }
}
