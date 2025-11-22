import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CopyInviteLinkButton } from "../../components/copy-invite-link-button";
import { ErrorMessage } from "../../components/error";
import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { Button } from "../../components/ui/button";
import { Surface } from "../../components/ui/surface";
import { type Sport, SPORTS } from "../../schema";
import { trpc } from "../../trpc";

const MIN_LIVES = 1;
const MAX_LIVES = 9;

const EditComponent = ({ poolId }: PageProps) => {
  const utils = trpc.useUtils();
  const [data] = trpc.getPool.useSuspenseQuery({ poolId });
  const [poolName, setPoolName] = useState(data.name);
  const [lives, setLives] = useState(data.lives);
  const [sport, setSport] = useState<Sport>(data.sport);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { mutate, isSuccess } = trpc.editPool.useMutation({
    throwOnError: false,
    onSettled: (_, mutationError) => {
      if (mutationError) {
        setError(mutationError.message);
      } else {
        setError("");
      }
      utils.getPool.invalidate();
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
      setError("Pool name cannot be empty.");
      return;
    }
    setError("");
    mutate({ poolId, poolName: poolName.trim(), lives, sport });
  };

  if (isSuccess) {
    return (
      <div className="flex w-full flex-col gap-6">
        <Surface className="flex flex-col gap-4">
          <Heading>{`${poolName} updated successfully!`}</Heading>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button onClick={() => navigate(`/pool/${data.id}`)} type="button">
              Go to pool
            </Button>
            <CopyInviteLinkButton poolId={data.id} />
          </div>
        </Surface>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Heading>Edit Pool</Heading>
        <p className="max-w-2xl text-left text-base text-slate-600">
          Update the pool name or adjust how many lives each participant has
          remaining.
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
              value={poolName}
              onChange={(event) => setPoolName(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-800 shadow-inner focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 sm:px-4 sm:py-3"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-slate-600">Sport</span>
            <div className="flex gap-3">
              {SPORTS.map((sportOption) => (
                <Button
                  key={sportOption}
                  type="button"
                  variant={sport === sportOption ? "primary" : "secondary"}
                  onClick={() => setSport(sportOption)}
                  className="flex-1"
                >
                  {sportOption}
                </Button>
              ))}
            </div>
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
              Keep it between {MIN_LIVES} and {MAX_LIVES} lives to stay within
              Survivor Pool rules.
            </p>
          </div>
          <Button
            type="submit"
            disabled={!poolName.trim()}
            className="w-full sm:w-auto"
          >
            Update Pool
          </Button>
        </form>
      </Surface>
    </div>
  );
};

export const Edit = withPage(EditComponent);
