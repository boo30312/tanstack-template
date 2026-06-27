import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  BadgeCheck,
  Check,
  ChevronLeft,
  CreditCard,
  Lock,
  MapPin,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { PortalLayout, PageTitle } from '../portal/PortalLayout'

/* ------------------------------------------------------------------ */
/* Validation — the portal is strict about the fields that drive
/* identity + bank transfers (name, IBAN, address).                    */
/* ------------------------------------------------------------------ */

const onlyArabic = /^[؀-ۿ\s']+$/
const onlyLatin = /^[A-Za-z\s'.-]+$/

function twoWords(v: string) {
  return v.trim().split(/\s+/).filter(Boolean).length >= 2
}

function normalizeIban(v: string) {
  return v.replace(/\s+/g, '').toUpperCase()
}

/** Real ISO 13616 IBAN check (structure + mod-97). */
function ibanIsValid(raw: string) {
  const iban = normalizeIban(raw)
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false
  const rearranged = iban.slice(4) + iban.slice(0, 4)
  const expanded = rearranged.replace(/[A-Z]/g, (c) =>
    String(c.charCodeAt(0) - 55),
  )
  // mod-97 over a long numeric string
  let remainder = 0
  for (const ch of expanded) {
    remainder = (remainder * 10 + Number(ch)) % 97
  }
  return remainder === 1
}

function groupIban(v: string) {
  return normalizeIban(v).replace(/(.{4})/g, '$1 ').trim()
}

type Form = {
  nameAr: string
  nameEn: string
  iban: string
  country: string
  city: string
  address: string
}

const EMPTY: Form = {
  nameAr: '',
  nameEn: '',
  iban: '',
  country: '',
  city: '',
  address: '',
}

const STEPS = [
  { id: 'name', label: 'الاسم', icon: UserRound },
  { id: 'iban', label: 'الإيبان', icon: CreditCard },
  { id: 'address', label: 'العنوان', icon: MapPin },
  { id: 'review', label: 'المراجعة والتأكيد', icon: ShieldCheck },
] as const

function VerificationPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Form>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [agree, setAgree] = useState(false)

  const set = (patch: Partial<Form>) => setForm((f) => ({ ...f, ...patch }))

  const errors = useMemo(() => {
    const e: Partial<Record<keyof Form, string>> = {}
    if (form.nameAr && !onlyArabic.test(form.nameAr))
      e.nameAr = 'يجب إدخال الاسم بأحرف عربية فقط.'
    else if (form.nameAr && !twoWords(form.nameAr))
      e.nameAr = 'أدخل الاسم الثلاثي على الأقل (اسمان فأكثر).'

    if (form.nameEn && !onlyLatin.test(form.nameEn))
      e.nameEn = 'English letters only (no Arabic / numbers).'
    else if (form.nameEn && !twoWords(form.nameEn))
      e.nameEn = 'Enter at least first and last name.'

    if (form.iban && !ibanIsValid(form.iban))
      e.iban = 'رقم الآيبان غير صالح — تحقق من الدولة والأرقام (IBAN/mod-97).'

    return e
  }, [form])

  const stepValid = useMemo(() => {
    switch (STEPS[step].id) {
      case 'name':
        return (
          !!form.nameAr &&
          !!form.nameEn &&
          !errors.nameAr &&
          !errors.nameEn
        )
      case 'iban':
        return !!form.iban && !errors.iban
      case 'address':
        return !!form.country && !!form.city && form.address.trim().length > 8
      case 'review':
        return agree
      default:
        return false
    }
  }, [step, form, errors, agree])

  if (submitted) {
    return (
      <PortalLayout>
        <div className="mx-auto max-w-xl py-10 text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
            <BadgeCheck className="h-10 w-10" />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-navy">
            تم استلام بياناتك بنجاح
          </h1>
          <p className="mt-2 text-ink/60">
            بياناتك الآن قيد المراجعة من قبل الإدارة. تم قفل الحقول الرسمية ولا
            يمكن تعديلها ذاتياً.
          </p>

          <div className="mt-6 rounded-2xl bg-white p-6 text-right shadow-sm ring-1 ring-gray-100">
            <Row label="الاسم (عربي)" value={form.nameAr} locked />
            <Row label="الاسم (إنجليزي)" value={form.nameEn} locked />
            <Row label="الآيبان" value={groupIban(form.iban)} locked ltr />
            <Row
              label="العنوان"
              value={`${form.country} — ${form.city} — ${form.address}`}
              locked
            />
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-lg bg-amber-50 px-4 py-3 text-right text-sm text-amber-800 ring-1 ring-amber-200">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              وفق سياسة البوابة، لا يمكن للمستفيد إعادة التعديل بعد الإرسال. لأي
              تصحيح يجب التواصل مع الإدارة عبر مركز الدعم.
            </span>
          </div>
        </div>
      </PortalLayout>
    )
  }

  const Current = STEPS[step]

  return (
    <PortalLayout>
      <PageTitle
        title="التوثيق الرسمي ومعالج الدخول الأول"
        subtitle="تحقّق دقيق من الاسم والآيبان والعنوان — تُدخل مرة واحدة وبشكل واضح."
        icon={<ShieldCheck className="h-6 w-6" />}
      />

      {/* Strict-policy banner */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
        <p>
          <strong>نظام صارم:</strong> تُدخل البيانات الرسمية مرة واحدة وبشكل
          واضح وصحيح. بعد التأكيد <strong>لا يمكن للمستفيد العودة للتعديل</strong>،
          ويُمنع إدخال أي بيانات غير واضحة أو مشوّهة. يُرجى التحقق من صحة الاسم
          (عربي/إنجليزي) والآيبان والعنوان قبل الإرسال.
        </p>
      </div>

      {/* Stepper */}
      <ol className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const done = i < step
          const active = i === step
          return (
            <li key={s.id} className="flex flex-1 items-center gap-2">
              <div
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold ${
                  active
                    ? 'bg-navy text-white'
                    : done
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-white text-ink/40 ring-1 ring-gray-200'
                }`}
              >
                {done ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                <span className="hidden sm:block">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="h-px flex-1 bg-gray-200" />
              )}
            </li>
          )
        })}
      </ol>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        {Current.id === 'name' && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="الاسم الكامل (عربي)"
              hint="كما في الوثيقة الرسمية — أحرف عربية فقط"
              value={form.nameAr}
              onChange={(v) => set({ nameAr: v })}
              error={errors.nameAr}
              placeholder="مثال: أحمد محمد الأمين"
            />
            <Field
              label="الاسم الكامل (إنجليزي)"
              hint="As written in your passport — Latin letters only"
              value={form.nameEn}
              onChange={(v) => set({ nameEn: v })}
              error={errors.nameEn}
              placeholder="e.g. Ahmad Mohammad Alameen"
              ltr
            />
          </div>
        )}

        {Current.id === 'iban' && (
          <div className="max-w-xl">
            <Field
              label="رقم الحساب الدولي (IBAN)"
              hint="يُدقّق آلياً (البنية + mod-97). يُحفظ بأحرف كبيرة وبدون فراغات."
              value={form.iban}
              onChange={(v) => set({ iban: v })}
              error={errors.iban}
              placeholder="TR00 0000 0000 0000 0000 0000 00"
              ltr
            />
            {form.iban && !errors.iban && (
              <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <BadgeCheck className="h-4 w-4" />
                آيبان صالح: <span className="ltr-field">{groupIban(form.iban)}</span>
              </p>
            )}
          </div>
        )}

        {Current.id === 'address' && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="الدولة"
              value={form.country}
              onChange={(v) => set({ country: v })}
              placeholder="مثال: تركيا"
            />
            <Field
              label="المدينة"
              value={form.city}
              onChange={(v) => set({ city: v })}
              placeholder="مثال: إسطنبول"
            />
            <div className="sm:col-span-2">
              <Field
                label="العنوان التفصيلي"
                hint="الحي، الشارع، رقم المبنى — بشكل واضح وكامل"
                value={form.address}
                onChange={(v) => set({ address: v })}
                placeholder="الحي / الشارع / رقم المبنى"
              />
            </div>
          </div>
        )}

        {Current.id === 'review' && (
          <div>
            <h3 className="mb-4 text-lg font-extrabold text-navy">
              راجع بياناتك قبل التأكيد النهائي
            </h3>
            <div className="divide-y divide-gray-100 rounded-xl bg-sand/60 px-4">
              <Row label="الاسم (عربي)" value={form.nameAr} />
              <Row label="الاسم (إنجليزي)" value={form.nameEn} ltr />
              <Row label="الآيبان" value={groupIban(form.iban)} ltr />
              <Row label="الدولة" value={form.country} />
              <Row label="المدينة" value={form.city} />
              <Row label="العنوان" value={form.address} />
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-navy/20 bg-white px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-navy"
              />
              <span className="text-ink/80">
                أقرّ بأن جميع البيانات أعلاه صحيحة وواضحة ومطابقة لوثائقي
                الرسمية، وأعلم أنه <strong>لا يمكن تعديلها بعد الإرسال</strong>.
              </span>
            </label>
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-lg px-4 py-2 text-sm font-bold text-ink/60 transition enabled:hover:bg-sand disabled:opacity-40"
          >
            السابق
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!stepValid}
              className="flex items-center gap-1.5 rounded-lg bg-navy px-5 py-2 text-sm font-bold text-white transition enabled:hover:bg-navy-light disabled:opacity-40"
            >
              التالي
              <ChevronLeft className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              disabled={!stepValid}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-bold text-white transition enabled:hover:bg-emerald-700 disabled:opacity-40"
            >
              <Lock className="h-4 w-4" />
              تأكيد نهائي وقفل البيانات
            </button>
          )}
        </div>
      </div>
    </PortalLayout>
  )
}

function Field({
  label,
  hint,
  value,
  onChange,
  error,
  placeholder,
  ltr,
}: {
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  ltr?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm transition focus:outline-none ${
          error
            ? 'border-red-300 focus:border-red-500'
            : 'border-gray-200 focus:border-navy'
        } ${ltr ? 'ltr-field' : ''}`}
      />
      {error ? (
        <span className="mt-1 block text-xs font-semibold text-red-600">
          {error}
        </span>
      ) : (
        hint && <span className="mt-1 block text-xs text-ink/50">{hint}</span>
      )}
    </label>
  )
}

function Row({
  label,
  value,
  ltr,
  locked,
}: {
  label: string
  value: string
  ltr?: boolean
  locked?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="flex items-center gap-1.5 text-sm text-ink/60">
        {locked && <Lock className="h-3.5 w-3.5 text-navy" />}
        {label}
      </span>
      <span
        className={`text-sm font-semibold text-navy ${ltr ? 'ltr-field' : ''}`}
      >
        {value || '—'}
      </span>
    </div>
  )
}

export const Route = createFileRoute('/verification')({
  component: VerificationPage,
})
