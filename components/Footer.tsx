import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScaleIcon } from './icons/ServiceIcons';

interface FooterProps {
  onOpenModal: () => void;
}

const SocialIcon: React.FC<{ children: React.ReactNode; href: string; label: string }> = ({ children, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#B89544] hover:text-[#0F172A] hover:border-[#B89544] transition-all duration-300"
    aria-label={label}
    title={label}
  >
    {children}
  </a>
);

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  const location = useLocation();
  const quickLinks = [
    { to: '/', text: 'الرئيسية', title: 'العودة للصفحة الرئيسية' },
    { to: '/about', text: 'من نحن', title: 'نبذة عن خبراتنا وفريقنا القانوني' },
    { to: '/services', text: 'خدماتنا القانونية', title: 'استكشف تخصصاتنا وخدماتنا القانونية' },
    { to: '/articles', text: 'المقالات القانونية', title: 'اقرأ آخر الرؤى والدراسات القانونية' },
    { to: '/quick-services', text: 'خدمات سريعة', title: 'استشارات قانونية سريعة وفورية' },
    { to: '/contact', text: 'تواصل معنا', title: 'قنوات الاتصال المباشر بالشركة' },
  ];

  const makkahServiceLinks = [
    { to: '/commercial-lawyer-makkah', text: 'محامي تجاري في مكة' },
    { to: '/labor-lawyer-makkah', text: 'محامي عمالي في مكة' },
    { to: '/criminal-lawyer-makkah', text: 'محامي جنائي في مكة' },
    { to: '/family-lawyer-makkah', text: 'محامي أسري في مكة' },
    { to: '/military-cases-makkah', text: 'قضايا عسكرية بمكة' },
    { to: '/contract-drafting-makkah', text: 'صياغة العقود بمكة' },
    { to: '/litigation-services-makkah', text: 'تمثيل قضائي بمكة' },
    { to: '/debt-collection-makkah', text: 'تحصيل ديون بمكة' },
  ];

  const jeddahServiceLinks = [
    { to: '/commercial-lawyer-jeddah', text: 'محامي تجاري في جدة' },
    { to: '/labor-lawyer-jeddah', text: 'محامي عمالي في جدة' },
    { to: '/criminal-lawyer-jeddah', text: 'محامي جنائي في جدة' },
    { to: '/family-lawyer-jeddah', text: 'محامي أسري في جدة' },
    { to: '/judgment-execution-jeddah', text: 'تنفيذ أحكام بجدة' },
  ];


  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#0F172A] text-white pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 text-white opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="diamond-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diamond-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-right">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-20">

          <div className="col-span-2 lg:col-span-1 space-y-6 flex flex-col items-center md:items-start">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center gap-4 group"
              title="شركة مشعل بادغيش للمحاماة - الصفحة الرئيسية"
              aria-label="العودة للصفحة الرئيسية"
            >
              <div className="bg-white p-0 rounded-sm shadow-lg flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/logo/logo.webp"
                  alt="شعار شركة مشعل بادغيش للمحاماة"
                  width={40}
                  height={40}
                  loading="lazy"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-xl font-bold text-white group-hover:text-[#B89544] transition-colors">مشعل بادغيش</span>
                <span className="text-[10px] tracking-[0.2em] text-[#B89544] font-semibold uppercase">للمحاماة والاستشارات</span>
              </div>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              بيت خبرة قانوني متخصص في مكة المكرمة، يقدم حلولاً متكاملة في نظام الشركات الجديد ونظام المعاملات المدنية، مع تمثيل قضائي رقمي احترافي عبر منصة ناجز.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-3 rtl:space-x-reverse pt-2">
              <SocialIcon href="https://www.linkedin.com/company/mishal-lawfirm/" label="تابعنا على LinkedIn"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></SocialIcon>
              <SocialIcon href="https://www.tiktok.com/@mishal_lawfirm" label="تابعنا على TikTok"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.02 3.34-1.43 3.48-3.23.08-1.38.03-2.77.04-4.15V.02h.02z" /></svg></SocialIcon>
              <SocialIcon href="https://www.facebook.com/mishal.lawfirm" label="تابعنا على Facebook"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></SocialIcon>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-8 relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 md:right-0 w-8 h-1 bg-[#B89544] rounded-full left-0 md:left-auto mx-auto md:mx-0"></span>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    title={link.title}
                    className="text-slate-300 hover:text-[#B89544] hover:pr-2 transition-all duration-300 block"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-8 relative inline-block">
              تخصصاتنا القانونية
              <span className="absolute -bottom-2 right-0 md:right-0 w-8 h-1 bg-[#B89544] rounded-full left-0 md:left-auto mx-auto md:mx-0"></span>
            </h3>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-3">
                {makkahServiceLinks.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-slate-300 hover:text-[#B89544] hover:pr-2 transition-all duration-300 block text-sm"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {jeddahServiceLinks.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-slate-300 hover:text-[#B89544] hover:pr-2 transition-all duration-300 block text-sm"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              معلومات الاتصال
              <span className="absolute -bottom-2 right-0 md:right-0 w-8 h-1 bg-[#B89544] rounded-full left-0 md:left-auto mx-auto md:mx-0"></span>
            </h4>
            <ul className="space-y-6">
              <li className="flex items-center md:items-start group flex-col md:flex-row text-center md:text-right">
                <div className="bg-white/5 p-2 rounded-lg ml-0 md:ml-4 mb-3 md:mb-0 group-hover:bg-[#B89544]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">المقر الرئيسي</p>
                  <p className="text-slate-300 text-sm">شارع عبدالله بن عباس - بجوار نادي ستار تراك - مكة المكرمة</p>
                </div>
              </li>
              <li className="flex items-center md:items-start group flex-col md:flex-row text-center md:text-right">
                <div className="bg-white/5 p-2 rounded-lg ml-0 md:ml-4 mb-3 md:mb-0 group-hover:bg-[#B89544]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">البريد الإلكتروني</p>
                  <p className="text-slate-300 text-sm"> <a href="mailto:info@mishal-lawfirm.com">info@mishal-lawfirm.com</a></p>
                </div>
              </li>

              <li className="flex items-center md:items-start group flex-col md:flex-row text-center md:text-right">
                <div className="bg-white/5 p-2 rounded-lg ml-0 md:ml-4 mb-3 md:mb-0 group-hover:bg-[#B89544]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">الهاتف</p>
                  <p className="text-slate-300 text-sm"><a href="tel:+966568000085">0568000085</a></p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-xs text-center md:text-right">
              &copy; {new Date().getFullYear()} شركة مشعل بادغيش للمحاماة والاستشارات القانونية. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse text-slate-400 text-xs">
              <Link to="/privacy" className="hover:text-[#B89544] transition-colors">سياسة الخصوصية</Link>
              <Link to="/terms" className="hover:text-[#B89544] transition-colors">اتفاقية الاستخدام</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
