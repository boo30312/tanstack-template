import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { Compass, Hammer, MoveRight } from 'lucide-react'
import { PortalLayout, PageTitle } from '../portal/PortalLayout'

/**
 * Generic placeholder for portal sections not yet built in this trial.
 * Keeps the whole navigation map clickable while marking scope clearly.
 */
function SectionPlaceholder() {
  const { slug } = useParams({ from: '/section/$slug' })
  const label = decodeURIComponent(slug)

  return (
    <PortalLayout>
      <PageTitle
        title={label}
        subtitle="هذه الواجهة ضمن خريطة البوابة وسيتم بناؤها في المراحل القادمة"
        icon={<Compass className="h-6 w-6" />}
      />

      <div className="grid place-items-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-gray-100">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-sand text-navy">
          <Hammer className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-xl font-extrabold text-navy">
          قيد الإنشاء — نسخة تجريبية
        </h2>
        <p className="mt-2 max-w-md text-sm leading-7 text-ink/60">
          هذه نسخة أولى تجريبية تعرض الواجهات الأساسية للهوية البصرية والهيكلية.
          قسم «{label}» مُدرج ضمن الخريطة وسيُفعّل لاحقاً.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-light"
        >
          العودة إلى الملف التعريفي
          <MoveRight className="h-4 w-4" />
        </Link>
      </div>
    </PortalLayout>
  )
}

export const Route = createFileRoute('/section/$slug')({
  component: SectionPlaceholder,
})
