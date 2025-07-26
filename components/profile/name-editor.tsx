"use client"

import { updateUserName } from "@/app/me/actions"
import { FullProfile } from "@/lib/types/user"
import React, { useActionState, useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import { AnimatedButton } from "../ui/animated-button"
import LoadingDots from "../loading-dots"
import { toast } from "sonner"
import { Edit2 } from "lucide-react"

interface NameEditorProps {
  userProfile: FullProfile
}

export default function NameEditor({ userProfile }: NameEditorProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [currentName, setCurrentName] = useState(userProfile.name)
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [state, action, isPending] = useActionState(updateUserName, undefined)

  useEffect(() => {
    if (state?.success) {
      setCurrentName(state.name)
      setIsEditingName(false)
      toast.success(state.message)
    } else if (state?.errors) {
      state.errors.forEach((err) => toast.error(err))
    }
  }, [state])

  useEffect(() => {
    if (isEditingName && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditingName])

  function handleEdit() {
    setIsEditingName(true)
  }

  function handleCancel() {
    setIsEditingName(false)

    if (formRef.current) {
      formRef.current.reset()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
      {isEditingName ? (
        <form ref={formRef} action={action} className="flex items-center gap-2">
          <Input
            ref={inputRef}
            name="name"
            defaultValue={currentName}
            className="text-2xl font-bold"
            disabled={isPending}
            onKeyDown={handleKeyDown}
            required
            maxLength={100}
          />
          <AnimatedButton type="submit" size="sm" disabled={isPending}>
            {isPending ? (
              <>
                <LoadingDots className="h-2 w-2 mr-1" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </AnimatedButton>
          <AnimatedButton
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </AnimatedButton>
        </form>
      ) : (
        <>
          <h1 className="text-3xl font-bold">{currentName}</h1>
          <AnimatedButton
            size="sm"
            variant="ghost"
            onClick={handleEdit}
            disabled={isPending}
          >
            <Edit2 className="h-4 w-4" />
          </AnimatedButton>
        </>
      )}
    </div>
  )
}
