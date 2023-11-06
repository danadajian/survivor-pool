import { type TRPCClientError } from "@trpc/client";
import React from "react";

import { type AppRouter } from "../router";
import { NavBar } from "./nav-bar";

export const Error = ({
  error,
}: {
  error: Partial<TRPCClientError<AppRouter>>;
}) => (
  <>
    <NavBar />
    <div className="flex flex-col items-center pt-16 text-center">
      {error.data && <ErrorMessage message={error.data?.code} />}
      <ErrorMessage message={error.message ?? "An unknown error occurred."} />
    </div>
  </>
);

export const ErrorMessage = ({ message }: { message: string }) => (
  <p className="pb-8 pt-8 text-lg font-bold text-red-700">{message}</p>
);
