"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileAvatar } from "@/components/ui/profile-avatar"
import { RatingStars } from "@/components/ui/rating-stars"
import type { Review, ToggleLikeResponse } from "@/types/reviews"
import { formatDistanceToNow } from "date-fns"
import { Heart, Edit, Trash2, Loader2 } from "lucide-react"
import { motion } from "motion/react"
import { AnimatedButton } from "@/components/ui/animated-button"
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
import { useAuth } from "@/lib/auth"

interface ReviewItemProps {
  review: Review
  onLikeToggle: (reviewId: string) => Promise<ToggleLikeResponse>
  onEdit: (review: Review) => void
  onDelete: (reviewId: string) => Promise<void>
}

export function ReviewItem({
  review,
  onLikeToggle,
  onEdit,
  onDelete,
}: ReviewItemProps) {
  const { user } = useAuth()
  const [isLiking, setIsLiking] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const currentUserId = user?.id
  const isOwner = currentUserId === review.userId
  const isLikedByCurrentUser =
    review.likes?.some((like) => like.userId === currentUserId) ?? false
  const likesCount = review.likes?.length ?? 0

  const handleLike = async () => {
    if (!currentUserId) return
    setIsLiking(true)
    try {
      await onLikeToggle(review.id)
    } catch (error) {
      console.error("Failed to toggle like:", error)
    } finally {
      setIsLiking(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(review.id)
    } catch (error) {
      console.error("Failed to delete review:", error)
      setIsDeleting(false) // Re-enable button on error
    }
  }

  const reviewerName = review.user?.name || "Unknown User"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="border-accent-pink/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-3">
            <ProfileAvatar userName={reviewerName} className="h-10 w-10" />
            <div>
              <CardTitle className="text-lg">{reviewerName}</CardTitle>
              <p className="text-sm text-foreground/60">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <RatingStars rating={review.rating} size={18} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">{review.title}</h3>
            <p className="text-foreground/80 text-sm leading-relaxed">
              {review.description}
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center space-x-4">
              <AnimatedButton
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isLiking || !currentUserId}
                className={
                  isLikedByCurrentUser
                    ? "text-red-500 hover:text-red-600"
                    : "text-foreground/60 hover:text-foreground"
                }
              >
                {isLiking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Heart
                    className={isLikedByCurrentUser ? "fill-red-500" : ""}
                  />
                )}
                <span className="ml-1">{likesCount}</span>
                <span className="sr-only">Like</span>
              </AnimatedButton>
            </div>
            {isOwner && (
              <div className="flex space-x-2">
                <AnimatedButton
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(review)}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </AnimatedButton>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <AnimatedButton
                      variant="ghost"
                      size="sm"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      <span className="sr-only">Delete</span>
                    </AnimatedButton>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your review.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
