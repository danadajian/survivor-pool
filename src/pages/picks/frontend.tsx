import React from "react";

import { Dropdown } from "../../components/dropdown";
import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { type RouterOutput, trpc } from "../../trpc";
import { useUrlParams } from "../../utils/use-url-params";

const PicksComponent = ({ user: { username }, poolId }: PageProps) => {
  const {
    urlParams: { week, season },
    setUrlParams,
  } = useUrlParams();
  const [data] = trpc.picksForPool.useSuspenseQuery({
    poolId,
    ...(week ? { week: Number(week) } : {}),
    ...(season ? { season: Number(season) } : {}),
  });

  const { eliminatedUsers, week: currentWeek } = data;

  return (
    <>
      <Heading>Week {week ?? currentWeek} Picks</Heading>
      <PickTable
        picksForPool={data}
        username={username}
        week={week ?? currentWeek}
      />
      <Dropdown
        options={Array.from({ length: currentWeek }, (_, i) => i + 1)}
        selected={Number(week)}
        onSelect={(option) => setUrlParams({ week: String(option) })}
      />
      {Number(week) === currentWeek && (
        <EliminatedUserTable
          eliminatedUsers={eliminatedUsers}
          username={username}
        />
      )}
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
          return (
            <tr key={index} className={userClasses}>
              <td>{userFullName ?? pick.username}</td>
              <td>{pick.teamPicked}</td>
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

type EliminatedUserTableProps = {
  eliminatedUsers: RouterOutput["picksForPool"]["eliminatedUsers"];
  username: string;
};

const EliminatedUserTable = ({
  eliminatedUsers,
  username,
}: EliminatedUserTableProps) => (
  <table className="m-8 table-auto">
    <thead>
      <tr>
        <th className="px-4">Eliminated Users</th>
      </tr>
    </thead>
    <tbody>
      {eliminatedUsers.map((user, index) => {
        const isUserRow = user.username === username;
        const userClasses = isUserRow ? "font-semibold text-blue-800" : "";
        const userFullName =
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : undefined;
        return (
          <tr key={index} className={userClasses}>
            <td>{userFullName ?? user.username}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
