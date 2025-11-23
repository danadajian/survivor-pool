import { picks } from "../../../schema";
import { ButtonStyle } from "../../../utils/button-style";
import { checkIfPickIsLocked } from "../../../utils/check-if-pick-is-locked";
import { Events } from "../../../utils/fetch-current-games";

export type Competition = Events[number]["competitions"][number];
type Team = Competition["competitors"][number]["team"];
export type GameStatus = "SCHEDULED" | "IN PROGRESS" | "FINAL";
export type EventButton = {
  awayTeamButton: TeamButtonProps;
  homeTeamButton: TeamButtonProps;
  competition?: Competition;
  gameStatus: GameStatus;
  periodDisplay?: string;
};
export type TeamButtonProps = {
  team?: Team;
  buttonDisabled: boolean;
  buttonStyle: ButtonStyle;
  score?: string;
};

function getPeriodDisplay(
  gameStatusObj: Competition["status"] | undefined,
  isGameFinished: boolean,
  gameStatus: GameStatus,
): string | undefined {
  if (!gameStatusObj) return undefined;

  const period = gameStatusObj.period;
  const displayClock = gameStatusObj.displayClock;
  const shortDetail = gameStatusObj.type.shortDetail;

  if (isGameFinished) {
    return shortDetail || "Final";
  }
  if (gameStatus === "IN PROGRESS" && period) {
    let periodLabel = "";
    if (period === 1) periodLabel = "1st";
    else if (period === 2) periodLabel = "2nd";
    else if (period === 3) periodLabel = "3rd";
    else if (period === 4) periodLabel = "4th";
    else if (period > 4) periodLabel = "OT";
    else periodLabel = `${period}`;

    if (displayClock) {
      return `${displayClock} - ${periodLabel}`;
    }
    return periodLabel;
  }
  return undefined;
}

export function getEventButtons({
  events,
  userPick,
  previouslyPickedTeams,
  eliminated,
}: {
  events: Events;
  userPick?: typeof picks.$inferSelect;
  previouslyPickedTeams: string[];
  eliminated: boolean;
}): EventButton[] {
  return events.map((event) => {
    const competition = event.competitions[0];
    const gameStatusObj = competition?.status;
    const statusName = gameStatusObj?.type.name;

    const isGameScheduled = statusName === "STATUS_SCHEDULED";
    const isGameFinished = statusName?.startsWith("STATUS_FINAL") ?? false;

    const gameStatus = isGameFinished
      ? "FINAL"
      : isGameScheduled
        ? "SCHEDULED"
        : "IN PROGRESS";

    const periodDisplay = getPeriodDisplay(
      gameStatusObj,
      isGameFinished,
      gameStatus,
    );

    return {
      awayTeamButton: buildTeamButtonProps({
        teamType: "away",
        events,
        competition,
        userPick,
        previouslyPickedTeams,
        eliminated,
      }),
      homeTeamButton: buildTeamButtonProps({
        teamType: "home",
        events,
        competition,
        userPick,
        previouslyPickedTeams,
        eliminated,
      }),
      competition,
      gameStatus,
      periodDisplay,
    };
  });
}

function buildTeamButtonProps({
  teamType,
  events,
  competition,
  userPick,
  previouslyPickedTeams,
  eliminated,
}: {
  teamType: "home" | "away";
  events: Events;
  competition?: Competition;
  userPick?: typeof picks.$inferSelect;
  previouslyPickedTeams: string[];
  eliminated: boolean;
}): TeamButtonProps {
  const competitors = competition?.competitors ?? [];
  const competitor = competitors.find((c) => c.homeAway === teamType);
  const team = competitor?.team;
  const score = competitor?.score;
  const gameStartedOrFinished =
    competition?.status.type.name !== "STATUS_SCHEDULED";
  const teamCurrentlyPicked = team?.name === userPick?.teamPicked;
  const teamPreviouslyPicked = previouslyPickedTeams.includes(team?.name ?? "");
  const pickIsLocked = checkIfPickIsLocked({
    events,
    userPick,
  });
  const pickIsForbidden = gameStartedOrFinished || pickIsLocked || eliminated;
  const buttonDisabled = teamPreviouslyPicked || pickIsForbidden;
  const buttonStyle = teamCurrentlyPicked
    ? ButtonStyle.CURRENTLY_PICKED
    : teamPreviouslyPicked
      ? ButtonStyle.PREVIOUSLY_PICKED
      : pickIsForbidden
        ? ButtonStyle.PICK_FORBIDDEN
        : ButtonStyle.DEFAULT;
  return {
    team,
    buttonDisabled,
    buttonStyle,
    score,
  };
}
