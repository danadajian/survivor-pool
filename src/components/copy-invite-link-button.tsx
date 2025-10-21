import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React, { useState } from "react";

export const CopyInviteLinkButton = ({ poolId }: { poolId: string }) => {
  const [copied, setCopied] = useState(false);
  const copyButtonClasses = copied
    ? "bg-green-500 opacity-30"
    : "bg-slate-500 hover:bg-green-400";

  return (
    <Popover>
      <PopoverButton
        onClick={() => {
          setCopied(true);
          void navigator.clipboard.writeText(
            `${window.location.origin}/join/${poolId}`,
          );
        }}
        disabled={copied}
        className={`focus:shadow-outline m-2 rounded-md px-1 py-1 focus:outline-none ${copyButtonClasses}`}
        type="button"
      >
        <img className="max-w-6" src="/public/copy-link.png" alt="copy link" />
      </PopoverButton>
      <PopoverPanel className="absolute z-10">Invite link copied!</PopoverPanel>
    </Popover>
  );
};
