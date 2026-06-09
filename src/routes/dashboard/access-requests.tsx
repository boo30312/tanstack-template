import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react'

interface AccessRequest {
  id: string
  name: string
  email: string
  phone: string
  role: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

function AccessRequests() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<AccessRequest[]>([
    {
      id: '1',
      name: 'علي الحسن',
      email: 'ali.hassan@email.com',
      phone: '+966501234567',
      role: 'instructor',
      reason: 'لتدريس الدورات التعليمية الجديدة',
      status: 'pending',
      createdAt: '2026-06-08',
    },
    {
      id: '2',
      name: 'سارة محمد',
      email: 'sarah.ahmed@email.com',
      phone: '+966502234567',
      role: 'marketing',
      reason: 'إدارة حملات التسويق والسوشيال ميديا',
      status: 'pending',
      createdAt: '2026-06-07',
    },
    {
      id: '3',
      name: 'محمود إبراهيم',
      email: 'mahmoud.ibrahim@email.com',
      phone: '+966503234567',
      role: 'sales',
      reason: 'العمل في فريق المبيعات',
      status: 'approved',
      createdAt: '2026-06-05',
    },
  ])

  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Only admins can access this page
  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">لا توجد صلاحية لعرض هذه الصفحة</p>
      </div>
    )
  }

  const handleApprove = (id: string) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: 'approved' } : req)))
    setShowDetails(false)
  }

  const handleReject = (id: string) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: 'rejected' } : req)))
    setShowDetails(false)
  }

  const pendingCount = requests.filter((r) => r.status === 'pending').length
  const approvedCount = requests.filter((r) => r.status === 'approved').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">إدارة طلبات الوصول</h1>
        <p className="text-gray-400">مراجعة وإدارة طلبات دخول الموظفين</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-amber-600/20 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">إجمالي الطلبات</p>
          <p className="text-3xl font-bold text-white">{requests.length}</p>
        </div>
        <div className="bg-slate-800 border border-amber-600/20 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">قيد الانتظار</p>
          <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
        </div>
        <div className="bg-slate-800 border border-amber-600/20 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">موافق عليها</p>
          <p className="text-3xl font-bold text-green-400">{approvedCount}</p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-slate-800 border border-amber-600/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50 border-b border-amber-600/20">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">الاسم</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">البريد</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">الرقم</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">الدور</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">التاريخ</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{request.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-400">{request.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-400">{request.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
                      {request.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {request.status === 'pending' && (
                        <>
                          <Clock size={16} className="text-yellow-400" />
                          <span className="text-sm text-yellow-400">قيد الانتظار</span>
                        </>
                      )}
                      {request.status === 'approved' && (
                        <>
                          <CheckCircle size={16} className="text-green-400" />
                          <span className="text-sm text-green-400">موافق عليه</span>
                        </>
                      )}
                      {request.status === 'rejected' && (
                        <>
                          <XCircle size={16} className="text-red-400" />
                          <span className="text-sm text-red-400">مرفوض</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-400">{request.createdAt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request)
                          setShowDetails(true)
                        }}
                        className="p-1 hover:bg-slate-600 rounded transition"
                      >
                        <Eye size={16} className="text-amber-400" />
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="p-1 hover:bg-green-500/20 rounded transition"
                          >
                            <CheckCircle size={16} className="text-green-400" />
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="p-1 hover:bg-red-500/20 rounded transition"
                          >
                            <XCircle size={16} className="text-red-400" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-amber-600/20 rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-white mb-4">تفاصيل الطلب</h2>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">الاسم</p>
                <p className="text-white font-medium">{selectedRequest.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">البريد الإلكتروني</p>
                <p className="text-white font-medium">{selectedRequest.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">رقم الهاتف</p>
                <p className="text-white font-medium">{selectedRequest.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">الدور المطلوب</p>
                <p className="text-white font-medium">{selectedRequest.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">السبب</p>
                <p className="text-white font-medium">{selectedRequest.reason}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {selectedRequest.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
                  >
                    قبول الطلب
                  </button>
                  <button
                    onClick={() => handleReject(selectedRequest.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
                  >
                    رفض الطلب
                  </button>
                </>
              )}
              <button
                onClick={() => setShowDetails(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded transition"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute('/dashboard/access-requests')({
  component: AccessRequests,
})
