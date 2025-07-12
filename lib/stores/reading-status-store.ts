import { create } from "zustand"
import type { ReadingStatus } from "@/types/reading-status"

interface ReadingStatusCounts {
  all: number
  reading: number
  read: number
  want_to_read: number
  abandoned: number
}

interface ReadingStatusStore {
  counts: ReadingStatusCounts
  isInitialized: boolean
  setCounts: (counts: ReadingStatusCounts) => void
  updateCount: (status: ReadingStatus | "all", count: number) => void
  setInitialized: (initialized: boolean) => void
}

export const useReadingStatusStore = create<ReadingStatusStore>((set, get) => ({
  counts: {
    all: 0,
    reading: 0,
    read: 0,
    want_to_read: 0,
    abandoned: 0,
  },
  isInitialized: false,
  setCounts: (counts) => {
    const currentState = get()
    // Only update if counts have actually changed or not initialized
    if (
      !currentState.isInitialized ||
      JSON.stringify(currentState.counts) !== JSON.stringify(counts)
    ) {
      set({ counts, isInitialized: true })
    }
  },
  updateCount: (status, count) =>
    set((state) => ({
      counts: {
        ...state.counts,
        [status]: count,
      },
    })),
  setInitialized: (initialized) => set({ isInitialized: initialized }),
}))
