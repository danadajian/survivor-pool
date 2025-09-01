import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { trpc } from "../trpc";
import { DialogWrapper } from "./dialog-wrapper";

export const DeletePoolButton = ({ poolId }: { poolId: string }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const toggleDialog = () => setDialogIsOpen(!dialogIsOpen);
  const navigate = useNavigate();

  const utils = trpc.useUtils();
  const { mutate } = trpc.deletePool.useMutation({
    throwOnError: true,
    onSettled: () => utils.poolsForUser.invalidate(),
  });
  const onClick = async () => {
    await mutate({
      poolId,
    });
    navigate("/");
  };
  return (
    <div className="flex items-center">
      <button
        onClick={toggleDialog}
        className={
          "focus:shadow-outline h-6 rounded-full bg-red-500 px-2 font-bold text-white hover:bg-red-700 focus:outline-none"
        }
        type="button"
      >
        X
      </button>
      <DialogWrapper dialogIsOpen={dialogIsOpen} toggleDialog={toggleDialog}>
        <>
          <Dialog.Title
            as="h3"
            className="pt-2 text-xl leading-6 font-semibold"
          >
            Confirm pool deletion
          </Dialog.Title>
          <Dialog.Description className="pt-5 font-semibold text-slate-500">
            Are you sure you want to delete this pool?
          </Dialog.Description>

          <div className="flex justify-end pt-5">
            <button
              className="rounded-md bg-red-500 px-3 py-2 font-medium text-white uppercase hover:bg-red-800"
              autoFocus
              onClick={onClick}
            >
              Delete
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
    </div>
  );
};
