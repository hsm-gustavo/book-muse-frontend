"use client"

import useSWR from "swr"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import type { ReadingStatusEntry, ReadingStatus } from "@/types/reading-status"

export function useReadingStatusList(status?: ReadingStatus) {
  const { user } = useAuth()

  const swrKey = user
    ? `/reading-status${status ? `?status=${status}` : ""}`
    : null

  const { data, error, isLoading } = useSWR<ReadingStatusEntry[]>(
    swrKey,
    () => apiClient.getReadingStatusList(status),
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      onError: (err) => {
        console.error("SWR error fetching reading status list:", err)
      },
    }
  )

  return {
    entries: data || [],
    isLoading,
    error,
  }
}
