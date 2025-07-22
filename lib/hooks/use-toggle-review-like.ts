import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetcher, toggleReviewLike } from "../api"

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

      queryClient.setQueryData(["reviews", openLibraryId], (oldData: any) => {
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((review: any) => {
              if (review.id === reviewId) {
                const likes = isLiked
                  ? review.likes.filter((l: any) => l.userId !== userId)
                  : [...review.likes, { userId: userId }]
                return { ...review, likes }
              }
              return review
            }),
          })),
        }
      })

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
