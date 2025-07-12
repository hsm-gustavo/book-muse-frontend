"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { apiClient, type User } from "./api"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  refreshAuth: () => Promise<void>
  updateUser: (user: User) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadUser = useCallback(async () => {
    try {
      const userData = await apiClient.getProfile()
      setUser(userData)
    } catch {
      // Token might be expired, try to refresh
      await refreshAuth()
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Check for existing tokens on mount
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    if (accessToken && refreshToken) {
      apiClient.setAccessToken(accessToken)
      loadUser()
    } else {
      setIsLoading(false)
    }
  }, [loadUser])

  const login = async (email: string, password: string) => {
    const response = await apiClient.login({ email, password })

    localStorage.setItem("accessToken", response.accessToken)
    localStorage.setItem("refreshToken", response.refreshToken)
    apiClient.setAccessToken(response.accessToken)

    const userData = await apiClient.getProfile()
    setUser(userData)
  }

  const signup = async (name: string, email: string, password: string) => {
    await apiClient.createUser({ name, email, password })
    await login(email, password)
  }

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken")

    if (refreshToken) {
      try {
        await apiClient.logout(refreshToken)
      } catch (error) {
        console.error("Logout error:", error)
      }
    }

    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    apiClient.setAccessToken(null)
    setUser(null)
  }

  const refreshAuth = async () => {
    const refreshToken = localStorage.getItem("refreshToken")

    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    try {
      const response = await apiClient.refreshToken({ refreshToken })

      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      apiClient.setAccessToken(response.accessToken)

      const userData = await apiClient.getProfile()
      setUser(userData)
    } catch (error) {
      // Refresh failed, clear tokens
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      apiClient.setAccessToken(null)
      setUser(null)
      throw error
    }
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        refreshAuth,
        updateUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
