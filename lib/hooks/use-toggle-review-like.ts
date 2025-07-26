import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { toggleReviewLike } from "../api"
import { BookReviews, UserReviews } from "../types/review"

export function useToggleReviewLike(openLibraryId: string, userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      reviewId,
      isLiked,
    }: {
      reviewId: string
      isLiked: boolean
    }) => toggleReviewLike({ reviewId, isLiked }),
    onMutate: async ({ reviewId, isLiked }) => {
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
              data: page.data.map((review) => {
                if (review.id === reviewId) {
                  const likes = isLiked
                    ? review.likes.filter((l) => l.userId !== userId)
                    : [...review.likes, { userId: userId }]
                  return { ...review, likes }
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

export function useToggleReviewLikeUser(reviewUserId: string, userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      reviewId,
      isLiked,
    }: {
      reviewId: string
      isLiked: boolean
    }) => toggleReviewLike({ reviewId, isLiked }),
    onMutate: async ({ reviewId, isLiked }) => {
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
                  const likes = isLiked
                    ? review.likes.filter((l) => l.userId !== userId)
                    : [...review.likes, { userId: userId }]
                  return { ...review, likes }
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
