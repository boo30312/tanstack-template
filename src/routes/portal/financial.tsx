import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2, Landmark } from 'lucide-react'
import { PortalLayout } from '../../portal/components/PortalLayout'
import { Card, NotificationChannels, StatusBadge } from '../../portal/components/ui'
import { financialPending } from '../../portal/data/mock'

const steps = [
  { label: 'Admin', action: 'Approve', done: true },
  { label: 'Finance', action: 'Transfer', done: true },
  { label: 'System', action: 'Confirm', done: false },
]

function FinancialPage() {
  const primary = financialPending[0]

  return (
    <PortalLayout title="Financial Workflow" subtitle="Statement → Approval → Transfer → Confirmation → History">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Invoice" icon={<Landmark className="h-4 w-4" />}>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{primary.id}</span>
              <StatusBadge status={primary.status} />
            </div>
            <p className="mt-3 text-3xl font-semibold text-white">${primary.amount.toLocaleString()}</p>
            <p className="mt-1 text-sm text-slate-400">Contributor: {primary.contributor}</p>
            <p className="text-xs text-slate-500">Issued {primary.date}</p>
          </div>
        </Card>

        <Card title="Approval Workflow">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                      s.done ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {s.done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </div>
                  <p className="text-xs font-medium text-slate-300">{s.label}</p>
                  <p className="text-[11px] text-slate-500">{s.action}</p>
                </div>
                {i < steps.length - 1 && <ArrowRight className="mx-2 h-4 w-4 shrink-0 text-slate-700" />}
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <p className="text-sm text-slate-300">
              💰 &ldquo;Your payment is processed&rdquo; · ✅ &ldquo;Transfer completed&rdquo;
            </p>
            <NotificationChannels event="Payment Approved" />
            <p className="text-xs text-slate-500">
              Ledger entry created · Payment status updated for {primary.contributor}
            </p>
          </div>
        </Card>
      </div>

      <Card className="mt-6" title="Payment History">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-slate-500">
              <th className="pb-2 font-medium">Statement ID</th>
              <th className="pb-2 font-medium">Contributor</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {financialPending.map((f) => (
              <tr key={f.id} className="border-t border-slate-800">
                <td className="py-2.5 text-slate-300">{f.id}</td>
                <td className="py-2.5 text-slate-300">{f.contributor}</td>
                <td className="py-2.5 text-white">${f.amount.toLocaleString()}</td>
                <td className="py-2.5">
                  <StatusBadge status={f.status} />
                </td>
                <td className="py-2.5 text-slate-500">{f.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </PortalLayout>
  )
}

export const Route = createFileRoute('/portal/financial')({
  component: FinancialPage,
})
