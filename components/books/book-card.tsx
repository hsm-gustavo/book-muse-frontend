"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { type BookSearchResultDto, getCoverImageUrl } from "@/types/books"
import { motion } from "motion/react"
import { ReadingStatusBadge } from "@/components/reading-status/reading-status-badge"

interface BookCardProps {
  book: BookSearchResultDto
}

export function BookCard({ book }: BookCardProps) {
  const isbn =
    book.isbn10 && book.isbn10.length > 0 ? book.isbn10[0] : book.isbn13?.[0]
  const coverUrl = getCoverImageUrl(book.coverId, "M")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      className="h-full"
    >
      <Card className="h-full flex flex-col border-accent-blue/20 hover:border-gradient-purple transition-all duration-200">
        {isbn ? (
          <Link href={`/books/${isbn}`} className="block h-full">
            <CardContent className="p-4 flex flex-col items-center text-center h-full">
              <div className="relative w-28 h-40 mb-4 flex-shrink-0">
                <Image
                  src={coverUrl || "/placeholder.svg"}
                  alt={`Cover of ${book.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "contain" }}
                  className="rounded-sm shadow-md"
                  priority={false} // Not critical for initial load
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <CardTitle className="text-lg font-semibold line-clamp-2 mb-1">
                  {book.title}
                </CardTitle>
                {book.authorNames && (
                  <CardDescription className="text-sm text-foreground/70 line-clamp-1">
                    {book.authorNames.join(", ")}
                  </CardDescription>
                )}
                {book.firstPublishYear && (
                  <p className="text-xs text-foreground/50 mt-1">
                    Published: {book.firstPublishYear}
                  </p>
                )}
                <div className="mt-2">
                  <ReadingStatusBadge
                    openLibraryId={isbn || book.openLibraryKey || ""}
                    className="text-xs"
                    showIcon={false}
                  />
                </div>
              </div>
            </CardContent>
          </Link>
        ) : (
          <CardContent className="p-4 flex flex-col items-center text-center h-full">
            <div className="relative w-28 h-40 mb-4 flex-shrink-0 bg-secondary/50 rounded-sm flex items-center justify-center text-foreground/50 text-xs">
              No Cover
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <CardTitle className="text-lg font-semibold line-clamp-2 mb-1">
                {book.title}
              </CardTitle>
              {book.authorNames && (
                <CardDescription className="text-sm text-foreground/70 line-clamp-1">
                  {book.authorNames.join(", ")}
                </CardDescription>
              )}
              {book.firstPublishYear && (
                <p className="text-xs text-foreground/50 mt-1">
                  Published: {book.firstPublishYear}
                </p>
              )}
              <div className="mt-2">
                <ReadingStatusBadge
                  openLibraryId={isbn || book.openLibraryKey || ""}
                  className="text-xs"
                  showIcon={false}
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}
