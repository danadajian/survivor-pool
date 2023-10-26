import React from "react";
import { useMatch } from "react-router-dom";

import { Dropdown } from "../../components/dropdown";
import { Error } from "../../components/error";
import { Header } from "../../components/header";
import { Loader } from "../../components/loader";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { type RouterOutput, trpc } from "../../trpc";
import { useUrlParams } from "../../utils/useUrlParams";

const PoolsComponent = ({ user: { username } }: PageProps) => {
  const path = useMatch("/pools/:poolId");
  const poolId = path?.params.poolId;
  if (!poolId) {
    return null;
  }

  return <AllPicks username={username} poolId={poolId} />;
};

const AllPicks = ({
  username,
  poolId,
}: {
  username: string;
  poolId: string;
}) => {
  const {
    urlParams: { week, season },
    setUrlParams,
  } = useUrlParams();
  const { data, isLoading, error } = trpc.picksForPool.useQuery({
    poolId,
    week: Number(week),
    season: Number(season),
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error message={error.message} />;
  }
  const { picks, week: currentWeek } = data;

  return (
    <>
      <Header>Week {week ?? currentWeek} Picks</Header>
      {picks.length ? (
        <PickTable picks={picks} username={username} />
      ) : (
        <h2 className="pb-4 text-lg font-bold">
          No picks for Week {currentWeek}
        </h2>
      )}
      <Dropdown
        options={Array.from({ length: currentWeek }, (_, i) => i + 1)}
        selected={Number(week)}
        onSelect={(option) => setUrlParams({ week: String(option) })}
      />
    </>
  );
};

export const Pools = withPage(PoolsComponent);

type PickTableProps = {
  picks: RouterOutput["picksForPool"]["picks"];
  username: string;
};

const PickTable = ({ picks, username }: PickTableProps) => (
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
              {pick.result ?? "PENDING"}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
