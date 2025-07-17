"use server"

import { redirect } from "next/navigation"
import { FormState, SignupFormSchema } from "./_lib/definitions"
import { z } from "zod"
import { API_URL } from "@/lib/constants"

export async function signup(state: FormState, formData: FormData) {
  const url = `${API_URL}/users`
  const validationResult = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!validationResult.success) {
    return {
      errors: z.flattenError(validationResult.error).fieldErrors,
    }
  }

  const { name, email, password } = validationResult.data

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    const error = await response.text()
    return { message: error || "Error on trying to create user" }
  }

  redirect("/login")
}
