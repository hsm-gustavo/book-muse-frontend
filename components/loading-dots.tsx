"use client"

import { cn } from "@/lib/utils"
import { motion, stagger, Variants } from "motion/react"

interface LoadingDotsProps {
  className?: string
  y?: number
}

export default function LoadingDots({ className, y = -5 }: LoadingDotsProps) {
  const dotVariants: Variants = {
    jump: {
      y: y,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      animate="jump"
      transition={{ delayChildren: stagger(-0.2, { from: "last" }) }}
      className="flex justify-center items-center gap-2.5"
    >
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
