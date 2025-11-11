import React from "react";
import { useNavigate } from "react-router-dom";
import spacetime from "spacetime";

import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { SecretPickProvider } from "../../components/secret-pick-provider";
import { TeamButton } from "../../components/team-button";
import { Button } from "../../components/ui/button";
import { Surface } from "../../components/ui/surface";
import { trpc } from "../../trpc";
import { EventButton } from "./backend/get-event-buttons";

const PoolComponent = ({
  user: { username, firstName },
  poolId,
}: PageProps) => {
  const [data] = trpc.pool.useSuspenseQuery({ username, poolId });
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const { mutate } = trpc.reactivatePool.useMutation({
    onSettled: () =>
      Promise.all([utils.pool.invalidate(), utils.picksForPool.invalidate()]),
  });

  const {
    eventButtons,
    currentSeason,
    currentWeek,
    poolName,
    poolWinner,
    poolMembers,
    poolCreator,
    userPickIsSecret,
    pickHeader,
    livesRemaining,
  } = data;

  const onReactivate = () => mutate({ poolId });
  const isPoolCreator = username === poolCreator;

  if (!eventButtons.length) {
    return (
      <div className="flex w-full flex-col gap-6">
        <Heading>
          {poolName} {currentSeason}
        </Heading>
        <Surface className="flex flex-col gap-6">
          <p className="text-base text-slate-600">
            Hang tight! The season hasn&apos;t started yet. Once games are on
            the calendar, you&apos;ll see your weekly matchups here.
          </p>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Members
            </h3>
            <ul className="grid gap-2 text-left text-sm text-slate-700">
              {poolMembers.map((member) => (
                <li
                  key={`${member.username}-${member.firstName}-${member.lastName}`}
                  className="rounded-xl bg-slate-100/80 px-3 py-2"
                >
                  {member.firstName} {member.lastName}
                </li>
              ))}
            </ul>
          </div>
        </Surface>
      </div>
    );
  }

  if (poolWinner) {
    return (
      <div className="flex w-full flex-col gap-6">
        <Surface className="flex flex-col gap-4">
          <Heading>
            {`${poolWinner.firstName} ${poolWinner.lastName}`} has won this
            pool!
          </Heading>
          <p className="text-base text-slate-600">
            Celebrate the champ or spin up a brand new competition for the next
            season.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
            {isPoolCreator ? (
              <Button
                onClick={onReactivate}
                type="button"
                className="w-full sm:w-auto"
              >
                Reactivate pool
              </Button>
            ) : null}
            <Button
              onClick={() => navigate(`/create`)}
              type="button"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Start a new pool
            </Button>
          </div>
        </Surface>
      </div>
    );
  }

  const defaultPickHeader = `Make your pick, ${firstName}!`;

  return (
    <SecretPickProvider initialValue={userPickIsSecret ?? false}>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading>
            {poolName} {currentSeason}
          </Heading>
          <p className="text-sm text-slate-500">
            Commissioner:{" "}
            <span className="font-medium text-slate-700">{poolCreator}</span>
          </p>
        </div>
        <Surface className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-slate-800">
              Week {currentWeek}
            </h2>
            <p className="text-sm text-slate-600">
              {pickHeader ?? defaultPickHeader}
            </p>
            <p className="text-sm font-medium text-slate-700">
              You have {livesRemaining}{" "}
              {livesRemaining === 1 ? "life" : "lives"} remaining.
            </p>
          </div>
          <ul className="grid gap-4">
            {eventButtons.map((eventButton, index) => (
              <EventRow
                key={`event-row-${index}`}
                eventButton={eventButton}
                username={username}
                poolId={poolId}
              />
            ))}
          </ul>
        </Surface>
      </div>
    </SecretPickProvider>
  );
};

type TeamRowProps = {
  eventButton: EventButton;
  username: string;
  poolId: string;
};
const EventRow = ({ eventButton, username, poolId }: TeamRowProps) => {
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
        <span className="font-semibold text-slate-700">{kickoffTime}</span>
        {matchupNote ? <span>{matchupNote}</span> : null}
      </div>
      <div className="mt-3 flex flex-row items-center justify-center gap-2 text-sm font-semibold text-slate-600 sm:mt-4 sm:gap-3">
        <TeamButton teamButton={eventButton.awayTeamButton} {...commonProps} />
        <span className="font-bold text-slate-400">@</span>
        <TeamButton teamButton={eventButton.homeTeamButton} {...commonProps} />
      </div>
    </li>
  );
};

export const Pool = withPage(PoolComponent);
