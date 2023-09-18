import React from "react";
import { useMatch } from "react-router-dom";

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
  const { data } = trpc.pick.useQuery({ username, poolId });

  if (!data) {
    return <Loader />;
  }
  const {
    userPick,
    games: { events, season, week },
  } = data;

  const pickHeader = userPick
    ? `You're riding with the ${userPick.teamPicked} this week!`
    : `Make your pick, ${firstName}!`;

  return (
    <>
      <h1 className="pt-2 text-2xl font-bold text-red-700">
        Survivor Pool {season.year}
      </h1>
      <h2 className="pt-2 text-lg font-bold">Week {week.number}</h2>
      <h3 className="pt-2 text-lg">{pickHeader}</h3>
      <ul>
        {events.map((event, index) => (
          <EventRow
            key={index}
            event={event}
            teamPicked={userPick?.teamPicked}
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
  const competitors = event.competitions[0]?.competitors ?? [];
  const homeTeam = competitors.find(
    (competitor) => competitor.homeAway === "home",
  )?.team;
  const awayTeam = competitors.find(
    (competitor) => competitor.homeAway === "away",
  )?.team;
  const commonProps = {
    teamPicked,
    username,
    poolId,
  };
  return (
    <div className="flex flex-row justify-center gap-4 pt-6">
      <li>
        <TeamButton team={awayTeam} {...commonProps} />
      </li>
      <li className="flex items-center font-bold">@</li>
      <li>
        <TeamButton team={homeTeam} {...commonProps} />
      </li>
    </div>
  );
};

export const Pick = withPage(PickComponent);
