import { useState, type ReactNode } from 'react'
import { PortalHeader } from './PortalHeader'
import { PortalSidebar } from './PortalSidebar'
import { PortalFooter } from './PortalFooter'

/**
 * Shared shell for every portal screen: fixed header on top, navigation on the
 * (RTL) right, fixed footer at the bottom, content in between. The header and
 * footer are the locked identity; the inner column is the responsive area.
 */
export function PortalLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-sand text-ink font-arabic">
      <PortalHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />

      <div className="flex flex-1">
        <PortalSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>

      <PortalFooter />
    </div>
  )
}

/** Page heading with the brand divider, reused across screens. */
export function PageTitle({
  title,
  subtitle,
  icon,
}: {
  title: string
  subtitle?: string
  icon?: ReactNode
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy text-white sm:h-11 sm:w-11">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold leading-tight text-navy sm:text-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 text-[13px] text-ink/60 sm:text-sm">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="brand-rule mt-3 w-28" />
    </div>
  )
}
