"use client"

import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Badge } from "@/components/ui/badge"
import { CardContent } from "@/components/ui/card"
import {
  BookSearchResponse,
  BookSearchResult,
  getCoverImageUrl,
} from "@/lib/types/book"
import { BookOpen } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import PaginationSearch from "./pagination-search"
import Image from "next/image"

interface BooksProps {
  results: BookSearchResponse
  query: string
}

export default function Books({ results, query }: BooksProps) {
  const [formattedTotal, setFormattedTotal] = useState<string>(
    results.total.toString()
  )

  const getBookIsbn = (book: BookSearchResult) => {
    return book.isbn13?.[0] || book.isbn10?.[0] || book.editionKey
  }

  const totalPages = useMemo(() => {
    return results.results && results.results.length > 0
      ? Math.ceil(1000 / 100)
      : 1
  }, [results.results])

  useEffect(() => {
    setFormattedTotal(results.total.toLocaleString())
  }, [results.total])

  return (
    <>
      {results && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              Found {formattedTotal} results for &quot;{query}&quot;
            </p>
            <p className="text-sm text-muted-foreground">
              Page {results.page} of {results.totalPages}
            </p>
          </div>

          {/* Results Grid */}
          {results.results.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.results.map((book, index) => {
                const isbn = getBookIsbn(book)
                return (
                  <AnimatedCard
                    key={`${book.openLibraryKey}-${index}`}
                    className="group hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={getCoverImageUrl(book.coverId, "M")}
                            alt={book.title}
                            width={80}
                            height={112}
                            className="w-20 h-28 object-cover rounded-md shadow-sm"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className="font-semibold text-lg mb-2 line-clamp-2 min-h-14"
                            title={book.title}
                          >
                            {isbn ? (
                              <Link
                                href={`/book/${isbn}`}
                                className="hover:text-primary transition-colors"
                              >
                                {book.title}
                              </Link>
                            ) : (
                              book.title
                            )}
                          </h3>

                          {book.authorNames && book.authorNames.length > 0 && (
                            <p
                              className="text-muted-foreground mb-2 truncate"
                              title={`by ${book.authorNames.join(", ")}`}
                            >
                              by {book.authorNames.join(", ")}
                            </p>
                          )}

                          <div
                            className="flex flex-wrap gap-2 mb-3"
                            title={"First Publish Year"}
                          >
                            {book.firstPublishYear && (
                              <Badge variant="secondary">
                                {book.firstPublishYear}
                              </Badge>
                            )}
                            {book.editionCount > 1 && (
                              <Badge variant="outline">
                                {book.editionCount} editions
                              </Badge>
                            )}
                          </div>

                          {isbn ? (
                            <Link href={`/book/${isbn}`}>
                              <AnimatedButton size="sm" className="w-full">
                                <BookOpen className="h-4 w-4 mr-2" />
                                View Details
                              </AnimatedButton>
                            </Link>
                          ) : (
                            <AnimatedButton
                              size="sm"
                              disabled
                              className="w-full"
                            >
                              Details Unavailable
                            </AnimatedButton>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </AnimatedCard>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse our featured books.
              </p>
            </div>
          )}

          <PaginationSearch totalPages={totalPages} />
        </div>
      )}
    </>
  )
}
