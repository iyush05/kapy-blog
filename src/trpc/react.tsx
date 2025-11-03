"use client";

import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { PropsWithChildren, useState } from "react";
import { makeQueryClient } from "./query-client";
import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from "./routers/_app";
import superjson from "superjson";

export type RouterOutput = inferRouterOutputs<AppRouter>;

export type PostData = RouterOutput["post"]["getAll"]["data"][number];
export type CategoryData = RouterOutput["category"]["list"];
export type ProfilePostData = RouterOutput["profile"]["getMany"][number];
export type RecentPostData = RouterOutput["post"]["getRecent"];

export const trpc = createTRPCReact<AppRouter>();
const deployedUrl = process.env.NEXT_PUBLIC_DEPLOYED_URL;
let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
  // For server create new client
  if (typeof window === "undefined") return makeQueryClient();
  return (clientQueryClientSingleton ??= makeQueryClient());
}

function getUrl() {
  // need to change for deploy url
  return `${deployedUrl}/api/trpc`;
}

export function TRPCProvider(props: PropsWithChildren) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
