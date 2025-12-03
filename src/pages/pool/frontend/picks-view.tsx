import React from "react";

import { GameDateDropdown } from "../../../components/game-date-dropdown";
import { Loader } from "../../../components/loader";
import { Surface } from "../../../components/ui/surface";
import { type RouterOutput, trpc } from "../../../trpc";
import { useUrlParams } from "../../../utils/use-url-params";

type PicksViewProps = {
  poolId: string;
  username: string;
  currentGameDate: string;
  availablePickDates: string[];
};

export const PicksView = ({
  poolId,
  username,
  currentGameDate,
  availablePickDates,
}: PicksViewProps) => {
  const {
    urlParams: { gameDate: pickDate },
    setUrlParams,
  } = useUrlParams();
  const { data: poolData, isLoading } = trpc.pool.useQuery({
    username,
    poolId,
    pickDate,
  });

  const membersWithEliminationStatus = poolData?.membersWithEliminationStatus;
  const lives = poolData?.lives;

  return (
    <>
      <Surface className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-800">
            Weekly results
          </h2>
          <GameDateDropdown
            options={availablePickDates}
            selected={pickDate ?? currentGameDate}
            onSelect={(option) => setUrlParams({ gameDate: option })}
          />
        </div>
        <PickTable poolId={poolId} username={username} pickDate={pickDate} />
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
  pickDate?: string;
};

const PickTable = ({ poolId, username, pickDate }: PickTableProps) => {
  const { data: poolData, isLoading } = trpc.pool.useQuery({
    username,
    poolId,
    pickDate,
  });
  const picks = poolData?.picksForWeek;

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
                  <span
                    className={
                      pick.pickIsSecret
                        ? "inline-flex items-center rounded-full bg-purple-200 px-2.5 py-0.5 text-sm font-medium text-purple-700"
                        : "font-semibold"
                    }
                  >
                    {pick.teamPicked}
                  </span>
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
  membersWithEliminationStatus: RouterOutput["pool"]["membersWithEliminationStatus"];
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
