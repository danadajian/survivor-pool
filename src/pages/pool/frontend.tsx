import React from "react";
import { useNavigate } from "react-router-dom";
import spacetime from "spacetime";

import { ChangePoolDropdown } from "../../components/change-pool-dropdown";
import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { PoolTabs } from "../../components/pool-tabs";
import { SecretPickProvider } from "../../components/secret-pick-provider";
import { Button } from "../../components/ui/button";
import { Surface } from "../../components/ui/surface";
import { trpc } from "../../trpc";
import { useUrlParams } from "../../utils/use-url-params";
import { EventRow } from "./frontend/event-row";
import { PickStatusCard } from "./frontend/pick-status-card";
import { PicksView } from "./frontend/picks-view";

const PoolComponent = ({ user: { username }, poolId }: PageProps) => {
  const {
    urlParams: { view = "pick" },
    setUrlParams,
  } = useUrlParams();
  const [data] = trpc.pool.useSuspenseQuery({ username, poolId });
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const { mutate } = trpc.reactivatePool.useMutation({
    onSuccess: (newPool) => {
      navigate(`/pool/${newPool.id}`);
    },
    onSettled: () => utils.pool.invalidate(),
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

    const formattedGameDate = currentGameDate.startsWith("Week ")
      ? currentGameDate
      : spacetime(currentGameDate).format("{day}, {month} {date}");

    return (
      <Surface className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-800">
            {formattedGameDate}
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

export const Pool = withPage(PoolComponent);
