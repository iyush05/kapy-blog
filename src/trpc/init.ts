import { getServerAuth } from "@/lib/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import jwt from "jsonwebtoken"

export const createTRPCContext = cache(async () => {
  return {
    // auth : ...
  };
});

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
    const token = await getServerAuth();

    if (!token) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized"});
    }

    return next({ ctx: { ...ctx, auth: token }})
})
