export interface UserSearchResult {
  id: string
  name: string
  email: string
  profilePicture: string | null
  createdAt: string
  updatedAt: string
}

export interface UserSearchResponse {
  data: UserSearchResult[]
  nextCursor: string | null
  hasNextPage: boolean
}
