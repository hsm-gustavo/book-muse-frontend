import { BookDetails } from "@/lib/types/book"
import { ReadingStatusResponse } from "@/lib/types/reading-status"
import { Review } from "@/lib/types/review"
import { notFound } from "next/navigation"
import { API_URL } from "@/lib/constants"
import DetailsHeader from "./details-header"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import DetailsContent from "./details-content"
import { getCurrentUser } from "@/lib/user"

async function getBookDetails(isbn: string): Promise<BookDetails> {
  const response = await fetch(`${API_URL}/books/isbn/${isbn}`, {
    next: {
      tags: [`bookDetails-${isbn}`],
    },
  })
  return await response.json()
}

async function getBookReviews(openLibraryId?: string): Promise<Review[]> {
  if (!openLibraryId) return []
  const response = await fetch(`${API_URL}/reviews/book/${openLibraryId}`, {
    next: { tags: [`bookReviews-${openLibraryId}`] },
  })
  return await response.json()
}

async function getReadingStatus(
  openLibraryId?: string
): Promise<ReadingStatusResponse | null> {
  if (!openLibraryId) return null
  const response = await fetch(`${API_URL}/reading-status/${openLibraryId}`, {
    next: { tags: [`readingStatus-${openLibraryId}`] },
  })
  return await response.json()
}

export default async function BookByIsbn({
  params,
}: {
  params: Promise<{ isbn: string }>
}) {
  const user = await getCurrentUser()

  const { isbn } = await params
  if (!isbn) notFound()

  const book = await getBookDetails(isbn)
  const openLibraryId = book.workId

  const reviews = await getBookReviews(openLibraryId)
  let readingStatus: ReadingStatusResponse | null = null

  if (user) {
    readingStatus = await getReadingStatus()
  }

  const descriptionText =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "No description available."

  return (
    <div className="min-h-screen gradient-pastel">
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/search"
            className="inline-flex items-center mb-6 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Link>
          <div className="grid gap-8 lg:grid-cols-3">
            <DetailsHeader
              book={book}
              isLogged={!!user}
              readingStatus={readingStatus}
            />
            <DetailsContent
              book={book}
              description={descriptionText}
              reviews={reviews}
              userId={user?.sub}
              isLogged={!!user}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
