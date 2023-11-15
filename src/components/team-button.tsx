import { Dialog } from "@headlessui/react";
import React from "react";
import { useState } from "react";

import type { Event } from "../pages/pick/frontend";
import { trpc } from "../trpc";
import { DialogWrapper } from "./dialog-wrapper";

type Team = Event["competitions"][number]["competitors"][number]["team"];
type TeamProps = {
  team?: Team;
  teamPicked?: string;
  username: string;
  poolId: string;
  pickIsLocked: boolean;
};
export const TeamButton = ({
  team,
  teamPicked,
  username,
  poolId,
  pickIsLocked,
}: TeamProps) => {
  const utils = trpc.useUtils();
  const gamesAndPicks = utils.pick.getData({ username, poolId });
  const { mutateAsync } = trpc.makePick.useMutation();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const toggleDialog = () => setDialogIsOpen(!dialogIsOpen);

  if (!gamesAndPicks || !team) return <div>No team found.</div>;
  const handleUpdate = async () => {
    await mutateAsync({
      username,
      teamPicked: team.name,
      week: gamesAndPicks.games.week.number,
      season: gamesAndPicks.games.season.year,
      poolId,
    });
    await utils.pick.invalidate();
    toggleDialog();
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  };
  const { forbiddenTeams } = gamesAndPicks;
  const teamCurrentlyPicked = team.name === teamPicked;
  const teamPreviouslyPicked = Boolean(forbiddenTeams?.includes(team.name));
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
        disabled={teamCurrentlyPicked || teamPreviouslyPicked || pickIsLocked}
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
