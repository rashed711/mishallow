import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const backgroundImages = [
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600",
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1600",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600"
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#0F172A] py-20 lg:py-0">
      
      {/* Cinematic Background Slider */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentIndex ? 'opacity-70' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt="Background"
              className={`w-full h-full object-cover brightness-[0.7] contrast-[1.1] transition-transform duration-[8000ms] ease-linear ${
                index === currentIndex ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        ))}
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-[#0F172A]/80"></div>
        <div className="absolute inset-y-0 right-0 w-full lg:w-2/3 bg-gradient-to-l from-[#0F172A] via-[#0F172A]/60 to-transparent z-[1] hidden md:block"></div>
        {/* Mobile-only overlay for text readability */}
        <div className="absolute inset-0 bg-[#0F172A]/40 md:hidden z-[1]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 text-center lg:text-right pt-10 lg:pt-0">
            <div className="reveal active">
              <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-[#B89544]/10 border border-[#B89544]/30 backdrop-blur-md text-[#E2C670] rounded-full text-[9px] md:text-xs font-black tracking-widest uppercase mb-6 lg:mb-8">
                <span className="w-2 h-2 bg-[#B89544] rounded-full ml-2 md:ml-3 animate-pulse"></span>
                نخبة الخبرات القانونية في المملكة
              </div>
              <h1 className="fluid-h1 font-black text-white leading-[1.1] mb-6 lg:mb-8 drop-shadow-2xl">
                نسخّر القانون <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#B89544] via-[#F3E2B1] to-[#D4AF37]">لحماية طموحاتكم</span>
              </h1>
              <p className="text-slate-200 text-sm md:text-xl leading-relaxed font-medium mb-10 lg:mb-12 max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
                في مكتب مشعل بادغيش، نقدم استشارات قانونية استراتيجية تتجاوز المألوف، لنكون الشريك الموثوق في رحلة نجاحكم واستدامة أعمالكم.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#B89544] to-[#D4AF37] text-[#0F172A] font-black px-10 py-4 md:py-4.5 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-center"
                >
                  تواصل معنا الآن
                </Link>
                <Link
                  to="/services"
                  className="w-full sm:w-auto glass-card text-white font-bold px-10 py-4 md:py-4.5 rounded-2xl border border-white/20 hover:bg-white/10 backdrop-blur-md transition-all text-center"
                >
                  استكشف خدماتنا
                </Link>
              </div>
            </div>
          </div>

          {/* Side Cards - Hidden on mobile to keep focus on text */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="reveal active" style={{ transitionDelay: '0.3s' }}>
              <div className="relative space-y-6">
                <div className="glass-card p-8 rounded-[2.5rem] border border-white/20 shadow-2xl backdrop-blur-xl transform hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-start gap-6">
                    <div className="bg-[#B89544] p-4 rounded-2xl">
                      <svg className="w-8 h-8 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-3xl font-black mb-1">10+</div>
                      <div className="text-[#B89544] font-bold text-sm">أعوام من التميز القانوني</div>
                      <p className="text-slate-300 text-xs mt-2 leading-relaxed">خبرة ممتدة في صياغة الأنظمة وحماية المصالح التجارية.</p>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-8 rounded-[2.5rem] border border-white/20 shadow-2xl backdrop-blur-xl transform hover:-translate-y-2 transition-transform duration-500 delay-150">
                  <div className="flex items-start gap-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                      <svg className="w-8 h-8 text-[#B89544]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-3xl font-black mb-1">98%</div>
                      <div className="text-slate-100 font-bold text-sm">نسبة إنجاز القضايا</div>
                      <p className="text-slate-300 text-xs mt-2 leading-relaxed">نحقق نتائج ملموسة عبر استراتيجيات قانونية مدروسة.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider Indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 md:gap-3">
        {backgroundImages.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 md:h-1.5 rounded-full transition-all duration-700 ${
              idx === currentIndex ? 'w-8 md:w-10 bg-[#B89544]' : 'w-2 md:w-3 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;