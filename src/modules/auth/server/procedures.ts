import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { db } from "@/db"
import { authSchema, loginSchema } from "../schemas";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm"
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";

const JWT_SECRET = process.env.JWT_SECRET!

export const authRouter = createTRPCRouter({
    create: baseProcedure
        .input(authSchema)
        .mutation(async ({ input }) => {
            try { 
                const hashedPassword = await bcrypt.hash(input.password, 10)

                const [createUser] = await db
                    .insert(usersTable)
                    .values({
                        ...input,
                        password: hashedPassword,
                    })
                    .returning();

                if (!createUser) {
                    throw new TRPCError({
                        code: "CONFLICT",
                        message: "User already exists.",
                    });
                }

                const token = jwt.sign(
                    { id: createUser.id },
                    JWT_SECRET,
                    { expiresIn: "7d"}
                );

                (await cookies()).set("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: 7 * 24 * 60 * 60, // 7 days
                    path: "/",
                });

                return token;
            } catch(err) {
                console.error("Error creating user:", err);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "User with this email already exists.",
                })
            }
        }),
    login: baseProcedure
        .input(loginSchema)
        .mutation(async ({ input }) => {
            try {
                const user = await db
                    .select()
                    .from(usersTable)
                    .where(eq(usersTable.email, input.email))
                    .limit(1);
                if (!user) throw new Error("User not found");

                const isPasswordValid = await bcrypt.compare(
                    input.password,
                    user[0].password
                );

                if (!isPasswordValid) throw new Error("Invalid credentials");

                const token = jwt.sign(
                    {
                        id: user[0].id,
                    },
                    JWT_SECRET,
                    { expiresIn: "7d"}
                );

                (await cookies()).set("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: 7 * 24 * 60 * 60, // 7 days
                    path: "/",
                });

                return { token }
            } catch(err) {
                console.error("Error logging in:", err);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Invalid credentials.",
                })
            }
        })
})