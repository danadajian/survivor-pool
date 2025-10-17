import { Description, DialogTitle } from "@headlessui/react";
import React, { useContext } from "react";
import { useState } from "react";

import { type TeamButtonProps } from "../pages/pool/backend";
import { trpc } from "../trpc";
import { ButtonStyle } from "../utils/button-style";
import { DialogWrapper } from "./dialog-wrapper";
import { SecretPickContext } from "./secret-pick-provider";
import { Toggle } from "./toggle";

type TeamProps = {
  teamButton: TeamButtonProps;
  username: string;
  poolId: string;
};
export const TeamButton = ({ teamButton, username, poolId }: TeamProps) => {
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
  const { pickIsSecret } = useContext(SecretPickContext);

  const toggleDialog = () => setDialogIsOpen(!dialogIsOpen);

  const { team, buttonDisabled, buttonStyle } = teamButton;
  if (!data || !team) {
    return <div>No team found.</div>;
  }

  const { currentWeek, currentSeason } = data;
  const handleUpdate = () =>
    mutate({
      username,
      teamPicked: team.name,
      week: currentWeek,
      season: currentSeason,
      poolId,
      pickIsSecret,
    });

  const buttonStyleMap = {
    [ButtonStyle.CURRENTLY_PICKED]: "bg-blue-800 text-white",
    [ButtonStyle.PREVIOUSLY_PICKED]: "bg-blue-800 text-white opacity-30",
    [ButtonStyle.PICK_FORBIDDEN]: "bg-slate-300 opacity-30",
    [ButtonStyle.DEFAULT]: "bg-slate-300",
  };
  const buttonClass = buttonStyleMap[buttonStyle];
  const imageClass =
    buttonStyle === ButtonStyle.PREVIOUSLY_PICKED ? "opacity-80" : "";
  return (
    <>
      <button
        disabled={buttonDisabled}
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

          <div className="mt-5 flex justify-between">
            <div className="flex items-center">
              <Toggle />
            </div>
            <div className="flex justify-end">
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
          </div>
        </>
      </DialogWrapper>
    </>
  );
};
