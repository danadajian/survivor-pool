import React from "react";
import { type RouterOutput, trpc } from "./trpc";
import { ClientProvider } from "./client-provider";
import { useMemo } from "react";
import { Header } from "./header";
import { useUser } from "@clerk/clerk-react";
import type { UserResource } from "@clerk/types";
import { TeamButton } from "./team-button";

export const App = () => {
  const userResult = useUser();
  const { user } = useMemo(() => userResult, []);
  const username = user?.primaryEmailAddress?.emailAddress;
  if (!user || !username) return null;

  return (
    <ClientProvider>
      <Header />
      <Picks user={user} username={username} />
    </ClientProvider>
  );
};

const Picks = ({
  user,
  username,
}: {
  user: UserResource;
  username: string;
}) => {
  const { data } = trpc.gamesAndPicks.useQuery({ username });

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  const {
    pick,
    games: { events, season, week },
  } = data;

  const pickHeader = pick
    ? `You're riding with the ${pick.teamPicked} this week!`
    : `Make your pick, ${user.firstName}!`;

  return (
    <div className="flex flex-col items-center pb-8 pt-16 text-center">
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
    </div>
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
