# نظام الدخول الموبايل - ENTER POINT

## 📋 نظرة عامة

نظام شامل للدخول والتحكم بصلاحيات المستخدمين عبر الموبايل مع واجهة احترافية تدعم RTL عربي بالكامل.

---

## 📁 الملفات المنشأة

### 1. ملفات البيانات (Data Files)

#### `src/data/users.ts`
- **الوصف**: ملف منفصل يحتوي على كل المستخدمين والايميلات
- **المحتوى**:
  - قائمة المستخدمين التجريبيين
  - بيانات كل مستخدم (الاسم، البريد، الرقم، الدور)
  - بيانات تسجيل الدخول
- **الأدوار المتاحة**:
  - `admin` - وصول كامل
  - `manager` - إدارة إحصائيات وطلاب وكورسات
  - `instructor` - تدريس وإدارة محتوى
  - `sales` - فريق المبيعات
  - `marketing` - التسويق والسوشيال
  - `support` - دعم العملاء

#### `src/data/courses.ts` *(اختياري)*
- بيانات الدورات التعليمية

#### `src/data/plans.ts` *(اختياري)*
- خطط الاشتراك

#### `src/data/features.ts` *(اختياري)*
- مميزات الأكاديمية

#### `src/data/academy.config.ts` *(اختياري)*
- إعدادات عامة للأكاديمية

---

### 2. صفحات الدخول والتسجيل

#### `src/routes/mobile-login.tsx` 🔐
**المسار**: `/mobile-login`

**المميزات**:
- ✅ تصميم Dark Luxury احترافي
- ✅ حقل بريد إلكتروني/رقم هاتف
- ✅ حقل كلمة المرور مع عرض/إخفاء
- ✅ خيار "تذكرني"
- ✅ رابط "نسيت كلمة المرور"
- ✅ حسابات تجريبية سريعة (Quick Login)
- ✅ رابط طلب وصول جديد
- ✅ رسائل خطأ ونجاح
- ✅ تحميل وانتظار

**حسابات التجريب**:
```
Admin
البريد: admin@enterpoint.com
كلمة المرور: admin123

Manager
البريد: manager@enterpoint.com
كلمة المرور: manager123

Instructor
البريد: instructor@enterpoint.com
كلمة المرور: instructor123

Sales
البريد: sales@enterpoint.com
كلمة المرور: sales123

Marketing
البريد: marketing@enterpoint.com
كلمة المرور: marketing123

Support
البريد: support@enterpoint.com
كلمة المرور: support123
```

#### `src/routes/request-access.tsx` 📝
**المسار**: `/request-access`

**المميزات**:
- ✅ نموذج طلب وصول كامل
- ✅ اختيار الدور بصرياً (اختر من 6 أدوار)
- ✅ تحقق من البيانات المدخلة
- ✅ رسالة نجاح بعد الإرسال
- ✅ تحويل تلقائي بعد الإرسال

**الحقول**:
- الاسم الكامل
- رقم الهاتف
- البريد الإلكتروني
- الدور المطلوب
- سبب طلب الوصول

---

### 3. صفحات لوحة التحكم

#### `src/routes/dashboard/access-requests.tsx` 🛡️
**المسار**: `/dashboard/access-requests`

**الصلاحيات**: Admin فقط

**المميزات**:
- ✅ قائمة طلبات الوصول
- ✅ عرض البيانات الكاملة لكل طلب
- ✅ حالات الطلب (قيد الانتظار، موافق عليه، مرفوض)
- ✅ زر قبول/رفض الطلبات
- ✅ عرض تفاصيل الطلب في modal
- ✅ إحصائيات الطلبات

---

### 4. مكونات الموبايل (Mobile Components)

#### `src/components/mobile/MobileBottomNav.tsx` 🧭
**الوصف**: شريط التنقل السفلي للموبايل

**العناصر**:
1. 🏠 الرئيسية
2. 👥 الطلاب
3. 📚 الكورسات
4. 💳 المدفوعات
5. ⋯ المزيد

**المميزات**:
- ✅ ثابت أسفل الشاشة على الموبايل
- ✅ اختفاء على الشاشات الكبيرة (md:hidden)
- ✅ تمييز الصفحة النشطة
- ✅ RTL عربي كامل

#### `src/components/mobile/MobileHeader.tsx` 📱
**الوصف**: رأس الصفحة للموبايل

**العناصر**:
- 🔘 زر القائمة (Menu)
- 📌 عنوان الصفحة
- 💬 زر WhatsApp
- 🔔 الإشعارات
- 👤 صورة المستخدم

**المميزات**:
- ✅ ثابت أعلى الشاشة
- ✅ إشعارات مع dropdown
- ✅ اتصال مباشر عبر WhatsApp
- ✅ عرض بيانات المستخدم

#### `src/components/mobile/MobileDrawer.tsx` 🎯
**الوصف**: قائمة جانبية مخفية (Drawer)

**المميزات**:
- ✅ تفتح بزر القائمة
- ✅ overlay عند الفتح
- ✅ قائمة التنقل
- ✅ بيانات المستخدم
- ✅ الإعدادات والملف الشخصي
- ✅ تسجيل الخروج
- ✅ التحريك السلس

---

## 🎨 نظام الألوان

```
Background Primary:  #05070D
Background Navy:     #07111F
Card Color:          #0B1624
Gold (Primary):      #D4AF37
Blue (Secondary):    #1F7BFF
Text White:          #F8FAFC
Text Muted:          #94A3B8
Dark Gray:           #1F2937
```

---

## 🛡️ نظام الحماية

### المسارات المحمية:

```
/dashboard                    ← يتطلب تسجيل دخول
/dashboard/students          ← يتطلب تسجيل دخول
/dashboard/courses           ← يتطلب تسجيل دخول
/dashboard/payments          ← يتطلب تسجيل دخول
/dashboard/marketing         ← يتطلب تسجيل دخول
/dashboard/access-requests   ← يتطلب تسجيل دخول + Admin فقط
```

### آلية الحماية:

1. إذا حاول المستخدم الدخول لمسار محمي بدون تسجيل دخول
2. يتم تحويله تلقائياً إلى `/mobile-login`
3. بعد تسجيل الدخول، يتم السماح بالوصول للمسار

### التحقق من الأدوار:

```typescript
// التحقق من الدور في البداية
if (user?.role !== 'admin') {
  return <p>لا توجد صلاحية</p>
}
```

---

## 📱 Responsive Design

### على الموبايل (< 768px):
- ✅ Bottom Navigation (شريط سفلي)
- ✅ Mobile Drawer بدلاً من Sidebar
- ✅ Compact Cards
- ✅ Mobile Header

### على التابلت والديسكتوب (≥ 768px):
- ✅ Sidebar عادي
- ✅ Desktop Layout
- ✅ ختفاء Bottom Nav

---

## 🚀 كيفية الاستخدام

### 1. الدخول إلى النظام:

```
https://localhost:3001/mobile-login
```

اختر حساباً تجريبياً أو أدخل بيانات يدوياً.

### 2. الدخول إلى لوحة التحكم:

```
https://localhost:3001/dashboard
```

### 3. عرض طلبات الوصول (Admin فقط):

```
https://localhost:3001/dashboard/access-requests
```

### 4. طلب وصول جديد:

```
https://localhost:3001/request-access
```

---

## 🔐 بيانات تسجيل الدخول الكاملة

جميع البيانات موجودة في: `src/data/users.ts`

كل مستخدم يحتوي على:
- معرّف فريد (ID)
- الاسم الكامل
- البريد الإلكتروني
- رقم الهاتف
- الدور (Role)
- الحالة (Status)
- القسم (Department)
- الصلاحيات (Permissions)
- كلمة مرور

---

## 📊 الإحصائيات

### عدد المستخدمين التجريبيين: 6
- 1 Admin
- 1 Manager
- 1 Instructor
- 1 Sales
- 1 Marketing
- 1 Support

---

## ✨ المميزات الإضافية

- ✅ Dark Luxury Design
- ✅ Glassmorphism Effects
- ✅ Smooth Animations
- ✅ Error Handling
- ✅ Loading States
- ✅ Toast Notifications
- ✅ Form Validation
- ✅ RTL Support
- ✅ Arabic Tajawal Font
- ✅ Responsive Layout

---

## 📝 ملاحظات مهمة

1. **الخط**: جميع النصوص تستخدم `font-tajawal`
2. **الاتجاه**: النص RTL كامل مع `dir="rtl"`
3. **الأمان**: كلمات المرور في Demo فقط للاختبار
4. **التوافقية**: متوافق مع Safari و Chrome و Firefox
5. **الأداء**: استخدام React Hooks بكفاءة

---

## 🔗 الروابط السريعة

| الصفحة | الرابط | النوع |
|-------|--------|-------|
| تسجيل الدخول | `/mobile-login` | Public |
| طلب وصول | `/request-access` | Public |
| لوحة التحكم | `/dashboard` | Protected |
| الطلاب | `/dashboard/students` | Protected |
| الكورسات | `/dashboard/courses` | Protected |
| المدفوعات | `/dashboard/payments` | Protected |
| التسويق | `/dashboard/marketing` | Protected |
| طلبات الوصول | `/dashboard/access-requests` | Admin Only |

---

## 📞 التواصل والدعم

- **WhatsApp**: +966501234567
- **البريد**: support@enterpoint.com
- **الموقع**: https://enterpoint.com

---

**تم الإنشاء بواسطة**: Claude Code  
**التاريخ**: 2026-06-09  
**الإصدار**: 1.0
