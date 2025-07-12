export interface UserFollowInfo {
  id: string
  name: string
  email: string
  profilePicture?: string
  createdAt: string
  updatedAt: string
}

export interface FollowCounts {
  followers: number
  following: number
}

export interface FollowResponse {
  success: boolean
  message?: string
}
