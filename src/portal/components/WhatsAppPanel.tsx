import { ChevronDown, Paperclip, Send } from 'lucide-react'
import { Card, WhatsAppTicks } from './ui'
import { messageTemplates, whatsappThread } from '../data/mock'

export function WhatsAppPanel({ contributorName = 'Ali Ahmad' }: { contributorName?: string }) {
  return (
    <Card title="WhatsApp (Native Panel)" icon={<span>💬</span>} className="flex flex-col">
      <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-semibold text-indigo-300">
          {contributorName
            .split(' ')
            .map((p) => p[0])
            .join('')}
        </span>
        <span className="font-medium text-white">{contributorName}</span>
      </div>

      <div className="flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
        {whatsappThread.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'contributor' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                m.from === 'contributor' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'
              }`}
            >
              <p>{m.text}</p>
              <div className={`mt-1 flex items-center gap-1 text-[10px] ${m.from === 'contributor' ? 'text-indigo-200' : 'text-slate-400'}`}>
                <span>{m.time}</span>
                {m.status && <WhatsAppTicks status={m.status} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-slate-800 pt-3">
        <button className="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">
          Send Template
          <ChevronDown className="h-4 w-4" />
        </button>
        <div className="flex flex-wrap gap-1.5">
          {messageTemplates.map((t) => (
            <span key={t} className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-400">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2">
          <Paperclip className="h-4 w-4 text-slate-400" />
          <input
            placeholder="Request Document…"
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
          />
          <button className="text-indigo-400 hover:text-indigo-300">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  )
}
