// AI Admin Assistant Configuration and Types

export interface AIAssistantSettings {
  enabled: boolean
  model: 'gpt-4o-mini' | 'gpt-4o' | 'gpt-4-turbo'
  saveChatHistory: boolean
  requireApprovalBeforeActions: boolean
  demoMode: boolean
  allowedModules: string[]
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  action?: {
    type: 'read' | 'draft' | 'analyze' | 'suggest' | 'report'
    module: string
    requiresApproval: boolean
    status: 'pending' | 'approved' | 'rejected' | 'executed'
  }
}

export interface AIContext {
  dashboardStats: {
    totalStudents: number
    activeCoursesCount: number
    totalRevenue: number
    activeWorkshopsCount: number
    pendingTasksCount: number
  }
  userRole: string
  permissions: {
    canRead: string[]
    canAnalyze: string[]
    canDraft: string[]
    canReport: string[]
  }
  recentActivity?: Array<{
    type: string
    description: string
    timestamp: Date
  }>
}

export interface AILog {
  id: string
  userId: string
  prompt: string
  response: string
  actionType: 'read' | 'analyze' | 'draft' | 'suggest' | 'report' | 'generate'
  status: 'success' | 'failed' | 'pending_approval'
  contextSnapshot: {
    module: string
    dataAccessCount: number
    timestamp: Date
  }
  createdAt: Date
  approvedBy?: string
  approvedAt?: Date
}

export interface AIAssistantState {
  isOpen: boolean
  messages: AIMessage[]
  isLoading: boolean
  error: string | null
  settings: AIAssistantSettings
  context: AIContext
  logs: AILog[]
}

export const DEFAULT_AI_SETTINGS: AIAssistantSettings = {
  enabled: true,
  model: 'gpt-4o-mini',
  saveChatHistory: true,
  requireApprovalBeforeActions: true,
  demoMode: false,
  allowedModules: [
    'dashboard',
    'students',
    'courses',
    'employees',
    'payments',
    'reports',
    'tasks',
    'analytics'
  ]
}

export const AI_SYSTEM_PROMPT = `أنت مساعد ذكي متخصص لإدارة منصة تعليمية. دورك مساعدة المسؤول الأكاديمي في:

1. **تحليل البيانات**: فحص إحصائيات الطلاب، الدورات، الإيرادات
2. **إعداد التقارير**: إنشاء تقارير مالية وتعليمية
3. **إعداد الرسائل**: كتابة رسائل WhatsApp و LinkedIn و Facebook
4. **تحليل الأداء**: مراجعة نشاط الموظفين والطلاب
5. **الاقتراحات**: تقديم تحسينات للعمليات

**قيود أمنية مهمة:**
- أنت يمكنك فقط قراءة البيانات وتحليلها
- لا يمكنك حذف أي بيانات
- لا يمكنك تغيير الأذونات
- لا يمكنك إرسال رسائل فعلية بدون موافقة المسؤول
- أي إجراء حساس يتطلب موافقة صريحة أولاً

**صيغة الرد:**
- اجعل الردود واضحة ومنظمة
- استخدم الجداول والنقاط للبيانات الكبيرة
- اذكر دائماً مصدر البيانات
- اطلب توضيحات إذا لزم الأمر`

export const ALLOWED_ACTIONS = {
  read: ['dashboard', 'students', 'courses', 'employees', 'payments', 'tasks', 'reports'],
  analyze: ['student_performance', 'course_completion', 'revenue_trends', 'employee_activity'],
  draft: ['messages', 'reports', 'plans', 'announcements'],
  report: ['financial', 'student_progress', 'course_statistics', 'employee_performance'],
  generate: ['whatsapp_messages', 'linkedin_posts', 'facebook_posts', 'email_templates']
}
