import React, { useState } from "react";

export const CopyInviteLinkButton = ({ poolId }: { poolId: string }) => {
  const [copied, setCopied] = useState(false);
  const copyButtonClasses = copied
    ? "bg-green-500 opacity-30"
    : "bg-slate-500 hover:bg-green-500";
  const copyButtonText = copied ? "Copied!" : "Copy invite link";

  return (
    <button
      onClick={() => {
        setCopied(true);
        void navigator.clipboard.writeText(
          `${window.location.origin}/join/${poolId}`,
        );
      }}
      disabled={copied}
      className={`focus:shadow-outline mb-2 rounded px-4 py-2 font-bold text-white focus:outline-none ${copyButtonClasses}`}
      type="button"
    >
      {copyButtonText}
    </button>
  );
};
