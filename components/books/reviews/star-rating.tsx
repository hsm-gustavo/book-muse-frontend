"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { useState } from "react"

interface StarRatingProps {
  value: number
  onRate: (rating: number) => void
  disabled?: boolean
  maxRating?: number
  size?: number
  className?: string
}

export default function StarRating({
  value,
  onRate,
  disabled = false,
  maxRating = 5,
  size = 20,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const displayRating = hoverRating || value

  function handleStarClick(rating: number) {
    if (!disabled) {
      onRate(rating)
    }
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const ratingValue = i + 1
        return (
          <motion.div
            key={ratingValue}
            whileHover={{ scale: disabled ? 1 : 1.2 }}
            whileTap={{ scale: disabled ? 1 : 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onMouseEnter={() => !disabled && setHoverRating(ratingValue)}
            onMouseLeave={() => !disabled && setHoverRating(0)}
            onClick={() => handleStarClick(ratingValue)}
            className={cn(
              "cursor-pointer",
              disabled && "cursor-not-allowed opacity-70"
            )}
          >
            <Star
              size={size}
              className={cn(
                "transition-colors duration-200",
                displayRating >= ratingValue
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-300 text-gray-300"
              )}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
