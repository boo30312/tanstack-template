import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MessageCircle, Phone, MapPin, Award, Heart, Leaf, Truck, Shield } from 'lucide-react'

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <div className="w-full bg-black text-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black border-b border-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-yellow-500">فرشات الوليد</div>
            <div className="hidden md:flex gap-8">
              {['hero', 'features', 'products', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-300 hover:text-yellow-500 transition capitalize"
                >
                  {section === 'hero' && 'الرئيسية'}
                  {section === 'features' && 'المميزات'}
                  {section === 'products' && 'المنتجات'}
                  {section === 'contact' && 'التواصل'}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-yellow-500"
            >
              ☰
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              {['hero', 'features', 'products', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-right text-gray-300 hover:text-yellow-500 py-2"
                >
                  {section === 'hero' && 'الرئيسية'}
                  {section === 'features' && 'المميزات'}
                  {section === 'products' && 'المنتجات'}
                  {section === 'contact' && 'التواصل'}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-900 via-black to-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-yellow-500 leading-tight">
                راحة تدوم... جودة تليق بك
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                معمل إنشاء فرشات متخصص بتصنيع فرشات نوم عالية الجودة مع أحدث التقنيات والمواد الطبية الصحية
              </p>
              <div className="flex gap-4 pt-4">
                <a
                  href="https://wa.me/963967886527"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition"
                >
                  <MessageCircle size={20} />
                  تواصل عبر واتس
                </a>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-3 rounded-lg transition"
                >
                  اطلب الآن
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full opacity-20 blur-3xl"></div>
              <div className="text-center text-yellow-500 text-6xl">🛏️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-yellow-500 mb-16">مميزاتنا</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: 'راحة تدوم', desc: 'تقنيات حديثة لراحة قصوى' },
              { icon: Award, title: 'جودة عالية', desc: 'شهادات وتصاريح دولية' },
              { icon: Leaf, title: 'مواد صحية', desc: 'مواد طبيعية آمنة 100%' },
              { icon: Shield, title: 'دعم مالي', desc: 'خطط دفع مرنة وآمنة' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-yellow-600 p-8 rounded-lg hover:border-yellow-500 transition text-center"
              >
                <div className="text-yellow-500 mb-4 flex justify-center">
                  <feature.icon size={40} />
                </div>
                <h3 className="text-xl font-bold text-yellow-500 mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-yellow-500 mb-16">منتجاتنا</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: 'فرشة الوليد برو',
                desc: 'فرشة متقدمة مع حشوة احترافية وتقنيات حديثة',
                features: ['تقنيات حديثة', 'ثبات وجودة', 'راحة فائقة']
              },
              {
                name: 'فرشة الوليد ديلوكس',
                desc: 'فرشة فاخرة بتصميم عصري مع مواد عالية الجودة',
                features: ['مواد طبية', 'دعم صحي للجسم', 'عمر طويل']
              },
              {
                name: 'فرشة الوليد كلاسيك',
                desc: 'فرشة كلاسيكية موثوقة بأسعار ممتازة',
                features: ['سعر مناسب', 'جودة ثابتة', 'متينة']
              },
            ].map((product, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg border border-yellow-600 overflow-hidden hover:border-yellow-500 transition">
                <div className="h-48 bg-gradient-to-b from-yellow-600 to-yellow-800 flex items-center justify-center">
                  <div className="text-6xl">🛏️</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-yellow-500 mb-2">{product.name}</h3>
                  <p className="text-gray-300 mb-4">{product.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-400">✓ {feature}</li>
                    ))}
                  </ul>
                  <a
                    href="https://wa.me/963967886527"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 rounded transition text-center"
                  >
                    استفسر الآن
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Award, label: 'جودة عالية', value: '10 سنوات' },
              { icon: Truck, label: 'توصيل سريع', value: 'سوريا - لبنان - الأردن' },
              { icon: Shield, label: 'ضمان حقيقي', value: 'كفالة كاملة' },
              { icon: Heart, label: 'رضا العملاء', value: '100% مضمون' },
            ].map((badge, idx) => (
              <div key={idx} className="border border-yellow-600 p-6 rounded-lg">
                <div className="text-yellow-500 mb-3 flex justify-center">
                  <badge.icon size={32} />
                </div>
                <p className="text-gray-300 mb-2">{badge.label}</p>
                <p className="text-xl font-bold text-yellow-500">{badge.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-yellow-500 mb-12">تواصل معنا</h2>
          <div className="bg-gray-900 border-2 border-yellow-600 rounded-lg p-8 md:p-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="text-yellow-500 flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-yellow-500 mb-2">واتساب مباشر</h3>
                  <a
                    href="https://wa.me/963967886527"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-yellow-500 text-lg transition"
                  >
                    +963 967 886 527
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-yellow-500 flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-yellow-500 mb-2">موقعنا</h3>
                  <p className="text-gray-300">
                    سوريا • دمشق • ريف دمشق<br/>
                    بجانب المزارعة الشرقية البشرطة
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-yellow-600">
                <h3 className="text-xl font-bold text-yellow-500 mb-6">ماذا نقدم لك؟</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ تصميم حسب الطلب</li>
                  <li>✓ خدمة عملاء متميزة</li>
                  <li>✓ توصيل وتركيب مجاني</li>
                  <li>✓ ضمان ما بعد البيع</li>
                  <li>✓ دعم مالي ميسر</li>
                </ul>
              </div>

              <a
                href="https://wa.me/963967886527"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-center transition text-lg"
              >
                اضغط للتواصل مباشرة عبر واتس
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-yellow-600 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2026 فرشات الوليد - معمل إنشاء فرشات. جميع الحقوق محفوظة.</p>
          <p className="mt-2 text-sm">راحة تدوم ... جودة تليق بك</p>
        </div>
      </footer>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})