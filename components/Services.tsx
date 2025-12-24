import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <section className="section-padding bg-[#0F172A] text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c8?q=80&w=1600" 
          className="w-full h-full object-cover opacity-5 md:opacity-10" 
          alt="Saudi Business" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
        <div className="w-16 md:w-20 h-1.5 bg-[#B89544] mx-auto rounded-full mb-8 md:mb-12"></div>
        <h2 className="fluid-h2 font-black mb-6 md:mb-10 leading-tight">نطاق خدماتنا <span className="text-[#B89544]">القانونية</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-12 md:mb-16 text-base md:text-lg leading-relaxed font-medium">
          نجمع بين المعرفة العميقة بالأنظمة المحلية وأفضل الممارسات الدولية لنقدم استشارات قانونية تصنع قيمة مضافة حقيقية لمشاريعكم الطموحة.
        </p>
        <div className="reveal">
          <Link 
            to="/services"
            className="group bg-gradient-to-r from-[#B89544] to-[#E2C670] text-[#0F172A] px-10 md:px-16 py-4.5 md:py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-2xl shadow-[#B89544]/20 active:scale-95 inline-flex items-center gap-4"
          >
            <span>استعرض كافة الخدمات الاحترافية</span>
            <span className="w-8 h-8 rounded-full bg-[#0F172A]/10 flex items-center justify-center group-hover:bg-[#0F172A]/20 transition-all transform rotate-180">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;