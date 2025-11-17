import { NavLink } from "react-router-dom";

type PoolTabsProps = {
  poolId?: string;
};

export const PoolTabs = ({ poolId }: PoolTabsProps) => {
  if (!poolId) {
    return null;
  }

  const tabs = [
    { to: `/pool/${poolId}`, label: "Your Pick" },
    { to: `/picks/${poolId}`, label: "View All Picks" },
  ];

  const classNameForLink = ({ isActive }: { isActive: boolean }) =>
    [
      "inline-flex flex-1 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap",
      isActive
        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 focus-visible:outline-slate-900"
        : "text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-300",
    ].join(" ");

  return (
    <div className="flex gap-2">
      <div className="flex flex-1 flex-row gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-1 shadow-sm backdrop-blur">
        {tabs.map(({ to, label }) => (
          <NavLink key={label} to={to} className={classNameForLink}>
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
