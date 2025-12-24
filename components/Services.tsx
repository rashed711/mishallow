import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <section className="py-32 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c8?q=80&w=1600" 
          className="w-full h-full object-cover opacity-10" 
          alt="Saudi Business" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="w-20 h-1 bg-[#B89544] mx-auto rounded-full mb-10"></div>
        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">نطاق خدماتنا <span className="text-[#B89544]">القانونية</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg leading-relaxed font-medium">
          نجمع بين المعرفة العميقة بالأنظمة المحلية وأفضل الممارسات الدولية لنقدم استشارات قانونية تصنع قيمة مضافة حقيقية.
        </p>
        <Link 
          to="/services"
          className="bg-gradient-to-r from-[#B89544] to-[#E2C670] text-[#0F172A] px-14 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-2xl shadow-[#B89544]/20 active:scale-95 inline-block"
        >
          استعرض كافة الخدمات الاحترافية
        </Link>
      </div>
    </section>
  );
};

export default Services;
