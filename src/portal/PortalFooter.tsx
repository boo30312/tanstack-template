import { Tv } from 'lucide-react'
import { BRAND, OFFICIAL_LINKS } from './data'

/**
 * Fixed bottom footer — part of the locked Syria TV identity (الفوتر السفلي).
 * Surfaces the official legal links the launch phase depends on (intellectual
 * property + terms of use + brand reference).
 */
export function PortalFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-navy-light/30 bg-navy-deep text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-navy">
            <Tv className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-extrabold">{BRAND.nameAr}</p>
            <p className="text-[11px] text-white/60">
              {BRAND.portalAr} — نسخة تجريبية للواجهات
            </p>
          </div>
        </div>

        {/* Official links required for the launch phase */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a
            href={OFFICIAL_LINKS.intellectualProperty.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 underline-offset-4 transition hover:text-gold-soft hover:underline"
          >
            {OFFICIAL_LINKS.intellectualProperty.labelAr}
          </a>
          <a
            href={OFFICIAL_LINKS.termsOfUse.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 underline-offset-4 transition hover:text-gold-soft hover:underline"
          >
            {OFFICIAL_LINKS.termsOfUse.labelAr}
          </a>
          <a
            href={OFFICIAL_LINKS.brand.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 underline-offset-4 transition hover:text-gold-soft hover:underline"
          >
            {OFFICIAL_LINKS.brand.labelAr}
          </a>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-4 text-center text-[12px] text-white/50">
          © {year} {BRAND.nameAr} — جميع الحقوق محفوظة. الهوية البصرية والمحتوى
          ملك لتلفزيون سوريا.
        </p>
      </div>
    </footer>
  )
}
