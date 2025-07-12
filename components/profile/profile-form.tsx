"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import { Loader2, Save } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

export function ProfileForm() {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const updatedUser = await apiClient.updateProfile({ name })
      updateUser(updatedUser)
      setMessage("Profile updated successfully!")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Update failed")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <Card className="border-accent-blue/20">
      <CardHeader>
        <CardTitle className="text-xl">Profile Information</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-accent-blue/20 focus:border-gradient-purple"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="bg-secondary/50 text-foreground/60"
            />
            <p className="text-xs text-foreground/60">
              Email cannot be changed
            </p>
          </div>

          {message && (
            <div
              className={`text-sm p-3 rounded-md ${
                message.includes("successfully")
                  ? "text-green-700 bg-green-50"
                  : "text-red-600 bg-red-50"
              }`}
            >
              {message}
            </div>
          )}

          <AnimatedButton
            type="submit"
            disabled={isLoading || name === user.name}
            className="bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </AnimatedButton>
        </form>
      </CardContent>
    </Card>
  )
}
