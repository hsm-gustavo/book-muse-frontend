import { API_URL } from "@/lib/constants"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const url = `${API_URL}/users`
  const data = await request.json()

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.text()
    return NextResponse.json(error, { status: response.status })
  }

  const user = await response.json()
  return NextResponse.json(user)
}
