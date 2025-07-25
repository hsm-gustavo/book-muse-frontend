"use server"

import { API_URL } from "@/lib/constants"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { profileSchema, userNameSchema } from "./_lib/definitions"
import { z } from "zod"
import { redirect } from "next/navigation"

type PictureFormState =
  | {
      success: boolean
      error?: string
      errors?: { file?: string[] | undefined }
      message?: string
      imageUrl?: string
    }
  | {
      errors: { file?: string[] | undefined }
      success: boolean
      error?: string
      message?: string
      imageUrl?: string
    }
  | null

export async function updateProfilePicture(
  prevState: PictureFormState,
  formData: FormData
) {
  const file = formData.get("file") as File
  const accessToken = (await cookies()).get("accessToken")?.value

  if (!file) {
    return {
      success: false,
      error: "No file provided",
    }
  }

  const validationResult = profileSchema.safeParse({ file })

  if (!validationResult.success) {
    return {
      success: false,
      errors: z.flattenError(validationResult.error).fieldErrors,
    }
  }

  try {
    const res = await fetch(`${API_URL}/users/me/profile-picture`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
    revalidatePath("/me")

    const data = await res.json()

    return {
      success: true,
      message: "Profile picture updated successfully!",
      imageUrl: data.profilePicture,
    }
  } catch (error) {
    console.error("Upload error:", error)
    return {
      success: false,
      error: "Failed to update profile picture. Please try again.",
    }
  }
}

type UserNameFormState =
  | {
      success: boolean
      errors?: string[]
      message?: string
      name?: string
    }
  | undefined

export async function updateUserName(
  prevState: UserNameFormState,
  formData: FormData
) {
  try {
    const name = formData.get("name") as string

    const validation = userNameSchema.safeParse({ name })

    if (!validation.success) {
      return {
        success: false,
        errors: z.flattenError(validation.error).fieldErrors.name || [
          "Invalid name",
        ],
      }
    }

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    const res = await fetch(`${API_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: validation.data.name }),
    })

    if (!res.ok) {
      return {
        success: false,
        errors: [await res.text()],
      }
    }

    const data = await res.json()

    revalidatePath("/me")

    return {
      success: true,
      message: "Name updated successfully!",
      name: data.name,
    }
  } catch (error) {
    console.error("Name update error:", error)
    return {
      success: false,
      errors: ["Failed to update name. Please try again."],
    }
  }
}

type LogoutFormState =
  | {
      success: boolean
      error: string
    }
  | undefined

export async function logout(prevState: LogoutFormState, formData: FormData) {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("refreshToken")?.value
  const accessToken = cookieStore.get("accessToken")?.value

  try {
    if (!refreshToken) {
      return {
        success: false,
        error: "No refresh token provided",
      }
    }

    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!res.ok) {
      return {
        success: false,
        error: await res.text(),
      }
    }

    cookieStore.delete("accessToken")
    cookieStore.delete("refreshToken")

    revalidatePath("/me")
  } catch (error) {
    console.error("Logout error:", error)
    return {
      success: false,
      error: "Failed to logout. Please try again.",
    }
  }

  redirect("/")
}

type DeleteAccountFormState =
  | {
      success: boolean
      error: string
    }
  | undefined

export async function deleteUserAccount(
  prevState: DeleteAccountFormState,
  formData: FormData
) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      return {
        success: false,
        error: await res.text(),
      }
    }

    cookieStore.delete("accessToken")
    cookieStore.delete("refreshToken")

    revalidatePath("/me")
  } catch (error) {
    console.error("Delete account error:", error)
    return {
      success: false,
      error: "Failed to delete account. Please try again.",
    }
  }

  redirect("/")
}
