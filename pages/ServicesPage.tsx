import React from 'react';

import { BriefcaseIcon, ScaleIcon, DocumentTextIcon, UsersIcon, ShieldCheckIcon, GavelIcon } from '../components/icons/ServiceIcons';

interface ServicesPageProps {
  onOpenModal: () => void;
}

const serviceList = [
  { icon: ScaleIcon, title: 'الاستشارات القانونية الاستراتيجية', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600' },
  { icon: BriefcaseIcon, title: 'قانون الشركات والاستثمار', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600' },
  { icon: GavelIcon, title: 'التقاضي والمرافعات القضائية', img: 'https://images.unsplash.com/photo-1585829365291-1782bd043d70?q=80&w=600' },
  { icon: DocumentTextIcon, title: 'صياغة العقود والاتفاقيات الدولية', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600' },
  { icon: ShieldCheckIcon, title: 'التحكيم والوساطة التجارية', img: 'https://images.unsplash.com/photo-1521791055366-0d553872115b?q=80&w=600' },
  { icon: UsersIcon, title: 'النزاعات العمالية والموارد البشرية', img: 'https://images.unsplash.com/photo-1521898284481-a5ec048282bc?q=80&w=600' },
];

const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenModal }) => {
  return (
    <div className="bg-[#F8FAFC]">
      <div className="bg-[#0F172A] pt-40 pb-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#B89544]/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">نطاق خبراتنا</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8">حلول قانونية احترافية</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            نقدم حزمة شاملة من الخدمات القانونية المصممة بعناية لتلبي طموحاتكم وتحمي استثماراتكم في بيئة الأعمال السعودية المتطورة.
          </p>
        </div>
      </div>

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {serviceList.map((service, index) => (
              <div 
                key={index} 
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
                    <button 
                      onClick={onOpenModal}
                      className="inline-flex items-center gap-3 text-[#0F172A] font-black text-sm group/btn"
                    >
                      <span>اطلب الخدمة الآن</span>
                      <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-[#B89544] group-hover/btn:text-white transition-all transform rotate-180 shadow-sm">←</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#0F172A] mb-6">هل تحتاج لاستشارة خاصة؟</h2>
          <p className="text-slate-500 mb-10 text-lg">فريقنا جاهز لدراسة قضيتك وتقديم الحلول القانونية الأنسب لك.</p>
          <button 
            onClick={onOpenModal}
            className="bg-[#0F172A] text-white px-12 py-4.5 rounded-2xl font-black shadow-xl hover:bg-[#B89544] transition-all transform hover:-translate-y-1"
          >
            تحدث مع مستشار قانوني
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;