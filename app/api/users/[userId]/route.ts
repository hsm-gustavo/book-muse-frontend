import { API_URL } from "@/lib/constants"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId

  const res = await fetch(`${API_URL}/users/${userId}`)

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: res.status })
  }

  const data = await res.json()

  return data
}
