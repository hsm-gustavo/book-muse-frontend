"use client"

import { FullProfile } from "@/lib/types/user"
import { AnimatedCard } from "../ui/animated-card"
import { CardContent } from "../ui/card"
import AvatarUpload from "./avatar-upload"
import NameEditor from "./name-editor"
import AccountActions from "./account-actions"

interface ProfileHeaderProps {
  userProfile: FullProfile
}

export default function ProfileHeader({ userProfile }: ProfileHeaderProps) {
  return (
    <AnimatedCard className="mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <AvatarUpload userProfile={userProfile} />
          <div className="flex-1 text-center md:text-left">
            <NameEditor userProfile={userProfile} />
            <p className="text-gray-600 mb-4">{userProfile.email}</p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {userProfile.readBooksCount}
                </div>
                <div className="text-sm text-gray-500">Books Read</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {userProfile.followersCount}
                </div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {userProfile.followingCount}
                </div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {userProfile.recentReviews.length}
                </div>
                <div className="text-sm text-gray-500">Recent Reviews</div>
              </div>
            </div>
          </div>
        </div>

        <AccountActions />
      </CardContent>
    </AnimatedCard>
  )
}
