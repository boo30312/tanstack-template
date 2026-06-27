/**
 * Syria TV — Contributors Portal
 * Shared data for the trial UI: brand info, official links, the navigation
 * tree (mirrors the agreed portal map) and mock content for the screens.
 */

export const BRAND = {
  nameAr: 'تلفزيون سوريا',
  nameEn: 'Syria TV',
  portalAr: 'بوابة المساهمين',
  portalEn: 'Contributors Portal',
  site: 'https://www.syria.tv',
} as const

/**
 * Official syria.tv links. The product team flagged these as required for the
 * launch phase (identity + transfer data), so they are surfaced explicitly in
 * the footer and the agreements screen rather than buried.
 */
export const OFFICIAL_LINKS = {
  intellectualProperty: {
    labelAr: 'حقوق الملكية الفكرية',
    href: 'https://www.syria.tv/حقوق-الملكية-الفكرية',
  },
  termsOfUse: {
    labelAr: 'اتفاقية استخدام الموقع',
    href: 'https://www.syria.tv/اتفاقية-استخدام-الموقع',
  },
  brand: {
    labelAr: 'الهوية البصرية (Brandfetch)',
    href: 'https://brandfetch.com/syria.tv',
  },
} as const

export type NavItem = {
  label: string
  to?: string
}

export type NavSection = {
  id: string
  label: string
  icon: string // lucide icon name
  items: NavItem[]
}

/**
 * Full portal map. Items with a `to` are wired in this trial; the rest resolve
 * to a styled placeholder screen so the structure is fully navigable.
 */
export const NAV: NavSection[] = [
  {
    id: 'contributor',
    label: 'المساهم / الضيف',
    icon: 'UserRound',
    items: [
      { label: 'الملف التعريفي', to: '/' },
      { label: 'المعلومات الشخصية', to: '/verification' },
      { label: 'التوثيق الرسمي', to: '/verification' },
      { label: 'معالج الدخول الأول', to: '/verification' },
      { label: 'تتبّع الحالة' },
      { label: 'الاتفاقيات', to: '/agreements' },
    ],
  },
  {
    id: 'admin',
    label: 'الإدارة',
    icon: 'ShieldCheck',
    items: [
      { label: 'لوحة التحكم', to: '/admin' },
      { label: 'إدارة المستخدمين' },
      { label: 'الأدوار والصلاحيات' },
      { label: 'سجلات النشاط' },
      { label: 'مركز الإشعارات' },
      { label: 'مركز الوثائق' },
      { label: 'الأمان والتحقق' },
      { label: 'إعدادات النظام' },
      { label: 'الدعم' },
    ],
  },
  {
    id: 'editorial',
    label: 'التحرير',
    icon: 'PenLine',
    items: [
      { label: 'المقالات' },
      { label: 'حالة النشر' },
      { label: 'مراجعة المطابقة' },
      { label: 'البحث والتصفية' },
      { label: 'الإحصائيات' },
    ],
  },
  {
    id: 'media',
    label: 'الميديا',
    icon: 'Tv',
    items: [
      { label: 'الظهور التلفزيوني' },
      { label: 'البرامج' },
      { label: 'الحلقات' },
      { label: 'أرشيف الفيديو' },
      { label: 'روابط الميديا' },
    ],
  },
  {
    id: 'financial',
    label: 'المالية',
    icon: 'CreditCard',
    items: [
      { label: 'كشوف الدفع', to: '/financial' },
      { label: 'إشعارات التحويل', to: '/financial' },
      { label: 'تأكيد الدفع' },
      { label: 'الحالة المالية' },
      { label: 'السجل' },
    ],
  },
  {
    id: 'documents',
    label: 'الوثائق',
    icon: 'FolderClosed',
    items: [
      { label: 'الهوية' },
      { label: 'جواز السفر' },
      { label: 'الاتفاقيات', to: '/agreements' },
      { label: 'الملفات المطلوبة' },
      { label: 'حالة الموافقة' },
      { label: 'الأرشيف' },
    ],
  },
  {
    id: 'communication',
    label: 'التواصل',
    icon: 'Bell',
    items: [
      { label: 'الإشعارات' },
      { label: 'رسائل واتساب' },
      { label: 'الإعلانات' },
      { label: 'التنبيهات' },
      { label: 'الرسائل الداخلية' },
    ],
  },
  {
    id: 'verification',
    label: 'التحقق',
    icon: 'BadgeCheck',
    items: [
      { label: 'الإشعار الرسمي' },
      { label: 'تحقق QR' },
      { label: 'رمز الأمان' },
      { label: 'العلامة المائية' },
      { label: 'التحقق من الوصول' },
    ],
  },
  {
    id: 'help',
    label: 'مركز المساعدة',
    icon: 'LifeBuoy',
    items: [
      { label: 'دليل الاستخدام' },
      { label: 'الأسئلة الشائعة' },
      { label: 'السياسات', to: '/agreements' },
      { label: 'التواصل مع الإدارة' },
      { label: 'الشروحات' },
    ],
  },
  {
    id: 'system',
    label: 'النظام',
    icon: 'Settings',
    items: [
      { label: 'تسجيل الدخول' },
      { label: 'المصادقة' },
      { label: 'سجلات التدقيق' },
      { label: 'سجل الوصول' },
      { label: 'مراقبة الأجهزة' },
      { label: 'سياسات الأمان' },
      { label: 'النسخ والاسترجاع' },
    ],
  },
]

export type SocialLink = {
  id: string
  network: 'instagram' | 'x' | 'facebook' | 'youtube' | 'linkedin' | 'website'
  url: string
}

export type Article = {
  id: string
  title: string
  category: string
  date: string // ISO
  readMinutes: number
  cover: string // gradient class for the trial
}

/** Mock contributor matching the reference author page (أحمد أمين). */
export const CONTRIBUTOR = {
  nameAr: 'أحمد أمين',
  nameEn: 'Ahmad Ameen',
  roleAr: 'صحفي ومراسل تلفزيون سوريا',
  bioAr:
    'صحفي ومراسل ميداني متخصص في الشأن السوري والإقليمي، يغطي الأحداث السياسية والإنسانية منذ أكثر من عشر سنوات، ويعدّ تقارير وتحقيقات لتلفزيون سوريا.',
  iban: 'TR33 0006 1005 1978 6457 8413 26',
  status: 'verified' as 'verified' | 'pending' | 'locked',
  socials: [
    { id: 's1', network: 'instagram', url: 'https://instagram.com/' },
    { id: 's2', network: 'x', url: 'https://x.com/' },
    { id: 's3', network: 'facebook', url: 'https://facebook.com/' },
  ] as SocialLink[],
}

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'تقرير ميداني: واقع العودة إلى المناطق المحررة شمال سوريا',
    category: 'تقارير',
    date: '2026-06-21',
    readMinutes: 6,
    cover: 'from-navy to-navy-light',
  },
  {
    id: 'a2',
    title: 'تحليل: ملامح المرحلة الانتقالية وتحدّيات إعادة الإعمار',
    category: 'تحليل سياسي',
    date: '2026-06-18',
    readMinutes: 8,
    cover: 'from-gold to-navy',
  },
  {
    id: 'a3',
    title: 'حوار خاص حول مستقبل الإعلام السوري المستقل',
    category: 'حوارات',
    date: '2026-06-12',
    readMinutes: 5,
    cover: 'from-navy-deep to-navy-soft',
  },
  {
    id: 'a4',
    title: 'متابعة: الأوضاع الإنسانية في المخيمات مع اقتراب الصيف',
    category: 'إنساني',
    date: '2026-06-04',
    readMinutes: 7,
    cover: 'from-navy-light to-gold',
  },
  {
    id: 'a5',
    title: 'قراءة في المشهد الاقتصادي وأسعار الصرف المحلية',
    category: 'اقتصاد',
    date: '2026-05-28',
    readMinutes: 4,
    cover: 'from-navy to-navy-deep',
  },
  {
    id: 'a6',
    title: 'تقرير مصوّر: الحياة اليومية في المدن السورية',
    category: 'تقارير',
    date: '2026-05-15',
    readMinutes: 6,
    cover: 'from-gold-soft to-navy-light',
  },
]
