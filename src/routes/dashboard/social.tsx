import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Share2, Calendar, BarChart3, Plus, Edit2, Trash2 } from 'lucide-react'

function SocialMediaModule() {
  const { hasPermission } = useAuth()
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: 'حملة تجارة القمح',
      platforms: ['Facebook', 'Instagram'],
      status: 'نشطة',
      scheduledDate: '2026-06-15',
      engagement: 8.5,
    },
    {
      id: 2,
      title: 'حملة الذهب والفضة',
      platforms: ['Twitter', 'LinkedIn'],
      status: 'مجدولة',
      scheduledDate: '2026-06-20',
      engagement: 0,
    },
    {
      id: 3,
      title: 'حملة الفوركس التعليمية',
      platforms: ['Facebook'],
      status: 'مكتملة',
      scheduledDate: '2026-06-01',
      engagement: 12.3,
    },
  ])

  const canManage = hasPermission('social_manage')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Share2 className="text-amber-400" size={32} />
            إدارة وسائل التواصل الاجتماعي
          </h1>
          <p className="text-gray-400">إنشار وجدولة محتوى وسائل التواصل عبر جميع المنصات</p>
        </div>
        {canManage && (
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-medium">
            <Plus size={20} />
            حملة جديدة
          </button>
        )}
      </div>

      {/* Campaigns Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-slate-800 border border-amber-600/20 rounded-lg p-6 hover:border-amber-600/50 transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{campaign.title}</h3>
                <div className="flex gap-2">
                  {campaign.platforms.map((platform) => (
                    <span key={platform} className="text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded font-medium ${
                  campaign.status === 'نشطة'
                    ? 'bg-green-500/20 text-green-400'
                    : campaign.status === 'مجدولة'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {campaign.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-slate-700">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar size={16} className="text-amber-400" />
                <span className="text-sm">{campaign.scheduledDate}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <BarChart3 size={16} className="text-amber-400" />
                <span className="text-sm">{campaign.engagement}% التفاعل</span>
              </div>
            </div>

            {canManage && (
              <div className="flex gap-2">
                <button className="flex-1 bg-amber-600/10 hover:bg-amber-600/20 text-amber-400 py-2 rounded flex items-center justify-center gap-2 transition">
                  <Edit2 size={16} />
                  تعديل
                </button>
                <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded flex items-center justify-center gap-2 transition">
                  <Trash2 size={16} />
                  حذف
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Platform Statistics */}
      <div className="bg-slate-800 border border-amber-600/20 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">إحصائيات المنصات</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { platform: 'Facebook', followers: '125K', growth: '+8%' },
            { platform: 'Instagram', followers: '98K', growth: '+12%' },
            { platform: 'Twitter/X', followers: '45K', growth: '+5%' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-700/50 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">{stat.platform}</p>
              <p className="text-2xl font-bold text-amber-400 mb-1">{stat.followers}</p>
              <p className="text-xs text-green-400">{stat.growth} هذا الشهر</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/dashboard/social')({
  component: SocialMediaModule,
})
