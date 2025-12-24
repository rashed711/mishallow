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
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#0F172A]">
      
      {/* Cinematic Background Slider */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${
              index === currentIndex ? 'opacity-90' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt="Background"
              className={`w-full h-full object-cover brightness-[0.95] contrast-[1.1] saturate-[1.1] transition-transform duration-[10000ms] ease-linear ${
                index === currentIndex ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        ))}
        
        {/* Dynamic Multi-layer Overlays for better visibility */}
        {/* 1. Main Gradient: Heavy on the right (text side), clear on the left */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0F172A] via-[#0F172A]/70 to-transparent z-[1]"></div>
        
        {/* 2. Bottom Fade: Ensures smooth transition to next sections */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0F172A] to-transparent z-[2]"></div>
        
        {/* 3. Mobile specific overlay: Slight overall dimming for readability on small screens */}
        <div className="absolute inset-0 bg-[#0F172A]/30 md:hidden z-[1]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-24 lg:pt-0">
          
          <div className="lg:col-span-7 text-center lg:text-right">
            <div className="reveal active">
              <div className="inline-flex items-center px-4 py-2 bg-[#B89544]/20 border border-[#B89544]/40 backdrop-blur-md text-[#F3E2B1] rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase mb-6 md:mb-10 shadow-lg">
                <span className="w-2.5 h-2.5 bg-[#B89544] rounded-full ml-3 animate-pulse shadow-[0_0_15px_#B89544]"></span>
                نخبة الخبرات القانونية في المملكة
              </div>
              
              <h1 className="fluid-h1 font-black text-white leading-[1.1] mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                نسخّر القانون <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#B89544] via-[#F3E2B1] to-[#D4AF37]">لحماية طموحاتكم</span>
              </h1>
              
              <p className="text-white text-base md:text-xl leading-relaxed font-bold mb-10 md:mb-14 max-w-2xl mx-auto lg:mx-0 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                في مكتب مشعل بادغيش، نقدم استشارات قانونية استراتيجية تتجاوز المألوف، لنكون الشريك الموثوق في رحلة نجاحكم واستدامة أعمالكم.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 md:gap-8">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#B89544] to-[#D4AF37] text-[#0F172A] font-black px-12 py-4.5 rounded-2xl shadow-[0_15px_30px_rgba(184,149,68,0.3)] hover:-translate-y-1 hover:brightness-110 transition-all text-center active:scale-95"
                >
                  تواصل معنا الآن
                </Link>
                <Link
                  to="/services"
                  className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white font-bold px-12 py-4.5 rounded-2xl border border-white/20 hover:bg-white/15 transition-all text-center active:scale-95"
                >
                  استكشف خدماتنا
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Features Visuals */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="reveal active" style={{ transitionDelay: '0.4s' }}>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform hover:-translate-y-2 transition-all duration-500 group">
                  <div className="flex items-start gap-6">
                    <div className="bg-[#B89544] p-4 rounded-2xl shadow-xl shadow-[#B89544]/20 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-3xl font-black mb-1">10+</div>
                      <div className="text-[#B89544] font-bold text-sm">أعوام من التميز القانوني</div>
                      <p className="text-slate-300 text-xs mt-2 leading-relaxed font-bold">خبرة ممتدة في صياغة الأنظمة وحماية المصالح التجارية الكبرى.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform hover:-translate-y-2 transition-all duration-500 delay-150 group">
                  <div className="flex items-start gap-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-[#B89544]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-3xl font-black mb-1">98%</div>
                      <div className="text-slate-100 font-bold text-sm">نسبة إنجاز القضايا</div>
                      <p className="text-slate-300 text-xs mt-2 leading-relaxed font-bold">نحقق نتائج ملموسة عبر استراتيجيات قانونية مدروسة بعناية.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive slider indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {backgroundImages.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-700 ${
              idx === currentIndex ? 'w-12 bg-[#B89544]' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;