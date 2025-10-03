import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import {createTRPCReact} from "@trpc/react-query";
import React from "react";
import { type PropsWithChildren, useState } from "react";

import type {AppRouter} from "../router";
import {makeQueryClient} from "../trpc-client-factory";

export const trpcClient = createTRPCReact<AppRouter>();

export const ClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();
  const [client] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
        }),
      ],
    }),
  );
  return (
    <trpcClient.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcClient.Provider>
  );
};

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: always make a new query client
        return makeQueryClient();
    }
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= makeQueryClient());
}

function getUrl() {
    const base = typeof window === 'undefined' ? 'http://localhost:8080' : ''
    return `${base}/trpc`;
}
