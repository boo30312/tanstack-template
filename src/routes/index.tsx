import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../context/AuthContext'
import { BarChart3, TrendingUp, Users, BookOpen, Zap } from 'lucide-react'

function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-800 border-b border-amber-600/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-amber-500">ENTER POINT</div>
            <div className="flex gap-4">
              {user && (
                <button
                  onClick={() => navigate({ to: '/dashboard' })}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition font-medium"
                >
                  لوحة التحكم
                </button>
              )}
              {!user && (
                <button
                  onClick={() => navigate({ to: '/login' })}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition font-medium"
                >
                  دخول
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-amber-400 leading-tight">
                تعلم التداول بأحترافية
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                منصة تدريب عملية شاملة تجمع بين التعليم النظري والخبرة العملية لسوق التداول والعملات
              </p>
              <div className="flex gap-4 pt-4">
                {user ? (
                  <button
                    onClick={() => navigate({ to: '/dashboard' })}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition font-medium"
                  >
                    <Zap size={20} />
                    اذهب للوحة التحكم
                  </button>
                ) : (
                  <button
                    onClick={() => navigate({ to: '/login' })}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition font-medium"
                  >
                    <Zap size={20} />
                    ابدأ الآن
                  </button>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-amber-600 to-amber-800 rounded-full opacity-20 blur-3xl"></div>
              <div className="text-center text-amber-400 text-6xl">📈</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-400 mb-16">المميزات الرئيسية</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'محتوى تعليمي', desc: 'دورات شاملة من المبتدئ للمحترف' },
              { icon: Users, title: 'مجتمع تداول', desc: 'تفاعل مع متداولين ومحترفين' },
              { icon: TrendingUp, title: 'تحليل حي', desc: 'بيانات سوق مباشرة وتحليلات' },
              { icon: BarChart3, title: 'لوحة تحكم', desc: 'إدارة متقدمة للعمليات والتحليلات' },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="bg-slate-700/50 border border-amber-600/30 p-8 rounded-lg hover:border-amber-600 transition text-center"
                >
                  <div className="text-amber-400 mb-4 flex justify-center">
                    <Icon size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-amber-400 mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-400 mb-16">خطط التدريب</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: 'الخطة الأساسية',
                desc: 'للمبتدئين - تعليم المبادئ الأساسية',
                features: ['10 دورات تعليمية', 'دعم الأساسيات', 'منتدى تفاعلي']
              },
              {
                name: 'الخطة المتقدمة',
                desc: 'للمتداولين - استراتيجيات متقدمة',
                features: ['50 دورة متقدمة', 'تحليل فني عميق', 'جلسات حية أسبوعية']
              },
              {
                name: 'الخطة الاحترافية',
                desc: 'للمحترفين - إدارة محفظة متكاملة',
                features: ['كل المحتوى', 'استشارات فردية', 'إدارة رأس المال']
              },
            ].map((product, idx) => (
              <div key={idx} className="bg-slate-700/50 rounded-lg border border-amber-600/30 overflow-hidden hover:border-amber-600 transition">
                <div className="h-48 bg-gradient-to-b from-amber-600 to-amber-800 flex items-center justify-center">
                  <div className="text-6xl">📚</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-amber-400 mb-2">{product.name}</h3>
                  <p className="text-gray-300 mb-4">{product.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-400">✓ {feature}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate({ to: '/login' })}
                    className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded transition text-center"
                  >
                    اختر الخطة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: BookOpen, label: 'تدريب احترافي', value: '500+ ساعة' },
              { icon: Users, label: 'متداولون نشطون', value: '+5000 متداول' },
              { icon: TrendingUp, label: 'معدل النجاح', value: '85% نجاح' },
              { icon: BarChart3, label: 'إحصائيات حقيقية', value: 'بيانات مباشرة' },
            ].map((badge, idx) => {
              const Icon = badge.icon
              return (
                <div key={idx} className="border border-amber-600/30 p-6 rounded-lg hover:border-amber-600 transition">
                  <div className="text-amber-400 mb-3 flex justify-center">
                    <Icon size={32} />
                  </div>
                  <p className="text-gray-300 mb-2">{badge.label}</p>
                  <p className="text-xl font-bold text-amber-400">{badge.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-400 mb-12">ابدأ رحلتك التدريبية</h2>
          <div className="bg-slate-800 border-2 border-amber-600/30 rounded-lg p-8 md:p-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Zap className="text-amber-400 flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2">ابدأ الآن</h3>
                  <p className="text-gray-300">
                    انضم إلى أكاديمية التدريب والبدء الفوري في مسار التعلم الاحترافي
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="text-amber-400 flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2">مجتمعنا</h3>
                  <p className="text-gray-300">
                    تفاعل مع متداولين محترفين وتبادل الخبرات والاستراتيجيات المختلفة
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-amber-600/30">
                <h3 className="text-xl font-bold text-amber-400 mb-6">ما يميزنا؟</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ محتوى تعليمي احترافي</li>
                  <li>✓ دعم متقدم وفعال</li>
                  <li>✓ تحليل سوق مباشر</li>
                  <li>✓ شهادات معترف بها</li>
                  <li>✓ جلسات استشارية فردية</li>
                </ul>
              </div>

              <button
                onClick={() => navigate({ to: '/login' })}
                className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg text-center transition text-lg"
              >
                ادخل الآن لوحة التحكم
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-amber-600/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2026 ENTER POINT - نظام لوحة التحكم. جميع الحقوق محفوظة.</p>
          <p className="mt-2 text-sm">تعلم التداول بأحترافية وثقة</p>
        </div>
      </footer>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})