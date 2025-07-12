"use client"

import { useActionState, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedButton } from "@/components/ui/animated-button"
import { RatingSelector } from "@/components/ui/rating-selector"
import { Loader2, Send, XCircle } from "lucide-react"
import {
  createReviewAction,
  updateReviewAction,
} from "@/lib/actions/review-actions"
import type { Review } from "@/types/reviews"
import { useAuth } from "@/lib/auth"

interface ReviewFormServerProps {
  openLibraryId: string
  existingReview?: Review | null
  onSuccess: () => void
  onCancel?: () => void
}

type FormState = {
  success: boolean
  message: string
} | null

export function ReviewFormServer({
  openLibraryId,
  existingReview,
  onSuccess,
  onCancel,
}: ReviewFormServerProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0)

  const { user } = useAuth()

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken")
    }
    return null
  }

  const [state, formAction, isPending] = useActionState(
    async (prevState: FormState, formData: FormData): Promise<FormState> => {
      const token = getToken()
      if (!token) {
        return {
          success: false,
          message: "Authentication required. Please log in again.",
        }
      }

      formData.set("rating", rating.toString())
      if (!existingReview) {
        formData.set("openLibraryId", openLibraryId)
      }

      try {
        if (existingReview) {
          await updateReviewAction(token, existingReview.id, formData)
        } else {
          await createReviewAction(token, formData)
        }
        onSuccess()
        return {
          success: true,
          message: existingReview
            ? "Review updated successfully!"
            : "Review created successfully!",
        }
      } catch (error) {
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.",
        }
      }
    },
    null
  )

  if (!user) {
    return (
      <Card className="border-accent-green/20">
        <CardContent className="p-6 text-center">
          <p className="text-foreground/60">Please log in to write a review.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-accent-green/20">
      <CardHeader>
        <CardTitle className="text-xl">
          {existingReview ? "Edit Your Review" : "Write a Review"}
        </CardTitle>
        <CardDescription>Share your thoughts on this book.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="review-title">Review Title</Label>
            <Input
              id="review-title"
              name="title"
              type="text"
              placeholder="Summarize your thoughts"
              defaultValue={existingReview?.title || ""}
              required
              className="border-accent-green/20 focus:border-gradient-purple"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-description">Your Review</Label>
            <Textarea
              id="review-description"
              name="description"
              placeholder="Write your detailed review here..."
              defaultValue={existingReview?.description || ""}
              rows={5}
              required
              className="border-accent-green/20 focus:border-gradient-purple"
            />
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <RatingSelector
              initialRating={rating}
              onRatingChange={setRating}
              disabled={isPending}
            />
            {rating === 0 && (
              <p className="text-sm text-red-600">
                Please select a rating (1-5 stars).
              </p>
            )}
          </div>

          {state && (
            <div
              className={`text-sm p-3 rounded-md ${
                state.success
                  ? "text-green-700 bg-green-50"
                  : "text-red-600 bg-red-50"
              }`}
            >
              {state.message}
            </div>
          )}

          <div className="flex gap-2">
            <AnimatedButton
              type="submit"
              disabled={isPending || rating === 0}
              className="bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {existingReview ? "Saving..." : "Submitting..."}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {existingReview ? "Save Changes" : "Submit Review"}
                </>
              )}
            </AnimatedButton>

            {onCancel && (
              <AnimatedButton
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </AnimatedButton>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
