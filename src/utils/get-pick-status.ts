import { checkIfAllAvailableTeamsAreLocked } from "../pages/pool/backend/check-if-all-available-teams-are-locked";
import { picks } from "../schema";
import { checkIfPickIsLocked } from "./check-if-pick-is-locked";
import { Events } from "./fetch-current-games";

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
  events,
  previouslyPickedTeams,
}: {
  eliminated: boolean;
  userPick?: typeof picks.$inferSelect;
  events: Events;
  previouslyPickedTeams: string[];
}): PickStatus {
  if (
    checkIfAllAvailableTeamsAreLocked({
      events,
      previouslyPickedTeams,
    })
  ) {
    return "MISSED_DEADLINE";
  }

  if (eliminated) {
    return "ELIMINATED";
  }

  switch (userPick?.result) {
    case "WON":
      return "WON";
    case "LOST":
      return "LOST";
    default:
      if (
        checkIfPickIsLocked({
          events,
          userPick,
        })
      ) {
        return "LOCKED";
      } else if (userPick?.teamPicked) {
        return "PICKED";
      } else {
        return "PENDING";
      }
  }
}
