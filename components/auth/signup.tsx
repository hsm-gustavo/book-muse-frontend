"use client"

import { useActionState } from "react"
import { AnimatedButton } from "../ui/animated-button"
import { signup } from "@/app/signup/actions"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import LoadingDots from "../loading-dots"

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          required
        />
        {state?.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
        />
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
        {state?.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
        />
        {state?.errors?.confirmPassword && (
          <p className="text-sm text-red-500">{state.errors.confirmPassword}</p>
        )}
      </div>
      <AnimatedButton
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        disabled={pending}
      >
        {pending ? <LoadingDots className="w-2 h-2" /> : "Create Account"}
      </AnimatedButton>
    </form>
  )
}
