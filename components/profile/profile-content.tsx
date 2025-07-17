import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import BooksTab from "./books-tab"
import ReviewsTab from "./reviews-tab"
import FollowersTab from "./followers-tab"
import FollowingTab from "./following-tab"
import { BookStatus } from "@/lib/types/book"
import { Review } from "@/lib/types/review"
import { UserProfile } from "@/lib/types/user"

interface ProfileContentProps {
  bookStatuses: BookStatus[]
  reviews: Review[]
  userProfile: UserProfile
}

export default function ProfileContent({
  bookStatuses,
  reviews,
  userProfile,
}: ProfileContentProps) {
  console.log("stat", bookStatuses)

  return (
    <Tabs defaultValue="books" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="books">My Books</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="followers">Followers</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>

      <BooksTab bookStatuses={bookStatuses} />
      <ReviewsTab reviews={reviews} />
      <FollowersTab userProfile={userProfile} />
      <FollowingTab userProfile={userProfile} />
    </Tabs>
  )
}
