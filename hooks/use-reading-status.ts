"use client"

import useSWR from "swr"
import { useState } from "react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import type {
  ReadingStatus,
  ReadingStatusResponse,
} from "@/types/reading-status"

export function useReadingStatus(openLibraryId: string | undefined) {
  const { user } = useAuth()
  const [optimisticStatus, setOptimisticStatus] =
    useState<ReadingStatus | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const swrKey =
    user && openLibraryId ? `/reading-status/${openLibraryId}` : null

  const { data, error, isLoading, mutate } =
    useSWR<ReadingStatusResponse | null>(
      swrKey,
      () => {
        if (!openLibraryId) throw new Error("Open Library ID is required")
        return apiClient.getReadingStatus(openLibraryId)
      },
      {
        revalidateOnFocus: false,
        revalidateIfStale: true,
        onError: (err) => {
          console.error("SWR error fetching reading status:", err)
        },
      }
    )

  const updateStatus = async (status: ReadingStatus | null) => {
    if (!user || !openLibraryId) return

    setIsUpdating(true)
    setOptimisticStatus(status)

    try {
      if (status === null) {
        await apiClient.deleteReadingStatus(openLibraryId)
        await mutate(null, { revalidate: false })
      } else {
        const result = await apiClient.createOrUpdateReadingStatus({
          openLibraryId,
          status,
        })
        await mutate(result, { revalidate: false })
      }
    } catch (error) {
      console.error("Failed to update reading status:", error)
      setOptimisticStatus(null)
      await mutate()
      throw error
    } finally {
      setIsUpdating(false)
      setOptimisticStatus(null)
    }
  }

  const currentStatus =
    optimisticStatus !== null ? optimisticStatus : data?.status || null

  return {
    status: currentStatus,
    isLoading: isLoading && !optimisticStatus,
    isUpdating,
    error,
    updateStatus,
  }
}
