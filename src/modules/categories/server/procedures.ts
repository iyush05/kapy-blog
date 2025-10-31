import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { db } from "@/db"
import { categories, postCategories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { categoryInsertSchema, postCategoryInsertSchema } from "../schemas";

export const categoriesRouter = createTRPCRouter({
    create: protectedProcedure
        .input(categoryInsertSchema)
        .mutation(async ({ input, ctx }) => {
            
            const [existingCategory] = await db
                .select()
                .from(categories)
                .where(eq(categories.name, input.name))
                .limit(1)
            
            if (existingCategory) {
                throw new TRPCError({
                    code: "CONFLICT", 
                    message: "Category already exists."
                })
            }

            const [createCategory] = await db
                    .insert(categories)
                    .values({
                        ...input
                    })
                    .returning()
            return createCategory

        }),
    list: protectedProcedure
        .query(async() => {
            const existingCategories = await db
                .select()
                .from(categories)
            
            return existingCategories
        }),
    add: protectedProcedure
        .input(postCategoryInsertSchema)
        .mutation(async ({ input, ctx }) => {

            const [insertPostCategory] = await db
                .insert(postCategories)
                .values({
                    ...input
                })
                .onConflictDoNothing({
                    target: [postCategories.postId, postCategories.categoryId]
                })
                .returning()

                return insertPostCategory
        })

})