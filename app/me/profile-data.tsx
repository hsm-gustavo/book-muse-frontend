"use client"

import LoadingDots from "@/components/loading-dots"
import ProfileContent from "@/components/profile/profile-content"
import ProfileHeader from "@/components/profile/profile-header"
import { fetcher } from "@/lib/api"
import { BookStatus } from "@/lib/types/book"
import { MyReview } from "@/lib/types/review"
import { UserProfile } from "@/lib/types/user"
import { useQuery } from "@tanstack/react-query"
import { notFound } from "next/navigation"

export default function ProfileData() {
  const { data: user, isLoading: uLoading } = useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: () => fetcher<UserProfile>("/api/users"),
  })

  const userId = user?.id

  const { data: reviews, isLoading: rLoading } = useQuery<MyReview[]>({
    queryKey: ["userReviews", userId],
    queryFn: () => fetcher<MyReview[]>(`/api/reviews/user/${userId}`),
    enabled: !!userId,
  })

  const { data: statuses, isLoading: sLoading } = useQuery<BookStatus[]>({
    queryKey: ["bookStatus"],
    queryFn: () => fetcher<BookStatus[]>("/api/reading-status"),
    enabled: !!userId,
  })

  if (uLoading || rLoading || sLoading) {
    return (
      <div className="min-h-screen gradient-pastel flex items-center justify-center">
        <div className="pt-20 container mx-auto px-4 py-8">
          <LoadingDots />
        </div>
      </div>
    )
  }

  if (!user || !reviews || !statuses) {
    notFound()
  }

  return (
    <div className="min-h-screen gradient-pastel">
      <div className="pt-20 container mx-auto px-4 py-8">
        <ProfileHeader userProfile={user} reviews={reviews} />
        <ProfileContent
          bookStatuses={statuses}
          reviews={reviews}
          userProfile={user}
        />
      </div>
    </div>
  )
}
