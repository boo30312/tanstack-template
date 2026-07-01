import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Users,
  Newspaper,
  Clapperboard,
  Wallet,
  FileText,
  ShieldCheck,
  MessageCircle,
  Settings2,
  BarChart3,
  Bell,
  Search,
  ArrowLeft,
} from 'lucide-react'

const navItems = [
  { to: '/portal', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/portal/contributors', label: 'Contributors', icon: Users },
  { to: '/portal/verification', label: 'Verification', icon: ShieldCheck },
  { to: '/portal/financial', label: 'Financial', icon: Wallet },
  { to: '/portal/communication', label: 'Communication', icon: MessageCircle },
  { to: '/portal/analytics', label: 'Analytics', icon: BarChart3 },
]

const disabledItems = [
  { label: 'Editorial', icon: Newspaper },
  { label: 'Media', icon: Clapperboard },
  { label: 'Documents', icon: FileText },
  { label: 'System', icon: Settings2 },
]

export function PortalLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex h-screen bg-[#0F172A] text-slate-100">
      <aside className="flex w-64 flex-col border-r border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            S
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Syria TV</p>
            <p className="text-[11px] text-slate-500">Contributors Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === '/portal' }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white [&.active]:bg-indigo-600/15 [&.active]:text-indigo-300"
              activeProps={{ className: 'active' }}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}

          <p className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            Coming soon
          </p>
          {disabledItems.map((item) => (
            <div
              key={item.label}
              className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-3">
          <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-800/60 hover:text-slate-300">
            <ArrowLeft className="h-4 w-4" />
            Back to app
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/40 px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-500 sm:flex">
              <Search className="h-4 w-4" />
              <span>Search contributors, articles…</span>
            </div>
            <button className="relative rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
