import { integer, pgTable, varchar, serial, text, timestamp, boolean, primaryKey, uniqueIndex } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 200}).notNull(),
    content: text("content").notNull(),
    coverImage: varchar("cover_image", { length: 500}),
    published: boolean().default(false).notNull(),
    slug: varchar("slug", { length: 200}).notNull().unique(),
    authorId: integer("author_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    categories: integer("categories").array(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const postCategories = pgTable("post_categories", {
    id: serial("id").primaryKey(),
    postId: integer("postId"),
    categoryId: integer("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  uniquePostCategory: uniqueIndex("unique_post_category_idx").on(table.postId, table.categoryId),
}));