"use client"

import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Review } from "@/lib/types/review"
import { Heart, Star } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import { toggleReviewLike } from "./action"

interface ReviewsContainerProps {
  reviews: Review[]
  isLogged: boolean
  userId?: string
}

interface ReviewComponentProps {
  review: Review
  userId?: string
  isLogged: boolean
}

function ReviewComponent({ review, userId, isLogged }: ReviewComponentProps) {
  const [reviewDate, setReviewDate] = useState(
    new Date(review.createdAt).toDateString()
  )
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setReviewDate(new Date(review.createdAt).toLocaleDateString())
  }, [review.createdAt])

  const isLiked = review.likes.some((like) => like.userId === userId)

  const handleClick = () => {
    startTransition(async () => {
      try {
        await toggleReviewLike({
          reviewId: review.id,
          isLiked,
          openLibraryId: review.openLibraryId,
        })
      } catch (error) {
        console.error(error)
      }
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
            <span className="text-sm text-muted-foreground">
              by {review.user.name}
            </span>
          </div>
        </div>
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
      </div>
      <p className="text-muted-foreground">{review.description}</p>
      <p className="text-xs text-muted-foreground mt-2">{reviewDate}</p>
    </div>
  )
}

export default function ReviewsContainer({
  reviews,
  isLogged,
  userId,
}: ReviewsContainerProps) {
  return (
    <AnimatedCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Reviews ({reviews.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewComponent
                review={review}
                isLogged={isLogged}
                userId={userId}
                key={review.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Star className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No reviews yet.</p>
            {isLogged && (
              <p className="text-sm text-muted-foreground mt-1">
                Be the first to write a review!
              </p>
            )}
          </div>
        )}
      </CardContent>
    </AnimatedCard>
  )
}
