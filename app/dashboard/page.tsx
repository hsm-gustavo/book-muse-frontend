"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { useAuth } from "@/lib/auth"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { User, Settings, RefreshCw } from "lucide-react"
import { motion } from "motion/react"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { PageTransition } from "@/components/ui/page-transition"
import { ProfileAvatar } from "@/components/ui/profile-avatar"

export default function DashboardPage() {
  const { user, refreshAuth, isLoading } = useAuth()

  const handleRefreshToken = async () => {
    try {
      await refreshAuth()
      alert("Token refreshed successfully!")
    } catch {
      alert("Failed to refresh token")
    }
  }

  if (isLoading || !user) {
    return null
  }

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-pastel-blue/30 to-pastel-green/30">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              <motion.div
                className="text-center space-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent">
                  Welcome back to BookMuse, {user?.name}!
                </h1>
                <p className="text-foreground/60">
                  Manage your reading journey and discover new books
                </p>
              </motion.div>

              <motion.div
                className="flex justify-center mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ProfileAvatar
                  userName={user?.name || "User"}
                  className="h-20 w-20"
                  fallbackClassName="text-xl"
                />
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatedCard
                  className="border-accent-blue/20 hover:shadow-lg transition-shadow"
                  delay={0.1}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gradient-purple" />
                      Profile
                    </CardTitle>
                    <CardDescription>
                      View and edit your profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatedButton
                      asChild
                      className="w-full bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
                    >
                      <Link href="/profile">Manage Profile</Link>
                    </AnimatedButton>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard
                  className="border-accent-purple/20 hover:shadow-lg transition-shadow"
                  delay={0.2}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-gradient-purple" />
                      Settings
                    </CardTitle>
                    <CardDescription>
                      Configure your account settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatedButton
                      asChild
                      variant="outline"
                      className="w-full border-gradient-purple text-gradient-purple hover:bg-pastel-purple bg-transparent"
                    >
                      <Link href="/settings">Open Settings</Link>
                    </AnimatedButton>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard
                  className="border-accent-green/20 hover:shadow-lg transition-shadow"
                  delay={0.3}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 text-gradient-purple" />
                      Refresh Token
                    </CardTitle>
                    <CardDescription>
                      Manually refresh your authentication token
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatedButton
                      onClick={handleRefreshToken}
                      variant="outline"
                      className="w-full border-gradient-purple text-gradient-purple hover:bg-pastel-green bg-transparent"
                    >
                      Refresh Now
                    </AnimatedButton>
                  </CardContent>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  )
}
