import { BookOpen } from "lucide-react"
import { AnimatedCard } from "../ui/animated-card"
import { CardContent, CardHeader, CardTitle } from "../ui/card"
import { TabsContent } from "../ui/tabs"
import { BookStatus } from "@/lib/types/book"

interface BooksTabProps {
  bookStatuses: BookStatus[]
}

export default function BooksTab({ bookStatuses }: BooksTabProps) {
  const groupedByStatus = bookStatuses.reduce<Record<string, BookStatus[]>>(
    (acc, book) => {
      if (!acc[book.status]) {
        acc[book.status] = []
      }
      acc[book.status].push(book)
      return acc
    },
    {}
  )

  return (
    <TabsContent value="books" className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnimatedCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Currently Reading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {groupedByStatus["reading"]?.length ?? 0}
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Want to Read
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {groupedByStatus["want_to_read"]?.length ?? 0}
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              Read
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {groupedByStatus["read"]?.length ?? 0}
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-red-600" />
              Abandoned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {groupedByStatus["abandoned"]?.length ?? 0}
            </div>
          </CardContent>
        </AnimatedCard>
      </div>
    </TabsContent>
  )
}
