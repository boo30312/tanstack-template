import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'
import { PortalLayout } from '../../portal/components/PortalLayout'
import { Card, KpiCard, StatusBadge } from '../../portal/components/ui'
import { WhatsAppPanel } from '../../portal/components/WhatsAppPanel'
import { activityFeed, financialPending, kpis, verificationQueue } from '../../portal/data/mock'

function Dashboard() {
  return (
    <PortalLayout title="Admin Dashboard" subtitle="Executive control panel — main system view">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Verification Queue">
            <div className="space-y-2">
              {verificationQueue.map((v) => (
                <div key={v.id} className="flex items-center justify-between rounded-lg border border-slate-800 px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-white">{v.name}</p>
                    <p className="text-xs text-slate-500">{v.submittedAt}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={v.status} />
                    <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Financial Pending">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th className="pb-2 font-medium">Statement ID</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {financialPending.map((f) => (
                  <tr key={f.id} className="border-t border-slate-800">
                    <td className="py-2.5 text-slate-300">{f.id}</td>
                    <td className="py-2.5 text-white">${f.amount.toLocaleString()}</td>
                    <td className="py-2.5">
                      <StatusBadge status={f.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card title="Activity Feed">
            <ul className="space-y-3">
              {activityFeed.map((a) => (
                <li key={a.id} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-slate-200">{a.text}</p>
                    <p className="text-xs text-slate-500">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div>
          <WhatsAppPanel />
        </div>
      </div>
    </PortalLayout>
  )
}

export const Route = createFileRoute('/portal/')({
  component: Dashboard,
})
