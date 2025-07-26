import { API_URL } from "@/lib/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const token = (await cookies()).get("accessToken")?.value

  const url = `${API_URL}/reviews`

  const { title, description, rating, openLibraryId } = await req.json()

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, rating, openLibraryId }),
  })

  if (!response.ok) {
    const error = await response.text()
    return NextResponse.json(error || "Failed to create review", {
      status: response.status,
    })
  }

  const data = await response.json()

  return NextResponse.json(data)
}
