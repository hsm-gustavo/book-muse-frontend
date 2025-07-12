"use client"

import { Badge } from "@/components/ui/badge"
import { useReadingStatus } from "@/hooks/use-reading-status"
import { useAuth } from "@/lib/auth"
import { BookOpen, Check, Eye, X } from "lucide-react"
import type { ReadingStatus } from "@/types/reading-status"
import {
  getStatusDisplayText,
  getStatusColor,
  getStatusDarkColor,
} from "@/types/reading-status"

interface ReadingStatusBadgeProps {
  openLibraryId: string
  className?: string
  showIcon?: boolean
}

const statusIcons: Record<ReadingStatus, React.ReactNode> = {
  reading: <BookOpen className="h-3 w-3" />,
  read: <Check className="h-3 w-3" />,
  want_to_read: <Eye className="h-3 w-3" />,
  abandoned: <X className="h-3 w-3" />,
}

export function ReadingStatusBadge({
  openLibraryId,
  className,
  showIcon = true,
}: ReadingStatusBadgeProps) {
  const { user } = useAuth()
  const { status, isLoading } = useReadingStatus(openLibraryId)

  if (!user || isLoading || !status) {
    return null
  }

  return (
    <Badge
      variant="secondary"
      className={`flex items-center space-x-1 border ${className}`}
      style={{
        backgroundColor: getStatusColor(status),
        borderColor: getStatusDarkColor(status),
        color: "hsl(222.2 84% 4.9%)", // Foreground color
      }}
    >
      {showIcon && statusIcons[status]}
      <span className="text-xs font-medium">
        {getStatusDisplayText(status)}
      </span>
    </Badge>
  )
}
