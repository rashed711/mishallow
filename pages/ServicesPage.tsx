import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

import { BriefcaseIcon, ScaleIcon, DocumentTextIcon, UsersIcon, ShieldCheckIcon, GavelIcon, BuildingLibraryIcon, ClipboardDocumentCheckIcon } from '../components/icons/ServiceIcons';

interface ServicesPageProps {
  onOpenModal: () => void;
}

const serviceList = [
  { slug: 'commercial-lawyer-makkah', icon: BriefcaseIcon, title: 'القضايا التجارية وقضايا الشركات', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600' },
  { slug: 'labor-lawyer-makkah', icon: UsersIcon, title: 'القضايا العمالية', img: 'https://images.unsplash.com/photo-1521898284481-a5ec048282bc?q=80&w=600' },
  { slug: 'family-lawyer-makkah', icon: UsersIcon, title: 'قضايا الأحوال الشخصية والأسرية', img: 'https://images.unsplash.com/photo-1542744173-8e7e5341c447?q=80&w=600' },
  { slug: 'criminal-lawyer-makkah', icon: GavelIcon, title: 'القضايا الجنائية', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600' },
  // These below don't have specific pages yet, so we'll keep them without slugs or handle them gracefully
  { slug: '', icon: UsersIcon, title: 'القضايا الأسرية', img: 'https://images.unsplash.com/photo-1542744173-8e7e5341c447?q=80&w=600' },
  { slug: '', icon: DocumentTextIcon, title: 'صياغة ومراجعة العقود', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600' },
  { slug: '', icon: ScaleIcon, title: 'الاستشارات القانونية المتخصصة', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600' },
  { slug: '', icon: BuildingLibraryIcon, title: 'مجال العمل القضائي', img: 'https://images.unsplash.com/photo-1585829365291-1782bd043d70?q=80&w=600' },
  { slug: '', icon: ShieldCheckIcon, title: 'القضايا العسكرية', img: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600' },
  { slug: '', icon: GavelIcon, title: 'الخدمات القضائية', img: 'https://images.unsplash.com/photo-1521791055366-0d553872115b?q=80&w=600' },
  { slug: '', icon: ScaleIcon, title: 'الخدمات القانونية', img: 'https://images.unsplash.com/photo-1454165833767-0266b19677c8?q=80&w=600' },
  { slug: '', icon: ClipboardDocumentCheckIcon, title: 'خدمات تحصيل الديون', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=600' },
];

const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenModal }) => {
  return (
    <div className="bg-[#F8FAFC]">
      <SEO
        title="خدمات قانونية متكاملة في مكة | مكتب محاماة واستشارات قانونية"
        description="نقدم خدمات قانونية شاملة في مكة للأفراد والشركات تشمل القضايا التجارية، العمالية، الأسرية، الجنائية، والعقود، بإشراف فريق قانوني متخصص."
        url="https://mishallow.vercel.app/services"
      />
      <div className="bg-[#0F172A] pt-40 pb-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#B89544]/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">نطاق خبراتنا</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8">حلول قانونية احترافية</h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              نقدم حزمة شاملة من الخدمات القانونية المصممة بعناية لتلبي طموحاتكم وتحمي استثماراتكم في بيئة الأعمال السعودية المتطورة.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {serviceList.map((service, index) => (
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
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-[#0F172A]/40 group-hover:bg-transparent transition-all duration-500"></div>
                  <div className="absolute bottom-6 right-6 bg-white p-4 rounded-2xl shadow-xl transform group-hover:rotate-12 transition-transform">
                    <service.icon className="h-7 w-7 text-[#B89544]" />
                  </div>
                </div>
                <div className="p-10 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black text-[#0F172A] mb-4 leading-tight group-hover:text-[#B89544] transition-colors">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    حلول قانونية مبتكرة مدعومة بخبرة عملية واسعة في الأنظمة السعودية، نضمن لك الحماية والامتثال التام.
                  </p>
                  <div className="mt-auto">
                    {service.slug ? (
                      <Link
                        to={`/${service.slug}`}
                        className="inline-flex items-center gap-3 text-[#0F172A] font-black text-sm group/btn"
                      >
                        <span>تفاصيل الخدمة</span>
                        <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-[#B89544] group-hover/btn:text-white transition-all transform rotate-180 shadow-sm">←</span>
                      </Link>
                    ) : (
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 text-[#0F172A] font-black text-sm group/btn"
                      >
                        <span>اطلب الخدمة الآن</span>
                        <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-[#B89544] group-hover/btn:text-white transition-all transform rotate-180 shadow-sm">←</span>
                      </Link>
                    )}
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
            className="inline-block bg-[#0F172A] text-white px-12 py-4.5 rounded-2xl font-black shadow-xl hover:bg-[#B89544] transition-all transform hover:-translate-y-1"
          >
            تحدث مع مستشار قانوني
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;