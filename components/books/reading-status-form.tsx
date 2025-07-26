"use client"

import { fetcher } from "@/lib/api"
import {
  ReadingStatus,
  ReadingStatusResponse,
} from "@/lib/types/reading-status"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { getStatusColors } from "@/app/book/[isbn]/utils"
import { BookOpen, Check, ChevronDown, Eye, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import LoadingDots from "../loading-dots"

interface ReadingStatusSelectorProps {
  openLibraryId: string
  initialStatus?: ReadingStatus | null
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

export default function ReadingStatusSelector({
  openLibraryId,
  initialStatus = null,
}: ReadingStatusSelectorProps) {
  const queryClient = useQueryClient()

  const [localStatus, setLocalStatus] = useState<ReadingStatus | null>(
    initialStatus
  )
  const [debouncedStatus] = useDebounce(localStatus, 500)
  const [hasUserChanged, setHasUserChanged] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: async (status: ReadingStatus | null) => {
      return await fetcher<ReadingStatusResponse>("/api/reading-status", {
        method: "POST",
        body: JSON.stringify({
          openLibraryId,
          status,
        }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["status", openLibraryId],
      })
      setHasUserChanged(false)
    },
  })

  useEffect(() => {
    if (hasUserChanged && debouncedStatus !== initialStatus) {
      mutate(debouncedStatus)
    }
  }, [debouncedStatus, initialStatus, mutate, hasUserChanged])

  const isProcessing = isPending || hasUserChanged

  const handleStatusChange = (status: ReadingStatus | null) => {
    setHasUserChanged(true)
    setLocalStatus(status)
  }

  const currentStatus = debouncedStatus ?? localStatus
  const currentOption =
    statusOptions.find((opt) => opt.value === currentStatus) || statusOptions[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-56 justify-between border-2 transition-all duration-200 bg-transparent",
            `${getStatusColors(currentStatus || null)}`
          )}
          disabled={isProcessing}
        >
          <div className="flex items-center space-x-2">
            {isProcessing ? (
              <LoadingDots className="w-2 h-2" />
            ) : (
              currentOption.icon
            )}
            <span className="font-medium">{currentOption.label}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value || "none"}
            onClick={() => handleStatusChange(option.value)}
            disabled={isProcessing}
            className="flex items-center space-x-2"
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
  )
}
