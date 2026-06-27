import { createFileRoute } from '@tanstack/react-router'
import {
  BadgeCheck,
  Clock,
  CreditCard,
  FileText,
  LayoutDashboard,
  TrendingUp,
  Users,
} from 'lucide-react'
import { PortalLayout, PageTitle } from '../portal/PortalLayout'

const STATS = [
  { label: 'المساهمون', value: '٢٤٨', delta: '+12', icon: Users, tone: 'navy' },
  { label: 'بانتظار التوثيق', value: '٣١', delta: '+5', icon: Clock, tone: 'gold' },
  { label: 'مقالات منشورة', value: '١٬٤٠٦', delta: '+38', icon: FileText, tone: 'navy' },
  { label: 'تحويلات الشهر', value: '٨٩', delta: '+9', icon: CreditCard, tone: 'gold' },
]

const ROWS = [
  { name: 'أحمد أمين', role: 'مراسل', status: 'موثّق', tone: 'emerald' },
  { name: 'ليلى حسن', role: 'كاتبة رأي', status: 'قيد المراجعة', tone: 'amber' },
  { name: 'كريم نور', role: 'ضيف', status: 'موثّق', tone: 'emerald' },
  { name: 'سامر العلي', role: 'محلل', status: 'بيانات ناقصة', tone: 'red' },
  { name: 'رنا خالد', role: 'مراسلة', status: 'قيد المراجعة', tone: 'amber' },
]

const toneMap: Record<string, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  red: 'bg-red-50 text-red-700 ring-red-200',
}

function AdminPage() {
  return (
    <PortalLayout>
      <PageTitle
        title="لوحة تحكم الإدارة"
        subtitle="نظرة عامة على المساهمين والتوثيق والمالية"
        icon={<LayoutDashboard className="h-6 w-6" />}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl ${
                    s.tone === 'gold'
                      ? 'bg-gold/15 text-gold'
                      : 'bg-navy/10 text-navy'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {s.delta}
                </span>
              </div>
              <p className="mt-4 text-3xl font-extrabold text-navy">{s.value}</p>
              <p className="text-sm text-ink/60">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent contributors */}
      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-extrabold text-navy">أحدث المساهمين</h2>
          <button className="text-sm font-bold text-navy/70 hover:text-navy">
            عرض الكل
          </button>
        </div>
        <table className="w-full text-right text-sm">
          <thead className="bg-sand/60 text-ink/60">
            <tr>
              <th className="px-6 py-3 font-bold">الاسم</th>
              <th className="px-6 py-3 font-bold">الصفة</th>
              <th className="px-6 py-3 font-bold">حالة التوثيق</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ROWS.map((r) => (
              <tr key={r.name} className="transition hover:bg-sand/40">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-navy/10 text-xs font-bold text-navy">
                      {r.name.slice(0, 1)}
                    </span>
                    <span className="font-semibold text-navy">{r.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-ink/70">{r.role}</td>
                <td className="px-6 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${toneMap[r.tone]}`}
                  >
                    {r.tone === 'emerald' && <BadgeCheck className="h-3.5 w-3.5" />}
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  )
}

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})
