import React from "react";
import { useNavigate } from "react-router-dom";
import spacetime from "spacetime";

import { CopyInviteLinkButton } from "../../components/copy-invite-link-button";
import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { TeamButton } from "../../components/team-button";
import { type RouterOutput, trpc } from "../../trpc";
import { gameHasStartedOrFinished } from "../../utils/game-has-started-or-finished";

const PoolComponent = ({
  user: { username, firstName, lastName },
  poolId,
}: PageProps) => {
  const [data] = trpc.pool.useSuspenseQuery({ username, poolId });
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  utils.picksForPool.prefetch({ poolId });

  const {
    userPick,
    games: {
      events,
      season: { year: currentSeason },
      week: { number: currentWeek },
    },
    poolName,
    eliminated,
    poolWinner,
    poolMembers,
    poolCreator,
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

  if (poolWinner) {
    return (
      <>
        <Heading>
          {`${poolWinner.firstName} ${poolWinner.lastName}`} has won this pool!
        </Heading>
        <button
          onClick={() => navigate(`/`)}
          className="focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
        >
          Back to pools
        </button>
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

  const teamPicked = userPick?.teamPicked;
  const teamPickedInEvent = events.find((event) =>
    event.competitions[0]?.competitors.some(
      (competitor) => competitor.team.name === teamPicked,
    ),
  );
  const gameTime = teamPickedInEvent?.date;
  const userSurvived = userPick?.result === "WON";
  const pickIsLocked =
    Boolean(teamPicked) && gameHasStartedOrFinished(gameTime);
  const pickHeader = eliminated
    ? "Sorry, you have been eliminated from this pool."
    : userSurvived
      ? `The ${teamPicked} won, and you're still alive!`
      : pickIsLocked
        ? `Your ${teamPicked} pick is locked. Good luck!`
        : userPick
          ? `You're riding with the ${userPick.teamPicked} this week!`
          : `Make your pick, ${firstName}!`;

  return (
    <>
      <h1 className="pb-4 pt-8 text-2xl font-bold text-red-700">
        {poolName} {currentSeason}
      </h1>
      {username === poolCreator ? (
        <CopyInviteLinkButton poolId={poolId} />
      ) : (
        <p className="text-md font-semibold">{`Creator: ${firstName} ${lastName}`}</p>
      )}
      <h2 className="pt-4 text-lg font-bold">Week {currentWeek}</h2>
      <h3 className="pt-4 text-lg">{pickHeader}</h3>
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
    </>
  );
};

export type Event = RouterOutput["pool"]["games"]["events"][number];
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
  const gameTime = spacetime(competition?.date).goto(null);
  const gameStarted = gameHasStartedOrFinished(gameTime);
  const commonProps = {
    username,
    poolId,
    gameStarted,
  };
  return (
    <div className="pt-2">
      <h4 className="pt-4 font-semibold">
        {gameTime.format("{day} {hour}:{minute-pad} {ampm}")}
      </h4>
      <h5 className="pt-1 text-sm">{competition?.odds?.[0]?.details ?? ""}</h5>
      <div className="flex flex-row justify-center gap-4 pt-2">
        <li>
          <TeamButton team={awayTeam} {...commonProps} />
        </li>
        <li className="flex items-center font-bold">@</li>
        <li>
          <TeamButton team={homeTeam} {...commonProps} />
        </li>
      </div>
    </div>
  );
};

export const Pool = withPage(PoolComponent);
