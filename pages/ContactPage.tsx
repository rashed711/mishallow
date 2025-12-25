
import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-[#0F172A]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <SEO
          title="تواصل مع محامي في مكة | مكتب مشعل بادغيش للمحاماة"
          description="تواصل الآن مع مكتب مشعل بادغيش للمحاماة في مكة واحصل على استشارة قانونية أولية مجانية من فريق قانوني متخصص."
        />
      </div>
      {/* Dark Hero */}
      <div className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?q=80&w=1600" alt="Riyadh" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">تواصل معنا</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">قنوات الاتصال المباشر</h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              مستشارونا القانونيون متاحون للرد على استفساراتكم وتقديم الدعم اللازم في أي وقت.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="py-24 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16 items-start">

            <div className="lg:col-span-1 space-y-8 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl hover:border-[#B89544]/50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#B89544]/20 rounded-xl flex items-center justify-center mb-8">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-xl font-black text-white mb-4">المقر الرئيسي</h3>
                <p className="text-slate-400 font-medium">شارع عبدالله بن عباس</p>
                <p className="text-slate-400 font-medium mt-1">بجوار نادي ستار تراك</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl hover:border-[#B89544]/50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#B89544]/20 rounded-xl flex items-center justify-center mb-8">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="text-xl font-black text-white mb-4">ساعات العمل</h3>
                <p className="text-slate-400 font-medium">الأحد - الخميس: 9:00 ص - 5:00 م</p>
                <p className="text-slate-400 font-medium mt-1">0568000085</p>
              </motion.div>
            </div>

            <motion.div
              className="lg:col-span-2 order-1 lg:order-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-1 border border-white/10 shadow-2xl">
                <Contact />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Map Placeholder or Visual element */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[400px] w-full bg-slate-800 rounded-[3rem] overflow-hidden relative border border-white/10 grayscale">
            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                <p className="text-[#B89544] font-black text-xl mb-2">نسعد باستقبالكم في مكتبنا</p>
                <button className="text-white text-sm font-bold underline">فتح الموقع في خرائط جوجل</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
