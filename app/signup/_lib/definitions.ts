import { z } from "zod"

export const SignupFormSchema = z
  .object({
    name: z.string().min(1, { error: "Name is required" }),
    email: z.email({ error: "Invalid email address" }),
    password: z
      .string()
      .min(6, { error: "Password needs to be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type SignupForm = z.infer<typeof SignupFormSchema>

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
      }
      message?: string
    }
  | undefined
