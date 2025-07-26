"use client"

import { AnimatedButton } from "@/components/ui/animated-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit3 } from "lucide-react"
import React, { useState } from "react"
import { useCreateReview } from "@/lib/hooks/use-create-review"
import { useForm } from "react-hook-form"
import { CreateReviewForm, CreateReviewFormSchema } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import LoadingDots from "@/components/loading-dots"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import StarRating from "./star-rating"
import { Input } from "@/components/ui/input"

interface ReviewDialogProps {
  openLibraryId: string
  userId: string
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export default function ReviewDialog({
  openLibraryId,
  userId,
  trigger,
  onSuccess,
}: ReviewDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const createMutation = useCreateReview(openLibraryId, userId)

  const form = useForm<CreateReviewForm>({
    resolver: zodResolver(CreateReviewFormSchema),
    defaultValues: {
      title: "",
      description: "",
      rating: 0,
      openLibraryId: openLibraryId,
    },
  })

  const { register, handleSubmit, setValue, watch, reset, formState } = form
  const watchedRating = watch("rating")

  const onSubmit = async (data: CreateReviewForm) => {
    try {
      await createMutation.mutateAsync({
        ...data,
        openLibraryId,
      })

      setDialogOpen(false)
      reset()
      toast.success("Review created successfully!")
      onSuccess?.()
    } catch (error) {
      toast.error("Failed to create review. Please try again.")
    }
  }

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      reset()
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        {trigger || (
          <AnimatedButton className="w-56">
            <Edit3 className="h-4 w-4 mr-2" />
            Write Review
          </AnimatedButton>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>Write a review for this book</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="review-title">Title</Label>
            <Input
              id="review-title"
              {...register("title")}
              placeholder="Review title"
              disabled={createMutation.isPending}
            />
            {formState.errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label>Rating</Label>
            <StarRating
              value={watchedRating}
              onRate={(rating) => setValue("rating", rating)}
              disabled={createMutation.isPending}
            />
            {formState.errors.rating && (
              <p className="text-sm text-red-500 mt-1">
                {formState.errors.rating.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="review-description">Review</Label>
            <Textarea
              id="review-description"
              {...register("description")}
              placeholder="Share your thoughts about this book..."
              rows={4}
              disabled={createMutation.isPending}
            />
            {formState.errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <AnimatedButton
              type="submit"
              className="flex-1"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <LoadingDots className="w-2 h-2" />
              ) : (
                "Submit Review"
              )}
            </AnimatedButton>
            <AnimatedButton
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={createMutation.isPending}
            >
              Cancel
            </AnimatedButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
