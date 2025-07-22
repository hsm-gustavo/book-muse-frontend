import { API_URL } from "@/lib/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const url = `${API_URL}/reviews/${id}/like`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: res.status })
  }

  return new NextResponse(null, {
    status: 204,
  })
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const url = `${API_URL}/reviews/${id}/like`

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json(error, { status: res.status })
  }

  return new NextResponse(null, {
    status: 204,
  })
}
