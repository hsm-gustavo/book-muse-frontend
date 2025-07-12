"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth"
import {
  LogOut,
  Settings,
  User,
  BookOpen,
  Search,
  Home,
  Users,
} from "lucide-react"
import { motion } from "motion/react"
import { ProfileAvatar } from "../ui/profile-avatar"

export function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href={user ? "/dashboard" : "/"}
              className="font-bold text-xl bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent"
            >
              BookMuse
            </Link>
          </motion.div>

          {/* nav links */}

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-1 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/books"
              className="flex items-center space-x-1 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Browse Books</span>
            </Link>
            {user && (
              <>
                <Link
                  href="/me/reading-status"
                  className="flex items-center space-x-1 text-foreground/70 hover:text-foreground transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>My Books</span>
                </Link>
                <Link
                  href="/users/search"
                  className="flex items-center space-x-1 text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span>Find Users</span>
                </Link>
              </>
            )}
          </div>

          {/* user menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <ProfileAvatar userName={user.name} className="h-10 w-10" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/me/reading-status" className="cursor-pointer">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Reading Status
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
