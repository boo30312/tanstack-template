export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'admin' | 'manager' | 'instructor' | 'sales' | 'marketing' | 'support'
  status: 'active' | 'inactive' | 'pending'
  department?: string
  avatar?: string
  password?: string
  permissions: string[]
  createdAt?: string
}

export const DEMO_USERS: Record<string, User> = {
  'admin@enterpoint.com': {
    id: '1',
    name: 'أحمد المدير',
    email: 'admin@enterpoint.com',
    phone: '+966501234567',
    role: 'admin',
    status: 'active',
    department: 'الإدارة',
    permissions: ['*'],
    password: 'admin123',
  },
  'manager@enterpoint.com': {
    id: '2',
    name: 'فاطمة المسؤولة',
    email: 'manager@enterpoint.com',
    phone: '+966502234567',
    role: 'manager',
    status: 'active',
    department: 'الإدارة',
    permissions: ['view_stats', 'view_students', 'view_courses', 'view_payments'],
    password: 'manager123',
  },
  'instructor@enterpoint.com': {
    id: '3',
    name: 'محمد المدرس',
    email: 'instructor@enterpoint.com',
    phone: '+966503234567',
    role: 'instructor',
    status: 'active',
    department: 'التدريس',
    permissions: ['view_courses', 'view_students', 'manage_content'],
    password: 'instructor123',
  },
  'sales@enterpoint.com': {
    id: '4',
    name: 'سارة البيع',
    email: 'sales@enterpoint.com',
    phone: '+966504234567',
    role: 'sales',
    status: 'active',
    department: 'المبيعات',
    permissions: ['view_customers', 'view_payments', 'view_registrations'],
    password: 'sales123',
  },
  'marketing@enterpoint.com': {
    id: '5',
    name: 'علي التسويق',
    email: 'marketing@enterpoint.com',
    phone: '+966505234567',
    role: 'marketing',
    status: 'active',
    department: 'التسويق',
    permissions: ['view_campaigns', 'view_content', 'view_analytics', 'manage_social'],
    password: 'marketing123',
  },
  'support@enterpoint.com': {
    id: '6',
    name: 'ليلى الدعم',
    email: 'support@enterpoint.com',
    phone: '+966506234567',
    role: 'support',
    status: 'active',
    department: 'دعم العملاء',
    permissions: ['view_messages', 'view_students', 'view_tickets'],
    password: 'support123',
  },
}

export const USERS_LIST: User[] = Object.values(DEMO_USERS)
