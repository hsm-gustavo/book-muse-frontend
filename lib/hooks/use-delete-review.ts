import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { BookReviews, UserReviews } from "../types/review"
import { deleteReview } from "../api"

export function useDeleteReview(openLibraryId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reviewId }: { reviewId: string }) =>
      deleteReview({ reviewId }),

    onMutate: async ({ reviewId }) => {
      await queryClient.cancelQueries({
        queryKey: ["reviews", openLibraryId],
      })

      const previousData = queryClient.getQueryData(["reviews", openLibraryId])

      queryClient.setQueryData(
        ["reviews", openLibraryId],
        (oldData: InfiniteData<BookReviews, unknown>) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.filter((review) => review.id !== reviewId),
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

export function useDeleteReviewUser(reviewUserId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reviewId }: { reviewId: string }) =>
      deleteReview({ reviewId }),

    onMutate: async ({ reviewId }) => {
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
              data: page.data.filter((review) => review.id !== reviewId),
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
