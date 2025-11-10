import { QueryClient, QueryClientProvider, dehydrate, hydrate } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React from "react";
import { type PropsWithChildren, useState } from "react";

import { trpc } from "../trpc";

export const ClientProvider = ({ 
  children, 
  dehydratedState 
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
      (typeof window !== "undefined" && (window as any).__DEHYDRATED_STATE__) ||
      dehydratedState;
    
    if (stateToHydrate) {
      try {
        hydrate(client, stateToHydrate);
      } catch (error) {
        console.error("Failed to hydrate query client:", error);
      }
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
