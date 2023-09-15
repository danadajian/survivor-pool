import React from "react";
import { type RouterOutput, trpc } from "./trpc";
import { TeamButton } from "./team-button";
import { type PageProps, withPage } from "./page-wrapper";
import { Loader } from "./loader";

const PicksComponent = ({ user: { username, firstName } }: PageProps) => {
  const { data } = trpc.gamesAndPicks.useQuery({ username });

  if (!data) {
    return <Loader />;
  }
  const {
    pick,
    games: { events, season, week },
  } = data;

  const pickHeader = pick
    ? `You're riding with the ${pick.teamPicked} this week!`
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
            teamPicked={pick?.teamPicked}
            username={username}
          />
        ))}
      </ul>
    </>
  );
};

export type Event = RouterOutput["gamesAndPicks"]["games"]["events"][number];
type TeamRowProps = { event: Event; teamPicked?: string; username: string };
const EventRow = ({ event, teamPicked, username }: TeamRowProps) => {
  const competitors = event.competitions[0]?.competitors ?? [];
  const homeTeam = competitors.find(
    (competitor) => competitor.homeAway === "home",
  )?.team;
  const awayTeam = competitors.find(
    (competitor) => competitor.homeAway === "away",
  )?.team;
  return (
    <div className="flex flex-row justify-center gap-4 pt-6">
      <li>
        <TeamButton
          team={awayTeam}
          teamPicked={teamPicked}
          username={username}
        />
      </li>
      <li className="flex items-center font-bold">@</li>
      <li>
        <TeamButton
          team={homeTeam}
          teamPicked={teamPicked}
          username={username}
        />
      </li>
    </div>
  );
};

export const Picks = withPage(PicksComponent);
