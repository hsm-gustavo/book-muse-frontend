"use client"

import { useActionState } from "react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Heart, Loader2 } from "lucide-react"
import { toggleLikeAction } from "@/lib/actions/review-actions"

interface LikeButtonServerProps {
  reviewId: string
  initialLiked: boolean
  initialCount: number
  disabled?: boolean
}

type LikeState = {
  success: boolean
  liked: boolean
  count: number
  error?: string
}

export function LikeButtonServer({
  reviewId,
  initialLiked,
  initialCount,
  disabled,
}: LikeButtonServerProps) {
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken")
    }
    return null
  }
  const [state, formAction, isPending] = useActionState(
    async (prevState: LikeState): Promise<LikeState> => {
      const token = getToken()
      if (!token) {
        return {
          success: false,
          liked: prevState.liked,
          count: prevState.count,
          error: "Authentication required. Please log in again.",
        }
      }
      try {
        await toggleLikeAction(token, reviewId)
        return {
          success: true,
          liked: !prevState.liked,
          count: prevState?.liked ? prevState.count - 1 : prevState.count + 1,
        }
      } catch (error) {
        return {
          success: false,
          liked: prevState.liked,
          count: prevState.count,
          error:
            error instanceof Error ? error.message : "Failed to toggle like",
        }
      }
    },
    {
      success: true,
      liked: initialLiked,
      count: initialCount,
    } as LikeState
  )

  return (
    <form action={formAction}>
      <AnimatedButton
        type="submit"
        variant="ghost"
        size="sm"
        disabled={isPending || disabled}
        className={
          state.liked
            ? "text-red-500 hover:text-red-600"
            : "text-foreground/60 hover:text-foreground"
        }
      >
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Heart className={state.liked ? "fill-red-500" : ""} size={20} />
        )}
        <span className="ml-2 font-medium">{state.count}</span>
        <span className="sr-only">Like</span>
      </AnimatedButton>
    </form>
  )
}
