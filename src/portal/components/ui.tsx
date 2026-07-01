import type { ReactNode } from 'react'
import { Check, CheckCheck, Mail, Bell, ClipboardList } from 'lucide-react'
import type { ChannelStatus } from '../data/mock'

export function Card({
  children,
  className = '',
  title,
  icon,
  action,
}: {
  children: ReactNode
  className?: string
  title?: string
  icon?: ReactNode
  action?: ReactNode
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-lg shadow-black/20 ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            {icon && <span className="text-indigo-400">{icon}</span>}
            <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}

const statusStyles: Record<string, string> = {
  verified: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  transferred: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  reviewed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  imported: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  in_review: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  'awaiting approval': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  missing_id: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  'missing id': 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  unmatched: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
}

export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase().replace(/\s+/g, '_')
  const style = statusStyles[key] ?? statusStyles[status.toLowerCase()] ?? 'bg-slate-500/10 text-slate-400 border-slate-500/30'
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

export function KpiCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  const positive = delta.startsWith('+')
  return (
    <Card className="flex-1">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-white">{value}</span>
        <span className={`text-xs font-medium ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>{delta}</span>
      </div>
    </Card>
  )
}

const tickStyles: Record<ChannelStatus, { icon: ReactNode; className: string }> = {
  sent: { icon: <Check className="h-3.5 w-3.5" />, className: 'text-slate-400' },
  delivered: { icon: <CheckCheck className="h-3.5 w-3.5" />, className: 'text-slate-400' },
  read: { icon: <CheckCheck className="h-3.5 w-3.5" />, className: 'text-sky-400' },
}

export function WhatsAppTicks({ status }: { status: ChannelStatus }) {
  const { icon, className } = tickStyles[status]
  return <span className={className}>{icon}</span>
}

export function NotificationChannels({ event }: { event: string }) {
  const items = [
    { icon: <Bell className="h-3.5 w-3.5" />, label: 'In-App Notification', color: 'text-indigo-400' },
    { icon: <span className="text-[13px] leading-none">🟢</span>, label: 'WhatsApp Message', color: 'text-emerald-400' },
    { icon: <Mail className="h-3.5 w-3.5" />, label: 'Email', color: 'text-amber-400' },
    { icon: <ClipboardList className="h-3.5 w-3.5" />, label: 'Audit Log Entry', color: 'text-slate-400' },
  ]
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <p className="mb-3 text-xs font-medium text-slate-400">
        Event: <span className="text-slate-200">{event}</span>
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.label}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-2 text-xs text-slate-300"
          >
            <span className={it.color}>{it.icon}</span>
            {it.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Sparkline({ data, color = '#6366f1' }: { data: Array<number>; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 240
  const height = 64
  const step = width / (data.length - 1)
  const points = data
    .map((value, i) => {
      const x = i * step
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(' ')
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-16 w-full">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
