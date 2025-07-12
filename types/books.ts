export interface BookSearchResultDto {
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
  results: BookSearchResultDto[]
}

export interface BookDetails {
  title: string
  subtitle?: string
  description?: string | { type: string; value: string }
  authors?: string[] // Now an array of strings\
  byStatement: string
  publishDate?: string
  publishers?: string[]
  series?: string[]
  covers?: number[] // Array of cover IDs
  coverUrl?: string // New field for direct cover URL
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

export function getBookIsbn(
  book: BookSearchResultDto | BookDetails
): string | undefined {
  if (book.isbn && book.isbn.length > 0) {
    return book.isbn[0]
  }
  if ("isbn13" in book && book.isbn13 && book.isbn13.length > 0) {
    return book.isbn13[0]
  }
  if ("isbn10" in book && book.isbn10 && book.isbn10.length > 0) {
    return book.isbn10[0]
  }
  return undefined
}
