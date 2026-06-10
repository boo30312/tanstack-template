import { Users, Bell, CreditCard, DollarSign, Zap, Settings, Share2, TrendingUp } from 'lucide-react'
import { academyData } from '../data/academy-data'

// Trainers Section
export function TrainersSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <Users className="text-[#D4AF37]" />
          المدربين والمعلمين
        </h1>
        <p className="text-[#94A3B8]">فريق المدربين المتخصصين</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {academyData.trainers.map((trainer) => (
          <div key={trainer.id} className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 hover:border-[#D4AF37] transition-all">
            <h3 className="font-bold text-[#F8FAFC] text-lg mb-2">{trainer.name}</h3>
            <p className="text-[#D4AF37] text-sm font-medium mb-3">{trainer.specialization}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">الطلاب:</span>
                <span className="text-[#F8FAFC]">{trainer.students}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">التقييم:</span>
                <span className="text-[#D4AF37] font-bold">⭐ {trainer.rating}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">الخبرة:</span>
                <span className="text-[#F8FAFC]">{trainer.experience} سنوات</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Notifications Section
export function NotificationsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <Bell className="text-[#D4AF37]" />
          الإشعارات
        </h1>
        <p className="text-[#94A3B8]">أحدث الإشعارات والتنبيهات</p>
      </div>

      <div className="space-y-3">
        {academyData.notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border rounded-lg p-4 ${
              notification.read ? 'bg-[#0B1624] border-[#1E293B]' : 'bg-[#1A2332] border-[#1F7BFF]'
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`text-lg flex-shrink-0 ${
                  notification.type === 'success'
                    ? '✅'
                    : notification.type === 'warning'
                    ? '⚠️'
                    : notification.type === 'error'
                    ? '❌'
                    : 'ℹ️'
                }`}
              ></span>
              <div className="flex-1">
                <h3 className="font-bold text-[#F8FAFC]">{notification.title}</h3>
                <p className="text-[#94A3B8] text-sm">{notification.message}</p>
                <span className="text-xs text-[#94A3B8] mt-2">
                  {new Date(notification.date).toLocaleDateString('ar-SA')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Payments Section
export function PaymentsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <DollarSign className="text-[#D4AF37]" />
          المدفوعات والاشتراكات
        </h1>
        <p className="text-[#94A3B8]">إدارة المدفوعات والاشتراكات</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E293B]">
              <th className="text-right p-4 text-[#94A3B8] font-semibold">الطالب</th>
              <th className="text-right p-4 text-[#94A3B8] font-semibold">المبلغ</th>
              <th className="text-right p-4 text-[#94A3B8] font-semibold">الطريقة</th>
              <th className="text-right p-4 text-[#94A3B8] font-semibold">التاريخ</th>
              <th className="text-right p-4 text-[#94A3B8] font-semibold">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {academyData.payments.map((payment) => (
              <tr key={payment.id} className="border-b border-[#1E293B] hover:bg-[#0B1624]">
                <td className="p-4 text-[#F8FAFC]">{payment.studentName}</td>
                <td className="p-4 text-[#D4AF37] font-bold">${payment.amount}</td>
                <td className="p-4 text-[#94A3B8]">
                  {payment.method === 'credit-card' ? 'بطاقة ائتمان' :
                   payment.method === 'bank-transfer' ? 'تحويل بنكي' : 'PayPal'}
                </td>
                <td className="p-4 text-[#F8FAFC]">{new Date(payment.date).toLocaleDateString('ar-SA')}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    payment.status === 'completed' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                    payment.status === 'pending' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                    'bg-red-500 bg-opacity-20 text-red-400'
                  }`}>
                    {payment.status === 'completed' ? 'مكتمل' : payment.status === 'pending' ? 'قيد الانتظار' : 'فشل'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Invoices Section
export function InvoicesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <CreditCard className="text-[#D4AF37]" />
          الفواتير
        </h1>
        <p className="text-[#94A3B8]">إدارة الفواتير والإيصالات</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {academyData.invoices.map((invoice) => (
          <div key={invoice.id} className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 hover:border-[#1F7BFF] transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-[#F8FAFC]">{invoice.studentName}</h3>
                <p className="text-[#94A3B8] text-sm">{invoice.id}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                invoice.status === 'paid' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                invoice.status === 'pending' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                'bg-red-500 bg-opacity-20 text-red-400'
              }`}>
                {invoice.status === 'paid' ? 'مدفوع' : invoice.status === 'pending' ? 'قيد الانتظار' : 'متأخر'}
              </span>
            </div>
            <div className="space-y-2 text-sm mb-4">
              {invoice.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-[#94A3B8]">
                  <span>{item.description}</span>
                  <span>${item.amount}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#1E293B] pt-3 flex justify-between">
              <span className="text-[#94A3B8]">الإجمالي:</span>
              <span className="font-bold text-[#D4AF37]">${invoice.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Leads Section
export function LeadsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <Zap className="text-[#D4AF37]" />
          العملاء المحتملين
        </h1>
        <p className="text-[#94A3B8]">إدارة العملاء المحتملين والمبيعات</p>
      </div>

      <div className="space-y-3">
        {academyData.leads.map((lead) => (
          <div key={lead.id} className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 hover:border-[#1F7BFF] transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-[#F8FAFC]">{lead.name}</h3>
                <p className="text-[#94A3B8] text-sm">{lead.email}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                lead.status === 'new' ? 'bg-blue-500 bg-opacity-20 text-blue-400' :
                lead.status === 'contacted' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                lead.status === 'interested' ? 'bg-purple-500 bg-opacity-20 text-purple-400' :
                lead.status === 'qualified' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                'bg-red-500 bg-opacity-20 text-red-400'
              }`}>
                {lead.status === 'new' ? 'جديد' :
                 lead.status === 'contacted' ? 'تم التواصل' :
                 lead.status === 'interested' ? 'مهتم' :
                 lead.status === 'qualified' ? 'مؤهل' : 'مفقود'}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">الهاتف:</span>
                <span className="text-[#F8FAFC]">{lead.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">المصدر:</span>
                <span className="text-[#D4AF37]">{lead.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">الاهتمام:</span>
                <span className="text-[#F8FAFC]">{lead.interest}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Social Content Section
export function SocialContentSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <Share2 className="text-[#D4AF37]" />
          محتوى السوشيال ميديا
        </h1>
        <p className="text-[#94A3B8]">إدارة منشورات وسائل التواصل</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {academyData.socialContent.map((content) => (
          <div key={content.id} className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 hover:border-[#1F7BFF] transition-all">
            <div className="flex justify-between items-start mb-3">
              <span className="bg-[#1F7BFF] text-white text-xs px-2 py-1 rounded-full font-bold">
                {content.platform}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                content.status === 'published' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                content.status === 'scheduled' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                'bg-gray-500 bg-opacity-20 text-gray-400'
              }`}>
                {content.status === 'published' ? 'منشور' : content.status === 'scheduled' ? 'مجدول' : 'مسودة'}
              </span>
            </div>
            <p className="text-[#F8FAFC] text-sm mb-3">{content.content}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#94A3B8]">❤️ {content.engagementCount}</span>
              <span className="text-[#D4AF37]">{new Date(content.scheduledDate || '').toLocaleDateString('ar-SA')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Reports Section
export function ReportsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <TrendingUp className="text-[#D4AF37]" />
          التقارير والتحليلات
        </h1>
        <p className="text-[#94A3B8]">تقارير شاملة عن أداء الأكاديمية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'تقرير الطلاب الشهري', icon: '📊', value: '1,240 طالب نشط' },
          { title: 'تقرير الإيرادات', icon: '💰', value: '$245,600 إجمالي' },
          { title: 'تقرير الدورات', icon: '📚', value: '15 دورة نشطة' },
          { title: 'تقرير الرضا', icon: '😊', value: '4.8/5 تقييم متوسط' },
          { title: 'تقرير الأداء', icon: '🚀', value: '92% معدل إكمال' },
          { title: 'تقرير الانخراط', icon: '🎯', value: '87% نشاط يومي' },
        ].map((report, idx) => (
          <div key={idx} className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4 hover:border-[#D4AF37] transition-all">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{report.icon}</span>
              <div>
                <h3 className="font-bold text-[#F8FAFC]">{report.title}</h3>
                <p className="text-[#D4AF37] font-medium text-sm mt-1">{report.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Settings Section
export function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
          <Settings className="text-[#D4AF37]" />
          إعدادات الأكاديمية
        </h1>
        <p className="text-[#94A3B8]">إدارة الإعدادات والتكوينات</p>
      </div>

      <div className="space-y-4">
        {[
          { category: 'المعلومات الأساسية', items: ['اسم الأكاديمية', 'الوصف', 'الشعار', 'البريد الإلكتروني'] },
          { category: 'الإعدادات المالية', items: ['العملة', 'طرق الدفع', 'سياسة الاسترجاع', 'رسوم المعاملات'] },
          { category: 'الإعدادات الأمنية', items: ['كلمات المرور', 'المصادقة الثنائية', 'أذونات المستخدمين', 'النسخ الاحتياطية'] },
          { category: 'الإعدادات التقنية', items: ['اللغة', 'المنطقة الزمنية', 'التكامل مع الخدمات', 'API Keys'] },
        ].map((section, idx) => (
          <div key={idx} className="bg-[#0B1624] border border-[#1E293B] rounded-lg p-4">
            <h3 className="font-bold text-[#F8FAFC] mb-3">{section.category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {section.items.map((item, i) => (
                <button
                  key={i}
                  className="p-2 text-sm text-[#94A3B8] hover:text-[#1F7BFF] hover:bg-[#1A2332] rounded transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Updates Page
export function UpdatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">آخر التحديثات والقصص</h1>
        <p className="text-[#94A3B8]">تابع أحدث التطورات في الأكاديمية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {academyData.academyUpdates.map((update) => (
          <div
            key={update.id}
            className="bg-gradient-to-br from-[#0B1624] to-[#1A2332] border border-[#1E293B] rounded-lg p-4 hover:border-[#D4AF37] transition-all duration-300 group"
          >
            <div className="flex items-start gap-3">
              <span className="text-4xl group-hover:scale-110 transition-transform">{update.icon}</span>
              <div className="flex-1 min-w-0">
                {update.isPinned && (
                  <div className="bg-[#D4AF37] text-[#05070D] text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                    📌 مثبت
                  </div>
                )}
                <h3 className="font-bold text-[#F8FAFC] text-sm md:text-base line-clamp-2">
                  {update.title}
                </h3>
                <p className="text-[#94A3B8] text-xs md:text-sm mt-2 line-clamp-3">
                  {update.description}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#1E293B] flex items-center justify-between">
              <span className="text-xs text-[#D4AF37] font-medium">
                {new Date(update.date).toLocaleDateString('ar-SA')}
              </span>
              <span className="text-xs bg-[#1A2332] text-[#94A3B8] px-2 py-1 rounded-full">
                {update.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
