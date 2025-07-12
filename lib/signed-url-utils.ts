/**
 * Utility functions for handling signed URLs
 */

export function isSignedUrlExpired(url: string | null): boolean {
  if (!url) return true

  try {
    const urlObj = new URL(url)
    const expires = urlObj.searchParams.get("X-Amz-Expires")
    const date = urlObj.searchParams.get("X-Amz-Date")

    if (!expires || !date) return true

    const expirationTime =
      new Date(date).getTime() + Number.parseInt(expires) * 1000
    return Date.now() > expirationTime
  } catch {
    return true
  }
}

export function getSignedUrlTimeRemaining(url: string | null): number {
  if (!url) return 0

  try {
    const urlObj = new URL(url)
    const expires = urlObj.searchParams.get("X-Amz-Expires")
    const date = urlObj.searchParams.get("X-Amz-Date")

    if (!expires || !date) return 0

    const expirationTime =
      new Date(date).getTime() + Number.parseInt(expires) * 1000
    return Math.max(0, expirationTime - Date.now())
  } catch {
    return 0
  }
}
