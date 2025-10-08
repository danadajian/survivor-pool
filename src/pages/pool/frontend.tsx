import React from "react";
import { useNavigate } from "react-router-dom";
import spacetime from "spacetime";

import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { SecretPickProvider } from "../../components/secret-pick-provider";
import { TeamButton } from "../../components/team-button";
import { type RouterOutput, trpc } from "../../trpc";
import { buildPickHeader } from "../../utils/build-pick-header";

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
    events,
    currentSeason,
    currentWeek,
    poolName,
    poolWinner,
    poolMembers,
    poolCreator,
    userPickIsSecret,
  } = data;

  if (!events.length) {
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

  const onReactivate = () => mutate({ poolId, season: currentSeason });
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

  const pickHeader = buildPickHeader(data, firstName);

  return (
    <SecretPickProvider initialValue={userPickIsSecret ?? false}>
      <h1 className="pt-8 pb-4 text-2xl font-bold text-red-700">
        {poolName} {currentSeason}
      </h1>
      <p className="text-sm font-medium text-slate-800">{`Pool Creator: ${poolCreator}`}</p>
      <h2 className="pt-4 text-xl font-bold">Week {currentWeek}</h2>
      <h3 className="pt-4 text-lg font-semibold text-blue-800">{pickHeader}</h3>
      <hr className="mt-4 w-1/3 border border-gray-500" />
      <ul className="pb-8">
        {events.map((event, index) => (
          <EventRow
            key={index}
            event={event}
            username={username}
            poolId={poolId}
          />
        ))}
      </ul>
    </SecretPickProvider>
  );
};

export type Event = RouterOutput["pool"]["events"][number];
type TeamRowProps = {
  event: Event;
  username: string;
  poolId: string;
};
const EventRow = ({ event, username, poolId }: TeamRowProps) => {
  const competition = event.competitions[0];
  const competitors = competition?.competitors ?? [];
  const homeTeam = competitors.find(
    (competitor) => competitor.homeAway === "home",
  )?.team;
  const awayTeam = competitors.find(
    (competitor) => competitor.homeAway === "away",
  )?.team;
  const homeTeamOdds = competition.odds?.[0].homeTeamOdds;
  const awayTeamOdds = competition.odds?.[0].awayTeamOdds;
  const gameTimeInClientTimezone = spacetime(competition?.date).goto(null);

  const commonProps = {
    username,
    poolId,
    competition,
  };
  return (
    <div className="pt-2">
      <h4 className="pt-4 font-semibold">
        {gameTimeInClientTimezone.format("{day} {hour}:{minute-pad} {ampm}")}
      </h4>
      <h5 className="pt-1 text-sm">{competition?.odds?.[0]?.details ?? ""}</h5>
      <div className="flex flex-row justify-center gap-4 pt-2">
        <li>
          <TeamButton
            team={awayTeam}
            teamOdds={awayTeamOdds}
            {...commonProps}
          />
        </li>
        <li className="flex items-center font-bold">@</li>
        <li>
          <TeamButton
            team={homeTeam}
            teamOdds={homeTeamOdds}
            {...commonProps}
          />
        </li>
      </div>
    </div>
  );
};

export const Pool = withPage(PoolComponent);
