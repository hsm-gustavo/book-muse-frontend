"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ProfileAvatar } from "@/components/ui/profile-avatar"
import { FollowButton } from "./follow-button"
import type { UserSearchResult } from "@/types/user-search"
import { motion } from "motion/react"
import { formatDistanceToNow } from "date-fns"

interface UserSearchCardProps {
  user: UserSearchResult
  showFollowButton?: boolean
  index?: number
}

export function UserSearchCard({
  user,
  showFollowButton = true,
  index = 0,
}: UserSearchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="border-accent-blue/20 hover:border-gradient-purple transition-all duration-200 shadow-sm hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/users/${user.id}`}
              className="flex items-center space-x-3 flex-1 min-w-0"
            >
              <ProfileAvatar userName={user.name} className="h-12 w-12" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {user.name}
                </h3>
                <p className="text-sm text-foreground/60 truncate">
                  {user.email}
                </p>
                <p className="text-xs text-foreground/40">
                  Joined{" "}
                  {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </Link>
            {showFollowButton && (
              <div className="ml-3 flex-shrink-0">
                <FollowButton userId={user.id} className="text-sm px-3 py-1" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
