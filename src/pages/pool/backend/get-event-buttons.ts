import { picks } from "../../../schema";
import { ButtonStyle } from "../../../utils/button-style";
import { checkIfPickIsLocked } from "../../../utils/check-if-pick-is-locked";
import { Events } from "../../../utils/fetch-current-games";

export type Competition = Events[number]["competitions"][number];
type Team = Competition["competitors"][number]["team"];
export type EventButton = {
  awayTeamButton: TeamButtonProps;
  homeTeamButton: TeamButtonProps;
  competition?: Competition;
};
export type TeamButtonProps = {
  team?: Team;
  buttonDisabled: boolean;
  buttonStyle: ButtonStyle;
};

export function getEventButtons({
  events,
  userPick,
  forbiddenTeams,
  eliminated,
}: {
  events: Events;
  userPick?: typeof picks.$inferSelect;
  forbiddenTeams: string[];
  eliminated: boolean;
}): EventButton[] {
  return events.map((event) => {
    const competition = event.competitions[0];
    return {
      awayTeamButton: buildTeamButtonProps({
        teamType: "away",
        events,
        competition,
        userPick,
        forbiddenTeams,
        eliminated,
      }),
      homeTeamButton: buildTeamButtonProps({
        teamType: "home",
        events,
        competition,
        userPick,
        forbiddenTeams,
        eliminated,
      }),
      competition,
    };
  });
}

function buildTeamButtonProps({
  teamType,
  events,
  competition,
  userPick,
  forbiddenTeams,
  eliminated,
}: {
  teamType: "home" | "away";
  events: Events;
  competition?: Competition;
  userPick?: typeof picks.$inferSelect;
  forbiddenTeams: string[];
  eliminated: boolean;
}): TeamButtonProps {
  const competitors = competition?.competitors ?? [];
  const team = competitors.find(
    (competitor) => competitor.homeAway === teamType,
  )?.team;
  const gameStartedOrFinished =
    competition?.status.type.name !== "STATUS_SCHEDULED";
  const teamCurrentlyPicked = team?.name === userPick?.teamPicked;
  const teamPreviouslyPicked = forbiddenTeams.includes(team?.name ?? "");
  const pickIsLocked = checkIfPickIsLocked({
    events,
    userPick,
  });
  const buttonDisabledForOtherReason =
    gameStartedOrFinished || pickIsLocked || eliminated;
  const buttonDisabled = teamPreviouslyPicked || buttonDisabledForOtherReason;
  const buttonStyle = teamCurrentlyPicked
    ? ButtonStyle.CURRENTLY_PICKED
    : teamPreviouslyPicked
      ? ButtonStyle.PREVIOUSLY_PICKED
      : buttonDisabledForOtherReason
        ? ButtonStyle.PICK_FORBIDDEN
        : ButtonStyle.DEFAULT;
  return {
    team,
    buttonDisabled,
    buttonStyle,
  };
}
