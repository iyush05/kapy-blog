import { categories } from "@/db/schema"
import { z } from "zod"

export const postInsertSchema = z.object({
    title: z.string().min(1).max(200),
    content: z.string().min(1),
    coverImage: z.string().url().max(500).optional().nullable(),
    slug: z.string(),
    published: z.boolean().default(false),
    categories: z.array(z.number()).default([]),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
})

export const postDeleteSchema = z.object({
    slug: z.string()
})