import { type RouterOutput, trpc } from "./trpc";
import { ClientProvider } from "./client-provider";
import { Dialog } from "@headlessui/react";
import { useMemo, useState } from "react";
import { DialogWrapper } from "./dialog-wrapper";
import { Header } from "./header";
import { useUser } from "@clerk/clerk-react";
import type { UserResource } from "@clerk/types";

export const App = () => {
  const userResult = useUser();
  const { user } = useMemo(() => userResult, []);
  const username = user?.primaryEmailAddress?.emailAddress;
  if (!user || !username) return null;

  return (
    <ClientProvider>
      <Header />
      <Home user={user} username={username} />
    </ClientProvider>
  );
};

const Home = ({ user, username }: { user: UserResource; username: string }) => {
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

type Event = RouterOutput["gamesAndPicks"]["games"]["events"][number];
type Team = Event["competitions"][number]["competitors"][number]["team"];

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

type TeamProps = { team?: Team; teamPicked?: string; username: string };
const TeamButton = ({ team, teamPicked, username }: TeamProps) => {
  const context = trpc.useContext();
  const gamesAndPicks = context.gamesAndPicks.getData({ username });
  const { mutateAsync } = trpc.makePick.useMutation();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const toggleDialog = () => setDialogIsOpen(!dialogIsOpen);

  if (!gamesAndPicks || !team) return <div>No team found.</div>;
  const handleUpdate = async () => {
    await mutateAsync({
      username,
      teamPicked: team.name,
      week: gamesAndPicks.games.week.number,
      season: gamesAndPicks.games.season.year,
    });
    await context.gamesAndPicks.invalidate();
    toggleDialog();
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  };
  const { forbiddenTeams } = gamesAndPicks;
  const teamCurrentlyPicked = team.name === teamPicked;
  const teamPreviouslyPicked = forbiddenTeams?.includes(team.name);
  const buttonClass = teamCurrentlyPicked
    ? "bg-blue-800 text-white"
    : teamPreviouslyPicked
    ? "bg-blue-800 text-white opacity-30"
    : "bg-slate-300";
  const imageClass = teamPreviouslyPicked ? "opacity-80" : "";
  return (
    <>
      <button
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        disabled={teamCurrentlyPicked || teamPreviouslyPicked}
        onClick={toggleDialog}
        className={`flex flex-col items-center rounded-lg border-2 border-slate-100 p-2 ${buttonClass}`}
      >
        <img
          alt={team.abbreviation}
          src={team.logo}
          className={`h-14 w-14 ${imageClass}`}
        />
        <p>{team.name}</p>
      </button>
      <DialogWrapper dialogIsOpen={dialogIsOpen} toggleDialog={toggleDialog}>
        <>
          <Dialog.Title
            as="h3"
            className="pt-2 text-xl font-semibold leading-6"
          >
            Confirm pick
          </Dialog.Title>
          <Dialog.Description className="pt-5 font-semibold text-slate-500">
            Are you sure you want to pick the {team.name}? You won't be able to
            pick them again this season.
          </Dialog.Description>

          <div className="flex justify-end pt-5">
            <button
              className="rounded-md bg-blue-800 px-3 py-2 font-medium uppercase text-white hover:bg-blue-500"
              autoFocus
              onClick={handleUpdate}
            >
              Lock it in
            </button>
            <button
              className="ml-3 rounded-md border border-blue-800 px-3 py-2 font-medium uppercase text-blue-800 hover:bg-blue-300"
              onClick={toggleDialog}
            >
              Cancel
            </button>
          </div>
        </>
      </DialogWrapper>
    </>
  );
};
