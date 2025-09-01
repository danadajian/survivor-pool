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
    <div className="flex flex-col items-center pt-16 text-center">
      {"data" in error && error.data?.code && (
        <ErrorMessage message={error.data?.code} />
      )}
      <ErrorMessage message={error.message} />
    </div>
  </>
);

export const ErrorMessage = ({ message }: { message: string }) => (
  <p className="pt-8 pb-8 text-lg font-bold text-red-700">{message}</p>
);
