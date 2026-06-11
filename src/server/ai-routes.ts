// AI Assistant Backend Handler Functions
// ⚠️ Server-side only - never expose OPENAI_API_KEY to frontend

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const AI_ENABLED = process.env.AI_ASSISTANT_ENABLED !== 'false'
const AI_MODEL = process.env.AI_ASSISTANT_MODEL || 'gpt-4o-mini'
const DEMO_MODE = !OPENAI_API_KEY || process.env.DEMO_MODE === 'true'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface AIContextData {
  dashboardStats: Record<string, unknown>
  userRole: string
  permissions: Record<string, unknown>
  recentActivity: unknown[]
}

// Server-side AI functions (won't be called directly from client)
export async function aiChatHandler(params: {
  prompt: string
  context: AIContextData
  conversationHistory?: ChatMessage[]
  actionType?: string
}) {
  if (!AI_ENABLED) {
    return { status: 'error', message: 'AI Assistant is disabled' }
  }

  if (DEMO_MODE) {
    return generateDemoResponse(params.prompt, params.actionType)
  }

  try {
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: `Context:\n${JSON.stringify(params.context)}\n\n${params.prompt}`
      }
    ]

    if (params.conversationHistory?.length) {
      messages.unshift(...params.conversationHistory)
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      const error: any = await response.json()
      return { status: 'error', message: 'OpenAI API failed' }
    }

    const data: any = await response.json()
    const aiResponse = data.choices[0]?.message?.content || 'No response'

    return { status: 'success', message: aiResponse, model: AI_MODEL, demoMode: false }
  } catch (error) {
    return { status: 'error', message: 'Server error' }
  }
}

export async function getAIContext() {
  return {
    status: 'success',
    context: {
      dashboardStats: {
        totalStudents: 1240,
        activeCoursesCount: 15,
        totalRevenue: 245600,
        activeWorkshopsCount: 8,
        pendingTasksCount: 5,
        avgStudentProgress: 68
      },
      userRole: 'admin',
      permissions: {
        canRead: ['dashboard', 'students', 'courses', 'employees', 'payments'],
        canAnalyze: ['student_performance', 'course_completion', 'revenue_trends'],
        canDraft: ['messages', 'reports', 'plans'],
        canReport: ['financial', 'student_progress']
      },
      recentActivity: []
    }
  }
}

export async function getAILogs(limit = 10, offset = 0) {
  const logs = [
    { id: 'log_1', actionType: 'analyze', description: 'تحليل الأداء', status: 'success', timestamp: new Date() }
  ]

  return {
    status: 'success',
    logs: logs.slice(offset, offset + limit),
    total: logs.length,
    demoMode: DEMO_MODE
  }
}

function generateDemoResponse(prompt: string, actionType?: string) {
  return {
    status: 'success',
    message: `📊 نمط العمل (Demo Mode):\n\nالطلب: ${prompt}\n\n✅ في الوضع الفعلي، سيقدم المساعد الذكي تحليلاً تفصيلياً.\n\n⚠️ الإجراءات الحساسة تتطلب موافقتك قبل التنفيذ.`,
    model: 'demo-mode',
    demoMode: true,
    warning: 'Demo mode: Set OPENAI_API_KEY for full AI capabilities'
  }
}
