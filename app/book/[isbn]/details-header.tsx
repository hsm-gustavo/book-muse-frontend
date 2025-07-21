import { AnimatedCard } from "@/components/ui/animated-card"
import { CardContent } from "@/components/ui/card"
import { BookDetails, getCoverImageUrl } from "@/lib/types/book"
import Image from "next/image"
import ReadingStatusForm from "@/components/books/reading-status-form"
import {
  ReadingStatus,
  ReadingStatusResponse,
} from "@/lib/types/reading-status"
import { Badge } from "@/components/ui/badge"
import ReviewDialog from "@/components/books/reviews/review-dialog"

interface DetailsHeaderProps {
  book: BookDetails
  isLogged: boolean
  readingStatus: ReadingStatusResponse | null
}

export default function DetailsHeader({
  book,
  isLogged,
  readingStatus,
}: DetailsHeaderProps) {
  const cover = book.coverUrl || getCoverImageUrl(book.covers?.[0], "L")

  const getStatusLabel = (status: ReadingStatus) => {
    switch (status) {
      case "reading":
        return "Currently Reading"
      case "read":
        return "Read"
      case "want_to_read":
        return "Want to Read"
      case "abandoned":
        return "Abandoned"
      default:
        return status
    }
  }

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
                <ReadingStatusForm
                  openLibraryId={
                    book.workId || book.isbn13?.[0] || book.isbn10?.[0] || ""
                  }
                  initialStatus={readingStatus?.status ?? ""}
                />
                {readingStatus && (
                  <Badge variant="secondary" className="w-full justify-center">
                    {getStatusLabel(readingStatus.status)}
                  </Badge>
                )}
                <ReviewDialog
                  openLibraryId={
                    book.workId || book.isbn13?.[0] || book.isbn10?.[0] || ""
                  }
                />
              </div>
            )}
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  )
}
