"use client"

import { useState, useEffect } from "react"
import { AnimatedButton } from "@/components/ui/animated-button"
import {
  useFollowActions,
  useFollowing,
  useFollowCounts,
} from "@/hooks/use-followers"
import { useAuth } from "@/lib/auth"
import { UserPlus, UserMinus, Loader2 } from "lucide-react"
import { motion } from "motion/react"

interface FollowButtonProps {
  userId: string
  className?: string
}

export function FollowButton({ userId, className }: FollowButtonProps) {
  const { user } = useAuth()
  const { followUser, unfollowUser, isLoading } = useFollowActions()
  const { following, mutate: mutateFollowing } = useFollowing(user?.id)
  const { mutate: mutateFollowCounts } = useFollowCounts(userId)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (following && user) {
      setIsFollowing(
        following.some((followedUser) => followedUser.id === userId)
      )
    }
  }, [following, userId, user])

  const handleToggleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(userId, () => {
          setIsFollowing(false)
          mutateFollowing()
          mutateFollowCounts()
        })
      } else {
        await followUser(userId, () => {
          setIsFollowing(true)
          mutateFollowing()
          mutateFollowCounts()
        })
      }
    } catch (error) {
      console.error("Failed to toggle follow:", error)
    }
  }

  if (!user || user.id === userId) {
    return null
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <AnimatedButton
        onClick={handleToggleFollow}
        disabled={isLoading}
        variant={isFollowing ? "outline" : "default"}
        className={`${className} ${
          isFollowing
            ? "border-pastel-orange bg-pastel-orange hover:bg-pastel-orange/80"
            : "bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
        }`}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : isFollowing ? (
          <UserMinus className="mr-2 h-4 w-4" />
        ) : (
          <UserPlus className="mr-2 h-4 w-4" />
        )}
        {isFollowing ? "Unfollow" : "Follow"}
      </AnimatedButton>
    </motion.div>
  )
}
