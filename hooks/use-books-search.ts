"use client"

import useSWR from "swr"
import { apiClient } from "@/lib/api"
import type { BookSearchResultDto } from "@/types/books"

interface UseBooksSearchOptions {
  query: string
  page?: number
}

interface BookSearchResponse {
  results: BookSearchResultDto[]
  totalPages: number
}

export function useBooksSearch({ query, page = 1 }: UseBooksSearchOptions) {
  const swrKey = query ? `/books?q=${query}&page=${page}` : null

  const { data, error, isLoading, isValidating } = useSWR<BookSearchResponse>(
    swrKey,
    () => apiClient.searchBooks(query, page),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshInterval: 0,
      onError: (err) => {
        console.error("SWR error fetching book search results:", err)
      },
    }
  )

  return {
    books: data?.results || [],
    totalPages: data?.totalPages || 1,
    isLoading: isLoading || isValidating,
    error,
  }
}
