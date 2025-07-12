"use client"

import { notFound, useParams } from "next/navigation"
import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { NotFound } from "@/components/ui/not-found"
import { ProfileAvatar } from "@/components/ui/profile-avatar"
import { FollowButton } from "@/components/users/follow-button"
import { UserCard } from "@/components/users/user-card"
import { UserReviewCard } from "@/components/reviews/user-review-card"
import {
  useFollowers,
  useFollowing,
  useFollowCounts,
} from "@/hooks/use-followers"
import { useUserReviews } from "@/hooks/use-user-reviews"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "motion/react"
import { Users, UserCheck, Star, BookOpen, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import useSWR from "swr"
import { apiClient } from "@/lib/api"
import type { UserProfile } from "@/lib/api"

export default function PublicProfilePage() {
  const params = useParams()
  const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId

  if (!userId) {
    notFound()
  }

  const [activeTab, setActiveTab] = useState<
    "followers" | "following" | "reviews"
  >("reviews")

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useSWR<UserProfile>(userId ? `/users/${userId}` : null, () =>
    apiClient.getUserById(userId)
  )

  const { followers, isLoading: isLoadingFollowers } = useFollowers(userId)
  const { following, isLoading: isLoadingFollowing } = useFollowing(userId)
  const { counts } = useFollowCounts(userId)
  const { reviews, isLoading: isLoadingReviews } = useUserReviews(userId)

  if (isLoadingUser) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-pastel-blue/30 to-pastel-green/30">
          <Navbar />
          <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <LoadingSpinner size="lg" text="Loading user profile..." />
          </div>
        </div>
      </PageTransition>
    )
  }

  if (userError || !user) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-pastel-blue/30 to-pastel-green/30">
          <Navbar />
          <NotFound
            title="User Not Found"
            description="The user you're looking for doesn't exist or has been removed."
            backHref="/users/search"
            backLabel="Search Users"
          />
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pastel-blue/30 to-pastel-green/30">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <ProfileAvatar
                userName={user.name}
                className="h-24 w-24"
                fallbackClassName="text-2xl"
              />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent">
                  {user.name}&apos;s Reviews
                </h1>
                <p className="text-foreground/60 mt-1">{user.email}</p>
                <p className="text-sm text-foreground/40 mt-1 flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined{" "}
                  {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <FollowButton userId={userId} />
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-accent-blue/20 text-center">
              <CardContent className="p-4">
                <Users className="h-6 w-6 mx-auto text-gradient-purple mb-2" />
                <div className="text-2xl font-bold">{counts.followers}</div>
                <div className="text-sm text-foreground/60">Followers</div>
              </CardContent>
            </Card>

            <Card className="border-accent-purple/20 text-center">
              <CardContent className="p-4">
                <UserCheck className="h-6 w-6 mx-auto text-gradient-pink mb-2" />
                <div className="text-2xl font-bold">{counts.following}</div>
                <div className="text-sm text-foreground/60">Following</div>
              </CardContent>
            </Card>

            <Card className="border-accent-green/20 text-center">
              <CardContent className="p-4">
                <Star className="h-6 w-6 mx-auto text-gradient-purple mb-2" />
                <div className="text-2xl font-bold">{reviews.length}</div>
                <div className="text-sm text-foreground/60">Reviews</div>
              </CardContent>
            </Card>

            <Card className="border-accent-yellow/20 text-center">
              <CardContent className="p-4">
                <BookOpen className="h-6 w-6 mx-auto text-gradient-pink mb-2" />
                <div className="text-2xl font-bold">{user.readCount}</div>
                <div className="text-sm text-foreground/60">Books Read</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex space-x-2">
              <Button
                variant={activeTab === "reviews" ? "default" : "outline"}
                onClick={() => setActiveTab("reviews")}
                className={
                  activeTab === "reviews"
                    ? "bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
                    : ""
                }
              >
                Reviews ({reviews.length})
              </Button>
              <Button
                variant={activeTab === "followers" ? "default" : "outline"}
                onClick={() => setActiveTab("followers")}
                className={
                  activeTab === "followers"
                    ? "bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
                    : ""
                }
              >
                Followers ({counts.followers})
              </Button>
              <Button
                variant={activeTab === "following" ? "default" : "outline"}
                onClick={() => setActiveTab("following")}
                className={
                  activeTab === "following"
                    ? "bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
                    : ""
                }
              >
                Following ({counts.following})
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {activeTab === "reviews" && (
              <div>
                {isLoadingReviews ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <LoadingSpinner size="lg" text="Loading reviews..." />
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center text-foreground/60 p-8 bg-pastel-yellow/50 rounded-lg max-w-md mx-auto">
                    <Star className="h-12 w-12 mx-auto mb-4 text-foreground/40" />
                    <p className="text-lg font-semibold">No reviews yet</p>
                    <p className="text-sm mt-2">
                      This user hasn&apos;t written any reviews yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <UserReviewCard review={review} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "followers" && (
              <div>
                {isLoadingFollowers ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <LoadingSpinner size="lg" text="Loading followers..." />
                  </div>
                ) : followers.length === 0 ? (
                  <div className="text-center text-foreground/60 p-8 bg-pastel-yellow/50 rounded-lg max-w-md mx-auto">
                    <Users className="h-12 w-12 mx-auto mb-4 text-foreground/40" />
                    <p className="text-lg font-semibold">No followers yet</p>
                    <p className="text-sm mt-2">
                      This user doesn&apos;t have any followers yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {followers.map((follower, index) => (
                      <motion.div
                        key={follower.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <UserCard user={follower} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === "following" && (
              <div>
                {isLoadingFollowing ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <LoadingSpinner size="lg" text="Loading following..." />
                  </div>
                ) : following.length === 0 ? (
                  <div className="text-center text-foreground/60 p-8 bg-pastel-yellow/50 rounded-lg max-w-md mx-auto">
                    <UserCheck className="h-12 w-12 mx-auto mb-4 text-foreground/40" />
                    <p className="text-lg font-semibold">
                      Not following anyone
                    </p>
                    <p className="text-sm mt-2">
                      This user isn&apos;t following anyone yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {following.map((followedUser, index) => (
                      <motion.div
                        key={followedUser.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <UserCard user={followedUser} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
