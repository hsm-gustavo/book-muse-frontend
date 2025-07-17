"use client"

import LoadingDots from "@/components/loading-dots"
import ProfileContent from "@/components/profile/profile-content"
import ProfileHeader from "@/components/profile/profile-header"
import { fetchWithCreds } from "@/lib/api"
import { BookStatus } from "@/lib/types/book"
import { Review } from "@/lib/types/review"
import { UserProfile } from "@/lib/types/user"
import { useQuery } from "@tanstack/react-query"
import { notFound } from "next/navigation"

export default function ProfileData() {
  const { data: user, isLoading: uLoading } = useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: () => fetchWithCreds<UserProfile>("/api/users"),
  })

  const userId = user?.id

  const { data: reviews, isLoading: rLoading } = useQuery<Review[]>({
    queryKey: ["userReviews"],
    queryFn: () => fetchWithCreds<Review[]>(`/api/reviews/${user?.id}`),
    enabled: !!userId,
  })

  const { data: statuses, isLoading: sLoading } = useQuery<BookStatus[]>({
    queryKey: ["bookStatus"],
    queryFn: () => fetchWithCreds<BookStatus[]>("/api/reading-status"),
    enabled: !!userId,
  })

  if (uLoading || rLoading || sLoading) {
    return (
      <div className="min-h-screen gradient-pastel">
        <LoadingDots />
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
