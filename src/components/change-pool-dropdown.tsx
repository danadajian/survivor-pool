import { CheckIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useNavigate } from "react-router-dom";

import { trpc } from "../trpc";
import { PortalDropdownMenu, useDropdown } from "./portal-dropdown";

type ChangePoolDropdownProps = {
  username: string;
  currentPoolId: string;
};

export const ChangePoolDropdown = ({
  username,
  currentPoolId,
}: ChangePoolDropdownProps) => {
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const poolsForUser = utils.poolsForUser.getData({ username });
  const { showOptions, position, buttonRef, dropdownRef, toggle, close } =
    useDropdown();

  if (!poolsForUser || poolsForUser.length === 0) {
    return null;
  }

  const handleNavigate = (poolId: string) => {
    navigate(`/pool/${poolId}`);
    close();
  };

  return (
    <>
      <div className="relative inline-block shrink-0">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          id="change-pool-button"
          aria-expanded={showOptions}
          aria-haspopup="true"
        >
          Change Pool
          <ChevronDownIcon className="size-4 text-slate-500" aria-hidden />
        </button>
      </div>
      <PortalDropdownMenu
        showOptions={showOptions}
        position={position}
        dropdownRef={dropdownRef}
        buttonId="change-pool-button"
        width="w-56"
        padding="p-2"
        maxHeight=""
      >
        {poolsForUser.map(({ poolId, poolName }) => {
          const isCurrentPool = poolId === currentPoolId;
          return (
            <button
              key={poolId}
              type="button"
              onClick={() => handleNavigate(poolId)}
              className={[
                "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300",
                isCurrentPool
                  ? "font-semibold text-slate-800 hover:bg-slate-100"
                  : "text-slate-600 hover:bg-slate-100",
              ]
                .filter(Boolean)
                .join(" ")}
              role="menuitem"
              tabIndex={-1}
            >
              <span>{poolName}</span>
              {isCurrentPool ? (
                <CheckIcon className="size-5 text-slate-700" />
              ) : null}
            </button>
          );
        })}
      </PortalDropdownMenu>
    </>
  );
};
