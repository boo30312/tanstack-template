import type { ReactNode } from 'react'
import { AppSidebar } from './AppSidebar'
import { NewsBar } from './NewsBar'

// Overall layout: sidebar + top news bar + content area.
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <NewsBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
