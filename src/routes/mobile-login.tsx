import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

function MobileLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(identifier, password)
      setSuccess(true)
      setTimeout(() => {
        navigate({ to: '/dashboard' })
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشل تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  const demoAccounts = [
    { email: 'admin@enterpoint.com', name: 'Admin', icon: '👨‍💼' },
    { email: 'manager@enterpoint.com', name: 'Manager', icon: '📊' },
    { email: 'instructor@enterpoint.com', name: 'Instructor', icon: '👨‍🏫' },
    { email: 'sales@enterpoint.com', name: 'Sales', icon: '💼' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05070D] via-[#07111F] to-[#05070D] text-white flex flex-col" dir="rtl">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 min-h-screen">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#1F7BFF] rounded-xl flex items-center justify-center shadow-2xl">
              <span className="text-2xl font-bold">EP</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1 font-tajawal">ENTER POINT</h1>
          <p className="text-sm text-[#94A3B8]">أكاديمية التداول الاحترافية</p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-sm">
          <div className="bg-[#0B1624] border border-[#D4AF37]/20 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-2 text-center font-tajawal">تسجيل الدخول</h2>
            <p className="text-sm text-[#94A3B8] text-center mb-6">إلى لوحة التحكم</p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-2 items-start">
                <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex gap-2 items-start">
                <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-300">جاري تحويلك إلى لوحة التحكم...</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email/Phone Input */}
              <div>
                <label className="block text-sm font-medium text-[#F8FAFC] mb-2 font-tajawal">
                  البريد الإلكتروني أو رقم الهاتف
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="example@enterpoint.com"
                  className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition font-tajawal"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-[#F8FAFC] mb-2 font-tajawal">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition font-tajawal"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] hover:text-[#D4AF37] transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#1F2937] border border-[#374151] accent-[#D4AF37] cursor-pointer"
                  />
                  <span className="text-[#94A3B8] hover:text-[#D4AF37] transition font-tajawal">تذكرني</span>
                </label>
                <button
                  type="button"
                  onClick={() => navigate({ to: '/forgot-password' })}
                  className="text-[#1F7BFF] hover:text-[#D4AF37] transition font-tajawal"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#1F7BFF] hover:shadow-lg hover:shadow-[#D4AF37]/20 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-lg transition transform hover:scale-105 font-tajawal"
              >
                {loading ? 'جاري التحقق...' : 'دخول إلى اللوحة'}
              </button>
            </form>

            {/* Request Access */}
            <div className="mt-6 pt-6 border-t border-[#D4AF37]/20">
              <p className="text-sm text-[#94A3B8] text-center mb-3 font-tajawal">
                ليس لديك حساب؟
              </p>
              <button
                onClick={() => navigate({ to: '/request-access' })}
                className="w-full bg-[#1F2937] hover:bg-[#374151] border border-[#374151] text-[#F8FAFC] font-semibold py-2 rounded-lg transition font-tajawal"
              >
                طلب وصول جديد
              </button>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6">
            <p className="text-xs text-[#94A3B8] text-center mb-3 font-tajawal">حسابات تجريبية للاختبار</p>
            <div className="space-y-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setIdentifier(account.email)
                    setPassword('admin123')
                  }}
                  className="w-full px-3 py-2 bg-[#0B1624] hover:bg-[#1F2937] border border-[#D4AF37]/20 rounded-lg transition text-left flex items-center gap-2"
                >
                  <span className="text-lg">{account.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#F8FAFC] font-tajawal">{account.name}</div>
                    <div className="text-xs text-[#94A3B8]">{account.email}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs text-[#6B7280] font-tajawal">
        <p>© 2026 ENTER POINT. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/mobile-login')({
  component: MobileLogin,
})
