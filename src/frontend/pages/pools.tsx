import React from "react";
import { type PageProps, withPage } from "../page-wrapper";
import { trpc } from "../trpc";
import { Loader } from "../loader";

const PoolsComponent = ({ user: { username } }: PageProps) => {
  const { data } = trpc.picksForPool.useQuery({ poolId: 1 });

  if (!data) {
    return <Loader />;
  }
  const { picks, week } = data;

  return (
    <>
      <h1 className="pb-8 pt-8 text-2xl font-bold text-red-700">
        Week {week} Picks
      </h1>
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
