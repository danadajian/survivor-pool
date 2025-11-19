import React from "react";

type PoolTabsProps = {
  activeTab: "pick" | "all-picks";
  onTabChange: (tab: "pick" | "all-picks") => void;
};

export const PoolTabs = ({ activeTab, onTabChange }: PoolTabsProps) => {
  const tabs = [
    { id: "pick", label: "Your Pick" },
    { id: "all-picks", label: "View All Picks" },
  ] as const;

  const classNameForTab = (isActive: boolean) =>
    [
      "inline-flex flex-1 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap cursor-pointer",
      isActive
        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 focus-visible:outline-slate-900"
        : "text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-300",
    ].join(" ");

  return (
    <div className="flex gap-2">
      <div className="flex flex-1 flex-row gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-1 shadow-sm backdrop-blur">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={classNameForTab(activeTab === id)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
