"use client"

import ProfileContent from "@/components/profile/profile-content"
import ProfileHeader from "@/components/profile/profile-header"
import { FullProfile } from "@/lib/types/user"
import { use } from "react"

export default function ProfileData({
  userProfile,
}: {
  userProfile: Promise<FullProfile>
}) {
  const user = use(userProfile)

  return (
    <div className="min-h-screen gradient-pastel">
      <div className="pt-20 container mx-auto px-4 py-8 max-w-4xl">
        <ProfileHeader userProfile={user} />
        <ProfileContent userProfile={user} />
      </div>
    </div>
  )
}
