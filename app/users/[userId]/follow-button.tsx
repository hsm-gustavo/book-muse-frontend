"use client"

import {
  startTransition,
  useActionState,
  useEffect,
  useOptimistic,
} from "react"
import { followUser, unfollowUser } from "./actions"
import { toast } from "sonner"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Loader2, UserMinus, UserPlus } from "lucide-react"

interface FollowButtonProps {
  userId: string
  isFollowing: boolean
  followersCount: number
}

export default function FollowButton({
  followersCount,
  isFollowing,
  userId,
}: FollowButtonProps) {
  const [followState, followAction, isFollowing_] = useActionState(
    followUser,
    undefined
  )
  const [unfollowState, unfollowAction, isUnfollowing] = useActionState(
    unfollowUser,
    undefined
  )

  const [optimisticFollow, setOptimisticFollow] = useOptimistic(
    { isFollowing, followersCount },
    (state, newFollowStatus: boolean) => ({
      isFollowing: newFollowStatus,
      followersCount: state.followersCount + (newFollowStatus ? 1 : -1),
    })
  )

  const isPending = isFollowing_ || isUnfollowing

  useEffect(() => {
    if (followState?.success) {
      toast.success(followState.message)
    } else if (followState?.error) {
      toast.error(followState.error)
    }
  }, [followState])

  useEffect(() => {
    if (unfollowState?.success) {
      toast.success(unfollowState.message)
    } else if (unfollowState?.error) {
      toast.error(unfollowState.error)
    }
  }, [unfollowState])

  function handleFollowToggle() {
    if (optimisticFollow.isFollowing) {
      startTransition(() => {
        setOptimisticFollow(false)
        const formData = new FormData()
        formData.append("userId", userId)
        unfollowAction(formData)
      })
    } else {
      startTransition(() => {
        setOptimisticFollow(true)
        const formData = new FormData()
        formData.append("userId", userId)
        followAction(formData)
      })
    }
  }

  return (
    <AnimatedButton
      onClick={handleFollowToggle}
      disabled={isPending}
      className="gap-2"
      variant={optimisticFollow.isFollowing ? "outline" : "default"}
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {optimisticFollow.isFollowing ? "Unfollowing..." : "Following..."}
        </>
      ) : optimisticFollow.isFollowing ? (
        <>
          <UserMinus className="h-4 w-4" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Follow
        </>
      )}
    </AnimatedButton>
  )
}
