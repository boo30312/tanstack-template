import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
import { NAV } from './data'
import { NAV_ICONS } from './icons'

type Props = {
  open: boolean
  onClose: () => void
}

/**
 * Collapsible navigation that mirrors the agreed portal map. Wired items link
 * to real screens; the rest go to the placeholder route via a slug.
 */
export function PortalSidebar({ open, onClose }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [expanded, setExpanded] = useState<string | null>('contributor')

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <button
          aria-label="إغلاق القائمة"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-navy-deep/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 right-0 top-16 z-30 w-72 overflow-y-auto border-l border-gray-200 bg-white transition-transform duration-300 lg:static lg:top-0 lg:translate-x-0 ${
          open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="space-y-1 p-3">
          {NAV.map((section) => {
            const Icon = NAV_ICONS[section.icon]
            const isExpanded = expanded === section.id
            return (
              <div key={section.id}>
                <button
                  onClick={() => setExpanded(isExpanded ? null : section.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition ${
                    isExpanded
                      ? 'bg-sand text-navy'
                      : 'text-ink/80 hover:bg-sand/60'
                  }`}
                >
                  {Icon && <Icon className="h-[18px] w-[18px] text-navy" />}
                  <span className="flex-1 text-right">{section.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <ul className="mt-1 mb-2 mr-4 space-y-0.5 border-r border-gray-200 pr-2">
                    {section.items.map((item, i) => {
                      const to =
                        item.to ??
                        `/section/${encodeURIComponent(item.label)}`
                      const active = item.to && item.to === pathname
                      return (
                        <li key={`${section.id}-${i}`}>
                          <Link
                            to={to}
                            onClick={onClose}
                            className={`block rounded-md px-3 py-2 text-[13px] transition ${
                              active
                                ? 'bg-navy font-semibold text-white'
                                : 'text-ink/70 hover:bg-sand hover:text-navy'
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
