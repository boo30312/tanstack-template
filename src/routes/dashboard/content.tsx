import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FileText, Clock, CheckCircle, Eye, Edit2, Trash2, Plus } from 'lucide-react'

function ContentManagementModule() {
  const { hasPermission } = useAuth()
  const [contents, setContents] = useState([
    {
      id: 1,
      title: 'مقدمة إلى التحليل الفني',
      status: 'منشور',
      type: 'دورة تعليمية',
      views: 2451,
      scheduledDate: '2026-06-01',
      author: 'أحمد المدير',
    },
    {
      id: 2,
      title: 'استراتيجيات التداول المتقدمة',
      status: 'قيد المراجعة',
      type: 'كتاب إلكتروني',
      views: 0,
      scheduledDate: '2026-06-10',
      author: 'فاطمة علي',
    },
    {
      id: 3,
      title: 'نصائح إدارة المخاطر',
      status: 'مجدول',
      type: 'مقال',
      views: 0,
      scheduledDate: '2026-06-15',
      author: 'محمد حسن',
    },
    {
      id: 4,
      title: 'الأسبوع الذهبي في الفوركس',
      status: 'منشور',
      type: 'فيديو تعليمي',
      views: 5821,
      scheduledDate: '2026-05-25',
      author: 'أحمد المدير',
    },
  ])

  const canManage = hasPermission('content_manage')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'منشور':
        return 'bg-green-500/20 text-green-400'
      case 'قيد المراجعة':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'مجدول':
        return 'bg-blue-500/20 text-blue-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <FileText className="text-amber-400" size={32} />
            إدارة المحتوى
          </h1>
          <p className="text-gray-400">إنشاء وجدولة ونشر المحتوى التعليمي</p>
        </div>
        {canManage && (
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-medium">
            <Plus size={20} />
            محتوى جديد
          </button>
        )}
      </div>

      {/* Content Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي المحتوى', value: '234', icon: FileText },
          { label: 'منشور', value: '189', icon: CheckCircle },
          { label: 'قيد المراجعة', value: '28', icon: Clock },
          { label: 'إجمالي المشاهدات', value: '45.2K', icon: Eye },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-slate-800 border border-amber-600/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <Icon size={24} className="text-amber-400/50" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Content Table */}
      <div className="bg-slate-800 border border-amber-600/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50 border-b border-amber-600/20">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">العنوان</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">النوع</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">المؤلف</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">المشاهدات</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">التاريخ</th>
                {canManage && <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">الإجراءات</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {contents.map((content) => (
                <tr key={content.id} className="hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{content.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{content.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(content.status)}`}>
                      {content.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{content.author}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-amber-400 font-medium">{content.views}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{content.scheduledDate}</span>
                  </td>
                  {canManage && (
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-slate-600 rounded transition" title="تعديل">
                          <Edit2 size={16} className="text-amber-400" />
                        </button>
                        <button className="p-1 hover:bg-slate-600 rounded transition" title="حذف">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Publishing Schedule */}
      <div className="bg-slate-800 border border-amber-600/20 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="text-amber-400" size={24} />
          جدول النشر
        </h3>
        <div className="space-y-3">
          {contents
            .filter((c) => c.status === 'مجدول')
            .map((content) => (
              <div key={content.id} className="flex items-center justify-between pb-3 border-b border-slate-700 last:border-0">
                <div>
                  <p className="font-medium text-white">{content.title}</p>
                  <p className="text-xs text-gray-400">{content.author}</p>
                </div>
                <span className="text-sm text-amber-400 font-medium">{content.scheduledDate}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/dashboard/content')({
  component: ContentManagementModule,
})
