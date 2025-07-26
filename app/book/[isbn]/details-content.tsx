import DetailsContainer from "@/components/books/details-container"
import ReviewsContainer from "@/components/books/reviews/reviews-container"
import { BookDetails } from "@/lib/types/book"

interface DetailsContentProps {
  book: BookDetails
  description: string
  userId?: string
  isLogged: boolean
  openLibraryId: string
}

export default function DetailsContent({
  book,
  description,
  userId,
  isLogged,
  openLibraryId,
}: DetailsContentProps) {
  console.log("DetailsContent is rendering")
  return (
    <div className="lg:col-span-2 space-y-6">
      <DetailsContainer book={book} description={description} />
      <ReviewsContainer
        userId={userId}
        isLogged={isLogged}
        openLibraryId={openLibraryId}
      />
    </div>
  )
}
