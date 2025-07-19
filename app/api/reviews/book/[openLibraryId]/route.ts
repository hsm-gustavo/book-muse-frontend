import { API_URL } from "@/lib/constants"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ openLibraryId: string }> }
) {
  const { openLibraryId } = await params

  const url = `${API_URL}/reviews/book/${openLibraryId}`

  const res = await fetch(url)

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: res.status })
  }

  const data = await res.json()

  return NextResponse.json(data)
}
