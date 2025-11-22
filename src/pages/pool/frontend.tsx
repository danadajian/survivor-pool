import React from "react";
import { useNavigate } from "react-router-dom";
import spacetime from "spacetime";

import { ChangePoolDropdown } from "../../components/change-pool-dropdown";
import { GameDateDropdown } from "../../components/game-date-dropdown";
import { Heading } from "../../components/heading";
import { Loader } from "../../components/loader";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { PoolTabs } from "../../components/pool-tabs";
import { SecretPickProvider } from "../../components/secret-pick-provider";
import { TeamButton } from "../../components/team-button";
import { Button } from "../../components/ui/button";
import { Surface } from "../../components/ui/surface";
import { type RouterOutput, trpc } from "../../trpc";
import { type PickStatus } from "../../utils/get-pick-status";
import { useUrlParams } from "../../utils/use-url-params";
import { EventButton } from "./backend/get-event-buttons";

const PoolComponent = ({ user: { username }, poolId }: PageProps) => {
  const {
    urlParams: { view = "pick" },
    setUrlParams,
  } = useUrlParams();
  const [data] = trpc.pool.useSuspenseQuery({ username, poolId });
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const { mutate } = trpc.reactivatePool.useMutation({
    onSettled: () =>
      Promise.all([
        utils.pool.invalidate(),
        utils.poolMemberLivesRemaining.invalidate(),
        utils.picksForWeek.invalidate(),
      ]),
  });

  const {
    eventButtons,
    currentSeason,
    currentGameDate,
    availablePickDates,
    poolName,
    poolWinnerDisplayName,
    poolMembers,
    poolCreatorUsername,
    poolCreatorDisplayName,
    pickHeader,
    livesRemaining,
    userPick,
    userPickTeam,
    pickStatus,
    sport,
  } = data;

  const onReactivate = () => mutate({ poolId, sport });
  const isPoolCreator = username === poolCreatorUsername;
  const userPickIsSecret = userPick?.pickIsSecret;

  const renderContent = () => {
    if (view === "all-picks") {
      return (
        <PicksView
          poolId={poolId}
          username={username}
          currentGameDate={currentGameDate}
          currentSeason={currentSeason}
          availablePickDates={availablePickDates}
        />
      );
    }

    if (!eventButtons.length) {
      return (
        <Surface className="flex flex-col gap-6">
          <p className="text-base text-slate-600">
            Hang tight! The season hasn&apos;t started yet. Once games are on
            the calendar, you&apos;ll see your matchups here.
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
      );
    }

    if (poolWinnerDisplayName) {
      return (
        <Surface className="flex flex-col gap-4">
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
      );
    }

    return (
      <Surface className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-800">
            {currentGameDate}
          </h2>
          <PickStatusCard
            status={pickStatus}
            userPick={userPick}
            userPickTeam={userPickTeam}
          >
            {pickHeader}
            <div className="text-sm text-slate-600">
              You have {livesRemaining}{" "}
              {livesRemaining === 1 ? "life" : "lives"} remaining.
            </div>
          </PickStatusCard>
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
    );
  };

  return (
    <SecretPickProvider initialValue={userPickIsSecret ?? false}>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Heading>
                {poolWinnerDisplayName
                  ? `${poolWinnerDisplayName} has won this pool!`
                  : poolName}
              </Heading>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold tracking-wider text-slate-600 uppercase shadow-sm">
                  {sport}
                </span>
                <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold tracking-wider text-blue-600 uppercase shadow-sm">
                  {currentSeason} Season
                </span>
                <p className="text-sm text-slate-500">
                  Commissioner:{" "}
                  <span className="font-medium text-slate-700">
                    {poolCreatorDisplayName}
                  </span>
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <ChangePoolDropdown username={username} currentPoolId={poolId} />
            </div>
          </div>
          <PoolTabs
            activeTab={view}
            onTabChange={(tab) => setUrlParams({ view: tab })}
          />
        </div>
        {renderContent()}
      </div>
    </SecretPickProvider>
  );
};

type PickStatusCardProps = {
  status: PickStatus;
  userPick: RouterOutput["pool"]["userPick"];
  userPickTeam?: RouterOutput["pool"]["userPickTeam"];
  children: React.ReactNode;
};

const PickStatusCard = ({
  status,
  userPick,
  userPickTeam,
  children,
}: PickStatusCardProps) => {
  const styles = {
    PENDING: {
      container: "bg-slate-50 text-slate-900",
      badge: "bg-slate-200 text-slate-800",
      message: "text-slate-700",
    },
    ELIMINATED: {
      container: "bg-rose-50 text-rose-900",
      badge: "bg-rose-200 text-rose-800",
      message: "text-rose-700",
    },
    WON: {
      container: "bg-emerald-50 text-emerald-900",
      badge: "bg-emerald-200 text-emerald-800",
      message: "text-emerald-700",
    },
    LOST: {
      container: "bg-rose-50 text-rose-900",
      badge: "bg-rose-200 text-rose-800",
      message: "text-rose-700",
    },
    LOCKED: {
      container: "bg-amber-50 text-amber-900",
      badge: "bg-amber-200 text-amber-800",
      message: "text-amber-700",
    },
    PICKED: {
      container: "bg-blue-50 text-blue-900",
      badge: "bg-blue-200 text-blue-800",
      message: "text-blue-700",
    },
    ["MISSED DEADLINE"]: {
      container: "bg-rose-50 text-rose-900",
      badge: "bg-rose-200 text-rose-800",
      message: "text-rose-700",
    },
  } satisfies Record<
    PickStatus,
    { container: string; badge: string; message: string }
  >;

  const { container, badge, message } = styles[status];

  const secretBadge = userPick?.pickIsSecret ? (
    <span className="inline-flex items-center rounded-full bg-purple-200 px-2.5 py-0.5 text-sm font-medium text-purple-700">
      SECRET
    </span>
  ) : null;

  return (
    <div className={`flex flex-col gap-4 rounded-xl p-6 ${container}`}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${badge}`}
            >
              {status}
            </span>
            {secretBadge}
          </div>
        </div>

        {userPick?.teamPicked ? (
          <div className="flex items-center gap-4">
            {userPickTeam?.logo && (
              <img
                src={userPickTeam.logo}
                alt={userPickTeam.name}
                className="h-16 w-16 object-contain"
              />
            )}
            <span className="text-3xl font-bold tracking-tight">
              {userPickTeam?.displayName ?? userPick.teamPicked}
            </span>
          </div>
        ) : null}
      </div>
      <div className={`flex flex-col gap-4 text-base font-medium ${message}`}>
        {children}
      </div>
    </div>
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

// Picks View Components

type PicksViewProps = {
  poolId: string;
  username: string;
  currentGameDate: string;
  currentSeason: number;
  availablePickDates: string[];
};

const PicksView = ({
  poolId,
  username,
  currentGameDate,
  currentSeason,
  availablePickDates,
}: PicksViewProps) => {
  const {
    urlParams: { gameDate: gameDateUrlParam, season: seasonUrlParam },
    setUrlParams,
  } = useUrlParams();
  const { data: poolData, isLoading } = trpc.poolMemberLivesRemaining.useQuery({
    poolId,
  });

  const membersWithEliminationStatus = poolData?.membersWithEliminationStatus;
  const lives = poolData?.lives;
  const pickDate = gameDateUrlParam ?? currentGameDate;
  const season = Number(seasonUrlParam ?? currentSeason);

  return (
    <>
      <Surface className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-800">
            Weekly results
          </h2>
          <GameDateDropdown
            options={availablePickDates}
            selected={pickDate}
            onSelect={(option) => setUrlParams({ gameDate: option })}
          />
        </div>
        <PickTable
          poolId={poolId}
          username={username}
          pickDate={pickDate}
          season={season}
        />
      </Surface>
      <Surface className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-slate-800">Pool members</h2>
        {isLoading || !membersWithEliminationStatus || lives === undefined ? (
          <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-slate-200/80 bg-white">
            <Loader inline />
          </div>
        ) : (
          <MemberTable
            membersWithEliminationStatus={membersWithEliminationStatus}
            username={username}
            lives={lives}
          />
        )}
      </Surface>
    </>
  );
};

type PickTableProps = {
  poolId: string;
  username: string;
  pickDate: string;
  season: number;
};

const PickTable = ({ poolId, username, pickDate, season }: PickTableProps) => {
  const { data: picks, isLoading } = trpc.picksForWeek.useQuery({
    poolId,
    pickDate,
    season,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-slate-200/80 bg-white">
        <Loader inline />
      </div>
    );
  }

  if (!picks || picks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300/80 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
        No picks recorded for {pickDate} yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
          <tr>
            <th className="px-3 py-2.5 sm:px-4 sm:py-3">User</th>
            <th className="px-3 py-2.5 text-center sm:px-4 sm:py-3">
              Team picked
            </th>
            <th className="px-3 py-2.5 text-center sm:px-4 sm:py-3">Result</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {picks.map((pick, index) => {
            const isUserRow = pick.username === username;
            const userFullName =
              pick.firstName && pick.lastName
                ? `${pick.firstName} ${pick.lastName}`
                : undefined;
            const resultBadge =
              pick.result === "WON"
                ? "bg-emerald-100 text-emerald-700"
                : pick.result === "LOST"
                  ? "bg-rose-100 text-rose-600"
                  : "bg-slate-100 text-slate-600";

            return (
              <tr
                key={`pick-row-${index}`}
                className={[
                  "transition-colors",
                  isUserRow ? "bg-slate-900/5" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <td className="px-3 py-2.5 text-slate-800 sm:px-4 sm:py-3">
                  {userFullName ?? pick.username}
                </td>
                <td className="px-3 py-2.5 text-center text-slate-700 sm:px-4 sm:py-3">
                  {pick.pickIsSecret ? (
                    <span className="inline-flex items-center rounded-full bg-purple-200 px-2.5 py-0.5 text-sm font-medium text-purple-700">
                      SECRET
                    </span>
                  ) : (
                    <span className="font-semibold">{pick.teamPicked}</span>
                  )}
                </td>
                <td className="px-3 py-2.5 text-center sm:px-4 sm:py-3">
                  <span
                    className={`inline-flex min-w-[4.5rem] justify-center rounded-full px-2.5 py-1 text-xs font-semibold sm:px-3 ${resultBadge}`}
                  >
                    {pick.result}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

type MemberTableProps = {
  membersWithEliminationStatus: RouterOutput["poolMemberLivesRemaining"]["membersWithEliminationStatus"];
  username: string;
  lives: number;
};

const MemberTable = ({
  membersWithEliminationStatus,
  username,
  lives,
}: MemberTableProps) => (
  <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white">
    <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
      <thead className="bg-slate-50 text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
        <tr>
          <th className="px-3 py-2.5 sm:px-4 sm:py-3">User</th>
          <th className="px-3 py-2.5 text-center sm:px-4 sm:py-3">
            Lives remaining
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {membersWithEliminationStatus.map((member, index) => {
          const isUserRow = member.username === username;
          const userFullName =
            member.firstName && member.lastName
              ? `${member.firstName} ${member.lastName}`
              : undefined;

          return (
            <tr
              key={`member-row-${index}`}
              className={[
                "transition-colors",
                isUserRow ? "bg-slate-900/5" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <td className="px-3 py-2.5 text-slate-800 sm:px-4 sm:py-3">
                {userFullName ?? member.username}
              </td>
              <td className="px-3 py-2.5 text-center sm:px-4 sm:py-3">
                <div className="flex items-center justify-center gap-1.5">
                  {Array.from(
                    { length: member.livesRemaining },
                    (_, i) => i + 1,
                  ).map((heartIndex) => (
                    <FilledHeart
                      key={`filled-heart-${member.id}-${heartIndex}`}
                    />
                  ))}
                  {Array.from(
                    { length: lives - member.livesRemaining },
                    (_, i) => i + 1,
                  ).map((heartIndex) => (
                    <EmptyHeart
                      key={`empty-heart-${member.id}-${heartIndex}`}
                    />
                  ))}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const FilledHeart = () => (
  <img className="h-5 w-5" src="/public/filled-heart.png" alt="filled heart" />
);
const EmptyHeart = () => (
  <img className="h-5 w-5" src="/public/empty-heart.png" alt="empty heart" />
);
