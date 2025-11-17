import React from "react";
import { useNavigate } from "react-router-dom";

import { EditPoolDropdown } from "../../components/edit-pool-dropdown";
import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { Button } from "../../components/ui/button";
import { Surface } from "../../components/ui/surface";
import { type RouterOutput, trpc } from "../../trpc";

const HomeComponent = ({ user: { username } }: PageProps) => {
  const [data] = trpc.poolsForUser.useSuspenseQuery({ username });

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Heading>Welcome to Survivor Pool!</Heading>
        <p className="max-w-2xl text-left text-base text-slate-600">
          Jump back into your pools, manage the pools you created, or start a
          new one.
        </p>
      </div>
      <Surface className="flex flex-col gap-6">
        <PoolSelect data={data} username={username} />
      </Surface>
      <Surface className="flex flex-col gap-4">
        <CreatePoolLink />
      </Surface>
    </div>
  );
};

const CreatePoolLink = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(`/create`)} type="button">
      Create New Pool
    </Button>
  );
};

const PoolSelect = ({
  data,
  username,
}: {
  data: RouterOutput["poolsForUser"];
  username: string;
}) => {
  const navigate = useNavigate();

  if (!data.length) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
          Pools
        </p>
        <p className="text-lg font-semibold text-slate-800">
          You have not joined any pools yet.
        </p>
        <p className="text-sm text-slate-500">
          Create a new pool or ask a commissioner to send you an invite link.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-left">
        <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
          Pools
        </p>
        <p className="text-lg font-semibold text-slate-800">
          Select a pool to jump back in:
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {data.map(({ poolId, poolName, creator }) => (
          <div
            key={poolId}
            className="flex flex-col items-stretch justify-between gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-3 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:p-4"
          >
            <div className="text-left">
              <p className="text-base font-semibold text-slate-800">
                {poolName}
              </p>
              {username === creator ? (
                <p className="text-sm text-slate-500">You manage this pool</p>
              ) : null}
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
              <Button
                type="button"
                onClick={() => navigate(`/pool/${poolId}`)}
                size="sm"
                className="flex-1 sm:flex-initial"
              >
                Go to Pool
              </Button>
              {username === creator ? (
                <EditPoolDropdown poolId={poolId} />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Home = withPage(HomeComponent);
