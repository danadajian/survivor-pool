import { Square2StackIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

export const CopyInviteLinkButton = ({ poolId }: { poolId: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        setCopied(true);
        void navigator.clipboard.writeText(
          `${window.location.origin}/join/${poolId}`,
        );
      }}
      className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 data-focus:bg-gray-100"
    >
      <Square2StackIcon className="size-5 fill-gray-900/50" />
      {copied ? "Invite link copied!" : "Copy invite link"}
    </button>
  );
};
