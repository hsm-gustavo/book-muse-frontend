import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { BookReviews, EditReview, UserReviews } from "../types/review"
import { editReview } from "../api"

export function useEditReview(openLibraryId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      reviewId,
      payload,
    }: {
      reviewId: string
      payload: EditReview
    }) => editReview({ reviewId, payload }),

    onMutate: async ({ reviewId, payload }) => {
      await queryClient.cancelQueries({
        queryKey: ["reviews", openLibraryId],
      })

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(["reviews", openLibraryId])

      queryClient.setQueryData(
        ["reviews", openLibraryId],
        (oldData: InfiniteData<BookReviews, unknown>) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((review) => {
                if (review.id === reviewId) {
                  return {
                    ...review,
                    title: payload.title,
                    description: payload.description,
                    rating: payload.rating,
                    updatedAt: new Date().toISOString(),
                  }
                }
                return review
              }),
            })),
          }
        }
      )

      return { previousData }
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        ["reviews", openLibraryId],
        context?.previousData
      )
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", openLibraryId] })
    },
  })
}

export function useEditReviewUser(reviewUserId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      reviewId,
      payload,
    }: {
      reviewId: string
      payload: EditReview
    }) => editReview({ reviewId, payload }),

    onMutate: async ({ reviewId, payload }) => {
      await queryClient.cancelQueries({
        queryKey: ["reviews", reviewUserId],
      })

      const previousData = queryClient.getQueryData(["reviews", reviewUserId])

      queryClient.setQueryData(
        ["reviews", reviewUserId],
        (oldData: InfiniteData<UserReviews, unknown>) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((review) => {
                if (review.id === reviewId) {
                  return {
                    ...review,
                    title: payload.title,
                    description: payload.description,
                    rating: payload.rating,
                    updatedAt: new Date().toISOString(),
                  }
                }
                return review
              }),
            })),
          }
        }
      )

      return { previousData }
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["reviews", reviewUserId], context?.previousData)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", reviewUserId] })
    },
  })
}
