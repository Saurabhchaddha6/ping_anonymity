import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2,"Username musst be atleast 2 characters")
    .max(20,"must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "USername must not contain special characters")




export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'invalid email address'}),
    password: z.string().min(8, {message: "password must be atleast 8 characters"})
})