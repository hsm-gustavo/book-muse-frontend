"use client"

import { useParams } from "next/navigation"
import { useBookDetails } from "@/hooks/use-book-details"
import { Navbar } from "@/components/layout/navbar"
import { BookDetailsDisplay } from "@/components/books/book-details-display"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { motion } from "motion/react"

export default function BookDetailsPage() {
  const params = useParams()
  const isbn = Array.isArray(params.isbn) ? params.isbn[0] : params.isbn

  const { book, isLoading, error } = useBookDetails({ isbn })

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pastel-purple/30 to-pastel-pink/30">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {isLoading && (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
              <LoadingSpinner size="lg" text="Loading book details..." />
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-md max-w-md mx-auto">
              <p>Error loading book details: {error.message}</p>
              <p>Please try again later.</p>
            </div>
          )}

          {!isLoading && !error && !book && (
            <div className="text-center text-foreground/60 p-8 bg-pastel-yellow/50 rounded-lg max-w-md mx-auto">
              <p className="text-lg font-semibold">Book not found</p>
              <p className="text-sm mt-2">
                The ISBN &quot;{isbn}&quot; did not return any book details.
              </p>
            </div>
          )}

          {!isLoading && !error && book && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BookDetailsDisplay book={book} />
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
