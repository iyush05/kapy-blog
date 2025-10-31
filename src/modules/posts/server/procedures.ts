import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { postDeleteSchema, postInsertSchema } from "../schemas";
import { db } from "@/db";
import { categories, postCategories, posts } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { eq, and } from "drizzle-orm";

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
                
                // if (createPost.categories!.length > 0) {
                //     const [addPostCategories] = await db
                //     .insert(postCategories)
                //     .values(
                //         createPost.categories.map((category: number) => ({
                //             slug: createPost.slug,
                //             category_id: category
                //         }))
                //     )
                //     .returning()
                // }
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
        })
})