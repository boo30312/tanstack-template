import { Link } from '@tanstack/react-router'
import { sections } from './navigation'
import { SyriaTvLogo, SyriaEconomicLogo } from './Logos'

export function AppSidebar() {
  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col bg-[var(--brand-navy)] text-slate-200">
      {/* Brand */}
      <div className="border-b border-white/10 px-5 py-5">
        <SyriaTvLogo />
        <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
          منصة إدارة المستفيدين
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.id}
              to={section.path}
              activeOptions={{ exact: section.path === '/' }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              activeProps={{
                className:
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold bg-[var(--brand-teal)] text-white shadow-sm',
              }}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              <span>{section.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer brand */}
      <div className="border-t border-white/10 px-5 py-4">
        <SyriaEconomicLogo />
      </div>
    </aside>
  )
}
