interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  accessToken: string
  refreshToken: string
}

interface RefreshRequest {
  refreshToken: string
}

interface User {
  id: string
  name: string
  email: string
  profilePicture?: string
  createdAt: string
  updatedAt: string
}

interface UserProfile {
  id: string
  name: string
  email: string
  profilePicture?: string
  createdAt: string
  readCount: number
}

interface CreateUserRequest {
  name: string
  email: string
  password: string
  profilePicture?: string
}

interface UpdateUserRequest {
  name?: string
  profilePicture?: string
}

import type { BookSearchResponse, BookDetails } from "@/types/books"

import type {
  Review,
  CreateReviewPayload,
  UpdateReviewPayload,
  ReviewDetail,
  UserReview,
} from "@/types/reviews"

import type {
  ReadingStatusEntry,
  CreateReadingStatusPayload,
  ReadingStatusResponse,
} from "@/types/reading-status"

import type {
  UserFollowInfo,
  FollowCounts,
  FollowResponse,
} from "@/types/followers"

import type { UserSearchResponse } from "@/types/user-search"

class ApiClient {
  private baseUrl: string
  private accessToken: string | null = null

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:numero"
  ) {
    this.baseUrl = baseUrl
  }

  setAccessToken(token: string | null) {
    this.accessToken = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    }

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `HTTP ${response.status}`)
    }

    if (response.status === 204) {
      return undefined as T // Return undefined for void responses
    }

    return response.json()
  }

  private async requestFormData<T>(
    endpoint: string,
    formData: FormData
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {}

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: formData,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Auth endpoints
  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>("/auth", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async refreshToken(data: RefreshRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async logout(refreshToken: string): Promise<void> {
    await this.request("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    })
  }

  // User endpoints
  async createUser(data: CreateUserRequest): Promise<User> {
    return this.request<User>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getAllUsers(): Promise<User[]> {
    return this.request<User[]>("/users")
  }

  async getProfile(): Promise<User> {
    return this.request<User>("/users/me")
  }

  async getUserById(userId: string): Promise<UserProfile> {
    return this.request<UserProfile>(`/users/${userId}`)
  }

  async updateProfile(data: UpdateUserRequest): Promise<User> {
    return this.request<User>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async deleteProfile(): Promise<void> {
    await this.request("/users/me", {
      method: "DELETE",
    })
  }

  async uploadProfilePicture(file: File): Promise<{ profilePicture: string }> {
    const formData = new FormData()
    formData.append("file", file)

    return this.requestFormData<{ profilePicture: string }>(
      "/users/me/profile-picture",
      formData
    )
  }

  async getSignedProfilePictureUrl(): Promise<{ url: string | null }> {
    return this.request<{ url: string | null }>("/users/me/profile-picture")
  }

  // User search endpoint
  async searchUsers(
    query: string,
    limit = 20,
    cursor?: string
  ): Promise<UserSearchResponse> {
    const params = new URLSearchParams({ q: query, limit: limit.toString() })
    if (cursor) {
      params.set("cursor", cursor)
    }
    return this.request<UserSearchResponse>(
      `/users/search?${params.toString()}`
    )
  }

  // Book endpoints
  async searchBooks(q: string, page = 1): Promise<BookSearchResponse> {
    const params = new URLSearchParams({ q, page: page.toString() })
    return this.request<BookSearchResponse>(
      `/books/search?${params.toString()}`
    )
  }

  async getBookDetails(isbn: string): Promise<BookDetails> {
    return this.request<BookDetails>(`/books/isbn/${isbn}`)
  }

  // Review endpoints
  async createReview(payload: CreateReviewPayload): Promise<Review> {
    return this.request<Review>("/reviews", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async getReviewsByBook(openLibraryId: string): Promise<Review[]> {
    return this.request<Review[]>(`/reviews/book/${openLibraryId}`)
  }

  async getReviewById(reviewId: string): Promise<ReviewDetail> {
    return this.request<ReviewDetail>(`/reviews/${reviewId}`)
  }

  async getUserReviews(userId: string): Promise<UserReview[]> {
    return this.request<UserReview[]>(`/reviews/user/${userId}`)
  }

  async toggleLikeReview(reviewId: string): Promise<void> {
    try {
      await this.request(`/reviews/${reviewId}/like`, {
        method: "DELETE",
      })
    } catch {
      await this.request(`/reviews/${reviewId}/like`, {
        method: "POST",
      })
    }
  }

  async updateReview(
    reviewId: string,
    payload: UpdateReviewPayload
  ): Promise<Review> {
    return this.request<Review>(`/reviews/${reviewId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }

  async deleteReview(reviewId: string): Promise<void> {
    await this.request(`/reviews/${reviewId}`, {
      method: "DELETE",
    })
  }

  // Reading Status endpoints
  async createOrUpdateReadingStatus(
    payload: CreateReadingStatusPayload
  ): Promise<ReadingStatusResponse> {
    return this.request<ReadingStatusResponse>("/reading-status", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async getReadingStatus(
    openLibraryId: string
  ): Promise<ReadingStatusResponse | null> {
    try {
      return await this.request<ReadingStatusResponse>(
        `/reading-status/${openLibraryId}`
      )
    } catch (error) {
      // Return null if not found (404)
      if (error instanceof Error && error.message.includes("404")) {
        return null
      }
      throw error
    }
  }

  async deleteReadingStatus(openLibraryId: string): Promise<void> {
    await this.request(`/reading-status/${openLibraryId}`, {
      method: "DELETE",
    })
  }

  async getReadingStatusList(status?: string): Promise<ReadingStatusEntry[]> {
    const params = status ? new URLSearchParams({ status }) : ""
    return this.request<ReadingStatusEntry[]>(
      `/reading-status${params ? `?${params}` : ""}`
    )
  }

  // Follower endpoints
  async followUser(userId: string): Promise<FollowResponse> {
    return this.request<FollowResponse>(`/users/${userId}/follow`, {
      method: "POST",
    })
  }

  async unfollowUser(userId: string): Promise<FollowResponse> {
    return this.request<FollowResponse>(`/users/${userId}/unfollow`, {
      method: "DELETE",
    })
  }

  async getFollowers(userId: string): Promise<UserFollowInfo[]> {
    return this.request<UserFollowInfo[]>(`/users/${userId}/followers`)
  }

  async getFollowing(userId: string): Promise<UserFollowInfo[]> {
    return this.request<UserFollowInfo[]>(`/users/${userId}/following`)
  }

  async getFollowCounts(userId: string): Promise<FollowCounts> {
    return this.request<FollowCounts>(`/users/${userId}/follow-counts`)
  }
}

export const apiClient = new ApiClient()
export type {
  User,
  UserProfile,
  LoginRequest,
  LoginResponse,
  CreateUserRequest,
  UpdateUserRequest,
}
