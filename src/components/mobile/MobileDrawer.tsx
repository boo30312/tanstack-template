import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../context/AuthContext'
import { X, LogOut, Settings, User } from 'lucide-react'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const menuItems = [
    { path: '/dashboard', label: 'لوحة التحكم' },
    { path: '/dashboard/students', label: 'الطلاب' },
    { path: '/dashboard/courses', label: 'الكورسات' },
    { path: '/dashboard/payments', label: 'المدفوعات' },
    { path: '/dashboard/marketing', label: 'التسويق' },
    { path: '/dashboard/analytics', label: 'التحليلات' },
  ]

  const handleNavigate = (path: string) => {
    navigate({ to: path })
    onClose()
  }

  const handleLogout = () => {
    logout()
    navigate({ to: '/mobile-login' })
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[#0B1624] border-l border-[#D4AF37]/20 shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[#D4AF37]/20">
          <h2 className="text-xl font-bold text-white font-tajawal">القائمة</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#1F2937] rounded-lg transition text-[#94A3B8]"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-[#D4AF37]/20 bg-gradient-to-r from-[#D4AF37]/10 to-[#1F7BFF]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#1F7BFF] flex items-center justify-center text-sm font-bold text-white">
              {user?.name?.split(' ')[0][0]}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white text-sm font-tajawal">{user?.name}</p>
              <p className="text-xs text-[#94A3B8]">{user?.email}</p>
              <p className="text-xs text-[#D4AF37] mt-1 font-tajawal">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="py-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className="w-full px-6 py-3 text-right text-[#F8FAFC] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] border-r-4 border-transparent hover:border-[#D4AF37] transition font-tajawal text-sm"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Menu */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#D4AF37]/20 bg-gradient-to-t from-[#05070D] to-transparent">
          <button
            onClick={() => handleNavigate('/profile')}
            className="w-full px-6 py-3 text-right flex items-center gap-3 text-[#F8FAFC] hover:bg-[#1F2937] transition font-tajawal text-sm border-b border-[#D4AF37]/20"
          >
            <User size={18} />
            الملف الشخصي
          </button>
          <button
            onClick={() => handleNavigate('/settings')}
            className="w-full px-6 py-3 text-right flex items-center gap-3 text-[#F8FAFC] hover:bg-[#1F2937] transition font-tajawal text-sm border-b border-[#D4AF37]/20"
          >
            <Settings size={18} />
            الإعدادات
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 text-right flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition font-tajawal text-sm"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>
      </div>
    </>
  )
}
