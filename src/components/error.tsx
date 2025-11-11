import { type TRPCClientError } from "@trpc/client";
import React from "react";

import { type AppRouter } from "../router";
import { NavBar } from "./nav-bar";

export const ErrorPage = ({
  error,
}: {
  error: Error | TRPCClientError<AppRouter>;
}) => (
  <>
    <NavBar />
    <div className="relative min-h-screen w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.12),_transparent_62%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-4 px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28">
        {"data" in error && error.data?.code && (
          <ErrorMessage message={error.data?.code} />
        )}
        <ErrorMessage message={error.message} />
      </div>
    </div>
  </>
);

export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-700 shadow-sm shadow-red-500/5">
    {message}
  </div>
);
