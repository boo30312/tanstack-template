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
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-white">
            {icon}
          </span>
        )}
        <div>
          <h1 className="text-2xl font-extrabold text-navy">{title}</h1>
          {subtitle && (
            <p className="text-sm text-ink/60">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="brand-rule mt-3 w-28" />
    </div>
  )
}
