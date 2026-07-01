import { Newspaper } from 'lucide-react'

// Top news bar for the platform. Static sample headlines; wiring comes later.
const headlines = [
  'تلفزيون سوريا – نظام إدارة المستفيدين قيد التشغيل',
  'سوريا الاقتصادية: متابعة دورات الدفع الشهرية',
  'تحديث بيانات المستفيدين ومزامنة المصادر الرسمية',
  'مطابقات الاستكتاب والظهور التلفزيوني للربع الحالي',
]

export function NewsBar() {
  return (
    <div className="flex h-9 items-center overflow-hidden border-b border-slate-200 bg-white">
      <span className="flex h-full shrink-0 items-center gap-2 bg-[var(--brand-teal)] px-4 text-xs font-bold text-white">
        <Newspaper className="h-3.5 w-3.5" />
        أخبار
      </span>
      <div className="relative flex-1 overflow-hidden">
        <div className="ticker-track">
          {[...headlines, ...headlines].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 px-6 text-xs text-slate-600"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
