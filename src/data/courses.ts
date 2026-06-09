export interface Course {
  id: string
  name: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  category: string
  image?: string
  features: string[]
  price?: number
  instructor?: string
}

export const courses: Course[] = [
  {
    id: 'forex-basics',
    name: 'مقدمة إلى التحليل الفني',
    description: 'دورة شاملة تغطي أساسيات التحليل الفني والشموع اليابانية',
    level: 'beginner',
    duration: '4 أسابيع',
    category: 'Forex',
    features: ['10 ساعات فيديو', 'موارد تعليمية', 'منتدى تفاعلي', 'شهادة'],
    instructor: 'أحمد المدير',
  },
  {
    id: 'trading-strategies',
    name: 'استراتيجيات التداول المتقدمة',
    description: 'استراتيجيات متقدمة للمتداولين المحترفين',
    level: 'advanced',
    duration: '8 أسابيع',
    category: 'Advanced',
    features: ['50 ساعة محتوى', 'تحليل فني عميق', 'جلسات حية', 'دعم فردي'],
    instructor: 'فاطمة علي',
  },
  {
    id: 'risk-management',
    name: 'نصائح إدارة المخاطر',
    description: 'كيفية إدارة رأس المال والمخاطر في التداول',
    level: 'intermediate',
    duration: '3 أسابيع',
    category: 'Risk Management',
    features: ['محاكاة واقعية', 'حالات دراسية', 'أدوات عملية'],
    instructor: 'محمد حسن',
  },
  {
    id: 'gold-trading',
    name: 'الأسبوع الذهبي في الفوركس',
    description: 'تداول الذهب والمعادن الثمينة',
    level: 'advanced',
    duration: '2 أسابيع',
    category: 'Commodities',
    features: ['بيانات مباشرة', 'تحليل سوقي', 'استراتيجيات متخصصة'],
    instructor: 'أحمد المدير',
  },
]
