"use client"

import SignupForm from "@/components/auth/signup"
import { AnimatedCard } from "@/components/ui/animated-card"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-pastel p-4">
      <AnimatedCard className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-pastel-purple rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-xl font-bold text-gray-800">BookMuse</span>
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Join the BookMuse community today</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  )
}
