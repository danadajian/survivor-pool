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
import { Button } from "./ui/button";

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
        <MenuButton className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400">
          Options
          <ChevronDownIcon className="size-4 text-slate-500" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-48 origin-top-right rounded-2xl border border-slate-200 bg-white/95 p-2 text-sm font-medium text-slate-600 shadow-xl shadow-slate-900/10 transition duration-100 ease-out [--anchor-gap:--spacing(2)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <CopyInviteLinkButton poolId={poolId} />
          </MenuItem>
          <div className="my-2 h-px bg-slate-200/70" />
          <MenuItem>
            <button
              onClick={() => navigate(`/edit/${poolId}`)}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              <PencilIcon className="size-5 text-amber-500" />
              Edit pool
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={toggleDialog}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
            >
              <TrashIcon className="size-5 text-rose-500" />
              Delete pool
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <DialogWrapper dialogIsOpen={dialogIsOpen} toggleDialog={toggleDialog}>
        <>
          <DialogTitle
            as="h3"
            className="pt-2 text-xl font-semibold text-slate-900"
          >
            Confirm pool deletion
          </DialogTitle>
          <Description className="pt-3 text-sm text-slate-600">
            This action cannot be undone. All picks and history associated with
            this pool will be permanently removed.
          </Description>

          <div className="flex flex-col-reverse justify-end gap-3 pt-6 sm:flex-row">
            <Button variant="secondary" onClick={toggleDialog}>
              Cancel
            </Button>
            <Button variant="danger" autoFocus onClick={onDelete}>
              Delete pool
            </Button>
          </div>
        </>
      </DialogWrapper>
    </div>
  );
}
