"use client"

import { AnimatedCard } from "@/components/ui/animated-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import { FullProfile } from "@/lib/types/user"
import FollowButton from "./follow-button"
import { Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface UserHeaderProps {
  user: FullProfile
}

export default function UserHeader({ user }: UserHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <AnimatedCard className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <Avatar>
            <AvatarImage src={user.profilePicture} alt={user.name} />
            <AvatarFallback className="text-2xl">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>

              {user.isFollowing !== undefined && (
                <FollowButton
                  userId={user.id}
                  isFollowing={user.isFollowing}
                  followersCount={user.followersCount}
                />
              )}
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {user.readBooksCount}
                </div>
                <div className="text-sm text-gray-500">Books Read</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {user.followersCount}
                </div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {user.followingCount}
                </div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {user.recentReviews.length}
                </div>
                <div className="text-sm text-gray-500">Recent Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </AnimatedCard>
  )
}
