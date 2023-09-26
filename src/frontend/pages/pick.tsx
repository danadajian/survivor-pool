import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import spacetime from "spacetime";

import { Error } from "../error";
import { Loader } from "../loader";
import { type PageProps, withPage } from "../page-wrapper";
import { TeamButton } from "../team-button";
import { type RouterOutput, trpc } from "../trpc";

const PickComponent = (props: PageProps) => {
  const path = useMatch("/pick/:poolId");
  const poolId = path?.params.poolId;
  if (!poolId) {
    return null;
  }

  return <PickContent {...props} poolId={poolId} />;
};

const PickContent = ({
  user: { username, firstName },
  poolId,
}: PageProps & { poolId: string }) => {
  const { data, isLoading, error } = trpc.pick.useQuery({ username, poolId });
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error message={error.message} />;
  }
  const {
    userPick,
    games: { events, season, week },
    poolName,
  } = data;

  const teamPicked = userPick?.teamPicked;
  const teamPickedInEvent = events.find(
    (event) =>
      event.competitions[0]?.competitors.some(
        (competitor) => competitor.team.name === teamPicked,
      ),
  );
  const gameTime = teamPickedInEvent?.date;
  const pickIsLocked =
    Boolean(teamPicked) &&
    Boolean(gameTime) &&
    spacetime.now().toNativeDate() >
      spacetime(gameTime).goto(null).toNativeDate();

  const teamPickedFromApi =
    teamPickedInEvent?.competitions[0]?.competitors.find(
      (competitor) => competitor.team.name === teamPicked,
    );
  const teamPickedIsWinner =
    teamPickedFromApi &&
    "winner" in teamPickedFromApi &&
    typeof teamPickedFromApi.winner === "boolean"
      ? teamPickedFromApi.winner
      : undefined;

  if (typeof teamPickedIsWinner === "boolean" && !teamPickedIsWinner) {
    return (
      <>
        <h1 className="pb-8 pt-8 text-2xl font-bold text-red-700">
          Sorry, you have been eliminated from this pool.
        </h1>
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

  const pickHeader = teamPickedIsWinner
    ? `The ${teamPicked} won, and you're still alive!`
    : pickIsLocked
    ? `Your ${teamPicked} pick is locked. Good luck!`
    : userPick
    ? `You're riding with the ${userPick.teamPicked} this week!`
    : `Make your pick, ${firstName}!`;

  return (
    <>
      <h1 className="pt-8 text-2xl font-bold text-red-700">
        {poolName} {season.year}
      </h1>
      <h2 className="pt-2 text-lg font-bold">Week {week.number}</h2>
      <h3 className="pt-4 text-lg">{pickHeader}</h3>
      <ul>
        {events.map((event, index) => (
          <EventRow
            key={index}
            event={event}
            teamPicked={teamPicked}
            username={username}
            poolId={poolId}
          />
        ))}
      </ul>
    </>
  );
};

export type Event = RouterOutput["pick"]["games"]["events"][number];
type TeamRowProps = {
  event: Event;
  teamPicked?: string;
  username: string;
  poolId: string;
};
const EventRow = ({ event, teamPicked, username, poolId }: TeamRowProps) => {
  const competition = event.competitions[0];
  const competitors = competition?.competitors ?? [];
  const homeTeam = competitors.find(
    (competitor) => competitor.homeAway === "home",
  )?.team;
  const awayTeam = competitors.find(
    (competitor) => competitor.homeAway === "away",
  )?.team;
  const gameTime = spacetime(competition?.date).goto(null);
  const gameStarted =
    Boolean(gameTime) &&
    spacetime.now().toNativeDate() >
      spacetime(gameTime).goto(null).toNativeDate();
  const commonProps = {
    teamPicked,
    username,
    poolId,
    gameStarted,
  };
  return (
    <div className="pt-2">
      <div className="pt-4 font-semibold">
        {gameTime.format("{day} {hour}:{minute-pad} {ampm}")}
      </div>
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

export const Pick = withPage(PickComponent);
