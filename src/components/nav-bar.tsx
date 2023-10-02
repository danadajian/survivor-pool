import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const poolsMatch = useMatch("/pools/:poolId");
  const pickMatch = useMatch("/pick/:poolId");
  const navigate = useNavigate();
  const path = poolsMatch?.pathname
    ? `/pick/${poolsMatch.params.poolId}`
    : pickMatch?.pathname
    ? `/pools/${pickMatch?.params.poolId}`
    : "";

  const linkText = pickMatch ? "View All Picks" : "View Your Picks";
  return (
    <header className="fixed z-50 w-full shadow-2xl">
      <nav className="border-gray-200 bg-white px-4 py-2 dark:bg-gray-800 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between text-white">
          <div className="flex w-8">
            <UserButton />
          </div>
          <div>
            <button
              onClick={() => navigate("/")}
              className="rounded-lg border-2 border-slate-100 p-2"
            >
              Home
            </button>
            {path && (
              <button
                onClick={() => navigate(path)}
                className="ml-2 rounded-lg border-2 border-slate-100 p-2"
              >
                {linkText}
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
