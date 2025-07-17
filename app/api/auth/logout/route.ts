import { API_URL } from "@/lib/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("refreshToken")?.value

  if (!refreshToken) {
    return new NextResponse("No refresh token", { status: 400 })
  }

  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  })

  const response = NextResponse.json({ ok: true })
  response.cookies.delete("accessToken")
  response.cookies.delete("refreshToken")
  return response
}
