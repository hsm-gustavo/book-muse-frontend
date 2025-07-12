"use client"

import useSWR from "swr"
import { apiClient } from "@/lib/api"
import type { BookDetails } from "@/types/books"

interface UseBookDetailsOptions {
  isbn: string | undefined
}

export function useBookDetails({ isbn }: UseBookDetailsOptions) {
  const swrKey = isbn ? `/books/isbn/${isbn}` : null

  const { data, error, isLoading, isValidating } = useSWR<BookDetails>(
    swrKey,
    () => {
      if (!isbn) throw new Error("ISBN is required to fetch book details.")
      return apiClient.getBookDetails(isbn)
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      onError: (err) => {
        console.error("SWR error fetching book details:", err)
      },
    }
  )

  return {
    book: data,
    isLoading: isLoading || isValidating,
    error,
  }
}
