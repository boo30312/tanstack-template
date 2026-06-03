export type UserRole = 'admin' | 'manager' | 'content_creator' | 'analyst' | 'employee'

export interface Permission {
  id: string
  name: string
  description: string
}

export interface Role {
  id: string
  name: string
  permissions: Permission[]
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: string[]
  department?: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error?: string
}
