import { z } from "zod"

export const CreateReviewFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  rating: z.number().gte(0).lte(5), //greater than or equals to 0, less than or equals to 5
  openLibraryId: z.string(),
})

export type CreateReviewForm = z.infer<typeof CreateReviewFormSchema>

export type FormState =
  | {
      errors?: {
        title?: string[]
        description?: string[]
        rating?: string[]
        openLibraryId?: string[]
      }
      message?: string
    }
  | undefined
