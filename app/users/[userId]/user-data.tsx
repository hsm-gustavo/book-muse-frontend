"use client"

import { FullProfile } from "@/lib/types/user"
import { use } from "react"
import UserHeader from "./user-header"
import RecentReviews from "./recent-reviews"
import { ArrowLeft, Users } from "lucide-react"
import Link from "next/link"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function UserData({
  userPromise,
}: {
  userPromise: Promise<FullProfile>
}) {
  const user = use(userPromise)

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">User not found</h3>
              <p className="text-muted-foreground mb-4">
                The user you're looking for doesn't exist or couldn't be loaded.
              </p>
              <Link href="/search/users">
                <AnimatedButton>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to User Search
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <>
      <UserHeader user={user} />
      <RecentReviews user={user} />
    </>
  )
}
