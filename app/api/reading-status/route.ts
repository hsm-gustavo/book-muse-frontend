import { API_URL } from "@/lib/constants"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const searchParams = req.nextUrl.searchParams
  const status = searchParams.get("status")

  const url = new URL(`${API_URL}/reading-status`)
  if (status) {
    url.searchParams.set("status", status)
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: res.status })
  }

  const data = await res.json()

  console.log(data)

  return NextResponse.json(data)
}
