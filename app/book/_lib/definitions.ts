export type FormState =
  | {
      errors?: {
        title?: string[]
        description?: string[]
        rating?: string[]
        openLibraryId?: string[]
      }
      message?: string
    }
  | undefined
