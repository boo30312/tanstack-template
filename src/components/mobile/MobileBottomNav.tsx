import { useNavigate, useLocation } from '@tanstack/react-router'
import { Home, Users, BookOpen, CreditCard, MoreHorizontal } from 'lucide-react'

export function MobileBottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'الرئيسية', icon: Home },
    { path: '/dashboard/students', label: 'الطلاب', icon: Users },
    { path: '/dashboard/courses', label: 'الكورسات', icon: BookOpen },
    { path: '/dashboard/payments', label: 'المدفوعات', icon: CreditCard },
    { path: '/dashboard/more', label: 'المزيد', icon: MoreHorizontal },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0B1624] border-t border-[#D4AF37]/20 shadow-2xl z-40 md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              onClick={() => navigate({ to: item.path })}
              className={`flex-1 py-4 px-2 flex flex-col items-center gap-1 transition ${
                active
                  ? 'text-[#D4AF37] bg-[#D4AF37]/5'
                  : 'text-[#94A3B8] hover:text-[#D4AF37]'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs font-tajawal font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
