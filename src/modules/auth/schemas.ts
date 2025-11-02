import { z } from "zod"

export const authSchema = z.object({
    name: z.string().min(2, { message: "Minimum length of name should be 2"}).max(30),
    username: z.string().min(2, { message: "Minimum length of username should be 2" }),
    email: z.string().min(1, { message: "This field has to be filled"}).email("This is not a valid email."),
    password: z.string().min(5, { message: "Minimum password length should be 5."})
})

export const loginSchema = z.object({
    email: z.string().min(1, { message: "This field has to be filled"}).email("This is not a valid email."),
    password: z.string().min(5, { message: "Minimum password length should be 5."})
})