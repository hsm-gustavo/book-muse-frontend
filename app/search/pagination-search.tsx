"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination"
import { usePathname, useSearchParams } from "next/navigation"

interface PaginationProps {
  totalPages: number
}

export default function PaginationSearch({ totalPages }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get("page")) || 1

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    return `${pathname}?${params.toString()}`
  }

  const handlePageChange = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={goTo(currentPage - 1)}
            onClick={handlePageChange}
            isActive={currentPage > 1}
          />
        </PaginationItem>
        {getPageNumbers().map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={goTo(pageNumber)}
              onClick={handlePageChange}
              isActive={currentPage === pageNumber}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={goTo(currentPage + 1)}
            onClick={handlePageChange}
            isActive={currentPage < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
