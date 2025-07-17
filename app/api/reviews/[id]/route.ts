import { API_URL } from "@/lib/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const url = `${API_URL}/reviews/user/${id}`

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: res.status })
  }

  const data = await res.json()

  return NextResponse.json(data)
}
