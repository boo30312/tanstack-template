export interface Feature {
  id: string
  title: string
  description: string
  icon: string
}

export const features: Feature[] = [
  {
    id: 'education',
    title: 'محتوى تعليمي',
    description: 'دورات شاملة من المبتدئ للمحترف',
    icon: 'BookOpen',
  },
  {
    id: 'community',
    title: 'مجتمع تداول',
    description: 'تفاعل مع متداولين ومحترفين',
    icon: 'Users',
  },
  {
    id: 'analytics',
    title: 'تحليل حي',
    description: 'بيانات سوق مباشرة وتحليلات',
    icon: 'TrendingUp',
  },
  {
    id: 'dashboard',
    title: 'لوحة تحكم',
    description: 'إدارة متقدمة للعمليات والتحليلات',
    icon: 'BarChart3',
  },
]
