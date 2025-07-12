"use client"

import { useParams } from "next/navigation"
import { useBookDetails } from "@/hooks/use-book-details"
import { Navbar } from "@/components/layout/navbar"
import { BookDetailsDisplay } from "@/components/books/book-details-display"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { motion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { useReviews } from "@/hooks/use-reviews"
import { useState } from "react"
import { Review } from "@/types/reviews"
import { ReviewList } from "@/components/reviews/review-list"
import { ReviewForm } from "@/components/reviews/review-form"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Pencil } from "lucide-react"

export default function BookDetailsPage() {
  const params = useParams()
  const isbn = Array.isArray(params.isbn) ? params.isbn[0] : params.isbn

  const { user } = useAuth()
  const {
    book,
    isLoading: isLoadingBook,
    error: bookError,
  } = useBookDetails({ isbn })

  const openLibraryId = book?.workId

  const {
    reviews,
    isLoading: isLoadingReviews,
    error: reviewsError,
    deleteReview,
    toggleLikeReview,
  } = useReviews(openLibraryId)

  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const handleReviewFormSuccess = () => {
    setEditingReview(null)
    setShowReviewForm(false)
  }

  const handleEditReview = (review: Review) => {
    setEditingReview(review)
    setShowReviewForm(true)
  }

  const handleCancelEdit = () => {
    setEditingReview(null)
    setShowReviewForm(false)
  }

  console.log(reviews)

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pastel-purple/30 to-pastel-pink/30">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {isLoadingBook && (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
              <LoadingSpinner size="lg" text="Loading book details..." />
            </div>
          )}

          {bookError && (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-md max-w-md mx-auto">
              <p>Error loading book details: {bookError.message}</p>
              <p>Please try again later.</p>
            </div>
          )}

          {!isLoadingBook && !bookError && !book && (
            <div className="text-center text-foreground/60 p-8 bg-pastel-yellow/50 rounded-lg max-w-md mx-auto">
              <p className="text-lg font-semibold">Book not found</p>
              <p className="text-sm mt-2">
                The ISBN &quot;{isbn}&quot; did not return any book details.
              </p>
            </div>
          )}

          {!isLoadingBook && !bookError && book && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BookDetailsDisplay book={book} />

              <div className="mt-12 space-y-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent text-center">
                  Reviews
                </h2>

                {user && !showReviewForm && !editingReview && (
                  <div className="flex justify-center">
                    <AnimatedButton
                      onClick={() => setShowReviewForm(true)}
                      className="bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Write a New Review
                    </AnimatedButton>
                  </div>
                )}

                {(showReviewForm || editingReview) && user && openLibraryId && (
                  <ReviewForm
                    openLibraryId={openLibraryId}
                    existingReview={editingReview}
                    onSuccess={handleReviewFormSuccess}
                    onCancel={handleCancelEdit}
                  />
                )}

                {reviewsError && (
                  <div className="text-center text-red-600 bg-red-50 p-4 rounded-md max-w-md mx-auto">
                    <p>Error loading reviews: {reviewsError.message}</p>
                  </div>
                )}

                <ReviewList
                  reviews={reviews || []}
                  onLikeToggle={toggleLikeReview}
                  onEdit={handleEditReview}
                  onDelete={deleteReview}
                  isLoading={isLoadingReviews}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
