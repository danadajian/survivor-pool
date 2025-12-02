import React from "react";
import spacetime from "spacetime";

import { TeamButton } from "../../../components/team-button";
import { type EventButton } from "../backend/get-event-buttons";

type TeamRowProps = {
  eventButton: EventButton;
  username: string;
  poolId: string;
};

export const EventRow = ({ eventButton, username, poolId }: TeamRowProps) => {
  const gameTimeInClientTimezone = spacetime(
    eventButton.competition?.date,
  ).goto(null);

  const kickoffTime = gameTimeInClientTimezone.format(
    "{day} {hour}:{minute-pad} {ampm}",
  );
  const matchupNote = eventButton.competition?.odds?.[0]?.details ?? "";

  const commonProps = {
    username,
    poolId,
  };

  return (
    <li className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 shadow-sm shadow-slate-900/5 sm:p-4">
      <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">{kickoffTime}</span>
        </div>
        {matchupNote ? <span>{matchupNote}</span> : null}
      </div>
      <div className="mt-3 flex flex-row items-center justify-center gap-2 text-sm font-semibold text-slate-600 sm:mt-4 sm:gap-3">
        <div className="flex items-center gap-2">
          <TeamButton
            teamButton={eventButton.awayTeamButton}
            {...commonProps}
          />
          {eventButton.gameStatus !== "SCHEDULED" && (
            <span className="min-w-[2rem] text-center text-lg font-bold text-slate-800">
              {eventButton.awayTeamButton.score}
            </span>
          )}
        </div>
        <span className="font-bold text-slate-400">@</span>
        <div className="flex items-center gap-2">
          {eventButton.gameStatus !== "SCHEDULED" && (
            <span className="min-w-[2rem] text-center text-lg font-bold text-slate-800">
              {eventButton.homeTeamButton.score}
            </span>
          )}
          <TeamButton
            teamButton={eventButton.homeTeamButton}
            {...commonProps}
          />
        </div>
      </div>
      {eventButton.periodDisplay && (
        <div className="mt-2 text-center text-xs font-medium text-slate-500">
          {eventButton.periodDisplay}
        </div>
      )}
    </li>
  );
};
