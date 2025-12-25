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
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={backgroundImages[currentIndex]}
              alt="Background"
              className="w-full h-full object-cover brightness-[0.85] contrast-[1.1] "
            />
            {/* Slow Zoom Effect */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 10, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Multi-layer Overlays */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0F172A] via-[#0F172A]/80 to-transparent z-[1]"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0F172A] to-transparent z-[2]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-24 lg:pt-0">

          <div className="lg:col-span-7 text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center px-4 py-2 bg-[#B89544]/20 border border-[#B89544]/40 backdrop-blur-md text-[#F3E2B1] rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase mb-6 md:mb-10 shadow-lg"
              >
                <span className="w-2.5 h-2.5 bg-[#B89544] rounded-full ml-3 animate-pulse shadow-[0_0_15px_#B89544]"></span>
                مكتب مشعل بادغيش للمحاماة والاستشارات القانونية
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="fluid-h1 font-black text-white leading-[1.1] mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
              >
                مكتب محاماة <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#B89544] via-[#F3E2B1] to-[#D4AF37]">واستشارات قانونية في مكة</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-white text-base md:text-xl leading-relaxed font-bold mb-10 md:mb-14 max-w-2xl mx-auto lg:mx-0 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
              >
                مكتب مشعل بادغيش للمحاماة والاستشارات القانونية نقدّم خدمات قانونية متكاملة في مكة للأفراد والشركات، من خلال فريق قانوني متخصص يعمل وفق الأنظمة المعتمدة في المملكة العربية السعودية، مع التزام كامل بالسرية والدقة وتحقيق أفضل النتائج القانونية الممكنة.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 md:gap-8"
              >
                <Link to="/contact" className="relative group w-full sm:w-auto inline-block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: ["0 10px 40px -10px rgba(184,149,68,0.6)", "0 10px 50px -5px rgba(184,149,68,0.9)", "0 10px 40px -10px rgba(184,149,68,0.6)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full bg-gradient-to-r from-[#B89544] via-[#D4AF37] to-[#B89544] text-[#0F172A] font-black px-12 py-4.5 rounded-2xl transition-all relative overflow-hidden z-10 bg-[length:200%_auto] animate-shine"
                  >
                    <span className="relative z-10 text-lg tracking-wide">احصل على استشارة قانونية أولية مجانية</span>

                    {/* Premium Sheen Effect - Intensified */}
                    <motion.div
                      initial={{ x: '-100%', skewX: -15, opacity: 0 }}
                      animate={{ x: '150%', skewX: -15, opacity: [0, 0.9, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                        repeatDelay: 2
                      }}
                      className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent"
                    />
                  </motion.button>
                </Link>
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#B89544] to-[#D4AF37] text-[#0F172A] font-black px-12 py-4.5 rounded-2xl shadow-[0_15px_30px_rgba(184,149,68,0.3)] transition-all relative overflow-hidden group"
                  >
                    استكشف خدماتنا
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Features Visuals - Visible on all screens now */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "backOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
            >
              <motion.div
                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                className="bg-white/5 backdrop-blur-xl p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group"
              >
                <div className="flex items-start gap-4 lg:gap-6">
                  <div className="bg-[#B89544] p-3 lg:p-4 rounded-2xl shadow-xl shadow-[#B89544]/20 group-hover:scale-110 transition-transform flex-shrink-0">
                    <svg className="w-6 h-6 lg:w-8 lg:h-8 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-2xl lg:text-3xl font-black mb-1">10+</div>
                    <div className="text-[#B89544] font-bold text-xs lg:text-sm">أعوام من التميز القانوني</div>
                    <p className="text-slate-300 text-[10px] lg:text-xs mt-2 leading-relaxed font-bold">خبرة ممتدة في صياغة الأنظمة وحماية المصالح التجارية الكبرى.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                className="bg-white/5 backdrop-blur-xl p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group delay-150"
              >
                <div className="flex items-start gap-4 lg:gap-6">
                  <div className="bg-white/10 p-3 lg:p-4 rounded-2xl border border-white/20 group-hover:scale-110 transition-transform flex-shrink-0">
                    <svg className="w-6 h-6 lg:w-8 lg:h-8 text-[#B89544]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-2xl lg:text-3xl font-black mb-1">98%</div>
                    <div className="text-slate-100 font-bold text-xs lg:text-sm">نسبة إنجاز القضايا</div>
                    <p className="text-slate-300 text-[10px] lg:text-xs mt-2 leading-relaxed font-bold">نحقق نتائج ملموسة عبر استراتيجيات قانونية مدروسة بعناية.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive slider indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-700 ${idx === currentIndex ? 'w-12 bg-[#B89544]' : 'w-4 bg-white/30 hover:bg-white/50'
              }`}
          />
        ))}
      </div>
    </section >
  );
};

export default Hero;