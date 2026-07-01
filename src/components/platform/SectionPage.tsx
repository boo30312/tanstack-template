import { ChevronLeft } from 'lucide-react'
import type { Section } from './navigation'

// Simple section page: title, short description, and cards for each sub-section.
// No functionality is wired yet — cards are structural placeholders.
export function SectionPage({ section }: { section: Section }) {
  const Icon = section.icon
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      {/* Header */}
      <header className="flex items-start gap-4 border-b border-slate-200 pb-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{section.label}</h1>
          <p className="mt-1 text-sm text-slate-500">{section.description}</p>
        </div>
      </header>

      {/* Sub-section cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {section.subSections.map((sub) => {
          const SubIcon = sub.icon
          return (
            <div
              key={sub.label}
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-500 group-hover:bg-[var(--brand-teal)]/10 group-hover:text-[var(--brand-teal)]">
                  <SubIcon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {sub.label}
                </span>
              </div>
              <ChevronLeft className="h-4 w-4 text-slate-300" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
