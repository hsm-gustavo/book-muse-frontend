export interface BookStatus {
  id: string
  updatedAt: string
  status: "reading" | "read" | "want_to_read" | "abandoned"
  openLibraryId: string
  userId: string
}

export interface BookSearchResult {
  title: string
  authorNames?: string[]
  coverId?: number
  cover?: string | number
  firstPublishYear?: number
  editionCount: number
  language?: string[]
  openLibraryKey: string // e.g., "/works/OL12345W"
  editionKey?: string
  isbn10?: string[]
  isbn13?: string[]
}

export interface BookSearchResponse {
  total: number
  page: number
  perPage: number
  totalPages: number
  results: BookSearchResult[]
}

export interface BookDetails {
  title: string
  subtitle?: string
  description?: string | { type: string; value: string }
  authors?: string[]
  byStatement: string
  publishDate?: string
  publishers?: string[]
  series?: string[]
  covers?: number[] // Array of cover IDs
  coverUrl?: string
  numberOfPages?: number
  isbn10?: string[]
  isbn13?: string[]
  identifiers?: {
    librarything?: string[]
    goodreads?: string[]
  }
  workId?: string // e.g., "/works/OL12345W"
}

export function getCoverImageUrl(
  coverId: number | undefined,
  size: "S" | "M" | "L" = "M"
): string {
  if (!coverId) {
    return "/placeholder.svg?height=100&width=70" // Default placeholder
  }
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}
