import {
  hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React from "react";
import { type PropsWithChildren, useState } from "react";

import { trpc } from "../trpc";

export const ClientProvider = ({
  children,
  dehydratedState,
}: PropsWithChildren<{ dehydratedState?: unknown }>) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60, // 1 minute
          throwOnError: true,
          retry: 2,
        },
        mutations: {
          throwOnError: true,
        },
      },
    });

    // Hydrate the query client with server state if provided
    // Try to get from window first (from script tag), then from prop
    const stateToHydrate =
      (typeof window !== "undefined" &&
        "__DEHYDRATED_STATE__" in window &&
        window.__DEHYDRATED_STATE__) ||
      dehydratedState;

    if (stateToHydrate) {
      hydrate(client, stateToHydrate);
    }

    return client;
  });
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/trpc",
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
