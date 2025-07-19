import { API_URL } from "@/lib/constants"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const slug = (await params).slug.join("/")
  const proxyUrl = new URL(`${API_URL}/placeholder/${slug}`)
  proxyUrl.search = req.nextUrl.search
  try {
    const response = await fetch(proxyUrl.toString(), {
      method: "GET",
      headers: req.headers,
    })
    const body = await response.arrayBuffer()
    return new NextResponse(body, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/octet-stream",
      },
    })
  } catch (err) {
    console.error("Proxy error:", err)
    return new NextResponse("Error proxying request", { status: 500 })
  }
}
