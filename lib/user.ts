import { cookies } from "next/headers"
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  sub: string
  email: string
  iat?: number
  exp?: number
  aud?: string
  iss?: string
}

export async function getCurrentUser() {
  const token = (await cookies()).get("accessToken")?.value
  if (!token) return null

  try {
    return jwtDecode<JwtPayload>(token)
  } catch (error) {
    console.error(error)
    return null
  }
}
