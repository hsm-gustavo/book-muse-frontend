"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ProfileAvatar } from "@/components/ui/profile-avatar"
import { FollowButton } from "./follow-button"
import type { UserFollowInfo } from "@/types/followers"
import { motion } from "motion/react"

interface UserCardProps {
  user: UserFollowInfo
  showFollowButton?: boolean
}

export function UserCard({ user, showFollowButton = true }: UserCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="border-accent-blue/20 hover:border-gradient-purple transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/users/${user.id}`}
              className="flex items-center space-x-3 flex-1"
            >
              <ProfileAvatar userName={user.name} className="h-12 w-12" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {user.name}
                </h3>
                <p className="text-sm text-foreground/60 truncate">
                  {user.email}
                </p>
              </div>
            </Link>
            {showFollowButton && (
              <FollowButton userId={user.id} className="ml-3" />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
