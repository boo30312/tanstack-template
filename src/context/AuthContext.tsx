import React, { createContext, useState, useCallback } from 'react'
import { User, UserRole } from '../types/auth'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
  hasRole: (role: UserRole) => boolean
  updateUserPermissions: (userId: string, permissions: string[]) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_USERS: Record<string, User> = {
  'admin@enterpoint.com': {
    id: '1',
    name: 'أحمد المدير',
    email: 'admin@enterpoint.com',
    role: 'admin',
    permissions: ['*'],
    department: 'Administration',
  },
  'manager@enterpoint.com': {
    id: '2',
    name: 'فاطمة المسؤولة',
    email: 'manager@enterpoint.com',
    role: 'manager',
    permissions: ['social_manage', 'content_manage', 'api_config', 'view_analytics'],
    department: 'Management',
  },
  'content@enterpoint.com': {
    id: '3',
    name: 'محمد منتج المحتوى',
    email: 'content@enterpoint.com',
    role: 'content_creator',
    permissions: ['content_create', 'content_publish', 'view_analytics'],
    department: 'Content',
  },
  'analyst@enterpoint.com': {
    id: '4',
    name: 'سارة المحللة',
    email: 'analyst@enterpoint.com',
    role: 'analyst',
    permissions: ['view_analytics', 'view_reports', 'api_readonly'],
    department: 'Analytics',
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [permissions, setPermissions] = useState<Record<string, string[]>>({})

  const login = useCallback(async (email: string, password: string) => {
    // Demo login - in production, this would call a real API
    const demoUser = DEMO_USERS[email]
    if (demoUser) {
      setUser(demoUser)
      setPermissions((prev) => ({
        ...prev,
        [demoUser.id]: demoUser.permissions,
      }))
    } else {
      throw new Error('Invalid credentials')
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) return false
      if (user.role === 'admin') return true
      const userPerms = permissions[user.id] || user.permissions
      return userPerms.includes(permission) || userPerms.includes('*')
    },
    [user, permissions]
  )

  const hasRole = useCallback(
    (role: UserRole): boolean => {
      return user?.role === role
    },
    [user]
  )

  const updateUserPermissions = useCallback((userId: string, perms: string[]) => {
    setPermissions((prev) => ({
      ...prev,
      [userId]: perms,
    }))
  }, [])

  const value: AuthContextType = {
    user,
    login,
    logout,
    hasPermission,
    hasRole,
    updateUserPermissions,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
