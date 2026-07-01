import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Link2, Paperclip, Send, Workflow } from 'lucide-react'
import { PortalLayout } from '../../portal/components/PortalLayout'
import { Card, WhatsAppTicks } from '../../portal/components/ui'
import { messageTemplates, whatsappChats, whatsappThread } from '../../portal/data/mock'

function CommunicationPage() {
  const [activeChat, setActiveChat] = useState(whatsappChats[0].id)
  const chat = whatsappChats.find((c) => c.id === activeChat)!

  return (
    <PortalLayout title="Communication Center" subtitle="WhatsApp — native system module">
      <div className="grid h-[calc(100vh-9rem)] grid-cols-1 gap-4 lg:grid-cols-[280px_1fr_280px]">
        <Card title="Chats" className="flex flex-col overflow-hidden">
          <div className="-mx-5 -mb-5 flex-1 overflow-y-auto">
            {whatsappChats.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveChat(c.id)}
                className={`flex w-full items-center gap-3 border-b border-slate-800/60 px-5 py-3 text-left transition-colors ${
                  c.id === activeChat ? 'bg-indigo-600/10' : 'hover:bg-slate-800/40'
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                  {c.name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-white">{c.name}</p>
                    <span className="text-[11px] text-slate-500">{c.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <WhatsAppTicks status={c.status} />
                    <span className="truncate">{c.preview}</span>
                  </div>
                </div>
                {c.unread > 0 && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-semibold text-white">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>

        <Card title={chat.name} icon={<span>💬</span>} className="flex flex-col overflow-hidden">
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
            {whatsappThread.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'contributor' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] rounded-xl px-3 py-2 text-sm ${
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
          <div className="mt-3 flex items-center gap-2 border-t border-slate-800 pt-3">
            <Paperclip className="h-4 w-4 text-slate-400" />
            <input
              placeholder="Type a message…"
              className="flex-1 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
            />
            <button className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-500">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </Card>

        <Card title="Automation Panel" icon={<Workflow className="h-4 w-4" />} className="flex flex-col overflow-hidden">
          <p className="mb-2 text-xs font-medium text-slate-400">Templates</p>
          <div className="space-y-1.5">
            {messageTemplates.map((t) => (
              <button
                key={t}
                className="flex w-full items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-800/60"
              >
                ✔ {t}
              </button>
            ))}
          </div>

          <p className="mb-2 mt-5 text-xs font-medium text-slate-400">Quick Actions</p>
          <div className="space-y-1.5">
            <button className="flex w-full items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-800/60">
              <Paperclip className="h-3.5 w-3.5" /> Attach document
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-800/60">
              <Link2 className="h-3.5 w-3.5" /> Send link
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-800/60">
              <Workflow className="h-3.5 w-3.5" /> Trigger workflow
            </button>
          </div>
        </Card>
      </div>
    </PortalLayout>
  )
}

export const Route = createFileRoute('/portal/communication')({
  component: CommunicationPage,
})
