import { createFileRoute } from '@tanstack/react-router'
import { Download } from 'lucide-react'
import { PortalLayout } from '../../portal/components/PortalLayout'
import { Card, Sparkline } from '../../portal/components/ui'
import { analyticsSeries } from '../../portal/data/mock'

const charts = [
  { key: 'contributorGrowth', label: 'Contributor Growth', color: '#6366f1' },
  { key: 'payments', label: 'Payments Trend', color: '#10b981' },
  { key: 'articles', label: 'Article Volume', color: '#f59e0b' },
  { key: 'tvAppearances', label: 'TV Appearances', color: '#f43f5e' },
] as const

function AnalyticsPage() {
  return (
    <PortalLayout title="Analytics" subtitle="Executive reports across the contributor lifecycle">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <select className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-300">
          <option>Last 12 months</option>
          <option>Last 6 months</option>
          <option>Year to date</option>
        </select>
        <select className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-300">
          <option>All contributor types</option>
          <option>Field Correspondent</option>
          <option>TV Guest</option>
        </select>
        <button className="ml-auto flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500">
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {charts.map((c) => {
          const series = analyticsSeries[c.key]
          const latest = series[series.length - 1]
          const prev = series[series.length - 2]
          const delta = (((latest - prev) / prev) * 100).toFixed(1)
          return (
            <Card key={c.key} title={c.label}>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-white">{latest.toLocaleString()}</span>
                <span className={`text-xs font-medium ${Number(delta) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {Number(delta) >= 0 ? '+' : ''}
                  {delta}%
                </span>
              </div>
              <div className="mt-2">
                <Sparkline data={series} color={c.color} />
              </div>
            </Card>
          )
        })}
      </div>
    </PortalLayout>
  )
}

export const Route = createFileRoute('/portal/analytics')({
  component: AnalyticsPage,
})
