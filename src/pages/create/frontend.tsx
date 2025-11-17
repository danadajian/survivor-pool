import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CopyInviteLinkButton } from "../../components/copy-invite-link-button";
import { ErrorMessage } from "../../components/error";
import { Heading, Subheading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { Button } from "../../components/ui/button";
import { Surface } from "../../components/ui/surface";
import { trpc } from "../../trpc";

const MIN_LIVES = 1;
const MAX_LIVES = 9;

const CreateComponent = ({ user }: PageProps) => {
  const utils = trpc.useUtils();
  const [poolName, setPoolName] = useState("");
  const [lives, setLives] = useState(MIN_LIVES);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { mutate, data, isSuccess } = trpc.createPool.useMutation({
    throwOnError: false,
    onSettled: (_, mutationError) => {
      if (mutationError) {
        setError(mutationError.message);
      } else {
        setError("");
      }
      utils.poolsForUser.invalidate();
      utils.pool.invalidate();
    },
  });

  const adjustLives = (delta: number) => {
    setLives((current) => {
      const next = current + delta;
      if (next < MIN_LIVES) return MIN_LIVES;
      if (next > MAX_LIVES) return MAX_LIVES;
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!poolName.trim()) {
      setError("Please give your pool a name before creating it.");
      return;
    }
    setError("");
    mutate({ ...user, poolName: poolName.trim(), lives });
  };

  if (isSuccess && data?.poolId) {
    return (
      <div className="flex w-full flex-col gap-6">
        <Surface className="flex flex-col gap-4">
          <Heading>{`${poolName} created successfully!`}</Heading>
          <Subheading>You are now a member of this pool.</Subheading>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              onClick={() => navigate(`/pool/${data.poolId}`)}
              type="button"
            >
              Make your first pick
            </Button>
            <CopyInviteLinkButton poolId={data.poolId} />
          </div>
        </Surface>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Heading>Create New Pool</Heading>
        <p className="max-w-2xl text-left text-base text-slate-600">
          Set your pool name, choose how many lives players start with, and
          invite friends to join.
        </p>
      </div>
      {error ? <ErrorMessage message={error} /> : null}
      <Surface>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-slate-600"
              htmlFor="poolName"
            >
              Pool name
            </label>
            <input
              id="poolName"
              name="poolName"
              type="text"
              autoComplete="off"
              value={poolName}
              onChange={(event) => setPoolName(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-800 shadow-inner focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 sm:px-4 sm:py-3"
              placeholder="e.g. Sunday Survivors"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-slate-600">
              Number of lives
            </span>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => adjustLives(-1)}
                disabled={lives <= MIN_LIVES}
              >
                −
              </Button>
              <span className="min-w-[3rem] text-center text-lg font-semibold text-slate-800">
                {lives}
              </span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => adjustLives(1)}
                disabled={lives >= MAX_LIVES}
              >
                +
              </Button>
            </div>
            <p className="text-sm text-slate-500">
              Give your players up to {MAX_LIVES} chances to stay alive.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="submit"
              disabled={!poolName.trim()}
              className="w-full sm:w-auto"
            >
              Create Pool
            </Button>
            <p className="text-xs text-slate-500">
              You can always update these settings later.
            </p>
          </div>
        </form>
      </Surface>
    </div>
  );
};

export const Create = withPage(CreateComponent);
