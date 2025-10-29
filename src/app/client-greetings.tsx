"use client";

import { trpc } from "@/trpc/react";

export default function ClientGreetings() {
  const [res] = trpc.hello.useSuspenseQuery({ text: "ayush" });
  return <div>{res.greeting}</div>;
}
