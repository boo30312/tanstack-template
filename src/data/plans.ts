export interface Plan {
  id: string
  name: string
  description: string
  price?: number
  billingPeriod: 'monthly' | 'yearly' | 'lifetime'
  features: string[]
  targetAudience: string
  icon?: string
}

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'الخطة الأساسية',
    description: 'للمبتدئين - تعليم المبادئ الأساسية',
    price: 99,
    billingPeriod: 'monthly',
    targetAudience: 'المبتدئين والمهتمين بالتداول',
    features: [
      '10 دورات تعليمية',
      'دعم الأساسيات والمفاهيم',
      'منتدى تفاعلي مع المجتمع',
      'ساعات بث حية أسبوعية',
      'شهادة إكمال',
    ],
    icon: '📚',
  },
  {
    id: 'professional',
    name: 'الخطة المتقدمة',
    description: 'للمتداولين - استراتيجيات متقدمة',
    price: 299,
    billingPeriod: 'monthly',
    targetAudience: 'المتداولين ذوي الخبرة',
    features: [
      '50 دورة متقدمة',
      'تحليل فني عميق',
      'جلسات حية أسبوعية',
      'إشارات تداول يومية',
      'إدارة محفظة',
      'أدوات متقدمة',
    ],
    icon: '📊',
  },
  {
    id: 'premium',
    name: 'الخطة الاحترافية',
    description: 'للمحترفين - إدارة محفظة متكاملة',
    price: 699,
    billingPeriod: 'monthly',
    targetAudience: 'المحترفين وأصحاب المحافظ الكبيرة',
    features: [
      'كل المحتوى التعليمي',
      'استشارات فردية شخصية',
      'إدارة رأس المال المتقدمة',
      'بيانات سوق حقيقية مباشرة',
      'أدوات احترافية متقدمة',
      'دعم VIP 24/7',
      'جلسات استشارية أسبوعية',
    ],
    icon: '👑',
  },
]
