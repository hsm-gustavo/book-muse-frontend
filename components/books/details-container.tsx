import { BookOpen, Calendar, Users } from "lucide-react"
import { AnimatedCard } from "../ui/animated-card"
import { CardContent, CardHeader, CardTitle } from "../ui/card"
import { BookDetails } from "@/lib/types/book"

interface DetailsContainerProps {
  book: BookDetails
  description: string
}

export default function DetailsContainer({
  book,
  description,
}: DetailsContainerProps) {
  return (
    <AnimatedCard>
      <CardHeader>
        <CardTitle className="text-3xl">{book.title}</CardTitle>
        {book.subtitle && (
          <p className="text-xl text-muted-foreground">{book.subtitle}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {book.authors && book.authors.length > 0 && (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>by {book.authors.join(", ")}</span>
          </div>
        )}

        {book.publishDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Published {book.publishDate}</span>
          </div>
        )}

        {book.numberOfPages && (
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{book.numberOfPages} pages</span>
          </div>
        )}

        {book.publishers && book.publishers.length > 0 && (
          <div>
            <strong>Publishers:</strong> {book.publishers.join(", ")}
          </div>
        )}

        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </AnimatedCard>
  )
}
