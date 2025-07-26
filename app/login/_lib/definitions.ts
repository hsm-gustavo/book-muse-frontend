import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string(),
})

export type LoginForm = z.infer<typeof LoginFormSchema>

export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
