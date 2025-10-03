import {defaultShouldDehydrateQuery, keepPreviousData, QueryClient} from "@tanstack/react-query";

export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                placeholderData: keepPreviousData,
                staleTime: 1000 * 60, // 1 minute
                throwOnError: true,
                retry: false,
            },
            mutations: {
                throwOnError: true,
            },
            dehydrate: {
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
        },
    });
}
