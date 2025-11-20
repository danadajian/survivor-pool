import React from "react";
import { useNavigate } from "react-router-dom";

import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { Button } from "../../components/ui/button";
import { Surface } from "../../components/ui/surface";
import { trpc } from "../../trpc";

const JoinComponent = ({ user, poolId }: PageProps) => {
  const { mutate, isSuccess } = trpc.joinPool.useMutation();
  const navigate = useNavigate();
  const [pool] = trpc.getPool.useSuspenseQuery({ poolId });

  const joinPool = () =>
    mutate({
      ...user,
      poolId,
    });

  if (isSuccess) {
    return (
      <div className="flex w-full flex-col gap-6">
        <Surface className="flex flex-col gap-4">
          <Heading>You have joined {pool.name}!</Heading>
          <Button onClick={() => navigate(`/pool/${poolId}`)} type="button">
            Make your first pick
          </Button>
        </Surface>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Heading>Join New Survivor Pool</Heading>
        <p className="max-w-2xl text-left text-base text-slate-600">
          Accept your invitation to join the pool and start making picks right
          away.
        </p>
      </div>
      <Surface className="flex flex-col gap-4">
        <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
          Invitation
        </p>
        <p className="text-lg font-semibold text-slate-800">
          You have been invited to join{" "}
          <span className="text-slate-900">{pool.name}</span>
          <span className="ml-2 rounded border border-slate-200 px-1.5 py-0.5 align-middle text-xs text-slate-500 uppercase">
            {pool.sport}
          </span>
          .
        </p>
        <p className="text-sm text-slate-500">
          Joining connects you to the latest picks, standings, and weekly
          updates.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button onClick={joinPool} type="button" className="w-full sm:w-auto">
            Join Pool
          </Button>
          <p className="text-xs text-slate-500">
            Your details are pulled from your Clerk profile.
          </p>
        </div>
      </Surface>
    </div>
  );
};

export const Join = withPage(JoinComponent);
