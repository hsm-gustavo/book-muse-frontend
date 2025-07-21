"use server"

import { API_URL } from "@/lib/constants"
import { CreateReviewFormSchema, FormState } from "./_lib/definitions"
import z from "zod"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function createReview(state: FormState, formData: FormData) {
  const token = (await cookies()).get("accessToken")?.value

  const url = `${API_URL}/reviews`
  const validationResult = CreateReviewFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    rating: Number(formData.get("rating")),
    openLibraryId: formData.get("openLibraryId"),
  })

  if (!validationResult.success) {
    return {
      errors: z.flattenError(validationResult.error).fieldErrors,
    }
  }

  const { title, description, rating, openLibraryId } = validationResult.data

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, rating, openLibraryId }),
  })
  if (!response.ok) {
    const error = await response.text()
    return { message: error || "Error on trying to create user" }
  }

  revalidatePath("/book/[isbn]", "page")
}
