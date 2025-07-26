import LoadingDots from "@/components/loading-dots"
import { AnimatedButton } from "@/components/ui/animated-button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import StarRating from "./star-rating"
import { useForm } from "react-hook-form"
import { useEditReview, useEditReviewUser } from "@/lib/hooks/use-edit-review"
import {
  useDeleteReview,
  useDeleteReviewUser,
} from "@/lib/hooks/use-delete-review"
import { toast } from "sonner"
import { Edit2, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Review {
  id: string
  title: string
  description: string
  rating: number
}

interface ReviewDialogProps {
  review: Review
  contextId: string // openLibraryId or userId
  contextType: "book" | "user" // determines which hooks to use
  trigger?: React.ReactNode
  onSuccess?: () => void
}

interface ReviewFormData {
  title: string
  description: string
  rating: number
}

export default function ActionReviewDialog({
  review,
  contextId,
  contextType,
  trigger,
  onSuccess,
}: ReviewDialogProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const form = useForm<ReviewFormData>({
    defaultValues: {
      title: review.title,
      description: review.description,
      rating: review.rating,
    },
  })

  const { register, handleSubmit, setValue, watch, reset, formState } = form
  const watchedRating = watch("rating")

  const editMutation = useEditReview(contextId)
  const deleteMutation = useDeleteReview(contextId)
  const editMutationUser = useEditReviewUser(contextId)
  const deleteMutationUser = useDeleteReviewUser(contextId)

  const selectedEditMutation =
    contextType === "book" ? editMutation : editMutationUser
  const selectedDeleteMutation =
    contextType === "book" ? deleteMutation : deleteMutationUser

  useEffect(() => {
    if (editDialogOpen) {
      reset({
        title: review.title,
        description: review.description,
        rating: review.rating,
      })
    }
  }, [editDialogOpen, review, reset])

  const onSubmit = async (data: ReviewFormData) => {
    if (data.rating === 0) {
      toast.error("Please select a rating")
      return
    }

    try {
      await selectedEditMutation.mutateAsync({
        reviewId: review.id,
        payload: data,
      })

      setEditDialogOpen(false)
      toast.success("Review updated successfully!")
      onSuccess?.()
    } catch (error) {
      toast.error("Failed to update review. Please try again.")
    }
  }

  const handleDelete = async () => {
    try {
      await selectedDeleteMutation.mutateAsync({
        reviewId: review.id,
      })

      setDeleteDialogOpen(false)
      toast.success("Review deleted successfully!")
      onSuccess?.()
    } catch (error) {
      toast.error("Failed to delete review. Please try again.")
    }
  }

  const isPending =
    selectedEditMutation.isPending || selectedDeleteMutation.isPending

  return (
    <div className="flex gap-2">
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <AnimatedButton
              variant="outline"
              size="sm"
              className="bg-transparent"
            >
              <Edit2 className="w-4 h-4" />
            </AnimatedButton>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="review-title">Title</Label>
              <Input
                id="review-title"
                {...register("title", { required: true })}
                placeholder="Review title"
                disabled={isPending}
              />
              {formState.errors.title && (
                <p className="text-sm text-red-500 mt-1">Title is required</p>
              )}
            </div>

            <div>
              <Label>Rating</Label>
              <StarRating
                value={watchedRating}
                onRate={(rating) => setValue("rating", rating)}
                disabled={isPending}
              />
              {formState.errors.rating && (
                <p className="text-sm text-red-500 mt-1">Rating is required</p>
              )}
            </div>

            <div>
              <Label htmlFor="review-description">Review</Label>
              <Textarea
                id="review-description"
                {...register("description", { required: true })}
                placeholder="Share your thoughts about this book..."
                rows={4}
                disabled={isPending}
              />
              {formState.errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  Description is required
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <AnimatedButton
                type="submit"
                className="flex-1"
                disabled={isPending}
              >
                {isPending ? (
                  <LoadingDots className="w-2 h-2" />
                ) : (
                  "Update Review"
                )}
              </AnimatedButton>
              <AnimatedButton
                type="button"
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
                disabled={isPending}
              >
                Cancel
              </AnimatedButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogTrigger asChild>
          <AnimatedButton variant="destructive" size="sm" className="gap-2">
            <Trash2 className="h-4 w-4" />
          </AnimatedButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isPending ? (
                <LoadingDots className="h-2 w-2" />
              ) : (
                "Delete Review"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
