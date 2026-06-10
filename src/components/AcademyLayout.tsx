import { useEffect, useState } from 'react'
import {
  Home,
  BookOpen,
  Users,
  Briefcase,
  Video,
  Gift,
  BarChart3,
  FileText,
  Share2,
  CheckSquare,
  Bell,
  DollarSign,
  CreditCard,
  Zap,
  Settings,
  LogOut,
  Menu,
  X,
  Clock,
} from 'lucide-react'
import { useNavigate, useLocation } from '@tanstack/react-router'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  badge?: string | number
  category?: string
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'لوحة التحكم',
    icon: <Home size={20} />,
    path: '/academy',
  },
  {
    id: 'overview',
    label: 'التحديثات والقصص',
    icon: <Clock size={20} />,
    path: '/academy/updates',
  },
  {
    id: 'courses',
    label: 'الدورات التعليمية',
    icon: <BookOpen size={20} />,
    path: '/academy/courses',
    badge: '15',
  },
  {
    id: 'workshops',
    label: 'الورشات الشهرية',
    icon: <Briefcase size={20} />,
    path: '/academy/workshops',
    badge: '8',
  },
  {
    id: 'students',
    label: 'الطلاب',
    icon: <Users size={20} />,
    path: '/academy/students',
    badge: '1.2k',
  },
  {
    id: 'trainers',
    label: 'المدربين',
    icon: <Users size={20} />,
    path: '/academy/trainers',
  },
  {
    id: 'live',
    label: 'اللايفات والتحليلات',
    icon: <Video size={20} />,
    path: '/academy/live',
    badge: '3',
  },
  {
    id: 'deals',
    label: 'الصفقات المجانية',
    icon: <Gift size={20} />,
    path: '/academy/deals',
    badge: '3',
  },
  {
    id: 'articles',
    label: 'المقالات',
    icon: <FileText size={20} />,
    path: '/academy/articles',
  },
  {
    id: 'social',
    label: 'محتوى السوشيال',
    icon: <Share2 size={20} />,
    path: '/academy/social',
  },
  {
    id: 'tasks',
    label: 'المهام',
    icon: <CheckSquare size={20} />,
    path: '/academy/tasks',
    badge: '5',
  },
  {
    id: 'notifications',
    label: 'الإشعارات',
    icon: <Bell size={20} />,
    path: '/academy/notifications',
    badge: '2',
  },
  {
    id: 'payments',
    label: 'المدفوعات والاشتراكات',
    icon: <DollarSign size={20} />,
    path: '/academy/payments',
  },
  {
    id: 'invoices',
    label: 'الفواتير',
    icon: <CreditCard size={20} />,
    path: '/academy/invoices',
    badge: '3',
  },
  {
    id: 'leads',
    label: 'العملاء المحتملين',
    icon: <Zap size={20} />,
    path: '/academy/leads',
    badge: '12',
  },
  {
    id: 'reports',
    label: 'التقارير',
    icon: <BarChart3 size={20} />,
    path: '/academy/reports',
  },
  {
    id: 'settings',
    label: 'الإعدادات',
    icon: <Settings size={20} />,
    path: '/academy/settings',
  },
]

export function AcademyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleNavigation = (path: string) => {
    navigate({ to: path })
    setIsMobileMenuOpen(false)
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="flex flex-col h-screen bg-[#05070D]" dir="rtl">
      {/* Desktop Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-64 bg-[#0B1624] border-l border-[#1E293B] overflow-y-auto transition-transform duration-300 ${
          isMobile ? (isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full') : 'translate-x-0'
        } z-50 md:z-30`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#1E293B]">
          <h1 className="text-2xl font-bold bg-gradient-to-l from-[#D4AF37] to-[#1F7BFF] bg-clip-text text-transparent">
            أكاديمية
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">منصة التداول الذهبية</p>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-gradient-to-l from-[#D4AF37] to-[#1F7BFF] text-white shadow-lg'
                  : 'text-[#94A3B8] hover:bg-[#1A2332] hover:text-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    isActive(item.path)
                      ? 'bg-white bg-opacity-20'
                      : 'bg-[#1A2332] text-[#D4AF37]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="absolute bottom-0 right-0 left-0 p-4 border-t border-[#1E293B] space-y-2">
          <button className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse p-3 rounded-lg bg-[#1A2332] hover:bg-[#D4AF37] hover:text-[#05070D] text-[#F8FAFC] transition-all duration-200 font-medium">
            <LogOut size={18} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-0 right-0 left-0 h-16 bg-[#0B1624] border-b border-[#1E293B] flex items-center justify-between px-4 z-40">
        <h1 className="text-xl font-bold text-[#D4AF37]">أكاديمية</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-[#1A2332]"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-[#D4AF37]" />
          ) : (
            <Menu size={24} className="text-[#D4AF37]" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto md:mr-64 mb-20 md:mb-0 mt-16 md:mt-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="md:hidden fixed bottom-0 right-0 left-0 h-20 bg-[#0B1624] border-t border-[#1E293B] px-2 overflow-x-auto z-40">
        <div className="flex justify-around items-center h-full space-x-1">
          {navigationItems.slice(0, 8).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
                isActive(item.path)
                  ? 'bg-gradient-to-t from-[#D4AF37] to-[#1F7BFF] text-white'
                  : 'text-[#94A3B8]'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs mt-1 hidden sm:block">{item.label.slice(0, 6)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
