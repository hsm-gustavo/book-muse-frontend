export type ReadingStatus = "reading" | "read" | "want_to_read" | "abandoned"

export interface CreateReadingStatusPayload {
  openLibraryId: string
  status: ReadingStatus
}

export interface ReadingStatusResponse {
  id: string
  openLibraryId: string
  status: ReadingStatus
  updatedAt: string
}
