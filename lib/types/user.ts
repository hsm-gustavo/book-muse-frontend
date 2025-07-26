export interface User {
  id: string
  name: string
  email: string
  profilePicture: string
  createdAt: string
  readCount: number
}

export interface UserProfile extends User {
  followers: { count: number; users: User[] }
  following: { count: number; users: User[] }
}

export type UserSearchResult = Omit<User, "readCount">

export interface UserSearchResponse {
  data: UserSearchResult[]
  hasNextPage: boolean
  nextCursor?: string
}

export interface FullProfile {
  id: string
  name: string
  email: string
  profilePicture: string
  createdAt: string
  followersCount: number
  followingCount: number
  readBooksCount: number
  isFollowing?: boolean
  recentReviews: {
    id: string
    title: string
    rating: number
    description: string
    createdAt: string
  }[]
}

export interface UserUpdate {
  name: string
}
