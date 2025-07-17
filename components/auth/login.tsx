"use client"

import { useActionState } from "react"
import { AnimatedButton } from "../ui/animated-button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import LoadingDots from "../loading-dots"
import { login } from "@/app/login/actions"

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          name="email"
          required
        />
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" required />
        {state?.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password}</p>
        )}
      </div>
      <AnimatedButton
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        disabled={pending}
      >
        {pending ? <LoadingDots className="w-2 h-2" /> : "Log In"}
      </AnimatedButton>
    </form>
  )
}
