import { AnimatedCard } from "@/components/ui/animated-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FullProfile } from "@/lib/types/user"
import { formatDate } from "@/lib/utils"
import { MessageCircle, Star } from "lucide-react"

export default function RecentReviews({ user }: { user: FullProfile }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <AnimatedCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Recent Reviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        {user.recentReviews.length > 0 ? (
          <div className="space-y-6">
            {user.recentReviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-border pb-6 last:border-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{review.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
            <p className="text-muted-foreground">
              {user.name} hasn&apos;t written any reviews yet.
            </p>
          </div>
        )}
      </CardContent>
    </AnimatedCard>
  )
}
