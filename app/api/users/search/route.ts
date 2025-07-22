import { API_URL } from "@/lib/constants"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const q = searchParams.get("q")
  const cursor = searchParams.get("cursor")
  const limit = searchParams.get("limit")

  const url = new URL(`${API_URL}/users/search`)
  if (q) url.searchParams.append("q", q)
  if (cursor) url.searchParams.append("cursor", cursor)
  if (limit) url.searchParams.append("limit", limit)

  const res = await fetch(url.toString())

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: res.status })
  }

  const data = await res.json()

  return NextResponse.json(data)
}
