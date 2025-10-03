import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../api/authApi' // 👈 make sure this path is correct
import axios from 'axios'

// User type
type User = {
  id: string
  fullName: string
  email: string
  phone?: string
  role?: 'user' | 'admin'
}

// Context type
type AuthContextType = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: {
    fullName: string
    email: string
    password: string
    phone?: string
    birthday?: string
  }) => Promise<void>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // On mount: check stored user
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    }
  }, [])

  // Login with backend
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await loginUser({ email, password })
      const { token, user } = res.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      setToken(token)
      setUser(user)

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Signup
  const signup = async (data: {
    fullName: string
    email: string
    password: string
    phone?: string
    birthday?: string
  }) => {
    setIsLoading(true)
    setError(null)
    try {
      await registerUser(data)
      alert('✅ Account created! Please login.')
      navigate('/login')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Logout
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

