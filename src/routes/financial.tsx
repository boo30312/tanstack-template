import { createFileRoute } from '@tanstack/react-router'
import { CreditCard, Download, Lock, Send } from 'lucide-react'
import { PortalLayout, PageTitle } from '../portal/PortalLayout'
import { CONTRIBUTOR } from '../portal/data'

const STATEMENTS = [
  { id: 'PMT-2026-06', period: 'حزيران ٢٠٢٦', items: 4, amount: '٤٢٠ $', status: 'محوّل', tone: 'emerald' },
  { id: 'PMT-2026-05', period: 'أيار ٢٠٢٦', items: 3, amount: '٣١٥ $', status: 'محوّل', tone: 'emerald' },
  { id: 'PMT-2026-04', period: 'نيسان ٢٠٢٦', items: 5, amount: '٥٢٥ $', status: 'قيد التحويل', tone: 'amber' },
]

const toneMap: Record<string, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
}

function mask(iban: string) {
  const n = iban.replace(/\s+/g, '')
  return `${n.slice(0, 4)} •••• •••• •••• ${n.slice(-4)}`
}

function FinancialPage() {
  return (
    <PortalLayout>
      <PageTitle
        title="كشوف الدفع وإشعارات التحويل"
        subtitle="سجل المستحقات المالية وحالة التحويلات البنكية"
        icon={<CreditCard className="h-6 w-6" />}
      />

      {/* Bank account (locked) */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white/60">حساب التحويل المعتمد</p>
          <p className="ltr-field mt-1 text-lg font-bold">
            {mask(CONTRIBUTOR.iban)}
          </p>
          <p className="mt-0.5 text-sm text-gold-soft">{CONTRIBUTOR.nameEn}</p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white/80">
          <Lock className="h-3.5 w-3.5" /> مقفل — يُعدّل عبر الإدارة فقط
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <table className="w-full text-right text-sm">
          <thead className="bg-sand/60 text-ink/60">
            <tr>
              <th className="px-5 py-3 font-bold">الكشف</th>
              <th className="px-5 py-3 font-bold">الفترة</th>
              <th className="px-5 py-3 font-bold">عدد البنود</th>
              <th className="px-5 py-3 font-bold">المبلغ</th>
              <th className="px-5 py-3 font-bold">الحالة</th>
              <th className="px-5 py-3 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {STATEMENTS.map((s) => (
              <tr key={s.id} className="transition hover:bg-sand/40">
                <td className="ltr-field px-5 py-3.5 font-bold text-navy">
                  {s.id}
                </td>
                <td className="px-5 py-3.5 text-ink/70">{s.period}</td>
                <td className="px-5 py-3.5 text-ink/70">{s.items}</td>
                <td className="px-5 py-3.5 font-bold text-navy">{s.amount}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${toneMap[s.tone]}`}
                  >
                    {s.tone === 'emerald' ? (
                      <Send className="h-3.5 w-3.5" />
                    ) : null}
                    {s.status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-navy transition hover:bg-sand">
                    <Download className="h-3.5 w-3.5" /> تنزيل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  )
}

export const Route = createFileRoute('/financial')({
  component: FinancialPage,
})
