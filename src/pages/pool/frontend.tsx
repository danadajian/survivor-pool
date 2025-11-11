import React from "react";
import { useNavigate } from "react-router-dom";
import spacetime from "spacetime";

import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { SecretPickProvider } from "../../components/secret-pick-provider";
import { TeamButton } from "../../components/team-button";
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

  if (!eventButtons.length) {
    return (
      <>
        <h1 className="pt-8 text-2xl font-bold text-red-700">
          {poolName} {currentSeason}
        </h1>
        <h2 className="pt-8 text-lg font-bold text-slate-700">
          Hang tight! The season hasn't started yet...
        </h2>
        <h3 className="pt-16 text-lg font-bold text-blue-700">Members</h3>
        <ul className="pt-4">
          {poolMembers.map((member) => (
            <li className="pt-2">
              {member.firstName} {member.lastName}
            </li>
          ))}
        </ul>
      </>
    );
  }

  const onReactivate = () => mutate({ poolId });
  const isPoolCreator = username === poolCreator;

  if (poolWinner) {
    return (
      <>
        <Heading>
          {`${poolWinner.firstName} ${poolWinner.lastName}`} has won this pool!
        </Heading>
        {isPoolCreator ? (
          <button
            onClick={onReactivate}
            className="focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
          >
            Reactivate pool
          </button>
        ) : null}
        <button
          onClick={() => navigate(`/create`)}
          className="focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
        >
          Start a new pool
        </button>
      </>
    );
  }
  const defaultPickHeader = `Make your pick, ${firstName}!`;

  return (
    <SecretPickProvider initialValue={userPickIsSecret ?? false}>
      <h1 className="pt-8 pb-4 text-2xl font-bold text-red-700">
        {poolName} {currentSeason}
      </h1>
      <p className="text-sm font-medium text-slate-800">{`Pool Creator: ${poolCreator}`}</p>
      <h2 className="pt-4 text-xl font-bold">Week {currentWeek}</h2>
      <h3 className="mb-2 pt-4 text-lg font-semibold text-blue-800">
        {pickHeader ?? defaultPickHeader}
      </h3>
      <p className="font-medium">
        You have {livesRemaining} {livesRemaining === 1 ? "life" : "lives"}{" "}
        remaining.
      </p>
      <hr className="mt-4 w-1/3 border border-gray-500" />
      <ul className="pb-8">
        {eventButtons.map((eventButton, index) => (
          <EventRow
            key={index}
            eventButton={eventButton}
            username={username}
            poolId={poolId}
          />
        ))}
      </ul>
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

  const commonProps = {
    username,
    poolId,
  };
  return (
    <div className="pt-2">
      <h4 className="pt-4 font-semibold">
        {gameTimeInClientTimezone.format("{day} {hour}:{minute-pad} {ampm}")}
      </h4>
      <h5 className="pt-1 text-sm">
        {eventButton.competition?.odds?.[0]?.details ?? ""}
      </h5>
      <div className="flex flex-row justify-center gap-4 pt-2">
        <li>
          <TeamButton
            teamButton={eventButton.awayTeamButton}
            {...commonProps}
          />
        </li>
        <li className="flex items-center font-bold">@</li>
        <li>
          <TeamButton
            teamButton={eventButton.homeTeamButton}
            {...commonProps}
          />
        </li>
      </div>
    </div>
  );
};

export const Pool = withPage(PoolComponent);
