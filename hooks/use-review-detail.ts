"use client"

import useSWR from "swr"
import { apiClient } from "@/lib/api"
import type { ReviewDetail } from "@/types/reviews"

export function useReviewDetail(reviewId: string | undefined) {
  const swrKey = reviewId ? `/reviews/${reviewId}` : null

  const { data, error, isLoading, mutate } = useSWR<ReviewDetail>(
    swrKey,
    () => {
      if (!reviewId) throw new Error("Review ID is required")
      return apiClient.getReviewById(reviewId)
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      onError: (err) => {
        console.error("SWR error fetching review detail:", err)
      },
    }
  )

  return {
    review: data,
    isLoading,
    error,
    mutate,
  }
}
