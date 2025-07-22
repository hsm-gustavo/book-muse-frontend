import { ReadingStatus } from "@/lib/types/reading-status"

export function getStatusColors(status: ReadingStatus | null): string {
  switch (status) {
    case "reading":
      return "bg-pastel-blue border-accent-blue"
    case "read":
      return "bg-pastel-green border-accent-green"
    case "want_to_read":
      return "bg-pastel-yellow border-accent-yellow"
    case "abandoned":
      return "bg-pastel-orange border-accent-orange"
    default:
      return "bg-pastel-pink border-accent-pink"
  }
}
