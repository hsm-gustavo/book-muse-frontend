"use server"

import { API_URL } from "@/lib/constants"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function toggleReviewLike({
  reviewId,
  isLiked,
  openLibraryId,
}: {
  reviewId: string
  isLiked: boolean
  openLibraryId: string
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const method = isLiked ? "DELETE" : "POST"

  const res = await fetch(`${API_URL}/reviews/${reviewId}/like`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(error)
  }

  revalidateTag(`bookReviews${openLibraryId}`)
}
