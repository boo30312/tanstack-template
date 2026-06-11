import { useState, useRef, useEffect } from 'react'
import { Send, Settings, Copy, AlertCircle, Loader, MessageCircle, Download } from 'lucide-react'
import { aiChatHandler, getAIContext, getAILogs } from '../server/ai-routes'
import { DEFAULT_AI_SETTINGS, type AIMessage } from '../config/ai-assistant'

export function AIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [demoMode, setDemoMode] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Load logs on mount
  useEffect(() => {
    loadLogs()
  }, [])

  const loadLogs = async () => {
    try {
      const response = await getAILogs(10, 0)
      if (response.status === 'success') {
        setLogs(response.logs as any)
        setDemoMode(response.demoMode)
      }
    } catch (err) {
      console.error('Failed to load logs:', err)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: AIMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    const currentInput = input
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const contextResp = await getAIContext()
      if (contextResp.status === 'error') {
        throw new Error('Failed to get context')
      }

      const response = await aiChatHandler({
        prompt: currentInput,
        context: contextResp.context,
        conversationHistory: messages.map(m => ({
          role: m.role,
          content: m.content
        }))
      })

      if (response.status === 'error') {
        throw new Error(response.message || 'Failed to get response')
      }

      const assistantMessage: AIMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setDemoMode((response as any).demoMode || false)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل في الحصول على الرد'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="h-full flex flex-col bg-[#05070D]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1F7BFF] to-[#D4AF37] p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle size={28} />
            <div>
              <h1 className="text-2xl font-bold">المساعد الذكي 🤖</h1>
              <p className="text-sm opacity-90">مساعد إدارة الأكاديمية بالذكاء الاصطناعي</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <Settings size={24} />
          </button>
        </div>
        {demoMode && (
          <div className="mt-3 bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded px-3 py-2 text-sm">
            ⚠️ وضع التجربة - أضف OPENAI_API_KEY للوصول الكامل
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div className="max-w-md">
              <MessageCircle size={64} className="mx-auto mb-4 text-[#D4AF37] opacity-50" />
              <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">ابدأ المحادثة</h2>
              <p className="text-[#94A3B8] mb-6">
                يمكنك السؤال عن:
              </p>
              <div className="grid grid-cols-1 gap-2 text-left">
                <button
                  onClick={() => setInput('حلل أداء الطلاب في الدورات')}
                  className="p-3 bg-[#0B1624] border border-[#1E293B] rounded hover:border-[#D4AF37] transition text-[#94A3B8] hover:text-[#F8FAFC]"
                >
                  📊 تحليل الأداء
                </button>
                <button
                  onClick={() => setInput('أنشئ تقرير المبيعات الشهري')}
                  className="p-3 bg-[#0B1624] border border-[#1E293B] rounded hover:border-[#D4AF37] transition text-[#94A3B8] hover:text-[#F8FAFC]"
                >
                  📈 التقارير المالية
                </button>
                <button
                  onClick={() => setInput('أنشئ رسالة للطلاب الجدد')}
                  className="p-3 bg-[#0B1624] border border-[#1E293B] rounded hover:border-[#D4AF37] transition text-[#94A3B8] hover:text-[#F8FAFC]"
                >
                  💬 إنشاء رسالة
                </button>
              </div>
            </div>
          </div>
        ) : (
          messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-[#1F7BFF] text-white'
                    : 'bg-[#0B1624] border border-[#1E293B] text-[#F8FAFC]'
                }`}
              >
                <p className="whitespace-pre-wrap mb-2">{message.content}</p>
                <div className="flex items-center justify-between text-xs opacity-70">
                  <span>{new Date(message.timestamp).toLocaleTimeString('ar-SA')}</span>
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className="ml-2 p-1 hover:bg-white hover:bg-opacity-10 rounded"
                      title="نسخ"
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 flex items-center gap-3">
              <Loader className="animate-spin text-[#D4AF37]" size={20} />
              <span className="text-[#94A3B8]">جاري معالجة طلبك...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-start">
            <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="text-red-400" size={20} />
              <span className="text-red-400">{error}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="border-t border-[#1E293B] p-6 bg-[#0B1624]">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="اسأل عن إحصائيات، الطلاب، الدورات، والمزيد..."
            className="flex-1 bg-[#1A2332] border border-[#1E293B] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37]"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-[#1F7BFF] to-[#D4AF37] hover:opacity-90 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t border-[#1E293B] p-6 bg-[#0B1624] max-h-48 overflow-y-auto">
          <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">إعدادات المساعد</h3>
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-3 text-[#94A3B8] hover:text-[#F8FAFC]">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              حفظ سجل المحادثات
            </label>
            <label className="flex items-center gap-3 text-[#94A3B8] hover:text-[#F8FAFC]">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              طلب موافقة قبل الإجراءات الحساسة
            </label>
            <label className="flex items-center gap-3 text-[#94A3B8] hover:text-[#F8FAFC]">
              <input type="checkbox" className="w-4 h-4" />
              تفعيل الوضع الآمن
            </label>
            <button className="w-full bg-[#1A2332] hover:bg-[#25334a] border border-[#1E293B] rounded px-4 py-2 text-[#94A3B8] font-medium mt-4 transition">
              <Download size={16} className="inline mr-2" />
              تحميل السجلات
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
