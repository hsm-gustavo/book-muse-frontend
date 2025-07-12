"use client"

import useSWR from "swr"
import { apiClient } from "@/lib/api"
import type { UserReview } from "@/types/reviews"

export function useUserReviews(userId: string | undefined) {
  const swrKey = userId ? `/reviews/user/${userId}` : null

  const { data, error, isLoading } = useSWR<UserReview[]>(
    swrKey,
    () => {
      if (!userId) throw new Error("User ID is required")
      return apiClient.getUserReviews(userId)
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      onError: (err) => {
        console.error("SWR error fetching user reviews:", err)
      },
    }
  )

  return {
    reviews: data || [],
    isLoading,
    error,
  }
}
