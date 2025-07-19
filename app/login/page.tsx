import LoginForm from "@/components/auth/login"
import { AnimatedCard } from "@/components/ui/animated-card"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-pastel p-4">
      <AnimatedCard className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-pastel-purple rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-xl font-bold text-gray-800">BookMuse</span>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-purple-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  )
}
