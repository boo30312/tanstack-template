import { Link } from '@tanstack/react-router'
import { Bell, Menu, Search, Tv } from 'lucide-react'
import { BRAND } from './data'

type Props = {
  onToggleSidebar: () => void
}

/**
 * Fixed top header — part of the locked Syria TV identity (الهيدر العلوي).
 * Stays consistent across every screen; collapses to essentials on mobile.
 */
export function PortalHeader({ onToggleSidebar }: Props) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-navy-light/30 bg-navy text-white shadow-sm">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        {/* Sidebar toggle (mobile + desktop) */}
        <button
          onClick={onToggleSidebar}
          className="grid h-10 w-10 place-items-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="القائمة"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand lockup */}
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-navy shadow-inner">
            <Tv className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight">
              {BRAND.nameAr}
            </span>
            <span className="block text-[11px] font-medium text-gold-soft">
              {BRAND.portalAr}
            </span>
          </span>
        </Link>

        {/* Search — hidden on small screens */}
        <div className="mx-auto hidden w-full max-w-md items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm text-white/70 md:flex">
          <Search className="h-4 w-4" />
          <input
            type="search"
            placeholder="ابحث في البوابة…"
            className="w-full bg-transparent placeholder:text-white/50 focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="mr-auto flex items-center gap-2 md:mr-0">
          <button className="hidden rounded-lg border border-white/20 px-2.5 py-1 text-xs font-bold text-white/80 transition hover:bg-white/10 sm:block">
            عربي / EN
          </button>
          <button
            className="relative grid h-10 w-10 place-items-center rounded-lg text-white/80 transition hover:bg-white/10"
            aria-label="الإشعارات"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold" />
          </button>
          <div className="flex items-center gap-2 rounded-lg py-1 pr-1 pl-2 transition hover:bg-white/10">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-gold to-navy-light text-sm font-bold">
              أأ
            </span>
            <span className="hidden text-sm font-semibold leading-tight sm:block">
              أحمد أمين
              <span className="block text-[11px] font-normal text-white/60">
                مساهم موثّق
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
