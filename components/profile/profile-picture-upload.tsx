"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import { useSignedProfilePicture } from "@/hooks/use-signed-profile-picture"
import { ProfileAvatar } from "@/components/ui/profile-avatar"
import { Camera, Loader2 } from "lucide-react"
import { motion } from "motion/react"

interface ProfilePictureUploadProps {
  userName: string
}

export function ProfilePictureUpload({ userName }: ProfilePictureUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { updateUser, user } = useAuth()
  const { refresh: refreshSignedUrl } = useSignedProfilePicture()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Create preview
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)

      // Upload file
      handleUpload(file)
    }
  }

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const response = await apiClient.uploadProfilePicture(file)

      // Update user context with new profile picture
      if (user) {
        updateUser({
          ...user,
          profilePicture: response.profilePicture,
        })
      }

      // Trigger SWR revalidation for the signed URL
      await refreshSignedUrl()

      // Clean up preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
    } catch (error) {
      console.error("Upload failed:", error)
      // Reset preview on error
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
    } finally {
      setIsUploading(false)
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="Preview"
              className="h-24 w-24 rounded-full object-cover border-4 border-pastel-purple"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
          </div>
        ) : (
          <ProfileAvatar
            userName={userName}
            className="h-24 w-24"
            fallbackClassName="text-lg"
            showLoadingSpinner={isUploading}
          />
        )}

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="sm"
            variant="secondary"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
            onClick={triggerFileSelect}
            disabled={isUploading}
          >
            <Camera className="h-4 w-4 text-white" />
          </Button>
        </motion.div>
      </motion.div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-sm text-foreground/60 text-center">
        Click the camera icon to upload a new profile picture
      </p>
    </div>
  )
}
