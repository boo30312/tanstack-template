// Academy Dashboard Data Configuration

export interface AcademyUpdate {
  id: string
  title: string
  description: string
  icon: string
  date: string
  category: 'feature' | 'course' | 'workshop' | 'system'
  isPinned?: boolean
}

export interface Story {
  id: string
  title: string
  description: string
  image?: string
  date: string
  author: string
  type: 'success' | 'announcement' | 'event' | 'content'
}

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed'
  assignedTo: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  read: boolean
  date: string
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  students: number
  progress: number
  level: 'beginner' | 'intermediate' | 'advanced'
  status: 'active' | 'upcoming' | 'completed'
  duration: string
}

export interface Workshop {
  id: string
  title: string
  date: string
  time: string
  instructor: string
  attendees: number
  maxCapacity: number
  status: 'upcoming' | 'ongoing' | 'completed'
  description: string
}

export interface Student {
  id: string
  name: string
  email: string
  joinDate: string
  status: 'active' | 'inactive' | 'suspended'
  coursesEnrolled: number
  completionRate: number
  lastActive: string
}

export interface Trainer {
  id: string
  name: string
  email: string
  specialization: string
  experience: number
  students: number
  rating: number
  status: 'active' | 'inactive'
  joinDate: string
}

export interface Invoice {
  id: string
  studentName: string
  amount: number
  currency: string
  date: string
  dueDate: string
  status: 'paid' | 'pending' | 'overdue'
  items: { description: string; amount: number }[]
}

export interface Payment {
  id: string
  studentName: string
  amount: number
  currency: string
  method: 'credit-card' | 'bank-transfer' | 'paypal'
  date: string
  status: 'completed' | 'pending' | 'failed'
  orderId: string
}

export interface SocialContent {
  id: string
  platform: string
  content: string
  imageUrl?: string
  scheduledDate?: string
  status: 'draft' | 'scheduled' | 'published'
  engagementCount: number
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  status: 'new' | 'contacted' | 'interested' | 'qualified' | 'lost'
  interest: string
  dateAdded: string
  lastContact?: string
}

export interface LiveSession {
  id: string
  title: string
  instructor: string
  startTime: string
  duration: number
  viewers: number
  topic: string
  recordingUrl?: string
  status: 'upcoming' | 'live' | 'ended'
}

export interface DailyDeal {
  id: string
  title: string
  description: string
  originalPrice: number
  discountedPrice: number
  discount: number
  imageUrl?: string
  expiresAt: string
  isActive: boolean
}

export interface Article {
  id: string
  title: string
  content: string
  author: string
  publishedDate: string
  category: string
  views: number
  likes: number
  featured: boolean
}

export interface AcademyData {
  academyUpdates: AcademyUpdate[]
  stories: Story[]
  tasks: Task[]
  notifications: Notification[]
  courses: Course[]
  workshops: Workshop[]
  students: Student[]
  trainers: Trainer[]
  invoices: Invoice[]
  payments: Payment[]
  socialContent: SocialContent[]
  leads: Lead[]
  liveSessions: LiveSession[]
  dailyDeals: DailyDeal[]
  articles: Article[]
  dashboardStats: {
    totalStudents: number
    totalCourses: number
    activeWorkshops: number
    totalRevenue: number
    avgStudentProgress: number
    activeLiveCount: number
  }
}

export const academyData: AcademyData = {
  dashboardStats: {
    totalStudents: 1240,
    totalCourses: 15,
    activeWorkshops: 8,
    totalRevenue: 245600,
    avgStudentProgress: 68,
    activeLiveCount: 3,
  },

  academyUpdates: [
    {
      id: '1',
      title: 'تم إضافة نظام الدخول من الموبايل',
      description: 'تطبيق موبايل جديد متاح الآن على iOS و Android مع جميع ميزات الويب',
      icon: '📱',
      date: '2026-06-08',
      category: 'system',
      isPinned: true,
    },
    {
      id: '2',
      title: 'تم تجهيز واجهة PWA قابلة للتثبيت',
      description: 'يمكن الآن تثبيت الأكاديمية كتطبيق على الهاتف والكمبيوتر مباشرة من المتصفح',
      icon: '🚀',
      date: '2026-06-07',
      category: 'feature',
      isPinned: true,
    },
    {
      id: '3',
      title: 'تم إضافة قسم الورشات الشهرية',
      description: 'قسم جديد للورشات الشهرية مع نظام تسجيل متقدم وشهادات',
      icon: '🎓',
      date: '2026-06-06',
      category: 'feature',
    },
    {
      id: '4',
      title: 'تم إضافة قسم الصفقات المجانية اليومية',
      description: 'عروض يومية حصرية للطلاب الجدد والموجودين',
      icon: '🎁',
      date: '2026-06-05',
      category: 'feature',
    },
    {
      id: '5',
      title: 'تم إضافة قسم اللايفات والتحليلات',
      description: 'بث مباشر للتحليلات المالية مع تفاعل مباشر مع المدربين',
      icon: '📊',
      date: '2026-06-04',
      category: 'feature',
    },
    {
      id: '6',
      title: 'تم إضافة نظام مهام وإشعارات',
      description: 'نظام إدارة مهام متقدم مع إشعارات فورية لكل الأنشطة المهمة',
      icon: '✅',
      date: '2026-06-03',
      category: 'system',
    },
    {
      id: '7',
      title: 'تم إضافة تقارير الطلاب والمتابعة',
      description: 'تقارير تفصيلية لأداء كل طالب مع تحليلات متقدمة',
      icon: '📈',
      date: '2026-06-02',
      category: 'feature',
    },
  ],

  stories: [
    {
      id: '1',
      title: 'قصة نجاح: محمد أحمد',
      description: 'من متداول مبتدئ إلى محترف - حقق أرباحاً بنسبة 150% في الشهر الأول',
      date: '2026-06-08',
      author: 'إدارة الأكاديمية',
      type: 'success',
    },
    {
      id: '2',
      title: 'ورشة جديدة: تحليل الشموع اليابانية المتقدمة',
      description: 'ورشة تفاعلية مع المتداول خبير علي محمود - مجاني للمشتركين',
      date: '2026-06-07',
      author: 'قسم الورشات',
      type: 'event',
    },
    {
      id: '3',
      title: 'إطلاق دورة جديدة: التداول بالخيارات',
      description: 'دورة شاملة من الصفر حتى الاحترافية مع شهادة معترفة بها',
      date: '2026-06-06',
      author: 'قسم الدورات',
      type: 'announcement',
    },
    {
      id: '4',
      title: 'تحديث هام: تحسينات الأداء',
      description: 'تحسينات كبيرة في سرعة التطبيق والمنصة بنسبة 40%',
      date: '2026-06-05',
      author: 'فريق التطوير',
      type: 'announcement',
    },
    {
      id: '5',
      title: 'عرض خاص: خصم 30% على جميع الدورات',
      description: 'عرض محدود لمدة أسبوع فقط على كل الدورات والورشات',
      date: '2026-06-04',
      author: 'إدارة التسويق',
      type: 'event',
    },
  ],

  tasks: [
    {
      id: '1',
      title: 'مراجعة محتوى دورة تحليل أساسي',
      description: 'مراجعة شاملة لمحتوى الدورة الأساسية والتأكد من أن كل الدروس محدثة',
      dueDate: '2026-06-12',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'أحمد خالد',
    },
    {
      id: '2',
      title: 'إنشاء محتوى فيديو جديد',
      description: 'إنتاج 5 فيديوهات تعليمية جديدة عن استراتيجيات التداول',
      dueDate: '2026-06-15',
      priority: 'high',
      status: 'pending',
      assignedTo: 'فاطمة علي',
    },
    {
      id: '3',
      title: 'تحديث البيانات المالية',
      description: 'تحديث أسعار الأسهم والعملات في النظام',
      dueDate: '2026-06-10',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'محمود حسن',
    },
    {
      id: '4',
      title: 'الرد على استفسارات الطلاب',
      description: 'الرد على جميع الاستفسارات المعلقة من الطلاب',
      dueDate: '2026-06-09',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'سارة محمد',
    },
    {
      id: '5',
      title: 'إعداد التقرير الشهري',
      description: 'إعداد تقرير شامل لأداء الأكاديمية خلال شهر مايو',
      dueDate: '2026-06-20',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'إدارة',
    },
  ],

  notifications: [
    {
      id: '1',
      title: 'طالب جديد سجل في الدورة الأساسية',
      message: 'محمد علي سجل في دورة تحليل تقني أساسي',
      type: 'success',
      read: false,
      date: '2026-06-08T10:30:00',
    },
    {
      id: '2',
      title: 'ورشة قريبة',
      message: 'ورشة "تحليل الشموع اليابانية" تبدأ في 3 ساعات',
      type: 'info',
      read: false,
      date: '2026-06-08T09:15:00',
    },
    {
      id: '3',
      title: 'دفع متأخر',
      message: 'هناك 2 فاتورة متأخرة تحتاج متابعة',
      type: 'warning',
      read: true,
      date: '2026-06-07T14:20:00',
    },
    {
      id: '4',
      title: 'طالب انسحب من الدورة',
      message: 'علي محمود انسحب من دورة التداول بالخيارات',
      type: 'error',
      read: true,
      date: '2026-06-06T16:45:00',
    },
  ],

  courses: [
    {
      id: '1',
      title: 'التحليل التقني الأساسي',
      description: 'دورة شاملة لتعلم أساسيات التحليل التقني في الأسواق المالية',
      instructor: 'أحمد خالد',
      students: 345,
      progress: 75,
      level: 'beginner',
      status: 'active',
      duration: '8 أسابيع',
    },
    {
      id: '2',
      title: 'استراتيجيات التداول المتقدمة',
      description: 'دورة متقدمة تغطي استراتيجيات احترافية للتداول اليومي',
      instructor: 'فاطمة علي',
      students: 156,
      progress: 60,
      level: 'advanced',
      status: 'active',
      duration: '12 أسبوع',
    },
    {
      id: '3',
      title: 'إدارة المخاطر والمحافظ',
      description: 'تعلم كيفية إدارة المخاطر وبناء محفظة استثمارية متوازنة',
      instructor: 'محمود حسن',
      students: 234,
      progress: 55,
      level: 'intermediate',
      status: 'active',
      duration: '10 أسابيع',
    },
    {
      id: '4',
      title: 'التداول بالخيارات',
      description: 'دورة متخصصة في تداول الخيارات والعقود الآجلة',
      instructor: 'سارة محمد',
      students: 89,
      progress: 45,
      level: 'advanced',
      status: 'upcoming',
      duration: '14 أسبوع',
    },
    {
      id: '5',
      title: 'التحليل الأساسي للأسهم',
      description: 'تحليل عميق للبيانات المالية واختيار الأسهم الجيدة',
      instructor: 'أحمد خالد',
      students: 267,
      progress: 70,
      level: 'beginner',
      status: 'active',
      duration: '9 أسابيع',
    },
  ],

  workshops: [
    {
      id: '1',
      title: 'تحليل الشموع اليابانية المتقدمة',
      date: '2026-06-08',
      time: '18:00',
      instructor: 'علي محمود',
      attendees: 156,
      maxCapacity: 200,
      status: 'upcoming',
      description: 'ورشة تفاعلية حول كيفية قراءة والاستفادة من الشموع اليابانية',
    },
    {
      id: '2',
      title: 'استراتيجية الدعم والمقاومة',
      date: '2026-06-15',
      time: '19:30',
      instructor: 'فاطمة علي',
      attendees: 112,
      maxCapacity: 150,
      status: 'upcoming',
      description: 'ورشة عملية عن كيفية تحديد والعمل بمستويات الدعم والمقاومة',
    },
    {
      id: '3',
      title: 'نصائح لتحسين الربحية',
      date: '2026-06-01',
      time: '17:00',
      instructor: 'محمود حسن',
      attendees: 234,
      maxCapacity: 300,
      status: 'completed',
      description: 'ورشة حول أفضل النصائح والعادات لتحسين نتائج التداول',
    },
    {
      id: '4',
      title: 'إدارة عواطف التداول',
      date: '2026-06-22',
      time: '18:30',
      instructor: 'سارة محمد',
      attendees: 89,
      maxCapacity: 150,
      status: 'upcoming',
      description: 'ورشة نفسية حول كيفية التحكم بالعواطف أثناء التداول',
    },
  ],

  students: [
    {
      id: '1',
      name: 'محمد علي',
      email: 'محمد@email.com',
      joinDate: '2026-01-15',
      status: 'active',
      coursesEnrolled: 3,
      completionRate: 85,
      lastActive: '2026-06-08T14:30:00',
    },
    {
      id: '2',
      name: 'فاطمة أحمد',
      email: 'فاطمة@email.com',
      joinDate: '2026-02-20',
      status: 'active',
      coursesEnrolled: 2,
      completionRate: 72,
      lastActive: '2026-06-08T11:20:00',
    },
    {
      id: '3',
      name: 'علي محمود',
      email: 'علي@email.com',
      joinDate: '2026-03-10',
      status: 'active',
      coursesEnrolled: 4,
      completionRate: 92,
      lastActive: '2026-06-07T19:45:00',
    },
    {
      id: '4',
      name: 'سارة محمد',
      email: 'سارة@email.com',
      joinDate: '2026-04-05',
      status: 'inactive',
      coursesEnrolled: 1,
      completionRate: 45,
      lastActive: '2026-05-20T10:00:00',
    },
    {
      id: '5',
      name: 'أحمد خالد',
      email: 'أحمد@email.com',
      joinDate: '2026-05-01',
      status: 'active',
      coursesEnrolled: 2,
      completionRate: 60,
      lastActive: '2026-06-08T13:15:00',
    },
  ],

  trainers: [
    {
      id: '1',
      name: 'أحمد خالد',
      email: 'أحمد@trainers.com',
      specialization: 'التحليل التقني',
      experience: 8,
      students: 567,
      rating: 4.8,
      status: 'active',
      joinDate: '2024-01-10',
    },
    {
      id: '2',
      name: 'فاطمة علي',
      email: 'فاطمة@trainers.com',
      specialization: 'إدارة المحافظ',
      experience: 10,
      students: 456,
      rating: 4.9,
      status: 'active',
      joinDate: '2023-06-15',
    },
    {
      id: '3',
      name: 'محمود حسن',
      email: 'محمود@trainers.com',
      specialization: 'التداول النشط',
      experience: 6,
      students: 345,
      rating: 4.7,
      status: 'active',
      joinDate: '2024-03-20',
    },
    {
      id: '4',
      name: 'سارة محمد',
      email: 'سارة@trainers.com',
      specialization: 'الصحة النفسية والتداول',
      experience: 5,
      students: 234,
      rating: 4.6,
      status: 'active',
      joinDate: '2024-05-10',
    },
  ],

  invoices: [
    {
      id: 'INV001',
      studentName: 'محمد علي',
      amount: 299.99,
      currency: 'USD',
      date: '2026-06-01',
      dueDate: '2026-06-15',
      status: 'paid',
      items: [
        { description: 'دورة التحليل التقني الأساسي', amount: 199.99 },
        { description: 'رسم معالجة', amount: 100.0 },
      ],
    },
    {
      id: 'INV002',
      studentName: 'فاطمة أحمد',
      amount: 499.99,
      currency: 'USD',
      date: '2026-06-05',
      dueDate: '2026-06-19',
      status: 'pending',
      items: [
        { description: 'دورة استراتيجيات التداول المتقدمة', amount: 399.99 },
        { description: 'شهادة معترفة بها', amount: 100.0 },
      ],
    },
    {
      id: 'INV003',
      studentName: 'علي محمود',
      amount: 199.99,
      currency: 'USD',
      date: '2026-05-15',
      dueDate: '2026-05-29',
      status: 'overdue',
      items: [
        { description: 'ورشة تحليل الشموع اليابانية', amount: 99.99 },
        { description: 'مواد إضافية', amount: 100.0 },
      ],
    },
  ],

  payments: [
    {
      id: 'PAY001',
      studentName: 'محمد علي',
      amount: 299.99,
      currency: 'USD',
      method: 'credit-card',
      date: '2026-06-08',
      status: 'completed',
      orderId: 'ORD001',
    },
    {
      id: 'PAY002',
      studentName: 'علي محمود',
      amount: 499.99,
      currency: 'USD',
      method: 'bank-transfer',
      date: '2026-06-07',
      status: 'completed',
      orderId: 'ORD002',
    },
    {
      id: 'PAY003',
      studentName: 'سارة محمد',
      amount: 199.99,
      currency: 'USD',
      method: 'paypal',
      date: '2026-06-08',
      status: 'pending',
      orderId: 'ORD003',
    },
  ],

  socialContent: [
    {
      id: 'SC001',
      platform: 'Twitter',
      content: 'تحديث جديد: دورة التداول بالخيارات متاحة الآن! انضم إلى مئات الطلاب الناجحين 🚀',
      scheduledDate: '2026-06-08T10:00:00',
      status: 'published',
      engagementCount: 234,
    },
    {
      id: 'SC002',
      platform: 'Instagram',
      content: 'قصة نجاح من طالب ألهمنا: من مبتدئ إلى متداول احترافي في 3 أشهر فقط! ✨',
      scheduledDate: '2026-06-09T14:30:00',
      status: 'scheduled',
      engagementCount: 0,
    },
    {
      id: 'SC003',
      platform: 'LinkedIn',
      content: 'نحن فخورون بإطلاق أحدث دورة: إدارة المحافظ الاستثمارية. تعرف على المزيد...',
      scheduledDate: '2026-06-07T16:00:00',
      status: 'published',
      engagementCount: 567,
    },
  ],

  leads: [
    {
      id: 'LEAD001',
      name: 'جمال حسن',
      email: 'جمال@email.com',
      phone: '+966501234567',
      source: 'Instagram Ads',
      status: 'new',
      interest: 'دورة التحليل التقني',
      dateAdded: '2026-06-08',
    },
    {
      id: 'LEAD002',
      name: 'نور أحمد',
      email: 'نور@email.com',
      phone: '+966505678901',
      source: 'Google Search',
      status: 'contacted',
      interest: 'ورشة الشموع اليابانية',
      dateAdded: '2026-06-07',
      lastContact: '2026-06-08T10:00:00',
    },
    {
      id: 'LEAD003',
      name: 'ليلى محمد',
      email: 'ليلى@email.com',
      phone: '+966509876543',
      source: 'Facebook',
      status: 'interested',
      interest: 'دورة التداول بالخيارات',
      dateAdded: '2026-06-06',
      lastContact: '2026-06-08T14:30:00',
    },
  ],

  liveSessions: [
    {
      id: 'LIVE001',
      title: 'تحليل السوق الحي - سوق العملات',
      instructor: 'أحمد خالد',
      startTime: '2026-06-08T17:00:00',
      duration: 120,
      viewers: 456,
      topic: 'تحليل تقني مباشر للعملات الرقمية',
      status: 'live',
    },
    {
      id: 'LIVE002',
      title: 'جلسة أسئلة وأجوبة مع المدربين',
      instructor: 'فريق المدربين',
      startTime: '2026-06-09T18:30:00',
      duration: 90,
      viewers: 0,
      topic: 'إجابة على استفسارات الطلاب',
      status: 'upcoming',
    },
    {
      id: 'LIVE003',
      title: 'ندوة: مستقبل التداول الإلكتروني',
      instructor: 'محمود حسن',
      startTime: '2026-06-01T19:00:00',
      duration: 60,
      viewers: 789,
      topic: 'نقاش حول اتجاهات التداول المستقبلية',
      recordingUrl: 'https://example.com/recording1',
      status: 'ended',
    },
  ],

  dailyDeals: [
    {
      id: 'DEAL001',
      title: 'خصم 50% على دورة التحليل التقني الأساسي',
      description: 'عرض حصري ليوم واحد فقط - 50% خصم على أشهر الدورات',
      originalPrice: 199.99,
      discountedPrice: 99.99,
      discount: 50,
      expiresAt: '2026-06-09T00:00:00',
      isActive: true,
    },
    {
      id: 'DEAL002',
      title: 'احصل على أول ورشة مجاني',
      description: 'الطلاب الجدد يحصلون على أول ورشة مجاني بالكامل',
      originalPrice: 99.99,
      discountedPrice: 0,
      discount: 100,
      expiresAt: '2026-06-15T00:00:00',
      isActive: true,
    },
    {
      id: 'DEAL003',
      title: 'شهادة معترفة بها - مجاني مع الدورة',
      description: 'احصل على شهادة معترفة بها الآن دون تكلفة إضافية',
      originalPrice: 100.0,
      discountedPrice: 0,
      discount: 100,
      expiresAt: '2026-06-20T00:00:00',
      isActive: true,
    },
  ],

  articles: [
    {
      id: 'ART001',
      title: 'نصائح ذهبية للمتداولين المبتدئين',
      content: 'مقالة شاملة تغطي أهم النصائح للبدء بشكل صحيح في عالم التداول...',
      author: 'أحمد خالد',
      publishedDate: '2026-06-05',
      category: 'نصائح',
      views: 1234,
      likes: 345,
      featured: true,
    },
    {
      id: 'ART002',
      title: 'كيف تقرأ الشموع اليابانية بشكل صحيح',
      content: 'شرح تفصيلي لجميع أنماط الشموع اليابانية المهمة...',
      author: 'فاطمة علي',
      publishedDate: '2026-06-04',
      category: 'تحليل تقني',
      views: 2456,
      likes: 567,
      featured: true,
    },
    {
      id: 'ART003',
      title: 'تقرير: اتجاهات السوق العالمية',
      content: 'تحليل عميق للاتجاهات الحالية في الأسواق المالية العالمية...',
      author: 'محمود حسن',
      publishedDate: '2026-06-06',
      category: 'تقارير',
      views: 3456,
      likes: 789,
      featured: true,
    },
  ],
}
