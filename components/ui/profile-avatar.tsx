"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSignedProfilePicture } from "@/hooks/use-signed-profile-picture"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfileAvatarProps {
  userName: string
  className?: string
  fallbackClassName?: string
  showLoadingSpinner?: boolean
}

export function ProfileAvatar({
  userName,
  className,
  fallbackClassName,
  showLoadingSpinner = false,
}: ProfileAvatarProps) {
  const { signedUrl, isLoading } = useSignedProfilePicture()

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="relative">
      <Avatar className={cn("border-2 border-pastel-purple", className)}>
        <AvatarImage
          src={signedUrl || "/placeholder.svg?height=100&width=100"}
          alt={userName}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = "/placeholder.svg?height=100&width=100"
          }}
        />
        <AvatarFallback
          className={cn(
            "bg-gradient-to-br from-pastel-purple to-pastel-pink font-semibold",
            fallbackClassName
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>

      {showLoadingSpinner && isLoading && (
        <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
        </div>
      )}
    </div>
  )
}
