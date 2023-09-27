import React from "react";
import { useMatch } from "react-router-dom";

import { Error } from "../../components/error";
import { Header } from "../../components/header";
import { Loader } from "../../components/loader";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { trpc } from "../../trpc";

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
  const { data, isLoading, error } = trpc.picksForPool.useQuery({ poolId });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error message={error.message} />;
  }
  const { picks, week } = data;

  if (!picks.length) {
    return <Header>No picks yet for week {week}</Header>;
  }

  return (
    <>
      <Header>Week {week} Picks</Header>
      <table className="table-auto">
        <thead>
          <tr>
            <th>User</th>
            <th>Team Picked</th>
          </tr>
        </thead>
        <tbody>
          {picks.map((row, index) => {
            const isUserRow = row.username === username;
            const userClasses = isUserRow ? "font-bold text-blue-800" : "";
            return (
              <tr key={index} className={userClasses}>
                <td>{row.username}</td>
                <td>{row.teamPicked}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export const Pools = withPage(PoolsComponent);