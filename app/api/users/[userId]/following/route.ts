import { API_URL } from "@/lib/constants"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId
  const url = new URL(`${API_URL}/users/${userId}/following`)

  const searchParams = req.nextUrl.searchParams
  const cursor = searchParams.get("cursor")
  const limit = searchParams.get("limit")

  if (cursor) url.searchParams.append("cursor", cursor)
  if (limit) url.searchParams.append("limit", limit)

  const res = await fetch(url.toString())

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: res.status })
  }

  const data = await res.json()

  return data
}
