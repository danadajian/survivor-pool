import { Description, DialogTitle } from "@headlessui/react";
import React, { useContext } from "react";
import { useState } from "react";

import { type TeamButtonProps } from "../pages/pool/backend/get-event-buttons";
import { trpc } from "../trpc";
import { ButtonStyle } from "../utils/button-style";
import { DialogWrapper } from "./dialog-wrapper";
import { SecretPickContext } from "./secret-pick-provider";
import { Toggle } from "./toggle";
import { Button } from "./ui/button";

type TeamProps = {
  teamButton: TeamButtonProps;
  username: string;
  poolId: string;
};
export const TeamButton = ({ teamButton, username, poolId }: TeamProps) => {
  const utils = trpc.useUtils();
  const data = utils.pool.getData({ username, poolId });
  const { mutate } = trpc.makePick.useMutation({
    onMutate: () => {
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
      Promise.all([
        utils.pool.invalidate(),
        utils.poolMemberLivesRemaining.invalidate(),
        utils.picksForWeek.invalidate(),
      ]),
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

  const baseButtonClasses =
    "flex w-28 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 px-3 py-3 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-36 sm:gap-3 sm:px-4 sm:py-4 sm:text-sm";
  const buttonStyleMap = {
    [ButtonStyle.CURRENTLY_PICKED]:
      "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/30",
    [ButtonStyle.PREVIOUSLY_PICKED]:
      "bg-slate-800/95 text-white/70 border-slate-600",
    [ButtonStyle.PICK_FORBIDDEN]:
      "bg-slate-200 text-slate-400 border-slate-200",
    [ButtonStyle.DEFAULT]: "bg-white text-slate-700",
  } as const;
  const interactiveClasses =
    buttonStyle === ButtonStyle.DEFAULT && !buttonDisabled
      ? "hover:-translate-y-0.5 hover:shadow-lg shadow-slate-900/10"
      : "";
  const buttonClass = [
    baseButtonClasses,
    buttonStyleMap[buttonStyle],
    interactiveClasses,
  ]
    .filter(Boolean)
    .join(" ");
  const imageClass =
    buttonStyle === ButtonStyle.PREVIOUSLY_PICKED ? "opacity-80" : "";
  return (
    <>
      <button
        disabled={buttonDisabled}
        onClick={toggleDialog}
        className={buttonClass}
      >
        <img
          alt={team.abbreviation}
          src={team.logo}
          className={`h-12 w-12 sm:h-16 sm:w-16 ${imageClass}`}
        />
        <p className="text-center">{team.name}</p>
      </button>
      <DialogWrapper dialogIsOpen={dialogIsOpen} toggleDialog={toggleDialog}>
        <>
          <DialogTitle
            as="h3"
            className="pt-2 text-xl font-semibold text-slate-900"
          >
            Confirm pick
          </DialogTitle>
          <Description className="pt-3 text-sm text-slate-600">
            Are you sure you want to pick the {team.name}? You won't be able to
            pick them again this season.
          </Description>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex justify-start">
              <Toggle />
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={toggleDialog}>
                Cancel
              </Button>
              <Button autoFocus onClick={handleUpdate}>
                Lock it in
              </Button>
            </div>
          </div>
        </>
      </DialogWrapper>
    </>
  );
};
