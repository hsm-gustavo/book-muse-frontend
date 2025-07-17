import { API_URL } from "@/lib/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }

  const userRes = await fetch(`${API_URL}/users/me`, { headers })

  if (!userRes.ok) {
    const error = await userRes.text()
    return NextResponse.json({ error }, { status: userRes.status })
  }

  const user = await userRes.json()
  const userId = user.id

  const [followersRes, followingRes, followCountsRes] = await Promise.all([
    fetch(`${API_URL}/users/${userId}/followers`, { headers }),
    fetch(`${API_URL}/users/${userId}/following`, { headers }),
    fetch(`${API_URL}/users/${userId}/follow-counts`, { headers }),
  ])

  if (!followersRes.ok) {
    const error = await followersRes.text()
    return NextResponse.json({ error }, { status: followersRes.status })
  }

  if (!followingRes.ok) {
    const error = await followingRes.text()
    return NextResponse.json({ error }, { status: followingRes.status })
  }

  if (!followCountsRes.ok) {
    const error = await followCountsRes.text()
    return NextResponse.json({ error }, { status: followCountsRes.status })
  }

  const [followersUsers, followingUsers, followCounts] = await Promise.all([
    followersRes.json(),
    followingRes.json(),
    followCountsRes.json(),
  ])

  const userProfile = {
    ...user,
    followers: {
      count: followCounts.followers,
      users: followersUsers,
    },
    following: {
      count: followCounts.following,
      users: followingUsers,
    },
  }

  return NextResponse.json(userProfile)
}
