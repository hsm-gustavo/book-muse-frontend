"use client"

import { useParams } from "next/navigation"
import { useReviewDetail } from "@/hooks/use-review-detail"
import { Navbar } from "@/components/layout/navbar"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileAvatar } from "@/components/ui/profile-avatar"
import { RatingStars } from "@/components/ui/rating-stars"
import { useAuth } from "@/lib/auth"
import { formatDistanceToNow } from "date-fns"
import { Heart } from "lucide-react"
import { motion } from "motion/react"
import { LikeButtonServer } from "@/components/reviews/like-button-server"

export default function ReviewDetailPage() {
  const params = useParams()
  const reviewId = Array.isArray(params.id) ? params.id[0] : params.id

  const { user } = useAuth()
  const { review, isLoading, error } = useReviewDetail(reviewId)

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pastel-purple/30 to-pastel-pink/30">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {isLoading && (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
              <LoadingSpinner size="lg" text="Loading review..." />
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-md max-w-md mx-auto">
              <p>Error loading review: {error.message}</p>
              <p>Please try again later.</p>
            </div>
          )}

          {!isLoading && !error && !review && (
            <div className="text-center text-foreground/60 p-8 bg-pastel-yellow/50 rounded-lg max-w-md mx-auto">
              <p className="text-lg font-semibold">Review not found</p>
              <p className="text-sm mt-2">
                The review you&apos;re looking for doesn&apos;t exist or has
                been removed.
              </p>
            </div>
          )}

          {!isLoading && !error && review && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="border-accent-purple/20">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <ProfileAvatar
                        userName={review.author?.name || "Unknown User"}
                        className="h-12 w-12"
                      />
                      <div>
                        <CardTitle className="text-xl">
                          {review.author?.name || "Unknown User"}
                        </CardTitle>
                        <p className="text-sm text-foreground/60">
                          {formatDistanceToNow(new Date(review.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <RatingStars rating={review.rating} size={24} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent">
                      {review.title}
                    </h1>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {review.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center space-x-4">
                      {user ? (
                        <LikeButtonServer
                          reviewId={review.id}
                          initialLiked={review.likedByMe}
                          initialCount={review.likeCount}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 text-foreground/60">
                          <Heart size={20} />
                          <span className="font-medium">
                            {review.likeCount}
                          </span>
                        </div>
                      )}
                    </div>

                    {!user && (
                      <p className="text-sm text-foreground/60">
                        <span className="text-gradient-purple">Sign in</span> to
                        like this review
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
