export interface ReviewUser {
  id: string
  name: string
  profilePicture?: string
}

export interface ReviewLike {
  userId: string
  reviewId: string
  createdAt: string
}

export interface Review {
  id: string
  title: string
  description: string
  rating: number // 0-5
  openLibraryId: string
  userId: string
  user: ReviewUser
  likes: ReviewLike[]
  createdAt: string
  updatedAt: string
}

export interface ReviewDetail {
  id: string
  title: string
  description: string
  rating: number
  openLibraryId: string
  createdAt: string
  updatedAt: string
  likeCount: number
  likedByMe: boolean
  author: { id: string; name: string; profilePicture?: string | null } | null
}

export interface UserReview {
  id: string
  title: string
  description: string
  rating: number
  openLibraryId: string
  createdAt: string
  updatedAt: string
  likeCount: number
  likedByMe: boolean
}

export interface CreateReviewPayload {
  title: string
  description: string
  rating: number // 0-5
  openLibraryId: string
}

export interface UpdateReviewPayload {
  title?: string
  description?: string
  rating?: number // 0-5
}

export interface ToggleLikeResponse {
  liked: boolean
  likesCount: number
}
