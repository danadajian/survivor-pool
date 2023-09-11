import { type RouterOutput, trpc } from "./trpc";
import { ClientProvider } from "./client-provider";

export const App = () => {
  return (
    <ClientProvider>
      <Component />
    </ClientProvider>
  );
};

export const Component = () => {
  const { data } = trpc.games.useQuery();

  if (!data) {
    return <div>Loading...</div>;
  }
  const { events, season, week } = data;

  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <h1 className="mt-8 text-2xl font-bold text-red-700">
        Survival Pool {season.year}
      </h1>
      <h2 className="mt-2 text-lg font-bold">Week {week.number}</h2>
      <ul>
        {events.map((event) => (
          <EventRow event={event} />
        ))}
      </ul>
    </div>
  );
};

type Event = RouterOutput["games"]["events"][number];
type Team = Event["competitions"][number]["competitors"][number]["team"];

type TeamRowProps = { event: Event };
const EventRow = ({ event }: TeamRowProps) => {
  const competitors = event.competitions[0]?.competitors ?? [];
  const homeTeam = competitors.find(
    (competitor) => competitor.homeAway === "home",
  )?.team;
  const awayTeam = competitors.find(
    (competitor) => competitor.homeAway === "away",
  )?.team;
  return (
    <div className="mt-6 flex flex-row justify-center gap-4">
      <li>
        <TeamButton team={awayTeam} />
      </li>
      <li className="flex items-center font-bold">@</li>
      <li>
        <TeamButton team={homeTeam} />
      </li>
    </div>
  );
};

type TeamProps = { team?: Team };
const TeamButton = ({ team }: TeamProps) => {
  if (!team) return <div>No team found.</div>;
  return (
    <button className="flex flex-col items-center rounded-lg border-2 border-slate-100 bg-slate-300 p-2">
      <img alt={team.name} src={team.logo} className="h-14 w-14" />
      <p>{team.name}</p>
    </button>
  );
};
