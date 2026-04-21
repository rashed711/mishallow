import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const backgroundImages = [
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600",
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1600",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600"
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#0F172A]">

      {/* Cinematic Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isMobile ? 0.5 : 1.2 }}
            className="absolute inset-0"
          >
            <img
              src={backgroundImages[currentIndex]}
              alt="Background"
              className="w-full h-full object-cover brightness-[0.8] contrast-[1.1]"
              loading={currentIndex === 0 ? "eager" : "lazy"}
            />
            {/* Slow Zoom Effect - DISABLED ON MOBILE for performance */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 15, ease: "linear" }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-l from-[#0F172A] via-[#0F172A]/85 to-transparent z-[1]"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0F172A] to-transparent z-[2]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full pt-32 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-7 text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-[#B89544]/20 border border-[#B89544]/40 backdrop-blur-sm text-[#F3E2B1] rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase mb-8 shadow-lg">
                <span className="w-2 h-2 bg-[#B89544] rounded-full ml-3 shadow-[0_0_10px_#B89544]"></span>
                مكتب مشعل بادغيش للمحاماة والاستشارات القانونية
              </div>

              <div className="mb-8">
                <div className="overflow-hidden mb-2">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="fluid-h1 font-black text-white leading-tight drop-shadow-xl"
                  >
                    مكتب محاماة
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "150%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="fluid-h1 font-black text-transparent bg-clip-text bg-gradient-to-l from-[#B89544] via-[#F3E2B1] to-[#D4AF37] leading-tight pb-2"
                  >
                    واستشارات قانونية في مكة
                  </motion.h1>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-white text-base md:text-lg leading-relaxed font-bold mb-10 max-w-2xl mx-auto lg:mx-0 drop-shadow-lg opacity-90"
              >
                نقدّم خدمات قانونية متكاملة في مكة للأفراد والشركات، عبر فريق قانوني متخصص يعمل وفق الأنظمة المعتمدة في المملكة، مع التزام كامل بالسرية وتحقيق أفضل النتائج.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 md:gap-8"
              >
                <Link to="/contact" className="relative group w-full sm:w-auto">
                  {/* Rotating border DISABLED ON MOBILE */}
                  {!isMobile && (
                    <>
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#B89544] to-[#F3E2B1] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                      <div className="absolute -inset-1 rounded-2xl overflow-hidden">
                        <motion.div
                          className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#FFD700_360deg)]"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          style={{ opacity: 0.5 }}
                        />
                      </div>
                    </>
                  )}

                  <button className="w-full relative z-10 bg-gradient-to-r from-[#B89544] via-[#D4AF37] to-[#B89544] text-[#0F172A] font-black px-10 py-4.5 rounded-2xl transition-all bg-[length:200%_auto] animate-gradient-move">
                    <span className="relative z-10 text-base md:text-lg">
                      استشارة قانونية مجانية
                    </span>
                  </button>
                </Link>
                
                <Link to="/services" className="w-full sm:w-auto">
                  <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-black px-10 py-4.5 rounded-2xl transition-all hover:bg-[#B89544] hover:text-[#0F172A]">
                    استكشف خدماتنا
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Cards - Simplified blurs for mobile */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6"
            >
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 group transition-all hover:bg-white/10">
                <div className="flex items-center gap-5">
                  <div className="bg-[#B89544] p-3 rounded-2xl shadow-xl flex-shrink-0">
                    <svg className="w-6 h-6 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-2xl font-black">10+</div>
                    <div className="text-[#B89544] font-bold text-xs uppercase">أعوام من التميز</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 group transition-all hover:bg-white/10">
                <div className="flex items-center gap-5">
                  <div className="bg-white/10 p-3 rounded-2xl border border-white/20 flex-shrink-0">
                    <svg className="w-6 h-6 text-[#B89544]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-2xl font-black">98%</div>
                    <div className="text-slate-300 font-bold text-xs uppercase">نسبة الإنجاز</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slider indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-10 bg-[#B89544]' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </section >
  );
};

export default Hero;