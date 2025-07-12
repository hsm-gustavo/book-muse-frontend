"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useReadingStatusList } from "@/hooks/use-reading-status-list"
import { useReadingStatusStore } from "@/lib/stores/reading-status-store"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "motion/react"
import { BookOpen, Check, Eye, X, Filter } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { ReadingStatus } from "@/types/reading-status"
import {
  getStatusDisplayText,
  getStatusColor,
  getStatusDarkColor,
} from "@/types/reading-status"

const statusFilters: Array<{
  value: ReadingStatus | "all"
  label: string
  icon: React.ReactNode
}> = [
  { value: "all", label: "All Books", icon: <Filter className="h-4 w-4" /> },
  {
    value: "reading",
    label: "Currently Reading",
    icon: <BookOpen className="h-4 w-4" />,
  },
  { value: "read", label: "Read", icon: <Check className="h-4 w-4" /> },
  {
    value: "want_to_read",
    label: "Want to Read",
    icon: <Eye className="h-4 w-4" />,
  },
  { value: "abandoned", label: "Abandoned", icon: <X className="h-4 w-4" /> },
]

export default function ReadingStatusPage() {
  const [activeFilter, setActiveFilter] = useState<ReadingStatus | "all">("all")
  const { entries, isLoading, error } = useReadingStatusList(
    activeFilter === "all" ? undefined : activeFilter
  )
  const { counts, setCounts } = useReadingStatusStore()

  useEffect(() => {
    if (!isLoading && entries) {
      const allEntries = entries
      const newCounts = {
        all: allEntries.length,
        reading: allEntries.filter((e) => e.status === "reading").length,
        read: allEntries.filter((e) => e.status === "read").length,
        want_to_read: allEntries.filter((e) => e.status === "want_to_read")
          .length,
        abandoned: allEntries.filter((e) => e.status === "abandoned").length,
      }
      if (activeFilter === "all") {
        setCounts(newCounts)
      }
    }
  }, [entries, isLoading, activeFilter, setCounts])

  const getFilterCount = (filter: ReadingStatus | "all") => {
    return counts[filter] || 0
  }

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-pastel-blue/30 to-pastel-purple/30">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent mb-4">
                My Reading Status
              </h1>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                Track and manage your reading journey across all your books.
              </p>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
              className="flex flex-wrap gap-2 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={
                    activeFilter === filter.value ? "default" : "outline"
                  }
                  onClick={() => setActiveFilter(filter.value)}
                  className="flex items-center space-x-2"
                  style={
                    activeFilter === filter.value
                      ? {
                          backgroundColor: getStatusColor(
                            filter.value === "all" ? null : filter.value
                          ),
                          borderColor: getStatusDarkColor(
                            filter.value === "all" ? null : filter.value
                          ),
                          color: "hsl(222.2 84% 4.9%)",
                        }
                      : {}
                  }
                >
                  {filter.icon}
                  <span>{filter.label}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {getFilterCount(filter.value)}
                  </Badge>
                </Button>
              ))}
            </motion.div>

            {isLoading && (
              <div className="flex justify-center items-center min-h-[200px]">
                <LoadingSpinner
                  size="lg"
                  text="Loading your reading status..."
                />
              </div>
            )}

            {error && (
              <div className="text-center text-red-600 bg-red-50 p-4 rounded-md max-w-md mx-auto">
                <p>Error loading reading status: {error.message}</p>
                <p>Please try again later.</p>
              </div>
            )}

            {!isLoading && !error && entries.length === 0 && (
              <div className="text-center text-foreground/60 p-8 bg-pastel-yellow/50 rounded-lg max-w-md mx-auto">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-foreground/40" />
                <p className="text-lg font-semibold">No books tracked yet</p>
                <p className="text-sm mt-2">
                  {activeFilter === "all"
                    ? "Start tracking books by setting their reading status on book detail pages."
                    : `You haven't marked any books as "${getStatusDisplayText(
                        activeFilter as ReadingStatus
                      )}" yet.`}
                </p>
              </div>
            )}

            {!isLoading && !error && entries.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="border-accent-blue/20 hover:border-gradient-purple transition-all duration-200">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg line-clamp-1">
                            Book {entry.openLibraryId}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className="flex items-center space-x-1"
                            style={{
                              backgroundColor: getStatusColor(entry.status),
                              borderColor: getStatusDarkColor(entry.status),
                              color: "hsl(222.2 84% 4.9%)",
                            }}
                          >
                            <span className="text-xs font-medium">
                              {getStatusDisplayText(entry.status)}
                            </span>
                          </Badge>
                        </div>
                        <CardDescription className="text-sm text-foreground/60">
                          Updated{" "}
                          {formatDistanceToNow(new Date(entry.updatedAt), {
                            addSuffix: true,
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground/70">
                          Open Library ID: {entry.openLibraryId}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  )
}
