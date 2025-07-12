"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { DangerZone } from "@/components/settings/danger-zone"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import { AnimatedCard } from "@/components/ui/animated-card"
import { PageTransition } from "@/components/ui/page-transition"

export default function SettingsPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pastel-yellow/30 to-pastel-orange/30">
        <Navbar />
        <PageTransition>
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent">
                  BookMuse Account Settings
                </h1>
                <p className="text-foreground/60 mt-2">
                  Manage your account preferences and security
                </p>
              </div>

              <AnimatedCard delay={0.2} className="border-accent-yellow/20">
                <CardHeader>
                  <CardTitle className="text-xl">Account Information</CardTitle>
                  <CardDescription>
                    Your current account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground/70">
                        Name
                      </label>
                      <p className="text-foreground">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/70">
                        Email
                      </label>
                      <p className="text-foreground">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/70">
                        Member Since
                      </label>
                      <p className="text-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/70">
                        Last Updated
                      </label>
                      <p className="text-foreground">
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <DangerZone />
            </div>
          </div>
        </PageTransition>
      </div>
    </ProtectedRoute>
  )
}
