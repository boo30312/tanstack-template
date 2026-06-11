import { TrendingUp, Users, BookOpen, BarChart3, Zap, Clock } from 'lucide-react'
import { academyData } from '../data/academy-data'

export function DashboardOverview() {
  const stats = academyData.dashboardStats

  const statCards = [
    {
      icon: <Users className="w-6 h-6" />,
      label: 'إجمالي الطلاب',
      value: stats.totalStudents,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: 'الدورات النشطة',
      value: stats.totalCourses,
      color: 'from-gold-500 to-gold-600',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: 'الورشات الشهرية',
      value: stats.activeWorkshops,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      label: 'إجمالي الإيرادات',
      value: `$${(stats.totalRevenue / 1000).toFixed(1)}k`,
      color: 'from-green-500 to-green-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1F7BFF] to-[#D4AF37] rounded-xl p-6 md:p-8 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">مرحباً بك في لوحة التحكم 👋</h1>
        <p className="text-white text-opacity-90">تابع أداء الأكاديمية وجميع الأنشطة من هنا</p>
      </div>

      {/* Key Stats */}
      <div>
        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 flex items-center gap-2">
          <BarChart3 className="text-[#D4AF37]" />
          الإحصائيات الرئيسية
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-6 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/20"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${card.color} mb-4`}>
                <div className="text-white">{card.icon}</div>
              </div>
              <p className="text-[#94A3B8] text-sm font-medium">{card.label}</p>
              <p className="text-3xl font-bold text-[#F8FAFC] mt-2">{card.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div>
        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 flex items-center gap-2">
          <Clock className="text-[#D4AF37]" />
          آخر التحديثات
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {academyData.academyUpdates.slice(0, 6).map((update) => (
            <div
              key={update.id}
              className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 hover:border-[#1F7BFF] transition-all duration-300 hover:shadow-lg hover:shadow-[#1F7BFF]/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0">{update.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#F8FAFC] text-sm md:text-base line-clamp-2">
                    {update.title}
                  </h3>
                  <p className="text-[#94A3B8] text-xs md:text-sm mt-1 line-clamp-2">
                    {update.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-[#D4AF37] font-medium">
                      {new Date(update.date).toLocaleDateString('ar-SA')}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        update.category === 'feature'
                          ? 'bg-[#1F7BFF] bg-opacity-20 text-[#1F7BFF]'
                          : update.category === 'system'
                          ? 'bg-[#D4AF37] bg-opacity-20 text-[#D4AF37]'
                          : 'bg-green-500 bg-opacity-20 text-green-400'
                      }`}
                    >
                      {update.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stories/Announcements */}
      <div>
        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4">قصص النجاح والأخبار</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {academyData.stories.slice(0, 3).map((story) => (
            <div
              key={story.id}
              className="bg-gradient-to-br from-[#0B1624] to-[#1A2332] border border-[#1E293B] rounded-lg p-4 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/20 flex flex-col"
            >
              <h3 className="font-bold text-[#F8FAFC] mb-2">{story.title}</h3>
              <p className="text-[#94A3B8] text-sm flex-1 mb-3">{story.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#D4AF37] font-medium">{story.author}</span>
                <span className="text-[#94A3B8]">
                  {new Date(story.date).toLocaleDateString('ar-SA')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4">الإجراءات السريعة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { label: 'دورة جديدة', icon: '📚' },
            { label: 'إضافة طالب', icon: '👤' },
            { label: 'ورشة شهرية', icon: '🎓' },
            { label: 'فاتورة', icon: '📄' },
            { label: 'بث مباشر', icon: '🔴' },
            { label: 'تقرير', icon: '📊' },
            { label: 'إشعار', icon: '🔔' },
            { label: 'رسالة', icon: '💬' },
          ].map((action, idx) => (
            <button
              key={idx}
              className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 hover:border-[#1F7BFF] hover:bg-[#1A2332] transition-all duration-300 text-center group"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <p className="text-xs font-medium text-[#94A3B8] group-hover:text-[#F8FAFC]">
                {action.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-6">
        <h3 className="text-xl font-bold text-[#F8FAFC] mb-4 flex items-center gap-2">
          <TrendingUp className="text-[#10B981]" />
          ملخص الأداء
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#F8FAFC] font-medium">تقدم الطلاب</span>
              <span className="text-[#D4AF37] font-bold">{stats.avgStudentProgress}%</span>
            </div>
            <div className="w-full bg-[#1A2332] rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#1F7BFF] to-[#D4AF37] h-2 rounded-full"
                style={{ width: `${stats.avgStudentProgress}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div className="bg-[#1A2332] rounded-lg p-3">
              <p className="text-[#94A3B8]">الجلسات المباشرة</p>
              <p className="text-2xl font-bold text-[#D4AF37]">{stats.activeLiveCount}</p>
            </div>
            <div className="bg-[#1A2332] rounded-lg p-3">
              <p className="text-[#94A3B8]">معدل الانخراط</p>
              <p className="text-2xl font-bold text-[#1F7BFF]">92%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
