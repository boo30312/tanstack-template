import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, FileText, Scale, ShieldCheck } from 'lucide-react'
import { PortalLayout, PageTitle } from '../portal/PortalLayout'
import { OFFICIAL_LINKS } from '../portal/data'

const DOCS = [
  {
    icon: Scale,
    title: OFFICIAL_LINKS.intellectualProperty.labelAr,
    href: OFFICIAL_LINKS.intellectualProperty.href,
    desc: 'تنظّم ملكية المحتوى والمواد المنشورة وحقوق النشر والاستخدام داخل تلفزيون سوريا.',
  },
  {
    icon: FileText,
    title: OFFICIAL_LINKS.termsOfUse.labelAr,
    href: OFFICIAL_LINKS.termsOfUse.href,
    desc: 'الشروط والأحكام التي تحكم استخدام الموقع والبوابة والخدمات المرتبطة بها.',
  },
]

function AgreementsPage() {
  return (
    <PortalLayout>
      <PageTitle
        title="الاتفاقيات والسياسات"
        subtitle="روابط رسمية مطلوبة لمرحلة الانطلاق (الهوية وبيانات التحويل)"
        icon={<ShieldCheck className="h-6 w-6" />}
      />

      <div className="mb-6 rounded-xl border border-navy/15 bg-white px-5 py-4 text-sm leading-7 text-ink/70">
        قبل تفعيل الهوية وبيانات التحويل في المرحلة المقبلة، يجب على المساهم
        الاطلاع والموافقة على المستندات الرسمية التالية المعتمدة من موقع تلفزيون
        سوريا.
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {DOCS.map((d) => {
          const Icon = d.icon
          return (
            <a
              key={d.title}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 flex items-center gap-1.5 text-lg font-extrabold text-navy group-hover:text-gold">
                {d.title}
                <ExternalLink className="h-4 w-4 opacity-50" />
              </h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-ink/60">
                {d.desc}
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-navy/70 underline-offset-4 group-hover:underline">
                فتح المستند الرسمي على syria.tv
              </span>
            </a>
          )
        })}
      </div>

      <div className="mt-6 rounded-xl bg-sand px-5 py-4 text-sm text-ink/60">
        مرجع الهوية البصرية:{' '}
        <a
          href={OFFICIAL_LINKS.brand.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-navy underline-offset-4 hover:underline"
        >
          {OFFICIAL_LINKS.brand.labelAr}
        </a>
      </div>
    </PortalLayout>
  )
}

export const Route = createFileRoute('/agreements')({
  component: AgreementsPage,
})
