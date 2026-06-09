import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Users, Mail, Shield, Clock, Edit2, Trash2, Plus, CheckCircle } from 'lucide-react'

function EmployeeManagementModule() {
  const { hasPermission } = useAuth()
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'أحمد الموسى',
      email: 'admin@enterpoint.com',
      role: 'مسؤول',
      department: 'الإدارة',
      status: 'نشط',
      joinDate: '2024-01-15',
      permissions: ['*'],
    },
    {
      id: 2,
      name: 'فاطمة علي',
      email: 'manager@enterpoint.com',
      role: 'مسؤولة',
      department: 'الإدارة',
      status: 'نشط',
      joinDate: '2024-02-20',
      permissions: ['social_manage', 'content_manage', 'view_analytics'],
    },
    {
      id: 3,
      name: 'محمد حسن',
      email: 'content@enterpoint.com',
      role: 'منشئ محتوى',
      department: 'المحتوى',
      status: 'نشط',
      joinDate: '2024-03-10',
      permissions: ['content_create', 'content_publish'],
    },
    {
      id: 4,
      name: 'سارة محمد',
      email: 'analyst@enterpoint.com',
      role: 'محللة',
      department: 'التحليل',
      status: 'نشط',
      joinDate: '2024-04-05',
      permissions: ['view_analytics', 'view_reports'],
    },
    {
      id: 5,
      name: 'علي إبراهيم',
      email: 'developer@enterpoint.com',
      role: 'مطور',
      department: 'التطوير',
      status: 'متوقف',
      joinDate: '2024-05-12',
      permissions: ['api_config', 'api_readonly'],
    },
  ])

  const canManage = hasPermission('manage_employees')
  const [showPermissionsModal, setShowPermissionsModal] = useState<number | null>(null)

  const allPermissions = [
    'view_dashboard',
    'social_manage',
    'content_manage',
    'content_create',
    'content_publish',
    'api_config',
    'api_readonly',
    'view_analytics',
    'view_reports',
    'manage_employees',
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Users className="text-amber-400" size={32} />
            إدارة حسابات الموظفين
          </h1>
          <p className="text-gray-400">إدارة المستخدمين والأدوار والصلاحيات</p>
        </div>
        {canManage && (
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-medium">
            <Plus size={20} />
            موظف جديد
          </button>
        )}
      </div>

      {/* Employee Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'إجمالي الموظفين', value: employees.length, icon: Users },
          { label: 'نشطون', value: employees.filter((e) => e.status === 'نشط').length, icon: CheckCircle },
          { label: 'أدوار مختلفة', value: new Set(employees.map((e) => e.role)).size, icon: Shield },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-slate-800 border border-amber-600/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <Icon size={28} className="text-amber-400/50" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Employee List */}
      <div className="bg-slate-800 border border-amber-600/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50 border-b border-amber-600/20">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">الاسم</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">البريد</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">الدور</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">القسم</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">تاريخ الانضمام</th>
                {canManage && <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">الإجراءات</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{employee.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Mail size={16} />
                      {employee.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-amber-400 font-medium">{employee.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{employee.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        employee.status === 'نشط' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock size={16} />
                      {employee.joinDate}
                    </div>
                  </td>
                  {canManage && (
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setShowPermissionsModal(showPermissionsModal === employee.id ? null : employee.id)
                          }
                          className="p-1 hover:bg-slate-600 rounded transition"
                          title="إدارة الصلاحيات"
                        >
                          <Shield size={16} className="text-amber-400" />
                        </button>
                        <button className="p-1 hover:bg-slate-600 rounded transition" title="تعديل">
                          <Edit2 size={16} className="text-blue-400" />
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

        {/* Permissions Modal */}
        {canManage && showPermissionsModal && (
          <div className="border-t border-amber-600/20 bg-slate-700/50 p-6">
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-white mb-4">
                إدارة الصلاحيات - {employees.find((e) => e.id === showPermissionsModal)?.name}
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {allPermissions.map((perm) => {
                  const employee = employees.find((e) => e.id === showPermissionsModal)
                  const isChecked = employee?.permissions.includes(perm) || employee?.permissions.includes('*')
                  return (
                    <label key={perm} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          // This would be implemented with actual state management
                        }}
                        className="w-4 h-4 rounded accent-amber-600"
                        disabled={employee?.role === 'مسؤول'}
                      />
                      <span className="text-sm text-gray-300">{perm}</span>
                    </label>
                  )
                })}
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowPermissionsModal(null)}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition font-medium"
                >
                  حفظ التغييرات
                </button>
                <button
                  onClick={() => setShowPermissionsModal(null)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 rounded transition font-medium"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Department Distribution */}
      <div className="bg-slate-800 border border-amber-600/20 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">توزيع الموظفين حسب الأقسام</h3>
        <div className="space-y-3">
          {Array.from(new Set(employees.map((e) => e.department))).map((dept) => {
            const count = employees.filter((e) => e.department === dept).length
            return (
              <div key={dept} className="flex items-center justify-between">
                <span className="text-gray-300">{dept}</span>
                <div className="flex items-center gap-3 flex-1 ml-4">
                  <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full"
                      style={{ width: `${(count / employees.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-amber-400 font-medium w-8 text-right">{count}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/dashboard/employees')({
  component: EmployeeManagementModule,
})
