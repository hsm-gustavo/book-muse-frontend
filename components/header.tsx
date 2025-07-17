import { BookOpen, Menu } from "lucide-react"
import { AnimatedButton } from "./ui/animated-button"
import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-pastel-purple rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-xl font-bold text-gray-800">BookMuse</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <AnimatedButton
              variant="ghost"
              className="hidden md:flex text-gray-600 hover:text-purple-600"
            >
              Sign In
            </AnimatedButton>
            <AnimatedButton className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Get Started
            </AnimatedButton>
            <AnimatedButton variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </AnimatedButton>
          </div>
        </div>
      </div>
    </header>
  )
}
