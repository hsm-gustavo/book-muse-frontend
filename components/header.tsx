import { BookOpen, Menu } from "lucide-react"
import { AnimatedButton } from "./ui/animated-button"
import Link from "next/link"
import { getCurrentUser } from "@/lib/user"

export default async function Header() {
  const user = await getCurrentUser()
  const isLogged = !!user

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={"/"} className="flex items-center space-x-2">
            <div className="p-2 bg-pastel-purple rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>

            <span className="text-xl font-bold text-gray-800">BookMuse</span>
          </Link>

          {isLogged && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/search"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Find Books
              </Link>
              <Link
                href="/search/users"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Find Users
              </Link>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {isLogged ? (
              <>
                <Link href={`/reviews/user/${user.sub}`}>
                  <AnimatedButton
                    variant="ghost"
                    className="hidden md:flex text-gray-600 hover:text-purple-600"
                  >
                    Your Reviews
                  </AnimatedButton>
                </Link>
                <Link href={"/me"}>
                  <AnimatedButton className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Your Profile
                  </AnimatedButton>
                </Link>
              </>
            ) : (
              <>
                <Link href={"/login"}>
                  <AnimatedButton
                    variant="ghost"
                    className="hidden md:flex text-gray-600 hover:text-purple-600"
                  >
                    Sign In
                  </AnimatedButton>
                </Link>
                <Link href={"/signup"}>
                  <AnimatedButton className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Get Started
                  </AnimatedButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
