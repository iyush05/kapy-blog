import { HydrateClient, trpc } from "@/trpc/server";
import ClientGreetings from "./client-greetings";
import { Suspense } from "react";

export default async function Home() {
  void trpc.hello.prefetch({ text: "Nisab" });

  return (
    <HydrateClient>
      <div>This rendered on server</div>
      <Suspense fallback="Loading....">
        <ClientGreetings />
      </Suspense>
    </HydrateClient>
  );
}
