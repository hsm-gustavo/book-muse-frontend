"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Input } from "@/components/ui/input"
import { AnimatedButton } from "@/components/ui/animated-button"
import { UserSearchCard } from "@/components/users/user-search-card"
import { useUserSearch } from "@/hooks/use-user-search"
import { Search, Users, Loader2 } from "lucide-react"
import { motion } from "motion/react"
import { useSearchParams } from "next/navigation"

export default function UserSearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)

  const { users, isLoading, isSearchingInitial, error, hasNextPage, loadMore } =
    useUserSearch(debouncedQuery)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchTerm)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  useEffect(() => {
    if (initialQuery && initialQuery !== debouncedQuery) {
      setSearchTerm(initialQuery)
      setDebouncedQuery(initialQuery)
    }
  }, [initialQuery, debouncedQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDebouncedQuery(searchTerm.trim())
  }

  const isInputDisabled = isSearchingInitial

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pastel-green/30 to-pastel-blue/30">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent mb-4">
              Find Book Lovers
            </h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Discover and connect with fellow readers. Search by name or email
              to find users to follow.
            </p>
          </motion.div>

          <motion.div
            className="max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow border-accent-green/20 focus:border-gradient-purple"
                aria-label="Search users"
                disabled={isInputDisabled}
              />
              <AnimatedButton
                type="submit"
                disabled={isInputDisabled || !searchTerm.trim()}
                className="bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
              >
                {isSearchingInitial ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="sr-only">Search</span>
              </AnimatedButton>
            </form>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {error && (
              <div className="text-center text-red-600 bg-red-50 p-4 rounded-md mb-6">
                <p>Error: {error.message || "Failed to load users."}</p>
                <p>Please try again.</p>
              </div>
            )}

            {!isLoading && !error && users.length === 0 && debouncedQuery && (
              <div className="text-center text-foreground/60 p-8 bg-pastel-yellow/50 rounded-lg">
                <Users className="h-12 w-12 mx-auto mb-4 text-foreground/40" />
                <p className="text-lg font-semibold">No users found</p>
                <p className="text-sm mt-2">
                  Try searching with different keywords or check for typos.
                </p>
              </div>
            )}

            {!isLoading && !error && users.length === 0 && !debouncedQuery && (
              <div className="text-center text-foreground/60 p-8 bg-pastel-blue/50 rounded-lg">
                <Search className="h-12 w-12 mx-auto mb-4 text-foreground/40" />
                <p className="text-lg font-semibold">Start searching</p>
                <p className="text-sm mt-2">
                  Enter a name or email to find users to follow.
                </p>
              </div>
            )}

            {users.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="text-sm text-foreground/60 mb-4">
                  Found {users.length} user{users.length !== 1 ? "s" : ""} for
                  &quot;
                  {debouncedQuery}&quot;
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {users.map((user, index) =>
                    user ? (
                      <UserSearchCard key={user.id} user={user} index={index} />
                    ) : null
                  )}
                </div>

                {hasNextPage && (
                  <div className="flex justify-center mt-8">
                    <AnimatedButton
                      onClick={loadMore}
                      disabled={isLoading}
                      variant="outline"
                      className="border-gradient-purple text-gradient-purple hover:bg-pastel-purple bg-transparent"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Load More Users"
                      )}
                    </AnimatedButton>
                  </div>
                )}
              </motion.div>
            )}

            {isLoading && users.length === 0 && debouncedQuery && (
              <div className="flex justify-center items-center min-h-[200px]">
                <LoadingSpinner size="lg" text="Searching users..." />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
