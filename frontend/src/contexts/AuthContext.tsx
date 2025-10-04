import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../api/authApi'
import axios from 'axios'

// Frontend User type
type User = {
  id: string
  fullName: string
  email: string
}

// Context type
type AuthContextType = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string
    birthday?: string;
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

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    }
  }, [])

  // Login
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await loginUser({ email, password })
      const { token, user } = res.data

      // Convert API user → frontend User
      const formattedUser: User = {
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(formattedUser))

      setToken(token)
      setUser(formattedUser)

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
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string
    birthday?: string;
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




