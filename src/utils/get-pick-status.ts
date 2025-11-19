import { picks } from "../schema";

export type PickStatus =
  | "ELIMINATED"
  | "WON"
  | "LOST"
  | "LOCKED"
  | "PICKED"
  | "PENDING";

export function getPickStatus({
  eliminated,
  userPick,
  pickIsLocked,
}: {
  eliminated: boolean;
  userPick?: typeof picks.$inferSelect;
  pickIsLocked: boolean;
}): PickStatus {
  if (eliminated) {
    return "ELIMINATED";
  }

  switch (userPick?.result) {
    case "WON":
      return "WON";
    case "LOST":
      return "LOST";
    default:
      if (pickIsLocked) {
        return "LOCKED";
      } else if (userPick?.teamPicked) {
        return "PICKED";
      } else {
        return "PENDING";
      }
  }
}
