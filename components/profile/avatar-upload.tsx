"use client"

import { updateProfilePicture } from "@/app/me/actions"
import { FullProfile } from "@/lib/types/user"
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react"
import { profileSchema } from "@/app/me/_lib/definitions"
import { z } from "zod"
import { toast } from "sonner"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Camera, Save, Upload, X } from "lucide-react"
import { AnimatedButton } from "../ui/animated-button"
import LoadingDots from "../loading-dots"

interface AvatarUploadProps {
  userProfile: FullProfile
}

export default function AvatarUpload({ userProfile }: AvatarUploadProps) {
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const [state, action, isPending] = useActionState(updateProfilePicture, null)

  useEffect(() => {
    if (state?.success) {
      if (previewUrl && previewFile) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
        setPreviewFile(null)
      }

      toast.success(state.message)
    } else if (state?.error) {
      toast.error(state.error)
    } else if (state?.errors?.file) {
      state.errors.file.forEach((err) => toast.error(err))
    }
  }, [state, previewFile, previewUrl])

  async function onDrop(acceptedFiles: File[]) {
    const file = acceptedFiles[0]
    if (!file) return

    const result = profileSchema.safeParse({ file })

    if (!result.success) {
      const errorMessage =
        z.flattenError(result.error).fieldErrors.file?.[0] || "Invalid file"

      toast.error(errorMessage)
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    const url = URL.createObjectURL(file)
    setPreviewFile(file)
    setPreviewUrl(url)
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive: dropzoneActive,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    disabled: isPending,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  })

  function clearPreview() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setPreviewFile(null)
  }

  function handleSave() {
    if (!previewFile) return
    const formData = new FormData()
    formData.append("file", previewFile)

    startTransition(() => action(formData))
  }

  const currentImageSrc = previewUrl || userProfile.profilePicture
  const hasPreview = !!previewFile

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div
          {...getRootProps()}
          className={cn(
            "relative cursor-pointer transition-all duration-200",
            `${
              isDragActive || dropzoneActive
                ? "ring-2 ring-primary ring-offset-2 rounded-full"
                : ""
            }`,
            `${isPending ? "pointer-events-none" : ""}`
          )}
        >
          <input {...getInputProps()} />

          <Avatar className="h-24 w-24 transition-all duration-200">
            <AvatarImage
              src={currentImageSrc || "/api/placeholder/96/96?format=jpeg"}
              className={cn(
                "transition-all duration-200",
                `${isDragActive || dropzoneActive ? "opacity-70" : ""}`,
                `${hasPreview ? "ring-2 ring-primary ring-offset-2" : ""}`
              )}
            />
            <AvatarFallback className="text-lg">
              {userProfile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {(isDragActive || dropzoneActive) && (
            <div className="absolute inset-0 bg-primary/20 rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
          )}

          <AnimatedButton
            size="sm"
            variant="outline"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 shadow-md bg-background"
            disabled={isPending}
            type="button"
          >
            <Camera className="h-4 w-4" />
          </AnimatedButton>

          {hasPreview && (
            <AnimatedButton
              size="sm"
              variant="outline"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 shadow-md bg-background"
              onClick={clearPreview}
              type="button"
              disabled={isPending}
            >
              <X className="h-3 w-3" />
            </AnimatedButton>
          )}

          {isPending && (
            <div className="absolute inset-0 bg-background/80 rounded-full flex items-center justify-center">
              <LoadingDots className="h-2 w-2" />
            </div>
          )}
        </div>

        {hasPreview && (
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground max-w-40 text-center">
              Preview ready - click save to update your profile picture
            </p>
            <div className="flex space-x-2">
              <AnimatedButton
                onClick={handleSave}
                disabled={isPending}
                size="sm"
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isPending ? (
                  <LoadingDots className="h-2 w-2" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{isPending ? "Saving..." : "Save"}</span>
              </AnimatedButton>
              <AnimatedButton
                onClick={clearPreview}
                disabled={isPending}
                variant="outline"
                size="sm"
              >
                Cancel
              </AnimatedButton>
            </div>
          </div>
        )}

        <form ref={formRef} action={action} className="hidden">
          <input type="file" name="file" />
        </form>
      </div>
    </div>
  )
}
