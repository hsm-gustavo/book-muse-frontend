import { Heart, Star } from "lucide-react"
import { AnimatedCard } from "../ui/animated-card"
import { CardContent, CardHeader, CardTitle } from "../ui/card"
import { TabsContent } from "../ui/tabs"
import { Review } from "@/lib/types/review"

interface ReviewsTabProps {
  reviews: Review[]
}

export default function ReviewsTab({ reviews }: ReviewsTabProps) {
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
    <TabsContent value="reviews" className="space-y-4">
      {reviews.map((review) => (
        <AnimatedCard key={review.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{review.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart
                  className={`h-4 w-4 ${
                    review.likedByMe
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-sm">{review.likeCount}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{review.description}</p>
          </CardContent>
        </AnimatedCard>
      ))}
    </TabsContent>
  )
}
