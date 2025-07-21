"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetcher } from "@/lib/api"
import { ReadingStatusResponse } from "@/lib/types/reading-status"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

interface ReadingStatusFormProps {
  initialStatus?: string
  openLibraryId: string
}

export default function ReadingStatusForm({
  initialStatus,
  openLibraryId,
}: ReadingStatusFormProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async (status: string) => {
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
        queryKey: ["bookStatus"],
      })
    },
  })

  const { watch, setValue } = useForm({
    defaultValues: {
      status: initialStatus || "",
    },
  })

  const status = watch("status")

  return (
    <Select
      value={status}
      onValueChange={(value) => {
        setValue("status", value)
        mutate(value)
      }}
      disabled={isPending}
    >
      <SelectTrigger>
        <SelectValue placeholder="Set reading status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="want_to_read">Want to Read</SelectItem>
        <SelectItem value="reading">Currently Reading</SelectItem>
        <SelectItem value="read">Read</SelectItem>
        <SelectItem value="abandoned">Abandoned</SelectItem>
      </SelectContent>
    </Select>
  )
}
