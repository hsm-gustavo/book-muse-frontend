"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

export function AnimatedButton({
  children,
  className,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}
