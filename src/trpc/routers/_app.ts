import { createTRPCRouter } from "../init";
import { authRouter } from "@/modules/auth/server/procedures";
import { postRouter } from "@/modules/posts/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { profileRouter } from "@/modules/profile/server/procedures";

export const appRouter = createTRPCRouter({
    auth: authRouter,
    post: postRouter,
    category: categoriesRouter,
    profile: profileRouter,
});

export type AppRouter = typeof appRouter;
