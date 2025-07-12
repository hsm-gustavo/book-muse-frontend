"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

interface RatingSelectorProps {
  initialRating?: number
  onRatingChange: (rating: number) => void
  maxRating?: number
  size?: number
  disabled?: boolean
  className?: string
}

export function RatingSelector({
  initialRating = 0,
  onRatingChange,
  maxRating = 5,
  size = 24,
  disabled = false,
  className,
}: RatingSelectorProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [currentRating, setCurrentRating] = useState(initialRating)

  const handleStarClick = (ratingValue: number) => {
    if (disabled) return
    setCurrentRating(ratingValue)
    onRatingChange(ratingValue)
  }

  const displayRating = hoverRating || currentRating

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
