"use client"

import type { Review } from "@/types/reviews"
import { ReviewItem } from "./review-item"
import { motion } from "motion/react"

interface ReviewListProps {
  reviews: Review[]
  onLikeToggle: (reviewId: string) => Promise<void>
  onEdit: (review: Review) => void
  onDelete: (reviewId: string) => Promise<void>
  isLoading?: boolean
}

export function ReviewList({
  reviews,
  onLikeToggle,
  onEdit,
  onDelete,
  isLoading,
}: ReviewListProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-secondary/50 rounded-lg shadow-sm p-6 animate-pulse"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-300/50" />
              <div className="space-y-1">
                <div className="h-4 w-32 bg-gray-300/50 rounded" />
                <div className="h-3 w-24 bg-gray-300/50 rounded" />
              </div>
            </div>
            <div className="h-5 w-3/4 bg-gray-300/50 rounded mb-2" />
            <div className="h-4 w-full bg-gray-300/50 rounded" />
            <div className="h-4 w-1/2 bg-gray-300/50 rounded" />
            <div className="flex justify-between items-center pt-4 border-t border-border/50 mt-4">
              <div className="h-6 w-20 bg-gray-300/50 rounded" />
              <div className="h-6 w-16 bg-gray-300/50 rounded" />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center text-foreground/60 p-8 bg-pastel-blue/50 rounded-lg">
        <p className="text-lg font-semibold">No reviews yet.</p>
        <p className="text-sm mt-2">
          Be the first to share your thoughts on this book!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onLikeToggle={onLikeToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
