import { cookies } from "next/headers"
import ProfileData from "./profile-data"
import { API_URL } from "@/lib/constants"
import { FullProfile } from "@/lib/types/user"
import { getCurrentUser } from "@/lib/user"
import { notFound } from "next/navigation"

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

export default async function UserPage() {
  const user = await getCurrentUser()
  if (!user) notFound()

  const userProfile = getProfile(user?.sub)

  return <ProfileData userProfile={userProfile} />
}
