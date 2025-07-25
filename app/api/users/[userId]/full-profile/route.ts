import { API_URL } from "@/lib/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId
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
    return NextResponse.json(error, { status: res.status })
  }

  const data = await res.json()

  return data
}
