"use server"

import { redirect } from "next/navigation"
import { FormState, LoginFormSchema } from "./_lib/definitions"
import { z } from "zod"
import { API_URL } from "@/lib/constants"
import { cookies } from "next/headers"

export async function login(state: FormState, formData: FormData) {
  const url = `${API_URL}/auth`
  const validationResult = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validationResult.success) {
    return {
      errors: z.flattenError(validationResult.error).fieldErrors,
    }
  }

  const { email, password } = validationResult.data

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.text()
    return { message: error || "Error on trying to login" }
  }

  const { accessToken, refreshToken } = await response.json()

  const cookieStore = await cookies()
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15, // 15 minutos
  })
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  redirect("/me")
}
