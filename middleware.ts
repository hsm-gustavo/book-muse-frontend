import { NextResponse, type NextRequest } from "next/server"
import { API_URL } from "./lib/constants"
import { jwtDecode } from "jwt-decode"

const ACCESS_TOKEN_NAME = "accessToken"
const REFRESH_TOKEN_NAME = "refreshToken"

const protectedPaths = ["/dashboard", "/me", "/settings"]

function isExpired(token: string) {
  try {
    const { exp }: { exp?: number } = jwtDecode(token)
    return !exp || exp * 1000 < Date.now() + 60_000 // refresh if about to expire
  } catch {
    return true
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const access = req.cookies.get(ACCESS_TOKEN_NAME)?.value
  const refresh = req.cookies.get(REFRESH_TOKEN_NAME)?.value

  if ((!access && refresh) || (access && isExpired(access))) {
    const url = req.nextUrl.clone()
    url.pathname = "/api/auth/refresh-token"
    const response = NextResponse.rewrite(url)
    response.headers.set("x-return-to", req.nextUrl.pathname)
    return response
  }

  if (!protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

  if (access) {
    return response
  }

  if (refresh) {
    const url = req.nextUrl.clone()
    url.pathname = "/api/auth/refresh-token"
    const response = NextResponse.rewrite(url)
    response.headers.set("x-return-to", req.nextUrl.pathname)

    return response
  }
  const loginUrl = req.nextUrl.clone()
  loginUrl.pathname = "/login"
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
