import { useAuth } from '../../context/AuthContext'
import { Menu, Bell, MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface MobileHeaderProps {
  onMenuClick: () => void
  title: string
}

export function MobileHeader({ onMenuClick, title }: MobileHeaderProps) {
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U'

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-b from-[#0B1624] to-[#07111F] border-b border-[#D4AF37]/20 shadow-lg z-40 md:hidden">
      <div className="flex items-center justify-between px-4 py-3 h-16">
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-[#1F2937] rounded-lg transition text-[#D4AF37]"
        >
          <Menu size={24} />
        </button>

        {/* Title */}
        <h1 className="text-lg font-bold text-white font-tajawal flex-1 text-center">{title}</h1>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* WhatsApp */}
          <a
            href="https://wa.me/966501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-[#1F2937] rounded-lg transition text-green-400"
          >
            <MessageCircle size={20} />
          </a>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-[#1F2937] rounded-lg transition text-[#94A3B8] relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-1 w-56 bg-[#0B1624] border border-[#D4AF37]/20 rounded-lg shadow-2xl">
                <div className="p-3 border-b border-[#D4AF37]/10">
                  <h3 className="font-bold text-white text-sm font-tajawal">الإشعارات</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-[#1F2937] border-b border-[#D4AF37]/10 cursor-pointer">
                    <p className="text-sm text-white font-tajawal">طالب جديد سجل في الكورس</p>
                    <p className="text-xs text-[#94A3B8] mt-1">قبل 5 دقائق</p>
                  </div>
                  <div className="p-3 hover:bg-[#1F2937] border-b border-[#D4AF37]/10 cursor-pointer">
                    <p className="text-sm text-white font-tajawal">تم استقبال دفعة جديدة</p>
                    <p className="text-xs text-[#94A3B8] mt-1">قبل ساعة</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2 mr-2 pl-2 border-l border-[#D4AF37]/20">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#1F7BFF] flex items-center justify-center text-sm font-bold text-white">
              {initials}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
