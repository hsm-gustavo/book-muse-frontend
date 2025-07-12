"use client"

import useSWRInfinite from "swr/infinite"
import { apiClient } from "@/lib/api"
import type { UserSearchResult, UserSearchResponse } from "@/types/user-search"
import { useCallback } from "react"

const PAGE_SIZE = 20 // Number of users per page

export function useUserSearch(query: string) {
  const { data, error, size, setSize, isValidating, mutate } =
    useSWRInfinite<UserSearchResponse>(
      (pageIndex, previousPageData) => {
        if (!query) return null
        if (previousPageData && !previousPageData.hasNextPage) return null

        const cursor = previousPageData
          ? previousPageData.nextCursor
          : undefined
        const params = new URLSearchParams({
          q: query,
          limit: PAGE_SIZE.toString(),
        })
        if (cursor) {
          params.set("cursor", cursor)
        }
        return `/users/search?${params.toString()}`
      },
      (key) => {
        const url = new URL(`http://dummy.com${key}`)
        const fetchQuery = url.searchParams.get("q") || ""
        const cursor = url.searchParams.get("cursor") || undefined
        return apiClient.searchUsers(fetchQuery, PAGE_SIZE, cursor)
      },
      {
        revalidateOnFocus: false,
        revalidateIfStale: false,

        keepPreviousData: true,
        onError: (err) => {
          console.error("SWR error fetching user search results:", err)
        },
      }
    )

  const users: UserSearchResult[] = data
    ? data.flatMap((page) => (page?.data || []).filter(Boolean))
    : []
  const hasNextPage = data ? data[data.length - 1]?.hasNextPage : false
  const isInitialLoading = query && !data && !error
  const isLoadingMore = isValidating && data && data.length > 0
  const isSearchingInitial = isValidating && !data

  const loadMore = useCallback(() => {
    if (hasNextPage && !isLoadingMore && !isSearchingInitial) {
      setSize(size + 1)
    }
  }, [hasNextPage, isLoadingMore, isSearchingInitial, setSize, size])

  const resetSearch = useCallback(() => {
    mutate(undefined, { revalidate: false })
    setSize(1)
  }, [mutate, setSize])

  return {
    users,
    isLoading: isInitialLoading || isLoadingMore || isSearchingInitial,
    isSearchingInitial,
    error,
    hasNextPage,
    loadMore,
    resetSearch,
  }
}
