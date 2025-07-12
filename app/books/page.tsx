"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Loader2, Search } from "lucide-react"
import { useBooksSearch } from "@/hooks/use-books-search"
import { BookCard } from "@/components/books/book-card"
import { Navbar } from "@/components/layout/navbar"
import { PageTransition } from "@/components/ui/page-transition"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination"
import { motion } from "motion/react"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function BookSearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("query") || ""
  const initialPage = Number.parseInt(searchParams.get("page") || "1")

  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchTerm)
      setCurrentPage(1)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedQuery) {
      params.set("query", debouncedQuery)
    }
    if (currentPage > 1) {
      params.set("page", currentPage.toString())
    }
    router.replace(`/books?${params.toString()}`, { scroll: false })
  }, [debouncedQuery, currentPage, router])

  const { books, isLoading, error } = useBooksSearch({
    query: debouncedQuery,
    page: currentPage,
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const totalPages = useMemo(() => {
    return books && books.length > 0 ? Math.ceil(1000 / 100) : 1
  }, [books])

  const getPageNumbers = () => {
    const maxVisiblePages = 5

    const pageNumbers = []
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pastel-blue/30 to-pastel-green/30">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent mb-4">
              Discover Your Next Read
            </h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Search for books by title or author from the vast Open Library
              collection.
            </p>
          </motion.div>

          <motion.div
            className="max-w-xl mx-auto mb-8 flex gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Input
              type="text"
              placeholder="Search for books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow border-accent-blue/20 focus:border-gradient-purple"
              aria-label="Search books"
            />
            <AnimatedButton
              onClick={() => setDebouncedQuery(searchTerm)}
              disabled={isLoading}
              className="bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="sr-only">Search</span>
            </AnimatedButton>
          </motion.div>

          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-secondary/50 rounded-lg shadow-sm p-4 animate-pulse h-64 flex flex-col items-center justify-center"
                >
                  <div className="w-28 h-40 bg-gray-300/50 rounded-sm mb-4" />
                  <div className="h-4 w-3/4 bg-gray-300/50 rounded mb-2" />
                  <div className="h-3 w-1/2 bg-gray-300/50 rounded" />
                </motion.div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-md max-w-md mx-auto">
              <p>Error: {error.message}</p>
              <p>Please try again later.</p>
            </div>
          )}

          {!isLoading &&
            !error &&
            books &&
            books.length === 0 &&
            debouncedQuery && (
              <div className="text-center text-foreground/60 p-8 bg-pastel-yellow/50 rounded-lg max-w-md mx-auto">
                <p className="text-lg font-semibold">
                  No books found for &quot;{debouncedQuery}&quot;
                </p>
                <p className="text-sm mt-2">
                  Try a different search term or check for typos.
                </p>
              </div>
            )}

          {!isLoading && !error && books && books.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {books.map((book, index) => (
                  <BookCard key={index} book={book} />
                ))}
              </div>
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                      isActive={currentPage > 1}
                    />
                  </PaginationItem>
                  {getPageNumbers().map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => handlePageChange(currentPage + 1)}
                      isActive={currentPage < totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
