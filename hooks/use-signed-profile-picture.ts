"use client"

import useSWR from "swr"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth"

const CACHE_DURATION = 14 * 60 * 1000 // 14 minutes for SWR refresh interval

export function useSignedProfilePicture() {
  const { user } = useAuth()

  // The SWR key depends on whether the user has a profile picture.
  // If user.profilePicture is null, the key is null, and SWR won't fetch.
  const swrKey = user?.profilePicture
    ? `/users/me/profile-picture-signed-${user.profilePicture}`
    : null

  const { data, error, isValidating, mutate } = useSWR(
    swrKey,
    async () => {
      const response = await apiClient.getSignedProfilePictureUrl()
      return response.url // SWR will cache this URL
    },
    {
      revalidateOnFocus: false, // Don't revalidate on window focus
      revalidateIfStale: true, // Revalidate if data is stale (e.g., on mount)
      refreshInterval: CACHE_DURATION, // Automatically re-fetch every 14 minutes
      onError: (err) => {
        console.error("SWR error fetching signed profile picture URL:", err)
      },
    }
  )

  // The `mutate` function from SWR can be used to manually revalidate the data.
  // This is useful after a new profile picture is uploaded.

  return {
    signedUrl: data,
    isLoading: isValidating, // SWR's isValidating indicates fetching state
    error: error,
    refresh: mutate, // Expose SWR's mutate function as refresh
  }
}
