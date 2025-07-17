export interface Review {
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
