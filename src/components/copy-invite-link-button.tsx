import { Square2StackIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

import { Button } from "./ui/button";

export const CopyInviteLinkButton = ({ poolId }: { poolId: string }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCopied(true);
    void navigator.clipboard.writeText(
      `${window.location.origin}/join/${poolId}`,
    );
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Button
      type="button"
      variant={copied ? "primary" : "secondary"}
      className="w-full justify-center gap-2 sm:w-auto"
      onClick={handleClick}
    >
      <Square2StackIcon
        className={`size-5 ${
          copied ? "text-white" : "text-slate-500"
        } transition`}
      />
      {copied ? "Invite link copied!" : "Copy invite link"}
    </Button>
  );
};
