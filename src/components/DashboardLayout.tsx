import { Outlet, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../context/AuthContext'
import {
  BarChart3,
  Share2,
  Zap,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

export function DashboardLayout() {
  const { user, logout, hasPermission } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const modules = [
    {
      id: 'overview',
      label: 'نظرة عامة',
      icon: BarChart3,
      path: '/dashboard',
      permission: 'view_dashboard',
    },
    {
      id: 'social',
      label: 'إدارة وسائل التواصل',
      icon: Share2,
      path: '/dashboard/social',
      permission: 'social_manage',
    },
    {
      id: 'api',
      label: 'واجهات برمجية ذكية',
      icon: Zap,
      path: '/dashboard/api',
      permission: 'api_config',
    },
    {
      id: 'content',
      label: 'إدارة المحتوى',
      icon: FileText,
      path: '/dashboard/content',
      permission: 'content_manage',
    },
    {
      id: 'employees',
      label: 'حسابات الموظفين',
      icon: Users,
      path: '/dashboard/employees',
      permission: 'manage_employees',
    },
  ]

  const visibleModules = modules.filter((m) => hasPermission(m.permission) || user?.role === 'admin')

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-800 border-r border-amber-600/20 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-amber-600/20 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold text-amber-500">ENTER POINT</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-slate-700 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {visibleModules.map((module) => {
            const Icon = module.icon
            return (
              <button
                key={module.id}
                onClick={() => navigate({ to: module.path })}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 rounded-lg transition text-left text-sm text-gray-300 hover:text-amber-400 group"
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span>{module.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-amber-600/20 p-4 space-y-2">
          {sidebarOpen && (
            <div className="px-4 py-2 rounded-lg bg-slate-700/50">
              <p className="text-xs text-gray-400">حساب مسجل</p>
              <p className="font-medium text-sm text-white truncate">{user?.name}</p>
              <p className="text-xs text-amber-400 capitalize">{user?.role}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition text-sm"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 border-b border-amber-600/20 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">لوحة التحكم</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-700 rounded-lg transition">
              <Settings size={20} className="text-gray-400 hover:text-amber-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
