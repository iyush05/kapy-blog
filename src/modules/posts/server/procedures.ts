import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { postDeleteSchema, postInsertSchema } from "../schemas";
import { db } from "@/db";
import { categories, postCategories, posts, usersTable } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { eq, and, sql } from "drizzle-orm";

export const postRouter = createTRPCRouter({
    create: protectedProcedure
        .input(postInsertSchema.extend({
            id: z.number().optional(),
            slug: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            const payload = ctx.auth;

            if (!payload) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid auth payload" });
            }

            const authorId = ( payload as { id: string }).id;
            
            const [existingPost] = await db
                    .select()
                    .from(posts)
                    .where(eq(posts.slug, input.slug))
                    .limit(1);

            if (!existingPost) {
                const [createPost] = await db
                .insert(posts)
                .values({
                    ...input,
                    authorId: parseInt(authorId),
                })
                .returning()
                
                const [addPostCategories] = await db
                    .insert(postCategories)
                    .values(
                        input.categories.map((category) => ({
                            postId: createPost.id,
                            categoryId: category
                        }))
                    )
                    .onConflictDoNothing()
                    .returning()
                return createPost;
            }

            if (existingPost && existingPost.authorId !== parseInt(authorId)) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid auth payload" });
            }

            const [updatePost] = await db
                    .update(posts)
                    .set({
                        title: input.title,
                        content: input.content,
                        coverImage: input.coverImage,
                        published: input.published,
                        updatedAt: new Date(),
                    })
                    .where(eq(posts.slug, input.slug))
                    .returning()
                const [addPostCategories] = await db
                    .insert(postCategories)
                    .values(
                        input.categories.map((category) => ({
                            postId: updatePost.id,
                            categoryId: category
                        }))
                    )
                    .onConflictDoNothing()
                    .returning()

                return updatePost;
        }),
    save: protectedProcedure
    .input(postInsertSchema.extend({
        id: z.number().optional(),
        slug: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
        const payload = ctx.auth;

        if (!payload) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid auth payload" });
        }

        const authorId = ( payload as { id: string }).id;
        
        const [existingPost] = await db
                .select()
                .from(posts)
                .where(eq(posts.slug, input.slug))
                .limit(1);

        if (!existingPost) {
            const [createPost] = await db
            .insert(posts)
            .values({
                ...input,
                authorId: parseInt(authorId),
            })
            .returning()
            
            if (input.categories.length > 0) {
                const [addPostCategories] = await db
                .insert(postCategories)
                .values(
                    input.categories.map((category) => ({
                        postId: createPost.id,
                        categoryId: category
                    }))
                )
                .onConflictDoNothing()
                .returning()
            }

            return createPost;
        }

        if (existingPost && existingPost.authorId !== parseInt(authorId)) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid auth payload" });
        }

        const [updatePost] = await db
                .update(posts)
                .set({
                    title: input.title,
                    content: input.content,
                    coverImage: input.coverImage,
                    published: input.published,
                    updatedAt: new Date(),
                })
                .where(eq(posts.slug, input.slug))
                .returning()

            if (input.categories.length > 0) {
                const [addPostCategories] = await db
                .insert(postCategories)
                .values(
                    input.categories.map((category) => ({
                        postId: updatePost.id,
                        categoryId: category
                    }))
                )
                .onConflictDoNothing()
                .returning()
            }
            return updatePost;
    }),
    remove: protectedProcedure
        .input(postDeleteSchema)
        .mutation(async ({ input, ctx }) => {
            const [removePost] = await db
                .delete(posts)
                .where(
                    and(
                        eq(posts.slug, input.slug)
                    )
                )
                .returning()
            
            if (!removePost) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Post not found"
                })
            }

            const [removePostCategories] = await db
                .delete(postCategories)
                .where(
                    and(
                        eq(postCategories.postId, removePost.id)
                    )
                )
                .returning()
        }),
        getAll: protectedProcedure
            .input(
                z.object({
                    page: z.number().default(1),
                    limit: z.number().default(10),
                })
            )
            .query(async ({ input }) => {
                const { page, limit } = input;

                const offset = (page - 1) * limit;

                const publishedPosts = await db
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
                            email: usersTable.email,
                        },
                    })
                    .from(posts)
                    .where(eq(posts.published, true))
                    .innerJoin(usersTable, eq(posts.authorId, usersTable.id))
                    .limit(limit)
                    .offset(offset);
                
                const totalCountResult = await db
                    .select({ count: sql<number>`count(*)` })
                    .from(posts)
                    .where(eq(posts.published, true));
                
                const totalCount = totalCountResult[0]?.count ?? 0;

                return {
                    data: publishedPosts,
                    page,
                    limit,
                    totalPages: Math.ceil(totalCount / limit),
                    totalCount,
                }
            })
})