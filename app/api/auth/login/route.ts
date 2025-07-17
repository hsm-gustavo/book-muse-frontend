import { API_URL } from "@/lib/constants"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const res = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: res.status })
  }

  const { accessToken, refreshToken } = await res.json()
  const response = NextResponse.json({ ok: true })
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15,
  })
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
