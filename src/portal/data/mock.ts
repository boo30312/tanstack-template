export type ChannelStatus = 'sent' | 'delivered' | 'read'

export interface Contributor {
  id: string
  name: string
  avatarInitials: string
  status: 'verified' | 'pending' | 'missing_id'
  role: string
  phone: string
  email: string
  bank: string
  website: string
  joinedAt: string
}

export interface WhatsAppMessage {
  id: string
  from: 'system' | 'contributor'
  text: string
  time: string
  status?: ChannelStatus
}

export interface VerificationItem {
  id: string
  name: string
  status: 'Pending' | 'Missing ID' | 'In Review'
  submittedAt: string
}

export interface FinancialStatement {
  id: string
  contributor: string
  amount: number
  status: 'Awaiting Approval' | 'Approved' | 'Transferred'
  date: string
}

export interface ActivityEvent {
  id: string
  text: string
  time: string
}

export interface ArticleRecord {
  id: string
  title: string
  author: string
  status: 'Imported' | 'Unmatched' | 'Reviewed'
  linked: boolean
  date: string
}

export const contributors: Array<Contributor> = [
  {
    id: 'CONT-1023',
    name: 'Ali Ahmad',
    avatarInitials: 'AA',
    status: 'verified',
    role: 'Field Correspondent',
    phone: '+963 944 000 123',
    email: 'ali.ahmad@example.com',
    bank: 'SY •••• 4471',
    website: 'syria.tv/authors/ali-ahmad',
    joinedAt: '2024-03-12',
  },
  {
    id: 'CONT-1024',
    name: 'Sara F.',
    avatarInitials: 'SF',
    status: 'missing_id',
    role: 'Contributor',
    phone: '+963 944 000 456',
    email: 'sara.f@example.com',
    bank: '—',
    website: 'syria.tv/authors/sara-f',
    joinedAt: '2025-01-08',
  },
  {
    id: 'CONT-1025',
    name: 'Bilal Hourani',
    avatarInitials: 'BH',
    status: 'pending',
    role: 'TV Guest',
    phone: '+963 944 000 789',
    email: 'bilal.h@example.com',
    bank: 'SY •••• 8820',
    website: '—',
    joinedAt: '2025-05-21',
  },
]

export const verificationQueue: Array<VerificationItem> = [
  { id: 'VER-401', name: 'Ali Ahmad', status: 'In Review', submittedAt: '2h ago' },
  { id: 'VER-402', name: 'Sara F.', status: 'Missing ID', submittedAt: '1d ago' },
  { id: 'VER-403', name: 'Bilal Hourani', status: 'Pending', submittedAt: '3d ago' },
]

export const financialPending: Array<FinancialStatement> = [
  { id: 'ST-2231', contributor: 'Ali Ahmad', amount: 1200, status: 'Awaiting Approval', date: '2026-06-28' },
  { id: 'ST-2232', contributor: 'Bilal Hourani', amount: 480, status: 'Approved', date: '2026-06-27' },
  { id: 'ST-2233', contributor: 'Sara F.', amount: 950, status: 'Transferred', date: '2026-06-24' },
]

export const activityFeed: Array<ActivityEvent> = [
  { id: 'A1', text: 'Contributor Registered — Bilal Hourani', time: '10 min ago' },
  { id: 'A2', text: 'ID Approved — Ali Ahmad', time: '1h ago' },
  { id: 'A3', text: 'Payment Sent — ST-2233', time: '3h ago' },
  { id: 'A4', text: 'Article matched to profile — Ali Ahmad', time: '5h ago' },
]

export const articles: Array<ArticleRecord> = [
  { id: 'AR-1', title: 'Politics Today', author: 'Ali Ahmad', status: 'Imported', linked: true, date: '2026-06-29' },
  { id: 'AR-2', title: 'Breaking News', author: '—', status: 'Unmatched', linked: false, date: '2026-06-29' },
  { id: 'AR-3', title: 'Economy Weekly Brief', author: 'Ali Ahmad', status: 'Reviewed', linked: true, date: '2026-06-27' },
]

export const whatsappThread: Array<WhatsAppMessage> = [
  { id: 'W1', from: 'system', text: 'Please upload your ID to complete verification.', time: '09:12', status: 'read' },
  { id: 'W2', from: 'contributor', text: 'Sent, please check.', time: '09:20' },
  { id: 'W3', from: 'system', text: 'Your ID has been received ✅', time: '09:21', status: 'delivered' },
  { id: 'W4', from: 'system', text: 'Your account is verified ✅', time: '14:45', status: 'read' },
  { id: 'W5', from: 'contributor', text: 'Thank you!', time: '14:46' },
]

export const whatsappChats = [
  { id: 'CONT-1023', name: 'Ali Ahmad', preview: 'Thank you!', time: '14:46', unread: 0, status: 'read' as ChannelStatus },
  { id: 'CONT-1024', name: 'Sara F.', preview: 'Please upload your ID', time: '11:02', unread: 1, status: 'sent' as ChannelStatus },
  { id: 'CONT-1025', name: 'Bilal Hourani', preview: 'Your TV appearance has been logged 🎥', time: 'Yesterday', unread: 0, status: 'delivered' as ChannelStatus },
]

export const messageTemplates = [
  'Request ID',
  'Payment Confirmation',
  'Article Notification',
  'Verification Approved',
]

export const kpis = [
  { label: 'Total Contributors', value: '1,248', delta: '+4.2%' },
  { label: 'Pending Verification', value: '32', delta: '-8%' },
  { label: 'Payments This Month', value: '$84,300', delta: '+11%' },
  { label: 'Articles Published', value: '3,910', delta: '+2.1%' },
]

export const analyticsSeries = {
  contributorGrowth: [120, 180, 210, 260, 300, 360, 420, 460, 510, 560, 610, 680],
  payments: [12, 18, 15, 22, 28, 24, 30, 34, 29, 38, 41, 45],
  articles: [80, 95, 88, 110, 120, 115, 130, 140, 128, 150, 160, 172],
  tvAppearances: [4, 6, 5, 8, 9, 7, 10, 12, 11, 13, 14, 16],
}
