import { db } from "@/db";
import { posts, usersTable } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const profileRouter = createTRPCRouter({
    getMany: protectedProcedure.query(async ({ ctx }) => {
        const payload = ctx.auth;

        if (!payload) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid auth payload" });
        }

        const userId = ( payload as { id: number }).id;

        const userPosts = await db
            .select({
                        id: posts.id,
                        title: posts.title,
                        content: posts.content,
                        coverImage: posts.coverImage,
                        published: posts.published,
                        slug: posts.slug,
                        createdAt: posts.createdAt,
                        updatedAt: posts.updatedAt,
                        categories: posts.categories,
                        author: {
                                    id: usersTable.id,
                                    name: usersTable.name,
                                    username: usersTable.username,
                                    email: usersTable.email,
                                },
                    })
            .from(posts)
            .where(eq(posts.authorId, userId))
            .innerJoin(usersTable, eq(posts.authorId, usersTable.id))
        return userPosts;
    })
})