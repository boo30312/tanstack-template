import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Newspaper, Clapperboard, Wallet, FileText, User } from 'lucide-react'
import { PortalLayout } from '../../portal/components/PortalLayout'
import { Card, StatusBadge } from '../../portal/components/ui'
import { WhatsAppPanel } from '../../portal/components/WhatsAppPanel'
import { articles, contributors } from '../../portal/data/mock'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'articles', label: 'Articles', icon: Newspaper },
  { id: 'appearances', label: 'Appearances', icon: Clapperboard },
  { id: 'payments', label: 'Payments', icon: Wallet },
  { id: 'documents', label: 'Documents', icon: FileText },
] as const

function ContributorsPage() {
  const [selectedId, setSelectedId] = useState(contributors[0].id)
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('profile')
  const contributor = contributors.find((c) => c.id === selectedId)!

  return (
    <PortalLayout title="Contributors" subtitle="Unified contributor records">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1" title="All Contributors">
          <div className="space-y-1.5">
            {contributors.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  c.id === selectedId ? 'bg-indigo-600/15 text-indigo-300' : 'text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                  {c.avatarInitials}
                </span>
                <span className="flex-1 truncate">{c.name}</span>
                <StatusBadge status={c.status} />
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600/20 text-lg font-semibold text-indigo-300">
                {contributor.avatarInitials}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-white">{contributor.name}</h2>
                <div className="mt-1 flex items-center gap-2">
                  <StatusBadge status={contributor.status} />
                  <span className="text-xs text-slate-500">{contributor.id}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-1 border-b border-slate-800">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                    tab === t.id ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="pt-4">
              {tab === 'profile' && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <Field label="Role" value={contributor.role} />
                  <Field label="Phone (WhatsApp)" value={contributor.phone} />
                  <Field label="Email" value={contributor.email} />
                  <Field label="Bank Details" value={contributor.bank} />
                  <Field label="Linked Website" value={contributor.website} />
                  <Field label="Joined" value={contributor.joinedAt} />
                </div>
              )}
              {tab === 'articles' && (
                <div className="space-y-2">
                  {articles
                    .filter((a) => a.author === contributor.name)
                    .map((a) => (
                      <div key={a.id} className="flex items-center justify-between rounded-lg border border-slate-800 px-3 py-2 text-sm">
                        <span className="text-slate-200">{a.title}</span>
                        <StatusBadge status={a.status} />
                      </div>
                    ))}
                  {articles.filter((a) => a.author === contributor.name).length === 0 && (
                    <p className="text-sm text-slate-500">No articles linked yet.</p>
                  )}
                </div>
              )}
              {tab === 'appearances' && (
                <div className="rounded-lg border border-slate-800 p-4 text-sm">
                  <p className="font-medium text-white">Evening News — Episode #221</p>
                  <p className="text-slate-500">Views: 12.4K · Duration: 8m 32s</p>
                </div>
              )}
              {tab === 'payments' && (
                <div className="rounded-lg border border-slate-800 p-4 text-sm text-slate-300">
                  ST-2233 · $950 · <span className="text-emerald-400">Transferred</span>
                </div>
              )}
              {tab === 'documents' && (
                <div className="rounded-lg border border-slate-800 p-4 text-sm text-slate-300">
                  Contract.pdf — Approved 🔒 &nbsp;·&nbsp; ID Copy.jpg — Verified 🔐
                </div>
              )}
            </div>
          </Card>

          <p className="text-xs text-slate-500">System state: all modules synced under ID = {contributor.id}</p>
        </div>

        <div>
          <WhatsAppPanel contributorName={contributor.name} />
        </div>
      </div>
    </PortalLayout>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-slate-200">{value}</p>
    </div>
  )
}

export const Route = createFileRoute('/portal/contributors')({
  component: ContributorsPage,
})
