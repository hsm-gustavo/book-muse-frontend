"use server"

import { API_URL } from "@/lib/constants"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { followSchema } from "./_lib/definitions"
import { z } from "zod"

type FormState =
  | {
      success: boolean
      error?: string
      message?: string
    }
  | undefined

export async function followUser(prevState: FormState, formData: FormData) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  try {
    const userId = formData.get("userId") as string

    const validation = followSchema.safeParse({ userId })

    if (!validation.success) {
      return {
        success: false,
        error:
          z.flattenError(validation.error).fieldErrors.userId?.[0] ||
          "Invalid user ID",
      }
    }

    const res = await fetch(`${API_URL}/users/${userId}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      const error = await res.text()
      return {
        success: false,
        error: error,
      }
    }

    revalidatePath("/users/[userId]", "page")

    return {
      success: true,
      message: "Successfully followed user!",
    }
  } catch (error) {
    console.error("Follow user error:", error)
    return {
      success: false,
      error: "Failed to follow user. Please try again.",
    }
  }
}

export async function unfollowUser(prevState: FormState, formData: FormData) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  try {
    const userId = formData.get("userId") as string

    const validation = followSchema.safeParse({ userId })

    if (!validation.success) {
      return {
        success: false,
        error:
          z.flattenError(validation.error).fieldErrors.userId?.[0] ||
          "Invalid user ID",
      }
    }

    const res = await fetch(`${API_URL}/users/${userId}/unfollow`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      const error = await res.text()
      return {
        success: false,
        error: error,
      }
    }

    revalidatePath("/users/[userId]", "page")

    return {
      success: true,
      message: "Successfully unfollowed user!",
    }
  } catch (error) {
    console.error("Unfollow user error:", error)
    return {
      success: false,
      error: "Failed to unfollow user. Please try again.",
    }
  }
}
