"use client"

import { UserProfile } from "@/lib/types/user"
import { AnimatedCard } from "../ui/animated-card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CardContent } from "../ui/card"
import { Review } from "@/lib/types/review"

interface ProfileHeaderProps {
  userProfile: UserProfile
  reviews: Review[]
}

export default function ProfileHeader({
  userProfile,
  reviews,
}: ProfileHeaderProps) {
  return (
    <AnimatedCard className="mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar>
            <AvatarImage
              src={userProfile.profilePicture}
              alt={userProfile.name}
            />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{userProfile.name}</h1>
            <p className="text-gray-600 mb-4">{userProfile.email}</p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {userProfile.readCount}
                </div>
                <div className="text-sm text-gray-500">Books Read</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {userProfile.followers.count}
                </div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {userProfile.following.count}
                </div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {reviews.length}
                </div>
                <div className="text-sm text-gray-500">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </AnimatedCard>
  )
}
