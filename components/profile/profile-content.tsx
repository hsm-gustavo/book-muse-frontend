import ReviewsTab from "./reviews-tab"
import { FullProfile } from "@/lib/types/user"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MessageCircle, Star } from "lucide-react"
import Link from "next/link"
import { AnimatedButton } from "../ui/animated-button"
import { AnimatedCard } from "../ui/animated-card"

interface ProfileContentProps {
  userProfile: FullProfile
}

export default function ProfileContent({ userProfile }: ProfileContentProps) {
  return (
    <AnimatedCard className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Recent Reviews
          </CardTitle>
          <Link href={`/reviews/user/${userProfile.id}`}>
            <AnimatedButton variant="outline" size="sm">
              View All Reviews
            </AnimatedButton>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {userProfile.recentReviews.length > 0 ? (
          <ReviewsTab reviews={userProfile.recentReviews} />
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
            <p className="text-gray-500 mb-4">
              Start reading and share your thoughts with others!
            </p>
            <Link href="/search">
              <AnimatedButton>
                <BookOpen className="h-4 w-4 mr-2" />
                Find Books to Review
              </AnimatedButton>
            </Link>
          </div>
        )}
      </CardContent>
    </AnimatedCard>
  )
}
