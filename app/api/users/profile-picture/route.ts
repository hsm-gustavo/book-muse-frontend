import { API_URL } from "@/lib/constants"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const reqData = await req.formData()
  const file = reqData.get("file")

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const res = await fetch(`${API_URL}/users/me/profile-picture`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: reqData,
  })

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json({ error }, { status: res.status })
  }

  const data = await res.json()

  return NextResponse.json(data)
}
