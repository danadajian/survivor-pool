import { UserButton } from "@clerk/clerk-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import { NavLink, useMatch } from "react-router-dom";

export const NavBar = () => {
  const picksMatch = useMatch("/picks/:poolId");
  const poolMatch = useMatch("/pool/:poolId");
  const { resetBoundary } = useErrorBoundary();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const poolId = picksMatch?.params.poolId ?? poolMatch?.params.poolId ?? null;
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/winners", label: "Winners" },
    { to: "/rules", label: "Rules" },
    ...(poolId
      ? [
          { to: `/pool/${poolId}`, label: "Your Pool" },
          { to: `/picks/${poolId}`, label: "View All Picks" },
        ]
      : []),
  ];
  const classNameForLink = ({ isActive }: { isActive: boolean }) =>
    [
      "inline-flex items-center rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap w-full justify-start sm:w-auto sm:justify-center sm:px-4",
      isActive
        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 focus-visible:outline-slate-900"
        : "text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-300",
    ].join(" ");
  const handleNavLinkClick = () => {
    resetBoundary();
    setIsMenuOpen(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-sm">
            SP
          </div>
          <span className="hidden text-base font-semibold text-slate-900 sm:inline">
            Survivor Pool
          </span>
        </div>
        <div className="hidden flex-1 items-center justify-center gap-1.5 sm:flex sm:gap-2">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              onClick={handleNavLinkClick}
              className={classNameForLink}
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 sm:hidden"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <UserButton />
        </div>
      </nav>
      {isMenuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-slate-200/80 bg-white/95 backdrop-blur sm:hidden"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-1.5 px-4 py-3">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                onClick={handleNavLinkClick}
                className={classNameForLink}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
};
