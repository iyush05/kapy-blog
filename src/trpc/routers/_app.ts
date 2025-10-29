import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { authRouter } from "@/modules/auth/server/procedures";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
    auth: authRouter
});

export type AppRouter = typeof appRouter;
