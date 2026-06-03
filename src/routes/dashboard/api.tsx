import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Zap, Key, Check, X, Copy, Plus } from 'lucide-react'

function SmartAPIModule() {
  const { hasPermission } = useAuth()
  const [apis, setApis] = useState([
    {
      id: 1,
      name: 'واجهة التحليلات المتقدمة',
      status: 'نشطة',
      calls: '125K / 150K',
      lastUsed: '2026-06-03',
      apiKey: 'sk_live_abc123...',
    },
    {
      id: 2,
      name: 'واجهة إدارة المحفظة',
      status: 'نشطة',
      calls: '89K / 200K',
      lastUsed: '2026-06-02',
      apiKey: 'sk_live_def456...',
    },
    {
      id: 3,
      name: 'واجهة أسعار السوق',
      status: 'معطلة',
      calls: '0 / 100K',
      lastUsed: '2026-05-25',
      apiKey: 'sk_live_ghi789...',
    },
  ])

  const canConfigure = hasPermission('api_config')
  const [copied, setCopied] = useState<number | null>(null)

  const copyToClipboard = (key: string, id: number) => {
    navigator.clipboard.writeText(key)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Zap className="text-amber-400" size={32} />
            الواجهات البرمجية الذكية
          </h1>
          <p className="text-gray-400">إدارة واجهات البرمجيات والمفاتيح والاتصالات</p>
        </div>
        {canConfigure && (
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-medium">
            <Plus size={20} />
            واجهة جديدة
          </button>
        )}
      </div>

      {/* API List */}
      <div className="space-y-4">
        {apis.map((api) => (
          <div key={api.id} className="bg-slate-800 border border-amber-600/20 rounded-lg p-6 hover:border-amber-600/50 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{api.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    {api.status === 'نشطة' ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <X size={16} className="text-red-400" />
                    )}
                    {api.status}
                  </span>
                  <span>آخر استخدام: {api.lastUsed}</span>
                </div>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded font-medium ${
                  api.status === 'نشطة' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}
              >
                {api.status}
              </span>
            </div>

            {/* API Key Section */}
            <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <Key size={16} className="text-amber-400" />
                  <code className="text-sm text-gray-300">{api.apiKey}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(api.apiKey, api.id)}
                  className="ml-4 p-2 hover:bg-slate-600 rounded transition"
                >
                  <Copy
                    size={16}
                    className={copied === api.id ? 'text-green-400' : 'text-gray-400'}
                  />
                </button>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">الاستدعاءات هذا الشهر</p>
                <p className="text-lg font-bold text-amber-400">{api.calls}</p>
                <div className="mt-2 bg-slate-600 rounded-full h-1 overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: '83%' }}></div>
                </div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">حالة الاتصال</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-300">متصل</p>
                </div>
              </div>
            </div>

            {canConfigure && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700">
                <button className="flex-1 bg-amber-600/10 hover:bg-amber-600/20 text-amber-400 py-2 rounded transition text-sm font-medium">
                  إعادة تعيين المفتاح
                </button>
                <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded transition text-sm font-medium">
                  حذف
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Integration Guide */}
      <div className="bg-slate-800 border border-amber-600/20 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">مرجع التكامل</h3>
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <p className="text-gray-300 text-sm mb-3">طلب HTTP أساسي:</p>
          <code className="text-xs bg-slate-900 p-3 rounded block text-gray-300 overflow-x-auto">
            {`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.enterpoint.com/v1/analytics/summary`}
          </code>
        </div>
        <a href="#" className="text-amber-400 hover:text-amber-300 text-sm font-medium">
          ← اطلع على الوثائق الكاملة
        </a>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/dashboard/api')({
  component: SmartAPIModule,
})
