import { Dialog } from "@headlessui/react";
import React from "react";
import { useState } from "react";

import type { Event } from "../pages/pool/frontend";
import { trpc } from "../trpc";
import { DialogWrapper } from "./dialog-wrapper";

type Team = Event["competitions"][number]["competitors"][number]["team"];
type TeamProps = {
  team?: Team;
  username: string;
  poolId: string;
  gameStarted: boolean;
};
export const TeamButton = ({
  team,
  username,
  poolId,
  gameStarted,
}: TeamProps) => {
  const utils = trpc.useUtils();
  const gamesAndPicks = utils.pool.getData({ username, poolId });
  const { mutate } = trpc.makePick.useMutation({
    throwOnError: true,
    onMutate: ({ teamPicked }) => {
      utils.pool.setData({ username, poolId }, (data) => {
        if (data?.userPick) {
          return {
            ...data,
            userPick: {
              ...data.userPick,
              teamPicked,
            },
          };
        }
      });
      toggleDialog();
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 50);
    },
    onSettled: () =>
      Promise.all([utils.pool.invalidate(), utils.picksForPool.invalidate()]),
  });
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const toggleDialog = () => setDialogIsOpen(!dialogIsOpen);

  if (!gamesAndPicks || !team) return <div>No team found.</div>;
  const handleUpdate = () =>
    mutate({
      username,
      teamPicked: team.name,
      week: gamesAndPicks.games.week.number,
      season: gamesAndPicks.games.season.year,
      poolId,
    });
  const { forbiddenTeams } = gamesAndPicks;
  const teamCurrentlyPicked = team.name === gamesAndPicks.userPick?.teamPicked;
  const teamPreviouslyPicked = Boolean(forbiddenTeams?.includes(team.name));
  const userSurvived = gamesAndPicks.userPick?.result === "WON";
  const pickIsLocked = gameStarted || userSurvived;
  const buttonClass = teamCurrentlyPicked
    ? "bg-blue-800 text-white"
    : teamPreviouslyPicked
      ? "bg-blue-800 text-white opacity-30"
      : pickIsLocked
        ? "bg-slate-300 opacity-30"
        : "bg-slate-300";
  const imageClass = teamPreviouslyPicked ? "opacity-80" : "";
  return (
    <>
      <button
        disabled={
          teamCurrentlyPicked ||
          teamPreviouslyPicked ||
          pickIsLocked ||
          gamesAndPicks.eliminated
        }
        onClick={toggleDialog}
        className={`flex flex-col items-center rounded-lg border-2 border-slate-100 p-2 ${buttonClass}`}
      >
        <img
          alt={team.abbreviation}
          src={team.logo}
          className={`h-14 w-14 ${imageClass}`}
        />
        <p>{team.name}</p>
      </button>
      <DialogWrapper dialogIsOpen={dialogIsOpen} toggleDialog={toggleDialog}>
        <>
          <Dialog.Title
            as="h3"
            className="pt-2 text-xl font-semibold leading-6"
          >
            Confirm pick
          </Dialog.Title>
          <Dialog.Description className="pt-5 font-semibold text-slate-500">
            Are you sure you want to pick the {team.name}? You won't be able to
            pick them again this season.
          </Dialog.Description>

          <div className="flex justify-end pt-5">
            <button
              className="rounded-md bg-blue-800 px-3 py-2 font-medium uppercase text-white hover:bg-blue-500"
              autoFocus
              onClick={handleUpdate}
            >
              Lock it in
            </button>
            <button
              className="ml-3 rounded-md border border-blue-800 px-3 py-2 font-medium uppercase text-blue-800 hover:bg-blue-300"
              onClick={toggleDialog}
            >
              Cancel
            </button>
          </div>
        </>
      </DialogWrapper>
    </>
  );
};
