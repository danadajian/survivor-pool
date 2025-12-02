import { SignInButton } from "@clerk/clerk-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Heading } from "../../components/heading";
import { Button } from "../../components/ui/button";
import { Surface } from "../../components/ui/surface";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="relative min-h-screen w-full">
        <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pt-32 pb-12 text-center sm:px-6 sm:pt-40 sm:pb-16">
          <div className="relative flex flex-col">
            <div className="relative flex flex-col gap-4 py-8 sm:py-12">
              <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(15,23,42,0.15),_transparent_75%)] sm:h-[32rem]" />
              <Heading className="relative text-center text-4xl sm:text-5xl md:text-6xl">
                Survivor Pool
              </Heading>
              <p className="relative mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl">
                Pick a team each week. If they win, you survive. If they lose,
                you're out. Be the last one standing to win the pool.
              </p>
            </div>
            <div className="mt-4 flex flex-col items-center gap-4 sm:mt-6 sm:flex-row sm:justify-center">
              <SignInButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </SignInButton>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/rules")}
                className="w-full sm:w-auto"
              >
                Learn the Rules
              </Button>
            </div>
            <div className="mt-8 flex flex-col gap-6 sm:mt-12">
              <Surface className="flex flex-col gap-6 p-6 text-center sm:p-8 sm:text-left">
                <h2 className="text-2xl font-semibold text-slate-800">
                  How It Works
                </h2>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Pick a Team
                    </h3>
                    <p className="text-sm text-slate-600">
                      Each round, choose one team to win their game. You can
                      only use each team once per season.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Survive or Eliminate
                    </h3>
                    <p className="text-sm text-slate-600">
                      If your team wins, you advance. If they lose or you miss a
                      pick, you lose a life. Run out of lives and you're out.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Win the Pool
                    </h3>
                    <p className="text-sm text-slate-600">
                      Be the last player standing to take home the pot. Strategy
                      and planning are key to victory.
                    </p>
                  </div>
                </div>
              </Surface>
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-6 px-4 sm:px-6">
          <Link
            to="/privacy"
            className="text-sm text-slate-600 transition-colors hover:text-slate-900"
          >
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};
