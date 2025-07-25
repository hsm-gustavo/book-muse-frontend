import { z } from "zod"

export const followSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
})

export type FollowForm = z.infer<typeof followSchema>
