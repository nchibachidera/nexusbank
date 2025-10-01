import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
type User = {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin'
}
type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          // In a real app, validate token with API
          setUser(JSON.parse(storedUser))
        } catch (error) {
          localStorage.removeItem('user')
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Mock authentication logic
      if (email === 'user@example.com' && password === 'password') {
        const user = {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          role: 'user' as const
        }
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/dashboard')
      } else if (email === 'admin@example.com' && password === 'admin') {
        const user = {
          id: '2',
          name: 'Admin User',
          email: 'admin@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
          role: 'admin' as const
        }
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/admin')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
