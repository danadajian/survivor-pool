import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const path = pathname === "/" ? "/pools" : "/";
  const onClick = () => {
    navigate(path);
  };

  const linkText = pathname === "/" ? "View All Picks" : "View Your Picks";
  return (
    <header className={`fixed z-50 w-full shadow-2xl`}>
      <nav className="border-gray-200 bg-white px-4 py-2 dark:bg-gray-800 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between text-white">
          <div className="flex w-8 items-center">
            <UserButton />
          </div>
          <button
            onClick={onClick}
            className="rounded-lg border-2 border-slate-100 p-2"
          >
            {linkText}
          </button>
        </div>
      </nav>
    </header>
  );
};
