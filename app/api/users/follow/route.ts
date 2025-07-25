import { API_URL } from "@/lib/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const { userId } = await req.json()

  const res = await fetch(`${API_URL}/users/${userId}/follow`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json({ error }, { status: res.status })
  }

  return new NextResponse(null, { status: 204 })
}

export async function DELETE(req: Request) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const { userId } = await req.json()

  const res = await fetch(`${API_URL}/users/${userId}/unfollow`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json({ error }, { status: res.status })
  }

  return new NextResponse(null, { status: 204 })
}
