import { API_URL } from "@/lib/constants"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ isbn: string }> }
) {
  const { isbn } = await params

  const url = `${API_URL}/books/isbn/${isbn}`

  const res = await fetch(url)

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: res.status })
  }

  const data = await res.json()

  return NextResponse.json(data)
}
