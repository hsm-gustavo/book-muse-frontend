export interface MyReview {
  id: string
  title: string
  description: string
  rating: number
  openLibraryId: string
  createdAt: string
  updatedAt: string
  likeCount: number
  likedByMe: boolean
  author: {
    id: string
    name: string
    profilePicture: string
  }
}

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
