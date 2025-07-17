"use client"

import { cn } from "@/lib/utils"
import { motion, Variants } from "motion/react"

interface LoadingDotsProps {
  className?: string
}

export default function LoadingDots({ className }: LoadingDotsProps) {
  const dotVariants: Variants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div className="flex justify-center items-center gap-2.5">
      <motion.div
        className={cn(
          "w-5 h-5 rounded-full bg-white will-change-transform",
          className
        )}
        variants={dotVariants}
      />
      <motion.div
        className={cn(
          "w-5 h-5 rounded-full bg-white will-change-transform",
          className
        )}
        variants={dotVariants}
      />
      <motion.div
        className={cn(
          "w-5 h-5 rounded-full bg-white will-change-transform",
          className
        )}
        variants={dotVariants}
      />
    </motion.div>
  )
}
