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

import type { BookSearchResultDto, BookDetails } from "@/types/books"

interface BookSearchResponse {
  docs: BookSearchResultDto[]
  numFound: number
  start: number
}

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
      ...options.headers,
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
}

export const apiClient = new ApiClient()
export type {
  User,
  LoginRequest,
  LoginResponse,
  CreateUserRequest,
  UpdateUserRequest,
}
