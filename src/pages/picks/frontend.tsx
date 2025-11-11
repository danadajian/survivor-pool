import React from "react";

import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { Surface } from "../../components/ui/surface";
import { WeekDropdown } from "../../components/week-dropdown";
import { type RouterOutput, trpc } from "../../trpc";
import { useUrlParams } from "../../utils/use-url-params";

const PicksComponent = ({ user: { username }, poolId }: PageProps) => {
  const {
    urlParams: { week: weekUrlParam, season: seasonUrlParam },
    setUrlParams,
  } = useUrlParams();
  const [data] = trpc.picksForPool.useSuspenseQuery({
    poolId,
    ...(weekUrlParam ? { week: Number(weekUrlParam) } : {}),
    ...(seasonUrlParam ? { season: Number(seasonUrlParam) } : {}),
  });

  const { membersWithEliminationStatus, week: currentWeek } = data;
  const week = Number(weekUrlParam ?? currentWeek);
  const weekOptions = Array.from({ length: currentWeek }, (_, i) => i + 1);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Heading>Week {week} Picks</Heading>
        <p className="max-w-3xl text-left text-base text-slate-600">
          Track how every selection performed this week and quickly jump to
          previous games to stay ahead.
        </p>
      </div>
      <Surface className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-800">
            Weekly results
          </h2>
          <WeekDropdown
            options={weekOptions}
            selected={week}
            onSelect={(option) => setUrlParams({ week: String(option) })}
          />
        </div>
        <PickTable picksForPool={data} username={username} week={week} />
      </Surface>
      <Surface className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-slate-800">Pool members</h2>
        <MemberTable
          membersWithEliminationStatus={membersWithEliminationStatus}
          username={username}
          lives={data.lives}
        />
      </Surface>
    </div>
  );
};

export const Picks = withPage(PicksComponent);

type PickTableProps = {
  picksForPool: RouterOutput["picksForPool"];
  username: string;
  week: string | number;
};

const PickTable = ({
  picksForPool: { picks },
  username,
  week,
}: PickTableProps) => {
  if (!picks.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300/80 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
        No picks recorded for Week {week} yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <tr>
            <th className="px-3 py-2.5 sm:px-4 sm:py-3">User</th>
            <th className="px-3 py-2.5 sm:px-4 sm:py-3">Team picked</th>
            <th className="px-3 py-2.5 text-right sm:px-4 sm:py-3">Result</th>
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
                <td
                  className={[
                    "px-3 py-2.5 text-slate-700 sm:px-4 sm:py-3",
                    pick.pickIsSecret ? "italic text-slate-500" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {pick.teamPicked}
                </td>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3">
                  <span
                    className={`inline-flex min-w-[4.5rem] justify-end rounded-full px-2.5 py-1 text-xs font-semibold sm:px-3 ${resultBadge}`}
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
  membersWithEliminationStatus: RouterOutput["picksForPool"]["membersWithEliminationStatus"];
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
      <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        <tr>
          <th className="px-3 py-2.5 sm:px-4 sm:py-3">User</th>
          <th className="px-3 py-2.5 sm:px-4 sm:py-3">Lives remaining</th>
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
              <td className="px-3 py-2.5 sm:px-4 sm:py-3">
                <div className="flex items-center gap-1.5">
                  {Array.from(
                    { length: member.livesRemaining },
                    (_, i) => i + 1,
                  ).map((heartIndex) => (
                    <FilledHeart key={`filled-heart-${member.id}-${heartIndex}`} />
                  ))}
                  {Array.from(
                    { length: lives - member.livesRemaining },
                    (_, i) => i + 1,
                  ).map((heartIndex) => (
                    <EmptyHeart key={`empty-heart-${member.id}-${heartIndex}`} />
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
