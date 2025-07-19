import { NextResponse, type NextRequest } from "next/server"
import { API_URL } from "./lib/constants"

const ACCESS_TOKEN_NAME = "accessToken"
const REFRESH_TOKEN_NAME = "refreshToken"

const protectedPaths = ["/dashboard", "/me", "/settings"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const access = req.cookies.get(ACCESS_TOKEN_NAME)?.value
  const refresh = req.cookies.get(REFRESH_TOKEN_NAME)?.value

  const response = NextResponse.next()

  if (access) {
    return response
  }

  if (refresh) {
    const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({ refreshToken: refresh }),
    })

    if (refreshResponse.ok) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refreshResponse.json()

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      })
      response.cookies.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })

      return response
    }
    console.log("not ok refresh")
  }
  console.log("redirect to login")
  const loginUrl = req.nextUrl.clone()
  loginUrl.pathname = "/login"
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/dashboard/:path*", "/me/:path*", "/settings/:path*"],
}
