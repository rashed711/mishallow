import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-[#0F172A] pt-40 lg:pt-56 pb-24 lg:pb-40 overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#B89544]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm text-[#B89544] rounded-full text-xs font-black tracking-widest uppercase mb-8">
              <span className="w-2 h-2 bg-[#B89544] rounded-full ml-3 animate-pulse"></span>
              نخبة الخبرات القانونية السعودية
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.15] mb-8">
              نسخّر القانون <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#B89544] to-[#E2C670]">لحماية طموحاتكم</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium mb-12 max-w-2xl mx-auto lg:mx-0">
              في مكتب مشعل بادغيش، نقدم استشارات قانونية استراتيجية تتجاوز المألوف، لنكون الشريك الموثوق في رحلة نجاحكم واستدامة أعمالكم.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-gradient-to-r from-[#B89544] to-[#D4AF37] text-[#0F172A] font-black px-12 py-5 rounded-2xl shadow-2xl shadow-[#B89544]/20 hover:scale-105 transition-all active:scale-95 text-center"
              >
                تواصل معنا الآن
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto bg-white/5 text-white font-bold px-12 py-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm text-center"
              >
                استكشف خدماتنا
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#B89544]/20 to-transparent blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative grid grid-cols-2 gap-6 items-end">
                <div className="space-y-6">
                  <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 transform hover:-rotate-2 transition-transform duration-700">
                    <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600" alt="Law" className="w-full h-80 object-cover" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <div className="text-[#B89544] text-4xl font-black mb-2">10+</div>
                    <div className="text-white font-bold text-sm tracking-wide">سنوات من التميز النظامي</div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-[#B89544] p-8 rounded-[2.5rem] shadow-2xl">
                    <svg className="w-10 h-10 text-[#0F172A] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="text-[#0F172A] font-black text-lg leading-tight">أمان قانوني <br /> متكامل</p>
                  </div>
                  <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 transform hover:rotate-2 transition-transform duration-700">
                    <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=600" alt="Office" className="w-full h-64 object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;