import { cookies } from "next/headers"
import { API_URL } from "@/lib/constants"
import { FullProfile } from "@/lib/types/user"
import { getCurrentUser } from "@/lib/user"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import UserData from "./user-data"

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

export default async function UserPublicPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

  const userProfile = getProfile(userId)

  return (
    <div className="min-h-screen gradient-pastel">
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href={"/search/users"}
              className="inline-flex items-center mb-6 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft />
              Back to User Search
            </Link>
            <UserData userPromise={userProfile} />
          </div>
        </div>
      </main>
    </div>
  )
}
