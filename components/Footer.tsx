
import React from 'react';

interface FooterProps {
  onNavigate: (page: any) => void;
}

const SocialIcon: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-200 hover:bg-[#D4AF37] hover:text-[#0A2A5A] hover:border-[#D4AF37] transition-all duration-300"
  >
    {children}
  </a>
);

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-[#0A2A5A] text-white pt-24 pb-12 overflow-hidden">
      {/* Subtle Saudi/Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="saudi-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#saudi-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Identity Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="bg-[#D4AF37] p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A2A5A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.12-3.06M12 14L5.88 10.94M6 10l6-3 6 3M6 10V18L12 21L18 18V10" />
                </svg>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-xl font-bold text-white">مشعل بادغيش</span>
                <span className="text-[10px] tracking-[0.2em] text-[#D4AF37] font-semibold uppercase">للمحاماة والاستشارات</span>
              </div>
            </div>
            <p className="text-blue-100/70 text-sm leading-relaxed max-w-xs">
              نلتزم بتقديم حلول قانونية استراتيجية تتوافق مع تطلعات النهضة الاقتصادية للمملكة، ونضع خبراتنا بين يدي عملائنا لتحقيق أعلى معايير الأمان النظامي.
            </p>
            <div className="flex items-center space-x-3 rtl:space-x-reverse pt-2">
              <SocialIcon href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></SocialIcon>
              <SocialIcon href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></SocialIcon>
              <SocialIcon href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></SocialIcon>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-[#D4AF37] rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="text-blue-100/70 hover:text-[#D4AF37] hover:translate-x-[-8px] transition-all duration-300 flex items-center"
                >
                  <span className="ml-2">الرئيسية</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="text-blue-100/70 hover:text-[#D4AF37] hover:translate-x-[-8px] transition-all duration-300 flex items-center"
                >
                  <span className="ml-2">من نحن</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="text-blue-100/70 hover:text-[#D4AF37] hover:translate-x-[-8px] transition-all duration-300 flex items-center"
                >
                  <span className="ml-2">خدماتنا القانونية</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('articles')} 
                  className="text-blue-100/70 hover:text-[#D4AF37] hover:translate-x-[-8px] transition-all duration-300 flex items-center"
                >
                  <span className="ml-2">المقالات القانونية</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="text-blue-100/70 hover:text-[#D4AF37] hover:translate-x-[-8px] transition-all duration-300 flex items-center"
                >
                  <span className="ml-2">تواصل معنا</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              معلومات الاتصال
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-[#D4AF37] rounded-full"></span>
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start group">
                <div className="bg-white/5 p-2 rounded-lg ml-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">المقر الرئيسي</p>
                  <p className="text-blue-100/70 text-sm">طريق الأمير سلطان، حي الروضة، جدة، المملكة العربية السعودية</p>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-white/5 p-2 rounded-lg ml-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">البريد الإلكتروني</p>
                  <p className="text-blue-100/70 text-sm">info@badgheish.law</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Call to Action Column */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h4 className="text-white font-bold text-lg mb-4">هل لديك استفسار؟</h4>
            <p className="text-blue-100/70 text-sm mb-6">فريقنا القانوني متاح لتقديم الدعم اللازم لك على مدار الأسبوع.</p>
            <button 
              onClick={() => onNavigate('contact')}
              className="w-full bg-[#D4AF37] text-[#0A2A5A] font-bold py-3 px-4 rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <span>احجز موعد الآن</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </button>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-100/50 text-xs text-center md:text-right">
              &copy; {new Date().getFullYear()} مكتب مشعل بادغيش للمحاماة والاستشارات القانونية. جميع الحقوق محفوظة. ترخيص رقم (12345/67)
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse text-blue-100/50 text-xs">
              <button onClick={() => onNavigate('privacy')} className="hover:text-[#D4AF37] transition-colors">سياسة الخصوصية</button>
              <button onClick={() => onNavigate('terms')} className="hover:text-[#D4AF37] transition-colors">اتفاقية الاستخدام</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Gradient Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-[#D4AF37] via-[#0A2A5A] to-[#D4AF37]"></div>
    </footer>
  );
};

export default Footer;
