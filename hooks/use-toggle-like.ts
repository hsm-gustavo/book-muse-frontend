"use client"

import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import { useState } from "react"

export function useToggleLike() {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const toggleLike = async (
    reviewId: string,
    onSuccess?: (newLikedState: boolean) => void
  ) => {
    if (!user) {
      throw new Error("Must be logged in to like reviews")
    }

    setIsLoading(true)
    try {
      await apiClient.toggleLikeReview(reviewId)
      if (onSuccess) {
        onSuccess(true)
      }
    } catch (error) {
      console.error("Failed to toggle like:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { toggleLike, isLoading }
}
