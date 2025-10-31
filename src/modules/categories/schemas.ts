import { z } from "zod";

export const categoryInsertSchema = z.object({
    name: z.string()
})

export const postCategoryInsertSchema = z.object({
    slug: z.string(),
    categoryId: z.number()
})