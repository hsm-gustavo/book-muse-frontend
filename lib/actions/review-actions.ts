"use server"

import { revalidatePath } from "next/cache"
import type { CreateReviewPayload } from "@/types/reviews"

async function makeAuthenticatedRequest(
  endpoint: string,
  options: RequestInit,
  token: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:numero"
  const url = `${baseUrl}${endpoint}`

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `HTTP ${response.status}`)
  }

  if (response.status === 204) {
    return undefined
  }

  return response.json()
}

export async function createReviewAction(token: string, formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const rating = Number.parseInt(formData.get("rating") as string)
  const openLibraryId = formData.get("openLibraryId") as string

  if (!token) {
    throw new Error("Authentication required")
  }

  if (!title || !description || !rating || !openLibraryId) {
    throw new Error("All fields are required")
  }

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5")
  }

  try {
    const payload: CreateReviewPayload = {
      title,
      description,
      rating,
      openLibraryId,
    }

    const review = await makeAuthenticatedRequest(
      "/reviews",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token
    )

    revalidatePath(`/books/${openLibraryId}`)

    return { success: true, review }
  } catch (error) {
    console.error("Failed to create review:", error)
    throw new Error(
      error instanceof Error ? error.message : "Failed to create review"
    )
  }
}

export async function updateReviewAction(
  token: string,
  reviewId: string,
  formData: FormData
) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const rating = formData.get("rating")
    ? Number.parseInt(formData.get("rating") as string)
    : undefined

  if (!token) {
    throw new Error("Authentication required")
  }

  if (rating && (rating < 1 || rating > 5)) {
    throw new Error("Rating must be between 1 and 5")
  }

  try {
    const payload = {
      ...(title && { title }),
      ...(description && { description }),
      ...(rating && { rating }),
    }

    const review = await makeAuthenticatedRequest(
      `/reviews/${reviewId}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
      token
    )

    revalidatePath(`/reviews/${reviewId}`)
    revalidatePath(`/books/${review.openLibraryId}`)

    return { success: true, review }
  } catch (error) {
    console.error("Failed to update review:", error)
    throw new Error(
      error instanceof Error ? error.message : "Failed to update review"
    )
  }
}

export async function deleteReviewAction(
  token: string,
  reviewId: string,
  openLibraryId: string
) {
  if (!token) {
    throw new Error("Authentication required")
  }

  try {
    await makeAuthenticatedRequest(
      `/reviews/${reviewId}`,
      {
        method: "DELETE",
      },
      token
    )

    revalidatePath(`/books/${openLibraryId}`)

    return { success: true }
  } catch (error) {
    console.error("Failed to delete review:", error)
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete review"
    )
  }
}

export async function toggleLikeAction(token: string, reviewId: string) {
  if (!token) {
    throw new Error("Authentication required")
  }

  try {
    try {
      await makeAuthenticatedRequest(
        `/reviews/${reviewId}/like`,
        {
          method: "DELETE",
        },
        token
      )
    } catch {
      await makeAuthenticatedRequest(
        `/reviews/${reviewId}/like`,
        {
          method: "POST",
        },
        token
      )
    }

    revalidatePath(`/reviews/${reviewId}`)

    return { success: true }
  } catch (error) {
    console.error("Failed to toggle like:", error)
    throw new Error(
      error instanceof Error ? error.message : "Failed to toggle like"
    )
  }
}
