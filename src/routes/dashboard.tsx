import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '../context/AuthContext'
import { BarChart3, Users, FileText, TrendingUp, Activity } from 'lucide-react'

function DashboardOverview() {
  const { user } = useAuth()

  const stats = [
    {
      label: 'إجمالي الحملات',
      value: '24',
      icon: TrendingUp,
      color: 'amber',
    },
    {
      label: 'المحتوى المنشور',
      value: '156',
      icon: FileText,
      color: 'blue',
    },
    {
      label: 'الموظفون النشطون',
      value: '12',
      icon: Users,
      color: 'green',
    },
    {
      label: 'معدل التفاعل',
      value: '8.5%',
      icon: Activity,
      color: 'purple',
    },
  ]

  const colorClasses = {
    amber: 'bg-amber-500/10 text-amber-400',
    blue: 'bg-blue-500/10 text-blue-400',
    green: 'bg-green-500/10 text-green-400',
    purple: 'bg-purple-500/10 text-purple-400',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">مرحباً، {user?.name}</h1>
        <p className="text-gray-400">نظرة عامة على أداء الأكاديمية</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          const bgColor = colorClasses[stat.color as keyof typeof colorClasses]
          return (
            <div
              key={idx}
              className="bg-slate-800 border border-amber-600/20 rounded-lg p-6 hover:border-amber-600/50 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${bgColor}`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-xs text-gray-500">↑ 12% من الأسبوع السابق</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-amber-600/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 size={24} className="text-amber-400" />
            آخر الحملات
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-700 last:border-0">
                <div>
                  <p className="text-white font-medium">حملة التسويق الإلكتروني #{i}</p>
                  <p className="text-xs text-gray-400">قبل {i} أيام</p>
                </div>
                <span className="text-amber-400 font-medium">+15%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-amber-600/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users size={24} className="text-amber-400" />
            الموظفون
          </h3>
          <div className="space-y-3">
            {[
              { name: 'أحمد الموسى', role: 'مسؤول', status: 'نشط' },
              { name: 'فاطمة علي', role: 'منشئة محتوى', status: 'نشط' },
              { name: 'محمد حسن', role: 'محلل', status: 'غير متصل' },
            ].map((emp, i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-700 last:border-0">
                <div>
                  <p className="text-white font-medium">{emp.name}</p>
                  <p className="text-xs text-gray-400">{emp.role}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    emp.status === 'نشط' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {emp.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/dashboard')({
  component: DashboardOverview,
})
