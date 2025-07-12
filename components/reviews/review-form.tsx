"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
import type {
  Review,
  CreateReviewPayload,
  UpdateReviewPayload,
} from "@/types/reviews"
import { useReviews } from "@/hooks/use-reviews"

interface ReviewFormProps {
  openLibraryId: string
  existingReview?: Review | null
  onSuccess: () => void
  onCancel?: () => void
}

export function ReviewForm({
  openLibraryId,
  existingReview,
  onSuccess,
  onCancel,
}: ReviewFormProps) {
  const [title, setTitle] = useState(existingReview?.title || "")
  const [description, setDescription] = useState(
    existingReview?.description || ""
  )
  const [rating, setRating] = useState(existingReview?.rating || 0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { createReview, updateReview } = useReviews(openLibraryId) // Use the hook to get mutation functions

  useEffect(() => {
    if (existingReview) {
      setTitle(existingReview.title)
      setDescription(existingReview.description)
      setRating(existingReview.rating)
    } else {
      setTitle("")
      setDescription("")
      setRating(0)
    }
  }, [existingReview])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (rating === 0) {
      setError("Please select a rating (1-5 stars).")
      setIsLoading(false)
      return
    }

    try {
      if (existingReview) {
        const payload: UpdateReviewPayload = { title, description, rating }
        await updateReview(existingReview.id, payload)
      } else {
        const payload: CreateReviewPayload = {
          title,
          description,
          rating,
          openLibraryId,
        }
        await createReview(payload)
      }
      onSuccess()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      )
    } finally {
      setIsLoading(false)
    }
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="review-title">Review Title</Label>
            <Input
              id="review-title"
              type="text"
              placeholder="Summarize your thoughts"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border-accent-green/20 focus:border-gradient-purple"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="review-description">Your Review</Label>
            <Textarea
              id="review-description"
              placeholder="Write your detailed review here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              disabled={isLoading}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex gap-2">
            <AnimatedButton
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
            >
              {isLoading ? (
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
                disabled={isLoading}
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
