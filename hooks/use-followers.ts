"use client"

import useSWR from "swr"
import { useState } from "react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import type { UserFollowInfo, FollowCounts } from "@/types/followers"

export function useFollowers(userId: string | undefined) {
  const swrKey = userId ? `/users/${userId}/followers` : null

  const { data, error, isLoading, mutate } = useSWR<UserFollowInfo[]>(
    swrKey,
    () => {
      if (!userId) throw new Error("User ID is required")
      return apiClient.getFollowers(userId)
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
    }
  )

  return {
    followers: data || [],
    isLoading,
    error,
    mutate,
  }
}

export function useFollowing(userId: string | undefined) {
  const swrKey = userId ? `/users/${userId}/following` : null

  const { data, error, isLoading, mutate } = useSWR<UserFollowInfo[]>(
    swrKey,
    () => {
      if (!userId) throw new Error("User ID is required")
      return apiClient.getFollowing(userId)
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
    }
  )

  return {
    following: data || [],
    isLoading,
    error,
    mutate,
  }
}

export function useFollowCounts(userId: string | undefined) {
  const swrKey = userId ? `/users/${userId}/follow-counts` : null

  const { data, error, isLoading, mutate } = useSWR<FollowCounts>(
    swrKey,
    () => {
      if (!userId) throw new Error("User ID is required")
      return apiClient.getFollowCounts(userId)
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
    }
  )

  return {
    counts: data || { followers: 0, following: 0 },
    isLoading,
    error,
    mutate,
  }
}

export function useFollowActions() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const followUser = async (userId: string, onSuccess?: () => void) => {
    if (!user) throw new Error("Must be logged in to follow users")

    setIsLoading(true)
    try {
      await apiClient.followUser(userId)
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Failed to follow user:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const unfollowUser = async (userId: string, onSuccess?: () => void) => {
    if (!user) throw new Error("Must be logged in to unfollow users")

    setIsLoading(true)
    try {
      await apiClient.unfollowUser(userId)
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Failed to unfollow user:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    followUser,
    unfollowUser,
    isLoading,
  }
}
