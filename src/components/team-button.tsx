import { Description, DialogTitle } from "@headlessui/react";
import React from "react";
import { useState } from "react";

import type { Event } from "../pages/pool/frontend";
import { trpc } from "../trpc";
import { DialogWrapper } from "./dialog-wrapper";

type Team = Event["competitions"][number]["competitors"][number]["team"];
type TeamProps = {
  team?: Team;
  teamIsFavorite?: boolean;
  username: string;
  poolId: string;
  gameStarted: boolean;
  pickIsLocked: boolean;
};
export const TeamButton = ({
  team,
  teamIsFavorite,
  username,
  poolId,
  gameStarted,
  pickIsLocked,
}: TeamProps) => {
  const utils = trpc.useUtils();
  const data = utils.pool.getData({ username, poolId });
  const { mutate } = trpc.makePick.useMutation({
    onMutate: ({ teamPicked }) => {
      utils.pool.setData({ username, poolId }, (data) => {
        if (data?.teamUserPicked) {
          return {
            ...data,
            teamUserPicked: teamPicked,
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

  if (!data || !team) {
    return <div>No team found.</div>;
  }

  const {
    currentWeek,
    currentSeason,
    teamUserPicked,
    forbiddenTeams,
    eliminated,
    userPickResult,
  } = data;
  const handleUpdate = () =>
    mutate({
      username,
      teamPicked: team.name,
      week: currentWeek,
      season: currentSeason,
      poolId,
    });
  const teamCurrentlyPicked = team.name === teamUserPicked;
  const teamPreviouslyPicked = Boolean(forbiddenTeams?.includes(team.name));
  const userPickedTieAndTeamIsFavorite =
    userPickResult === "TIED" && teamIsFavorite;
  const buttonDisabledForOtherReason =
    gameStarted || pickIsLocked || eliminated || userPickedTieAndTeamIsFavorite;
  const buttonClass = teamCurrentlyPicked
    ? "bg-blue-800 text-white"
    : teamPreviouslyPicked
      ? "bg-blue-800 text-white opacity-30"
      : buttonDisabledForOtherReason
        ? "bg-slate-300 opacity-30"
        : "bg-slate-300";
  const imageClass = teamPreviouslyPicked ? "opacity-80" : "";
  return (
    <>
      <button
        disabled={
          teamCurrentlyPicked ||
          teamPreviouslyPicked ||
          buttonDisabledForOtherReason
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
          <DialogTitle as="h3" className="pt-2 text-xl leading-6 font-semibold">
            Confirm pick
          </DialogTitle>
          <Description className="pt-5 font-semibold text-slate-500">
            Are you sure you want to pick the {team.name}? You won't be able to
            pick them again this season.
          </Description>

          <div className="flex justify-end pt-5">
            <button
              className="rounded-md bg-blue-800 px-3 py-2 font-medium text-white uppercase hover:bg-blue-500"
              autoFocus
              onClick={handleUpdate}
            >
              Lock it in
            </button>
            <button
              className="ml-3 rounded-md border border-blue-800 px-3 py-2 font-medium text-blue-800 uppercase hover:bg-blue-300"
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
