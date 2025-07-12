"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RatingStars } from "@/components/ui/rating-stars"
import type { UserReview } from "@/types/reviews"
import { formatDistanceToNow } from "date-fns"
import { Heart } from "lucide-react"
import { motion } from "motion/react"

interface UserReviewCardProps {
  review: UserReview
}

export function UserReviewCard({ review }: UserReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Link href={`/reviews/${review.id}`}>
        <Card className="border-accent-blue/20 hover:border-gradient-purple transition-all duration-200 cursor-pointer hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg line-clamp-1">
                {review.title}
              </CardTitle>
              <RatingStars rating={review.rating} size={16} />
            </div>
            <CardDescription className="text-sm text-foreground/60">
              {formatDistanceToNow(new Date(review.createdAt), {
                addSuffix: true,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/80 text-sm leading-relaxed line-clamp-3">
              {review.description}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center space-x-1 text-foreground/60">
                <Heart
                  className={
                    review.likedByMe ? "fill-red-500 text-red-500" : ""
                  }
                  size={16}
                />
                <span className="text-sm">{review.likeCount}</span>
              </div>
              <span className="text-xs text-gradient-purple hover:text-gradient-pink font-medium">
                Read full review →
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
