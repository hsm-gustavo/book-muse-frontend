"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { ProfileForm } from "@/components/profile/profile-form"
import { useAuth } from "@/lib/auth"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion } from "motion/react"
import { AnimatedCard } from "@/components/ui/animated-card"
import { PageTransition } from "@/components/ui/page-transition"
import { ProfilePictureUpload } from "@/components/profile/profile-picture-upload"

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-pastel-purple/30 to-pastel-pink/30">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent">
                  Your BookMuse Profile
                </h1>
                <p className="text-foreground/60 mt-2">
                  Manage your personal information and profile picture
                </p>
              </div>

              <AnimatedCard className="border-accent-purple/20">
                <CardHeader>
                  <CardTitle className="text-xl">Profile Picture</CardTitle>
                  <CardDescription>
                    Upload or change your profile picture
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <ProfilePictureUpload userName={user.name} />
                  </motion.div>
                </CardContent>
              </AnimatedCard>

              <ProfileForm />
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  )
}
