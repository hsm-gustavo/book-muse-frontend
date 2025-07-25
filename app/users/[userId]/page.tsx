import { cookies } from "next/headers"
import { API_URL } from "@/lib/constants"

async function getProfile(userId: string) {
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
