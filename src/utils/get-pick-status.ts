import { picks } from "../schema";

export type PickStatus =
  | "ELIMINATED"
  | "WON"
  | "LOST"
  | "LOCKED"
  | "PICKED"
  | "PENDING"
  | "MISSED_DEADLINE";

export function getPickStatus({
  eliminated,
  userPick,
  pickIsLocked,
  userAllAvailableTeamsLocked,
}: {
  eliminated: boolean;
  userPick?: typeof picks.$inferSelect;
  pickIsLocked: boolean;
  userAllAvailableTeamsLocked: boolean;
}): PickStatus {
  if (eliminated) {
    return "ELIMINATED";
  }

  if (userAllAvailableTeamsLocked) {
    return "MISSED_DEADLINE";
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
