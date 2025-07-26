"use client"

import { AnimatedCard } from "@/components/ui/animated-card"
import { CardContent } from "@/components/ui/card"
import { BookDetails, getCoverImageUrl } from "@/lib/types/book"
import Image from "next/image"
import { ReadingStatusResponse } from "@/lib/types/reading-status"
import ReviewDialog from "@/components/books/reviews/review-dialog"
import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import ReadingStatusSelector from "@/components/books/reading-status-form"
import LoadingDots from "@/components/loading-dots"

interface DetailsHeaderProps {
  book: BookDetails
  isLogged: boolean
  openLibraryId: string
  userId?: string
}

export default function DetailsHeader({
  book,
  isLogged,
  openLibraryId,
  userId,
}: DetailsHeaderProps) {
  const cover = book.coverUrl || getCoverImageUrl(book.covers?.[0], "L")

  const { data, isLoading, error } = useQuery<ReadingStatusResponse>({
    queryKey: ["status", openLibraryId, userId],
    queryFn: () =>
      fetcher<ReadingStatusResponse>(`/api/reading-status/${openLibraryId}`),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  })

  console.log("DetailsHeader is rendering")

  return (
    <div className="lg:col-span-1">
      <AnimatedCard>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Image
              src={cover}
              alt={book.title}
              width={192}
              height={256}
              className="w-48 h-64 object-cover rounded-lg shadow-lg mx-auto"
            />

            {isLogged && (
              <div className="space-y-3">
                {isLoading ? (
                  <LoadingDots className="w-2 h-2" />
                ) : error ? (
                  <p>Error while fetching reading status</p>
                ) : (
                  <ReadingStatusSelector
                    openLibraryId={
                      book.workId || book.isbn13?.[0] || book.isbn10?.[0] || ""
                    }
                    initialStatus={data?.status || null}
                  />
                )}
                <ReviewDialog
                  openLibraryId={
                    book.workId || book.isbn13?.[0] || book.isbn10?.[0] || ""
                  }
                  userId={userId!}
                />
              </div>
            )}
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  )
}
