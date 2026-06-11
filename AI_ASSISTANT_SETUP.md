# 🤖 AI Assistant Setup Guide

## مساعد الذكاء الاصطناعي للأكاديمية

### الوصول للمساعد:
```
http://localhost:5173/academy/ai-assistant
```

---

## ⚙️ إعداد المفتاح المحلي (Local Development)

### الخطوة 1: الحصول على OpenAI API Key

1. اذهب إلى: https://platform.openai.com/api-keys
2. سجل دخول أو أنشئ حساب
3. انقر "Create new secret key"
4. نسخ المفتاح (يظهر مرة واحدة فقط!)

### الخطوة 2: إضافة المفتاح محلياً

```bash
# في مجلد المشروع الجذر
cp .env.local.example .env.local
```

ثم افتح `.env.local` وأضف المفتاح:

```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
AI_ASSISTANT_ENABLED=true
AI_ASSISTANT_MODEL=gpt-4o-mini
```

### الخطوة 3: تشغيل المشروع

```bash
npm run dev
```

الآن اذهب إلى:
```
http://localhost:5173/academy/ai-assistant
```

---

## 🚀 إعداد Vercel (Production)

### الخطوة 1: أضف المفتاح إلى Vercel

1. اذهب إلى: https://vercel.com/dashboard
2. اختر المشروع `tanstack-template`
3. انقر على **Settings**
4. اختر **Environment Variables**
5. أضف متغير جديد:

```
Name: OPENAI_API_KEY
Value: sk-proj-xxxxxxxxxxxxx
```

6. اختر البيئات:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development

7. انقر **Save**

### الخطوة 2: تأكد من الإعدادات الأخرى

أضف أيضاً:

```
AI_ASSISTANT_ENABLED=true
AI_ASSISTANT_MODEL=gpt-4o-mini
```

### الخطوة 3: Deploy

```bash
git add .
git commit -m "Add AI Assistant with OpenAI integration"
git push
```

Vercel سيعيد البناء تلقائياً مع المتغيرات الجديدة.

---

## 📋 متغيرات البيئة المدعومة

| المتغير | الوصف | القيمة الافتراضية |
|--------|-------|-----------------|
| `OPENAI_API_KEY` | مفتاح OpenAI API | - |
| `AI_ASSISTANT_ENABLED` | تفعيل المساعد | `true` |
| `AI_ASSISTANT_MODEL` | نموذج OpenAI | `gpt-4o-mini` |
| `DEMO_MODE` | تفعيل وضع التجربة | `false` |

---

## ✅ وضع التجربة (Demo Mode)

إذا لم تضف `OPENAI_API_KEY`:

```
✅ المساعد سيعمل في وضع التجربة
✅ ستظهر رسائل جاهزة توضيحية
⚠️ لا تتصل بـ OpenAI الحقيقية
```

هذا مفيد للاختبار بدون استنزاف الرصيد.

---

## 🔐 ملاحظات أمنية

```
⚠️ NEVER commit .env.local إلى Git
⚠️ المفتاح يُستخدم فقط على الـ Backend
⚠️ لا يظهر المفتاح في الـ Frontend أبداً
✅ جميع الطلبات تمر عبر /api/ai/chat
```

---

## 🧪 اختبار المساعد

### اختبر هذه الأوامر:

1. **تحليل الأداء:**
   ```
   حلل أداء الطلاب في الدورات
   ```

2. **إعداد تقرير:**
   ```
   أنشئ تقرير المبيعات الشهري
   ```

3. **إنشاء رسالة:**
   ```
   أنشئ رسالة WhatsApp للطلاب الجدد
   ```

4. **إقتراحات التحسين:**
   ```
   ما هي أفضل الطرق لزيادة التحاق الطلاب؟
   ```

---

## 🐛 استكشاف الأخطاء

### المساعد لا يرد:

```bash
# تحقق من Console
npm run dev

# تأكد من وجود .env.local
cat .env.local

# تأكد من صحة المفتاح
echo $OPENAI_API_KEY
```

### الخطأ: "API key not found"

```
❌ المفتاح غير موجود في .env.local
✅ الحل: أضف OPENAI_API_KEY إلى .env.local
```

### الخطأ: "Invalid API key"

```
❌ المفتاح خاطئ أو منتهي الصلاحية
✅ الحل: احصل على مفتاح جديد من OpenAI
```

---

## 📊 مميزات المساعد

✅ **تحليل البيانات:**
- إحصائيات الطلاب والدورات
- مراجعة الإيرادات والمدفوعات
- تحليل الأداء الشهري

✅ **إعداد المحتوى:**
- رسائل WhatsApp احترافية
- منشورات LinkedIn و Facebook
- تقارير مالية شاملة

✅ **اقتراحات التحسين:**
- تحسين تجربة الطالب
- زيادة معدل الإكمال
- تحسين الإيرادات

⚠️ **قيود الأمان:**
- ❌ لا يمكنه حذف البيانات
- ❌ لا يمكنه تغيير الأذونات
- ❌ لا يمكنه إرسال رسائل بدون موافقتك
- ✅ جميع الإجراءات تتطلب موافقة

---

## 📞 دعم إضافي

للمزيد من المعلومات:
- OpenAI Docs: https://platform.openai.com/docs
- Vercel Env Vars: https://vercel.com/docs/environment-variables
- قسم المساعد: `/academy/ai-assistant`
