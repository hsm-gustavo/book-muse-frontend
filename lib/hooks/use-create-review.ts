import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { BookReviews } from "../types/review"
import { createReview, CreateReviewForm } from "../api"

export function useCreateReview(openLibraryId: string, userId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateReviewForm) => createReview(payload),

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ["reviews", openLibraryId],
      })

      const previousData = queryClient.getQueryData(["reviews", openLibraryId])

      const optimisticReview = {
        id: `temp-${Date.now()}`, // temporary ID
        title: payload.title,
        description: payload.description,
        rating: payload.rating,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: [],
        user: {
          id: userId,
          name: "You",
          profilePicture: "",
        },
      }

      queryClient.setQueryData(
        ["reviews", openLibraryId],
        (oldData: InfiniteData<BookReviews, unknown>) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) => {
              // Add to first page
              if (index === 0) {
                return {
                  ...page,
                  data: [optimisticReview, ...page.data],
                }
              }
              return page
            }),
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
