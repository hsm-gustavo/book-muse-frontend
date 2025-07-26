"use client"

import LoadingDots from "@/components/loading-dots"
import { AnimatedButton } from "@/components/ui/animated-button"
import { useFormStatus } from "react-dom"

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <AnimatedButton type="submit" disabled={pending}>
      {pending ? <LoadingDots className="w-2 h-2" /> : "Search"}
    </AnimatedButton>
  )
}
