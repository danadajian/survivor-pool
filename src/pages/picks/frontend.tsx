import React from "react";

import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
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

  return (
    <>
      <Heading>Week {week} Picks</Heading>
      <PickTable picksForPool={data} username={username} week={week} />
      <WeekDropdown
        options={Array.from({ length: currentWeek }, (_, i) => i + 1)}
        selected={week}
        onSelect={(option) => setUrlParams({ week: String(option) })}
      />
      <MemberTable
        membersWithEliminationStatus={membersWithEliminationStatus}
        username={username}
        lives={data.lives}
      />
    </>
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
    return <h2 className="pb-4 text-lg font-bold">No picks for Week {week}</h2>;
  }

  return (
    <table className="mb-8 table-auto">
      <thead>
        <tr>
          <th className="px-4">User</th>
          <th className="px-4">Team Picked</th>
          <th className="px-4">Result</th>
        </tr>
      </thead>
      <tbody>
        {picks.map((pick, index) => {
          const isUserRow = pick.username === username;
          const userClasses = isUserRow ? "font-semibold text-blue-800" : "";
          const resultClasses =
            pick.result === "WON"
              ? "text-green-600"
              : pick.result === "LOST"
                ? "text-red-600"
                : "";
          const userFullName =
            pick.firstName && pick.lastName
              ? `${pick.firstName} ${pick.lastName}`
              : undefined;
          const teamPickedClass = pick.pickIsSecret
            ? "italic text-slate-600"
            : "";
          return (
            <tr key={index} className={userClasses}>
              <td>{userFullName ?? pick.username}</td>
              <td className={teamPickedClass}>{pick.teamPicked}</td>
              <td className={`font-semibold ${resultClasses}`}>
                {pick.result}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
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
}: MemberTableProps) => {
  return (
    <>
      <h2 className="mt-8 mb-4 text-lg font-bold">Pool Members</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4">Name</th>
            <th className="px-4">Lives Remaining</th>
          </tr>
        </thead>
        <tbody>
          {membersWithEliminationStatus.map((user, index) => {
            const isUserRow = user.username === username;
            const userClasses = isUserRow ? "font-semibold text-blue-800" : "";
            const userFullName =
              user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : undefined;
            return (
              <tr key={index} className={userClasses}>
                <td>{userFullName ?? user.username}</td>
                <td>
                  {user.livesRemaining} / {lives}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
