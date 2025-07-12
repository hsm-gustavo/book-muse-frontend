"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useReadingStatus } from "@/hooks/use-reading-status"
import { useAuth } from "@/lib/auth"
import { ChevronDown, Loader2, BookOpen, Check, Eye, X } from "lucide-react"
import { motion } from "motion/react"
import type { ReadingStatus } from "@/types/reading-status"
import {
  getStatusDisplayText,
  getStatusColor,
  getStatusDarkColor,
} from "@/types/reading-status"

interface ReadingStatusSelectorProps {
  openLibraryId: string
  className?: string
}

const statusOptions: Array<{
  value: ReadingStatus | null
  label: string
  icon: React.ReactNode
}> = [
  { value: null, label: "Not Tracked", icon: <X className="h-4 w-4" /> },
  {
    value: "want_to_read",
    label: "Want to Read",
    icon: <Eye className="h-4 w-4" />,
  },
  {
    value: "reading",
    label: "Currently Reading",
    icon: <BookOpen className="h-4 w-4" />,
  },
  { value: "read", label: "Read", icon: <Check className="h-4 w-4" /> },
  { value: "abandoned", label: "Abandoned", icon: <X className="h-4 w-4" /> },
]

export function ReadingStatusSelector({
  openLibraryId,
  className,
}: ReadingStatusSelectorProps) {
  const { user } = useAuth()
  const { status, isLoading, isUpdating, updateStatus } =
    useReadingStatus(openLibraryId)
  const [pendingUpdate, setPendingUpdate] = useState<ReadingStatus | null>(null)

  useEffect(() => {
    if (pendingUpdate !== null) {
      const timer = setTimeout(async () => {
        try {
          await updateStatus(pendingUpdate)
        } catch (error) {
          console.error("Failed to update status:", error)
        }
        setPendingUpdate(null)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [pendingUpdate, updateStatus])

  const handleStatusChange = (newStatus: ReadingStatus | null) => {
    setPendingUpdate(newStatus)
  }

  if (!user) {
    return null
  }

  const currentStatus = pendingUpdate !== null ? pendingUpdate : status
  const currentOption = statusOptions.find(
    (option) => option.value === currentStatus
  )
  const isProcessing = isLoading || isUpdating || pendingUpdate !== null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between border-2 transition-all duration-200 bg-transparent"
            style={{
              backgroundColor: getStatusColor(currentStatus),
              borderColor: getStatusDarkColor(currentStatus),
            }}
            disabled={isProcessing}
          >
            <div className="flex items-center space-x-2">
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                currentOption?.icon || <BookOpen className="h-4 w-4" />
              )}
              <span className="font-medium">
                {getStatusDisplayText(currentStatus)}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option.value || "none"}
              onClick={() => handleStatusChange(option.value)}
              className="flex items-center space-x-2 cursor-pointer"
              disabled={isProcessing}
            >
              {option.icon}
              <span>{option.label}</span>
              {currentStatus === option.value && (
                <Check className="h-4 w-4 ml-auto text-green-600" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
