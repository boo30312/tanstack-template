import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

function RequestAccess() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    role: 'instructor',
    reason: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const roles = [
    { value: 'admin', label: 'مسؤول نظام', icon: '👨‍💼' },
    { value: 'manager', label: 'مدير', icon: '📊' },
    { value: 'instructor', label: 'مدرس', icon: '👨‍🏫' },
    { value: 'sales', label: 'فريق المبيعات', icon: '💼' },
    { value: 'marketing', label: 'فريق التسويق', icon: '📱' },
    { value: 'support', label: 'دعم العملاء', icon: '🎧' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitted(true)
      setTimeout(() => {
        navigate({ to: '/mobile-login' })
      }, 3000)
    } catch (err) {
      setError('حدث خطأ أثناء إرسال الطلب')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#05070D] via-[#07111F] to-[#05070D] text-white flex items-center justify-center px-4" dir="rtl">
        <div className="w-full max-w-sm text-center">
          <div className="bg-[#0B1624] border border-[#D4AF37]/20 rounded-2xl p-8 shadow-2xl">
            <div className="mb-4 flex justify-center">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
                <CheckCircle size={40} className="text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 font-tajawal">تم الإرسال بنجاح</h2>
            <p className="text-[#94A3B8] mb-6 font-tajawal">
              تم استقبال طلب الوصول الخاص بك. سيتم مراجعته من قبل فريق الإدارة في أقرب وقت.
            </p>
            <p className="text-sm text-[#6B7280] font-tajawal">
              ستتلقى تأكيد على بريدك الإلكتروني عند الموافقة على الطلب.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05070D] via-[#07111F] to-[#05070D] text-white" dir="rtl">
      {/* Header */}
      <div className="bg-[#0B1624] border-b border-[#D4AF37]/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate({ to: '/mobile-login' })}
            className="p-2 hover:bg-[#1F2937] rounded-lg transition"
          >
            <ArrowRight size={24} className="text-[#D4AF37]" />
          </button>
          <h1 className="text-xl font-bold font-tajawal">طلب وصول جديد</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-[#0B1624] border border-[#D4AF37]/20 rounded-2xl p-6 shadow-2xl">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-2 items-start">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#F8FAFC] mb-2 font-tajawal">
                الاسم الكامل *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="أحمد محمد علي"
                className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition font-tajawal"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#F8FAFC] mb-2 font-tajawal">
                رقم الهاتف *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+966501234567"
                className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition font-tajawal"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#F8FAFC] mb-2 font-tajawal">
                البريد الإلكتروني *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@enterpoint.com"
                className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition font-tajawal"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-[#F8FAFC] mb-3 font-tajawal">
                الدور المطلوب *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: role.value })}
                    className={`p-3 rounded-lg border-2 transition text-center font-tajawal ${
                      formData.role === role.value
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
                        : 'bg-[#1F2937] border-[#374151] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{role.icon}</div>
                    <div className="text-sm">{role.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-[#F8FAFC] mb-2 font-tajawal">
                سبب طلب الوصول *
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="أخبرنا عن السبب الذي تريد الوصول إلى اللوحة من أجله..."
                className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition font-tajawal resize-none h-24"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#1F7BFF] hover:shadow-lg hover:shadow-[#D4AF37]/20 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-lg transition transform hover:scale-105 font-tajawal"
            >
              {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </button>

            {/* Back to Login */}
            <div className="text-center pt-4 border-t border-[#D4AF37]/20">
              <p className="text-sm text-[#94A3B8] mb-2 font-tajawal">هل لديك حساب بالفعل؟</p>
              <button
                type="button"
                onClick={() => navigate({ to: '/mobile-login' })}
                className="text-[#D4AF37] hover:text-[#1F7BFF] transition font-tajawal text-sm"
              >
                تسجيل الدخول
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/request-access')({
  component: RequestAccess,
})
