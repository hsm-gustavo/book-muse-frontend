export interface BookStatus {
  id: string
  updatedAt: string
  status: "reading" | "read" | "want_to_read" | "abandoned"
  openLibraryId: string
  userId: string
}
