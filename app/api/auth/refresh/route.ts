import { API_URL } from "@/lib/constants"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  })
  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: 401 })
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
}
