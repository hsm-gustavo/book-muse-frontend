import { API_URL } from "@/lib/constants"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const searchParams = req.nextUrl.searchParams
  const cursor = searchParams.get("cursor")
  const limit = searchParams.get("limit")

  const url = new URL(`${API_URL}/reviews/user/${id}`)

  if (cursor) url.searchParams.set("cursor", cursor)
  if (limit) url.searchParams.set("limit", limit)

  const res = await fetch(url.toString())

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: res.status })
  }

  const data = await res.json()

  return NextResponse.json(data)
}
