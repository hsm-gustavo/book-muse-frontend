import { API_URL } from "@/lib/constants"
import { FullProfile } from "@/lib/types/user"
import { getCurrentUser } from "@/lib/user"
import { ArrowLeft } from "lucide-react"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import ReviewsContainer from "./review-container"

async function getProfile(userId: string): Promise<FullProfile> {
  const accessToken = (await cookies()).get("accessToken")?.value
  let headers: HeadersInit = {}
  if (accessToken) {
    headers = {
      Authorization: `Bearer ${accessToken}`,
    }
  }

  const res = await fetch(`${API_URL}/users/${userId}/full-profile`, {
    headers,
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(error)
  }

  const data = await res.json()

  return data
}

export default async function UserReviewsPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

  const user = await getCurrentUser()
  const userProfile = await getProfile(userId)

  return (
    <div className="min-h-screen gradient-pastel">
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/users/${userId}`}
            className="inline-flex items-center mb-6 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4">
              <Image
                src={
                  userProfile.profilePicture ||
                  "/api/placeholder/80/80?format=jpeg"
                }
                alt={userProfile.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold">
                  {userProfile.name}&apos;s Reviews
                </h1>
              </div>
            </div>
          </div>

          <ReviewsContainer
            userName={userProfile.name}
            userId={user?.sub}
            reviewUserId={userId}
            isLogged={!!user}
          />
        </div>
      </main>
    </div>
  )
}
