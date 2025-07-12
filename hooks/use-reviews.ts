"use client"

import { apiClient } from "@/lib/api"
import type {
  Review,
  CreateReviewPayload,
  UpdateReviewPayload,
  ReviewLike,
} from "@/types/reviews"
import { useAuth } from "@/lib/auth"
import useSWR from "swr"

export function useReviews(openLibraryId: string | undefined) {
  const { user } = useAuth()
  const swrKey = openLibraryId ? `/reviews/book/${openLibraryId}` : null

  const {
    data: reviews,
    error,
    isLoading,
    mutate,
  } = useSWR<Review[]>(
    swrKey,
    (key) => apiClient.getReviewsByBook(openLibraryId!),
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      onError: (err) => {
        console.error("SWR error fetching reviews:", err)
      },
    }
  )

  const createReview = async (payload: CreateReviewPayload) => {
    if (!user) throw new Error("User must be logged in to create a review.")
    const newReview: Review = {
      // temporary review for optimistic update
      id: `temp-${Date.now()}`,
      ...payload,
      userId: user.id,
      user: {
        id: user.id,
        name: user.name,
        profilePicture: user.profilePicture,
      },
      likes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await mutate(
      async (currentReviews) => {
        return currentReviews ? [...currentReviews, newReview] : [newReview]
      },
      {
        populateCache: true,
        revalidate: false, // revalidate after successful API call
      }
    )

    try {
      const createdReview = await apiClient.createReview(payload)
      await mutate(
        (currentReviews) => {
          return (
            currentReviews?.map((r) =>
              r.id === newReview.id ? createdReview : r
            ) || [createdReview]
          )
        },
        {
          populateCache: true,
          revalidate: true,
        }
      )
      return createdReview
    } catch (err) {
      console.error("Failed to create review:", err)
      await mutate() // revert to server state on err
      throw err
    }
  }

  const updateReview = async (
    reviewId: string,
    payload: UpdateReviewPayload
  ) => {
    await mutate(
      async (currentReviews) => {
        return (
          currentReviews?.map((review) =>
            review.id === reviewId
              ? { ...review, ...payload, updatedAt: new Date().toISOString() }
              : review
          ) || []
        )
      },
      {
        populateCache: true,
        revalidate: false,
      }
    )

    try {
      const updatedReviewFromServer = await apiClient.updateReview(
        reviewId,
        payload
      )
      await mutate(
        (currentReviews) => {
          return (
            currentReviews?.map((review) =>
              review.id === reviewId ? updatedReviewFromServer : review
            ) || []
          )
        },
        {
          populateCache: true,
          revalidate: true,
        }
      )
      return updatedReviewFromServer
    } catch (err) {
      console.error("Failed to update review:", err)
      await mutate()
      throw err
    }
  }

  const deleteReview = async (reviewId: string) => {
    await mutate(
      async (currentReviews) => {
        return currentReviews?.filter((review) => review.id !== reviewId)
      },
      {
        populateCache: true,
        revalidate: false,
      }
    )

    try {
      await apiClient.deleteReview(reviewId)
      await mutate() // revalidate to ensure consistency
    } catch (err) {
      console.error("Failed to delete review:", err)
      await mutate()
      throw err
    }
  }

  const toggleLikeReview = async (reviewId: string) => {
    if (!user) throw new Error("User must be logged in to like a review.")

    const currentUserId = user.id

    await mutate(
      async (currentReviews) => {
        return currentReviews?.map((review) => {
          if (review.id === reviewId) {
            const isCurrentlyLiked = review.likes.some(
              (like) => like.userId === currentUserId
            )
            let updatedLikes: ReviewLike[]

            if (isCurrentlyLiked) {
              updatedLikes = review.likes.filter(
                (like) => like.userId !== currentUserId
              )
            } else {
              updatedLikes = [
                ...review.likes,
                {
                  userId: currentUserId,
                  reviewId,
                  createdAt: new Date().toISOString(),
                },
              ]
            }
            return { ...review, likes: updatedLikes }
          }
          return review
        })
      },
      {
        populateCache: true,
        revalidate: false,
      }
    )

    try {
      const response = await apiClient.toggleLikeReview(reviewId)
      await mutate(
        (currentReviews) => {
          return currentReviews?.map((review) => {
            if (review.id === reviewId) {
              let updatedLikes: ReviewLike[] = []
              if (response.liked) {
                if (
                  !review.likes.some((like) => like.userId === currentUserId)
                ) {
                  updatedLikes = [
                    ...review.likes,
                    {
                      userId: currentUserId,
                      reviewId,
                      createdAt: new Date().toISOString(),
                    },
                  ]
                } else {
                  updatedLikes = review.likes
                }
              } else {
                updatedLikes = review.likes.filter(
                  (like) => like.userId !== currentUserId
                )
              }
              if (updatedLikes.length !== response.likesCount) {
              }
              return { ...review, likes: updatedLikes }
            }
            return review
          })
        },
        {
          populateCache: true,
          revalidate: true,
        }
      )
      return response
    } catch (err) {
      console.error("Failed to toggle like:", err)
      await mutate() // revert optimistic update on error
      throw err
    }
  }

  return {
    reviews,
    isLoading,
    error,
    createReview,
    updateReview,
    deleteReview,
    toggleLikeReview,
  }
}
