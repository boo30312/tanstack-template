import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import {
  BadgeCheck,
  CalendarDays,
  Clock,
  Lock,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import { PortalLayout } from '../portal/PortalLayout'
import {
  ARTICLES,
  CONTRIBUTOR,
  type SocialLink,
} from '../portal/data'
import { SOCIAL_ICONS, SOCIAL_LABELS } from '../portal/icons'

function fmtDate(iso: string) {
  return new Intl.DateTimeFormat('ar', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso))
}

function ProfilePage() {
  const [socials, setSocials] = useState<SocialLink[]>(CONTRIBUTOR.socials)
  const [editing, setEditing] = useState(false)

  // Article filters
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [category, setCategory] = useState('all')

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(ARTICLES.map((a) => a.category)))],
    [],
  )

  const articles = useMemo(() => {
    return ARTICLES.filter((a) => {
      if (category !== 'all' && a.category !== category) return false
      if (from && a.date < from) return false
      if (to && a.date > to) return false
      return true
    })
  }, [from, to, category])

  return (
    <PortalLayout>
      {/* ===== Hero / identity card (locked) ===== */}
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <div className="h-24 bg-gradient-to-l from-navy via-navy-light to-navy-deep" />
        <div className="px-6 pb-6">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:justify-between">
            {/* Social + name block */}
            <div className="order-2 flex w-full flex-col items-center gap-4 sm:order-1 sm:flex-row sm:items-end">
              {/* Editable social links */}
              <div className="flex items-center gap-2">
                {socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.network]
                  return (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={SOCIAL_LABELS[s.network]}
                      className="grid h-10 w-10 place-items-center rounded-full bg-navy text-white transition hover:bg-navy-light"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  )
                })}
                <button
                  onClick={() => setEditing(true)}
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-dashed border-navy/30 text-navy/60 transition hover:border-navy hover:text-navy"
                  title="تعديل روابط الحسابات"
                  aria-label="تعديل روابط الحسابات"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Avatar */}
            <div className="order-1 -mt-16 sm:order-2 sm:-mt-20">
              <div className="grid h-32 w-32 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-navy-light to-gold text-4xl font-extrabold text-white ring-4 ring-white sm:h-36 sm:w-36">
                أأ
              </div>
            </div>
          </div>

          {/* Name + role */}
          <div className="mt-4 text-center sm:text-right">
            <h1 className="flex flex-wrap items-center justify-center gap-2 text-3xl font-extrabold text-navy sm:justify-start">
              {CONTRIBUTOR.nameAr}
              <span className="text-navy-light">- {CONTRIBUTOR.nameEn}</span>
              {CONTRIBUTOR.status === 'verified' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                  <BadgeCheck className="h-4 w-4" /> موثّق
                </span>
              )}
            </h1>
            <p className="mt-1 text-gold">{CONTRIBUTOR.roleAr}</p>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-ink/70 sm:mx-0">
              {CONTRIBUTOR.bioAr}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-lg bg-sand px-4 py-3 text-xs text-ink/60">
            <Lock className="h-4 w-4 shrink-0 text-navy" />
            <span>
              الاسم والبيانات الرسمية مقفلة بعد التوثيق ولا يمكن تعديلها ذاتياً.
              يمكنك فقط تعديل أو إضافة روابط حساباتك الشخصية.
            </span>
          </div>
        </div>
      </section>

      {/* ===== Latest articles ===== */}
      <section className="mt-8">
        <div className="flex flex-col gap-4 border-b-2 border-navy pb-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="order-2 text-2xl font-extrabold text-navy sm:order-1">
            آخر ما كتبه
          </h2>

          {/* Filters */}
          <div className="order-1 flex flex-wrap items-center gap-2 sm:order-2">
            <div className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-gray-200">
              <CalendarDays className="h-4 w-4 text-navy" />
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="bg-transparent text-ink/80 focus:outline-none"
                aria-label="من تاريخ"
              />
            </div>
            <span className="text-ink/50">إلى</span>
            <div className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-gray-200">
              <CalendarDays className="h-4 w-4 text-navy" />
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="bg-transparent text-ink/80 focus:outline-none"
                aria-label="إلى تاريخ"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg bg-white px-3 py-2 text-sm text-ink/80 ring-1 ring-gray-200 focus:outline-none"
              aria-label="تصفية حسب التصنيف"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'كل التصنيفات' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {articles.length === 0 ? (
          <p className="py-12 text-center text-ink/50">
            لا توجد مقالات ضمن النطاق المحدد.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <article
                key={a.id}
                className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`relative h-40 bg-gradient-to-br ${a.cover}`}
                >
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-navy">
                    {a.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 min-h-[3rem] font-bold leading-7 text-navy transition group-hover:text-gold">
                    {a.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-ink/50">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {fmtDate(a.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {a.readMinutes} د قراءة
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {editing && (
        <SocialEditor
          socials={socials}
          onSave={(next) => {
            setSocials(next)
            setEditing(false)
          }}
          onClose={() => setEditing(false)}
        />
      )}
    </PortalLayout>
  )
}

/** Modal for the guest to edit / add personal account links. */
function SocialEditor({
  socials,
  onSave,
  onClose,
}: {
  socials: SocialLink[]
  onSave: (next: SocialLink[]) => void
  onClose: () => void
}) {
  const [draft, setDraft] = useState<SocialLink[]>(socials)

  const update = (id: string, patch: Partial<SocialLink>) =>
    setDraft((d) => d.map((s) => (s.id === id ? { ...s, ...patch } : s)))

  const remove = (id: string) =>
    setDraft((d) => d.filter((s) => s.id !== id))

  const add = () =>
    setDraft((d) => [
      ...d,
      { id: `s${Date.now()}`, network: 'website', url: '' },
    ])

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-extrabold text-navy">
            روابط الحسابات الشخصية
          </h3>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-ink/50 transition hover:bg-sand"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] space-y-3 overflow-y-auto px-6 py-5">
          {draft.length === 0 && (
            <p className="py-6 text-center text-sm text-ink/50">
              لم تتم إضافة أي روابط بعد.
            </p>
          )}
          {draft.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <select
                value={s.network}
                onChange={(e) =>
                  update(s.id, {
                    network: e.target.value as SocialLink['network'],
                  })
                }
                className="rounded-lg bg-sand px-2.5 py-2 text-sm text-navy focus:outline-none"
              >
                {Object.keys(SOCIAL_LABELS).map((k) => (
                  <option key={k} value={k}>
                    {SOCIAL_LABELS[k]}
                  </option>
                ))}
              </select>
              <input
                value={s.url}
                onChange={(e) => update(s.id, { url: e.target.value })}
                placeholder="https://"
                className="ltr-field flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-navy focus:outline-none"
              />
              <button
                onClick={() => remove(s.id)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-red-500 transition hover:bg-red-50"
                aria-label="حذف"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button
            onClick={add}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-navy/30 py-2.5 text-sm font-bold text-navy/70 transition hover:border-navy hover:text-navy"
          >
            <Plus className="h-4 w-4" /> إضافة رابط
          </button>
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-bold text-ink/60 transition hover:bg-sand"
          >
            إلغاء
          </button>
          <button
            onClick={() => onSave(draft.filter((s) => s.url.trim()))}
            className="rounded-lg bg-navy px-5 py-2 text-sm font-bold text-white transition hover:bg-navy-light"
          >
            حفظ الروابط
          </button>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: ProfilePage,
})
