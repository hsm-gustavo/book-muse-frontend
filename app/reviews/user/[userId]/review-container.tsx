"use client"

import ActionReviewDialog from "@/components/books/reviews/action-review-dialog"
import LoadingDots from "@/components/loading-dots"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchReviewsByUser } from "@/lib/api"
import { useToggleReviewLikeUser } from "@/lib/hooks/use-toggle-review-like"
import { UserReview, UserReviews } from "@/lib/types/review"
import { formatDate } from "@/lib/utils"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Edit3, Heart, Star } from "lucide-react"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface ReviewsContainerProps {
  isLogged: boolean
  userId?: string
  reviewUserId: string
  userName: string
}

interface ReviewComponentProps {
  review: UserReview
  userId?: string
  isLogged: boolean
  reviewUserId: string
}

function ReviewComponent({
  review,
  userId, // logged user id
  isLogged,
  reviewUserId, // the review owner
}: ReviewComponentProps) {
  const isLiked = review.likes.some((like) => like.userId === userId)

  const { mutate: toggleLike, isPending } = useToggleReviewLikeUser(
    reviewUserId,
    userId
  )

  const handleClick = () => {
    toggleLike({
      reviewId: review.id,
      isLiked,
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <div key={review.id} className="border-b border-border pb-6 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold">{review.title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">{renderStars(review.rating)}</div>
          </div>
        </div>
        <div className="flex">
          {isLogged && (
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={handleClick}
              className="flex items-center gap-1"
              disabled={isPending}
            >
              <Heart
                className={`h-4 w-4 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {review.likes.length}
            </AnimatedButton>
          )}
          {isLogged && reviewUserId === userId && (
            <ActionReviewDialog
              contextId={reviewUserId}
              contextType="user"
              review={review}
            />
          )}
        </div>
      </div>
      <p className="text-muted-foreground">{review.description}</p>
      <p className="text-xs text-muted-foreground mt-2">
        {formatDate(review.createdAt)}
      </p>
    </div>
  )
}

export default function ReviewsContainer({
  isLogged,
  userId,
  reviewUserId,
  userName,
}: ReviewsContainerProps) {
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<UserReviews>({
    queryKey: ["reviews", reviewUserId],
    queryFn: ({ pageParam }) =>
      fetchReviewsByUser(reviewUserId, pageParam as string),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const reviews = data?.pages.flatMap((page) => page.data) ?? []

  return (
    <AnimatedCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Reviews ({reviews.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingDots className="w-2 h-2" />
        ) : error ? (
          <p className="text-red-500">Failed to load reviews</p>
        ) : reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewComponent
                review={review}
                isLogged={isLogged}
                userId={userId}
                reviewUserId={reviewUserId}
                key={review.id}
              />
            ))}
            <div ref={ref} className="h-10" />
            {isFetchingNextPage && <LoadingDots className="w-2 h-2" />}
          </div>
        ) : (
          <div className="text-center py-8">
            <Star className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
            <p className="text-muted-foreground">
              {userName} hasn&apos;t written any reviews yet.
            </p>
          </div>
        )}
      </CardContent>
    </AnimatedCard>
  )
}
