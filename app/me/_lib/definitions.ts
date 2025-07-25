import { z } from "zod"

export const MAX_SIZE = 2 * 1024 * 1024 // 2MB
export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]

export const profileSchema = z.object({
  file: z
    .any()
    .refine((file: unknown) => file instanceof File, "Please select a file")
    .refine(
      (file: File) => file?.size <= MAX_SIZE,
      "File size must be less than 2MB"
    )
    .refine(
      (file: File) => ALLOWED_MIME_TYPES.includes(file?.type),
      "Only .jpeg, .png and .webp formats are supported"
    )
    .optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>

export const userNameSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
})

export type UserNameFormData = z.infer<typeof userNameSchema>
