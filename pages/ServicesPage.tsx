import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

import { BriefcaseIcon, ScaleIcon, DocumentTextIcon, UsersIcon, ShieldCheckIcon, GavelIcon, BuildingLibraryIcon, ClipboardDocumentCheckIcon } from '../components/icons/ServiceIcons';

interface ServicesPageProps {
  onOpenModal: () => void;
}

import { servicesData } from '../data/services';

const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenModal }) => {
  return (
    <div className="bg-[#F8FAFC]">
      <SEO
        title="خدمات قانونية متكاملة في مكة | مكتب محاماة واستشارات قانونية"
        description="نقدم خدمات قانونية شاملة في مكة للأفراد والشركات تشمل القضايا التجارية، العمالية، الأسرية، الجنائية، والعقود، بإشراف فريق قانوني متخصص."
        url="https://mishallow.vercel.app/services"
      />
      <div className="bg-[#0F172A] pt-40 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#B89544]/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">نطاق خبراتنا</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8">حلول قانونية احترافية</h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium mb-10">
              نقدم حزمة شاملة من الخدمات القانونية المصممة بعناية لتلبي طموحاتكم وتحمي استثماراتكم في بيئة الأعمال السعودية المتطورة.
            </p>
            <Link
              to="/quick-services"
              className="relative group inline-flex items-center gap-3 bg-[#B89544] text-[#0F172A] px-12 py-5 rounded-2xl font-black shadow-[0_0_20px_rgba(184,149,68,0.3)] hover:shadow-[#B89544]/60 transition-all duration-500 overflow-hidden animate-[pulse-glow_2s_infinite]"
            >
              {/* Permanent Outer Ring Pulse */}
              <span className="absolute inset-0 rounded-2xl bg-[#B89544] animate-ping opacity-10 pointer-events-none"></span>
              
              {/* Shimmer Sweep Animation on Hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></span>
              
              <span className="relative z-10 flex items-center gap-4">
                <div className="bg-[#0F172A] rounded-lg p-1.5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm md:text-base">استكشف الخدمات السريعة للأعمال</span>
              </span>

              <style>{`
                @keyframes shimmer {
                  0% { transform: translateX(-100%) skewX(-15deg); }
                  100% { transform: translateX(200%) skewX(-15deg); }
                }
                @keyframes pulse-glow {
                  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(184, 149, 68, 0.4); }
                  70% { transform: scale(1.02); box-shadow: 0 0 0 15px rgba(184, 149, 68, 0); }
                  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(184, 149, 68, 0); }
                }
              `}</style>
            </Link>
          </motion.div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full"
              >
                <div className="h-60 relative overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-[#0F172A]/40 group-hover:bg-transparent transition-all duration-500"></div>
                  <div className="absolute bottom-6 right-6 bg-white p-4 rounded-2xl shadow-xl transform group-hover:rotate-12 transition-transform">
                    <service.icon className="h-7 w-7 text-[#B89544]" />
                  </div>
                </div>
                <div className="p-10 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black text-[#0F172A] mb-4 leading-tight group-hover:text-[#B89544] transition-colors">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {service.shortDescription}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/${service.slug}`}
                      className="inline-flex items-center gap-3 text-[#0F172A] font-black text-sm group/btn"
                    >
                      <span>تفاصيل الخدمة</span>
                      <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-[#B89544] group-hover/btn:text-white transition-all transform rotate-180 shadow-sm">←</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#0F172A] mb-6">هل تحتاج لاستشارة خاصة؟</h2>
          <p className="text-slate-500 mb-10 text-lg">فريقنا جاهز لدراسة قضيتك وتقديم الحلول القانونية الأنسب لك.</p>
          <Link
            to="/contact"
            className="relative overflow-hidden inline-block bg-[#0F172A] text-white px-12 py-4.5 rounded-2xl font-black shadow-xl hover:bg-[#B89544] transition-all transform hover:-translate-y-1 group"
          >
            <span className="relative z-10">تحدث مع مستشار قانوني</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;