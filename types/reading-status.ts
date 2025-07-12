export type ReadingStatus = "reading" | "read" | "want_to_read" | "abandoned"

export interface ReadingStatusEntry {
  id: string
  openLibraryId: string
  status: ReadingStatus
  updatedAt: string
}

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

export function getStatusDisplayText(status: ReadingStatus | null): string {
  switch (status) {
    case "reading":
      return "Currently Reading"
    case "read":
      return "Read"
    case "want_to_read":
      return "Want to Read"
    case "abandoned":
      return "Abandoned"
    default:
      return "Not Tracked"
  }
}

export function getStatusColor(status: ReadingStatus | null): string {
  switch (status) {
    case "reading":
      return "hsl(200 85% 92%)"
    case "read":
      return "hsl(120 85% 92%)"
    case "want_to_read":
      return "hsl(60 85% 92%)"
    case "abandoned":
      return "hsl(30 85% 92%)"
    default:
      return "hsl(210 40% 96.1%)"
  }
}

export function getStatusDarkColor(status: ReadingStatus | null): string {
  switch (status) {
    case "reading":
      return "hsl(200 60% 80%)"
    case "read":
      return "hsl(120 60% 80%)"
    case "want_to_read":
      return "hsl(60 60% 80%)"
    case "abandoned":
      return "hsl(30 60% 80%)"
    default:
      return "hsl(210 40% 86.1%)"
  }
}
