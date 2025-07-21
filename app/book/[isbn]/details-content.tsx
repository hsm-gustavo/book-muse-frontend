import DetailsContainer from "@/components/books/details-container"
import ReviewsContainer from "@/components/books/reviews/reviews-container"
import { BookDetails } from "@/lib/types/book"
import { Review } from "@/lib/types/review"

interface DetailsContentProps {
  book: BookDetails
  description: string
  reviews: Review[]
  userId?: string
  isLogged: boolean
}

export default function DetailsContent({
  book,
  description,
  reviews,
  userId,
  isLogged,
}: DetailsContentProps) {
  console.log("DetailsContent is rendering")
  return (
    <div className="lg:col-span-2 space-y-6">
      <DetailsContainer book={book} description={description} />
      <ReviewsContainer userId={userId} isLogged={isLogged} reviews={reviews} />
    </div>
  )
}
