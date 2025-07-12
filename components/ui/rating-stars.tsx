import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number // 0-5
  maxRating?: number
  size?: number
  className?: string
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 16,
  className,
}: RatingStarsProps) {
  const stars = []
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <Star
        key={i}
        size={size}
        className={cn(
          "transition-colors duration-200",
          i <= rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300",
          className
        )}
      />
    )
  }
  return <div className="flex items-center gap-0.5">{stars}</div>
}
