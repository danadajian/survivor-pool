import {
  Description,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { trpc } from "../trpc";
import { CopyInviteLinkButton } from "./copy-invite-link-button";
import { DialogWrapper } from "./dialog-wrapper";

export function EditPoolDropdown({ poolId }: { poolId: string }) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const toggleDialog = () => setDialogIsOpen(!dialogIsOpen);
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const { mutate } = trpc.deletePool.useMutation({
    onSettled: () => utils.poolsForUser.invalidate(),
  });
  const onDelete = () => mutate({ poolId });

  return (
    <div className="ml-4">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-2 text-sm/6 font-semibold text-white shadow-inner shadow-black/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-gray-900 data-hover:bg-gray-400 data-open:bg-gray-400">
          Options
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-42 origin-top-right rounded-xl border border-gray-900/5 bg-white p-1 text-sm/6 text-gray-900 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <div className="data-focus:bg-gray-400">
              <CopyInviteLinkButton poolId={poolId} />
            </div>
          </MenuItem>
          <div className="my-1 h-px bg-gray-200" />
          <MenuItem>
            <button
              onClick={() => navigate(`/edit/${poolId}`)}
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 data-focus:bg-gray-400"
            >
              <PencilIcon className="size-5 fill-yellow-600/70" />
              Edit pool
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={toggleDialog}
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 data-focus:bg-gray-400"
            >
              <TrashIcon className="size-5 fill-red-700/70" />
              Delete pool
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <DialogWrapper dialogIsOpen={dialogIsOpen} toggleDialog={toggleDialog}>
        <>
          <DialogTitle as="h3" className="pt-2 text-xl leading-6 font-semibold">
            Confirm pool deletion
          </DialogTitle>
          <Description className="pt-5 font-semibold text-slate-500">
            Are you sure you want to delete this pool?
          </Description>

          <div className="flex justify-end pt-5">
            <button
              className="rounded-md bg-red-500 px-3 py-2 font-medium text-white uppercase hover:bg-red-800"
              autoFocus
              onClick={onDelete}
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
}
