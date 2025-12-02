import React from "react";

import { type RouterOutput } from "../../../trpc";
import { type PickStatus } from "../../../utils/get-pick-status";

type PickStatusCardProps = {
  status: PickStatus;
  userPick: RouterOutput["pool"]["userPick"];
  userPickTeam?: RouterOutput["pool"]["userPickTeam"];
  children: React.ReactNode;
};

export const PickStatusCard = ({
  status,
  userPick,
  userPickTeam,
  children,
}: PickStatusCardProps) => {
  const styles = {
    PENDING: {
      container: "bg-slate-50 text-slate-900",
      badge: "bg-slate-200 text-slate-800",
      message: "text-slate-700",
    },
    ELIMINATED: {
      container: "bg-rose-50 text-rose-900",
      badge: "bg-rose-200 text-rose-800",
      message: "text-rose-700",
    },
    WON: {
      container: "bg-emerald-50 text-emerald-900",
      badge: "bg-emerald-200 text-emerald-800",
      message: "text-emerald-700",
    },
    LOST: {
      container: "bg-rose-50 text-rose-900",
      badge: "bg-rose-200 text-rose-800",
      message: "text-rose-700",
    },
    LOCKED: {
      container: "bg-amber-50 text-amber-900",
      badge: "bg-amber-200 text-amber-800",
      message: "text-amber-700",
    },
    PICKED: {
      container: "bg-blue-50 text-blue-900",
      badge: "bg-blue-200 text-blue-800",
      message: "text-blue-700",
    },
    ["MISSED DEADLINE"]: {
      container: "bg-rose-50 text-rose-900",
      badge: "bg-rose-200 text-rose-800",
      message: "text-rose-700",
    },
  } satisfies Record<
    PickStatus,
    { container: string; badge: string; message: string }
  >;

  const { container, badge, message } = styles[status];

  const secretBadge = userPick?.pickIsSecret ? (
    <span className="inline-flex items-center rounded-full bg-purple-200 px-2.5 py-0.5 text-sm font-medium text-purple-700">
      SECRET
    </span>
  ) : null;

  return (
    <div className={`flex flex-col gap-4 rounded-xl p-6 ${container}`}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${badge}`}
            >
              {status}
            </span>
            {secretBadge}
          </div>
        </div>

        {userPick?.teamPicked ? (
          <div className="flex items-center gap-4">
            {userPickTeam?.logo && (
              <img
                src={userPickTeam.logo}
                alt={userPickTeam.name}
                className="h-16 w-16 object-contain"
              />
            )}
            <span className="text-3xl font-bold tracking-tight">
              {userPickTeam?.displayName ?? userPick.teamPicked}
            </span>
          </div>
        ) : null}
      </div>
      <div className={`flex flex-col gap-4 text-base font-medium ${message}`}>
        {children}
      </div>
    </div>
  );
};
