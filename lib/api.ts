import { BookReviews, EditReview, UserReviews } from "./types/review"
import { UserSearchResponse } from "./types/user"
import { z } from "zod"

export async function fetcher<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
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
    return undefined as T
  }

  return response.json()
}

export async function fetchReviewsByBook(
  openLibraryId: string,
  cursor?: string,
  limit: number = 10
): Promise<BookReviews> {
  const params = new URLSearchParams()
  if (cursor) params.set("cursor", cursor)
  if (limit) params.set("limit", limit.toString())

  const res = await fetcher<BookReviews>(
    `/api/reviews/book/${openLibraryId}?${params.toString()}`
  )

  return res
}

export async function toggleReviewLike({
  reviewId,
  isLiked,
}: {
  reviewId: string
  isLiked: boolean
}) {
  const method = isLiked ? "DELETE" : "POST"

  await fetcher(`/api/reviews/${reviewId}/like`, {
    method,
  })
}

export async function searchUsers(
  query: string,
  pageParam?: string
): Promise<UserSearchResponse> {
  const q = query
  const params = new URLSearchParams()
  if (q) params.set("q", q)
  if (pageParam) params.set("cursor", pageParam)
  params.set("limit", "10")

  const res = await fetcher<UserSearchResponse>(
    `/api/users/search?${params.toString()}`
  )

  return res
}

export async function fetchReviewsByUser(
  userId: string,
  cursor?: string,
  limit: number = 10
): Promise<UserReviews> {
  const params = new URLSearchParams()
  if (cursor) params.set("cursor", cursor)
  if (limit) params.set("limit", limit.toString())

  const res = await fetcher<UserReviews>(
    `/api/reviews/user/${userId}?${params.toString()}`
  )

  return res
}

export async function editReview({
  reviewId,
  payload,
}: {
  reviewId: string
  payload: EditReview
}) {
  await fetcher(`/api/reviews/${reviewId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}

export async function deleteReview({ reviewId }: { reviewId: string }) {
  await fetcher(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  })
}

export const CreateReviewFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  rating: z.number().gte(0).lte(5), //greater than or equals to 0, less than or equals to 5
  openLibraryId: z.string(),
})

export type CreateReviewForm = z.infer<typeof CreateReviewFormSchema>

export async function createReview(payload: CreateReviewForm) {
  const res = await fetcher("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  return res
}
