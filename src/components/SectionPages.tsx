import { BookOpen, Users, Clock, BarChart3, Zap, Gift, Video, FileText, CheckSquare, Bell, DollarSign } from 'lucide-react'
import { academyData } from '../data/academy-data'

// Courses Section
export function CoursesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <BookOpen className="text-[#D4AF37]" />
          الدورات التعليمية
        </h1>
        <p className="text-[#94A3B8]">إدارة جميع الدورات والبرامج التعليمية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {academyData.courses.map((course) => (
          <div
            key={course.id}
            className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 hover:border-[#1F7BFF] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-[#F8FAFC] text-sm md:text-base flex-1">{course.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0 ${
                course.status === 'active' ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-yellow-500 bg-opacity-20 text-yellow-400'
              }`}>
                {course.status === 'active' ? 'نشط' : 'قادم'}
              </span>
            </div>
            <p className="text-[#94A3B8] text-xs md:text-sm mb-3">{course.description}</p>
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">المدرب:</span>
                <span className="text-[#D4AF37] font-medium">{course.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">الطلاب:</span>
                <span className="text-[#F8FAFC]">{course.students}</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between mb-1">
                  <span className="text-[#94A3B8]">التقدم:</span>
                  <span className="text-[#1F7BFF]">{course.progress}%</span>
                </div>
                <div className="w-full bg-[#1A2332] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#1F7BFF] to-[#D4AF37] h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Students Section
export function StudentsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <Users className="text-[#D4AF37]" />
          الطلاب
        </h1>
        <p className="text-[#94A3B8]">إدارة وتتبع الطلاب المسجلين</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E293B]">
              <th className="text-right p-4 text-[#94A3B8] font-semibold">الاسم</th>
              <th className="text-right p-4 text-[#94A3B8] font-semibold">البريد</th>
              <th className="text-right p-4 text-[#94A3B8] font-semibold">الحالة</th>
              <th className="text-right p-4 text-[#94A3B8] font-semibold">الدورات</th>
              <th className="text-right p-4 text-[#94A3B8] font-semibold">التقدم</th>
            </tr>
          </thead>
          <tbody>
            {academyData.students.map((student) => (
              <tr
                key={student.id}
                className="border-b border-[#1E293B] hover:bg-[#0B1624] transition-colors"
              >
                <td className="p-4 text-[#F8FAFC] font-medium">{student.name}</td>
                <td className="p-4 text-[#94A3B8] text-sm">{student.email}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    student.status === 'active' ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'
                  }`}>
                    {student.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </td>
                <td className="p-4 text-[#F8FAFC]">{student.coursesEnrolled}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#1A2332] rounded-full h-2">
                      <div
                        className="bg-[#D4AF37] h-2 rounded-full"
                        style={{ width: `${student.completionRate}%` }}
                      />
                    </div>
                    <span className="text-[#D4AF37] text-sm font-medium">{student.completionRate}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Workshops Section
export function WorkshopsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <Clock className="text-[#D4AF37]" />
          الورشات الشهرية
        </h1>
        <p className="text-[#94A3B8]">جدول الورشات والفعاليات</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {academyData.workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 hover:border-[#D4AF37] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-[#F8FAFC] flex-1">{workshop.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                workshop.status === 'upcoming' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' : 'bg-green-500 bg-opacity-20 text-green-400'
              }`}>
                {workshop.status === 'upcoming' ? 'قادمة' : 'مكتملة'}
              </span>
            </div>
            <p className="text-[#94A3B8] text-sm mb-4">{workshop.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">المدرب:</span>
                <span className="text-[#D4AF37]">{workshop.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">التاريخ والوقت:</span>
                <span className="text-[#F8FAFC]">{workshop.date} - {workshop.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">الحاضرون:</span>
                <span className="text-[#F8FAFC]">{workshop.attendees}/{workshop.maxCapacity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Live Sessions Section
export function LiveSessionsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <Video className="text-[#D4AF37]" />
          اللايفات والتحليلات المباشرة
        </h1>
        <p className="text-[#94A3B8]">جلسات البث المباشر والتحليلات</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {academyData.liveSessions.map((session) => (
          <div
            key={session.id}
            className={`border rounded-lg p-4 ${
              session.status === 'live'
                ? 'bg-gradient-to-r from-red-500 from-opacity-10 to-transparent border-red-500'
                : 'bg-[#0B1624] border-[#1E293B]'
            } hover:border-[#1F7BFF] transition-all duration-300`}
          >
            {session.status === 'live' && (
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-red-400 text-sm font-bold">بث مباشر الآن</span>
              </div>
            )}
            <h3 className="font-bold text-[#F8FAFC] mb-2">{session.title}</h3>
            <p className="text-[#94A3B8] text-sm mb-3">{session.topic}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">المدرب:</span>
                <span className="text-[#D4AF37]">{session.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">المشاهدون:</span>
                <span className="text-[#F8FAFC]">{session.viewers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">المدة:</span>
                <span className="text-[#F8FAFC]">{session.duration} دقيقة</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Daily Deals Section
export function DailyDealsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <Gift className="text-[#D4AF37]" />
          الصفقات المجانية اليومية
        </h1>
        <p className="text-[#94A3B8]">عروض وخصومات حصرية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {academyData.dailyDeals.map((deal) => (
          <div
            key={deal.id}
            className={`border rounded-lg p-4 ${
              deal.isActive
                ? 'bg-gradient-to-br from-[#D4AF37] from-opacity-10 to-transparent border-[#D4AF37]'
                : 'bg-[#0B1624] border-[#1E293B]'
            }`}
          >
            {deal.isActive && (
              <div className="bg-[#D4AF37] text-[#05070D] text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                عرض نشط
              </div>
            )}
            <h3 className="font-bold text-[#F8FAFC] mb-2">{deal.title}</h3>
            <p className="text-[#94A3B8] text-sm mb-4">{deal.description}</p>
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <span className="text-xs text-[#94A3B8] line-through">${deal.originalPrice}</span>
                <p className="text-2xl font-bold text-[#D4AF37]">
                  {deal.discount === 100 ? 'مجاني' : `$${deal.discountedPrice}`}
                </p>
              </div>
              <span className="bg-[#D4AF37] text-[#05070D] px-3 py-1 rounded-lg font-bold text-sm">
                -{deal.discount}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Articles Section
export function ArticlesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <FileText className="text-[#D4AF37]" />
          المقالات والمحتوى
        </h1>
        <p className="text-[#94A3B8]">المقالات التعليمية والتحليلات</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {academyData.articles.map((article) => (
          <div
            key={article.id}
            className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 hover:border-[#1F7BFF] transition-all duration-300"
          >
            {article.featured && (
              <div className="bg-[#D4AF37] text-[#05070D] text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                مميزة
              </div>
            )}
            <h3 className="font-bold text-[#F8FAFC] mb-2">{article.title}</h3>
            <p className="text-[#94A3B8] text-sm mb-4 line-clamp-2">{article.content}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-[#1A2332] text-[#94A3B8] px-2 py-1 rounded">{article.category}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <div className="flex gap-3">
                <span>👍 {article.likes}</span>
                <span>👁️ {article.views}</span>
              </div>
              <span className="text-[#D4AF37]">{new Date(article.publishedDate).toLocaleDateString('ar-SA')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Tasks Section
export function TasksSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <CheckSquare className="text-[#D4AF37]" />
          المهام
        </h1>
        <p className="text-[#94A3B8]">إدارة المهام والمشاريع</p>
      </div>

      <div className="space-y-3">
        {academyData.tasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 hover:border-[#1F7BFF] transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-bold text-[#F8FAFC] mb-1">{task.title}</h3>
                <p className="text-[#94A3B8] text-sm">{task.description}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                task.priority === 'high' ? 'bg-red-500 bg-opacity-20 text-red-400' :
                task.priority === 'medium' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                'bg-green-500 bg-opacity-20 text-green-400'
              }`}>
                {task.priority === 'high' ? 'عالية' : task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-[#D4AF37]">المسؤول: {task.assignedTo}</span>
              <span className="text-[#94A3B8]">موعد نهائي: {new Date(task.dueDate).toLocaleDateString('ar-SA')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
