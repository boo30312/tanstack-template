import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { IdCard, Lock, QrCode, ShieldCheck } from 'lucide-react'
import { PortalLayout } from '../../portal/components/PortalLayout'
import { Card, NotificationChannels, StatusBadge } from '../../portal/components/ui'
import { verificationQueue } from '../../portal/data/mock'

function VerificationPage() {
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null)

  return (
    <PortalLayout title="Identity Verification" subtitle="Upload → OCR → Validation → Admin Review → Approval → Encryption → Archive">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Uploaded ID" icon={<IdCard className="h-4 w-4" />}>
          <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/60 text-slate-600">
            <IdCard className="h-16 w-16" />
          </div>
          <p className="mt-2 text-xs text-slate-500">national_id_front.jpg · uploaded 2h ago</p>
        </Card>

        <Card title="OCR Extracted Data" icon={<ShieldCheck className="h-4 w-4" />}>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <dt className="text-slate-500">Name</dt>
              <dd className="text-slate-200">Ali Ahmad</dd>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <dt className="text-slate-500">Date of Birth</dt>
              <dd className="text-slate-200">1990-04-11</dd>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <dt className="text-slate-500">ID Number</dt>
              <dd className="text-slate-200">123456</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Confidence</dt>
              <dd className="text-emerald-400">98.4%</dd>
            </div>
          </dl>

          <div className="mt-4 flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> Encrypted copy
            </span>
            <span className="flex items-center gap-1.5">
              <QrCode className="h-3.5 w-3.5" /> QR identity token
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setDecision('approved')}
              className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500"
            >
              Approve ✅
            </button>
            <button
              onClick={() => setDecision('rejected')}
              className="flex-1 rounded-lg bg-rose-600/90 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500"
            >
              Reject ❌
            </button>
            <button className="flex-1 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800">
              Request More Info
            </button>
          </div>

          {decision && (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-slate-300">
                🟢 &ldquo;Your ID has been {decision}&rdquo; — sent via WhatsApp. DB status ={' '}
                <span className="text-emerald-400">{decision === 'approved' ? 'verified' : 'rejected'}</span>
              </p>
              <NotificationChannels event={`Identity ${decision === 'approved' ? 'Approved' : 'Rejected'}`} />
            </div>
          )}
        </Card>
      </div>

      <Card className="mt-6" title="Verification Queue">
        <div className="space-y-2">
          {verificationQueue.map((v) => (
            <div key={v.id} className="flex items-center justify-between rounded-lg border border-slate-800 px-3 py-2.5 text-sm">
              <span className="text-slate-200">{v.name}</span>
              <StatusBadge status={v.status} />
            </div>
          ))}
        </div>
      </Card>
    </PortalLayout>
  )
}

export const Route = createFileRoute('/portal/verification')({
  component: VerificationPage,
})
