"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import StarRating from "./star-rating"
import { useActionState, useState } from "react"
import { createReview } from "../../../app/book/actions"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedButton } from "@/components/ui/animated-button"
import LoadingDots from "@/components/loading-dots"

interface ReviewFormProps {
  openLibraryId: string
  setReviewDialogOpen: (value: boolean) => void
  initialRating?: number
}

export default function ReviewForm({
  openLibraryId,
  setReviewDialogOpen,
  initialRating = 0,
}: ReviewFormProps) {
  const [state, action, pending] = useActionState(createReview, undefined)
  const [rating, setRatingState] = useState(initialRating)

  return (
    <form action={action} className="space-y-4">
      <div>
        <Label htmlFor="review-form">Title</Label>
        <Input
          id="review-form"
          name="title"
          placeholder="Review title"
          required
          disabled={pending}
        />
      </div>
      <input type="hidden" name="openLibraryId" value={openLibraryId} />
      <div>
        <input type="hidden" name="rating" value={rating} />
        <StarRating
          value={rating}
          onRate={(rate) => setRatingState(rate)}
          disabled={pending}
        />
      </div>
      <div>
        <Label htmlFor="review-description">Review</Label>
        <Textarea
          id="review-description"
          placeholder="Share your thoughts about this book..."
          rows={4}
          required
          disabled={pending}
          name="description"
        />
      </div>
      <div className="flex gap-2">
        <AnimatedButton type="submit" className="flex-1" disabled={pending}>
          {pending ? <LoadingDots className="w-2 h-2" /> : "Submit Review"}
        </AnimatedButton>
        <AnimatedButton
          type="button"
          variant="outline"
          onClick={() => setReviewDialogOpen(false)}
        >
          Cancel
        </AnimatedButton>
      </div>
    </form>
  )
}
