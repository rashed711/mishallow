import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

interface HeaderProps {
  onOpenModal: () => void;
}

const Logo: React.FC<{ light?: boolean }> = ({ light = true }) => (
  <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse focus:outline-none group">
    <div className="bg-white p-1 rounded-xl shadow-lg shadow-[#B89544]/20 transition-transform duration-300 group-hover:scale-105">
      <img
        src="https://www2.0zz0.com/2025/12/25/07/347380644.png"
        alt="شعار مكتب مشعل بادغيش"
        className="h-10 w-10 md:h-14 md:w-14 object-contain"
      />
    </div>
    <div className="flex flex-col items-start leading-none">
      <span className={`text-base md:text-xl font-black tracking-tight ${light ? 'text-white' : 'text-[#0F172A]'}`}>مشعل بادغيش</span>
      <span className="text-[7px] md:text-[9px] tracking-[0.15em] text-[#B89544] font-bold uppercase mt-1">للمحاماة والاستشارات</span>
    </div>
  </Link>
);

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { to: '/', text: 'الرئيسية' },
    { to: '/about', text: 'من نحن' },
    { to: '/services', text: 'خدماتنا' },
    { to: '/articles', text: 'المقالات' },
    { to: '/contact', text: 'تواصل معنا' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 h-16 md:h-24 ${scrolled
      ? 'bg-[#0F172A]/90 backdrop-blur-xl shadow-2xl border-b border-white/5'
      : 'bg-[#0F172A]/80 backdrop-blur-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:block">
            <div className="flex items-center space-x-10 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `text-sm font-bold transition-all relative py-2 group ${isActive ? 'text-[#B89544]' : 'text-slate-300 hover:text-white'
                    }`}
                >
                  {link.text}
                  <span className={`absolute bottom-0 right-0 w-full h-0.5 bg-[#B89544] transform origin-right transition-transform duration-300 ${link.to === window.location.hash.slice(1) || (link.to === '/' && window.location.hash === '') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </NavLink>
              ))}
              <button
                onClick={onOpenModal}
                className="bg-gradient-to-r from-[#B89544] to-[#D4AF37] text-[#0F172A] px-7 py-3 rounded-xl text-xs font-black hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-lg active:scale-95"
              >
                طلب استشارة
              </button>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2.5 text-white bg-white/5 border border-white/10 rounded-xl active:scale-90 transition-transform"
              aria-label="فتح القائمة"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Drawer Mobile Menu */}
      <div className={`fixed inset-0 z-[110] lg:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop overlay */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMenu}
        ></div>

        {/* Sidebar Drawer */}
        <div className={`absolute top-0 right-0 w-[85%] max-w-[360px] h-full bg-[#0F172A] shadow-[0_0_50px_rgba(0,0,0,0.5)] drawer-transition border-l border-white/10 flex flex-col z-[120] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex items-center justify-between border-b border-white/5 bg-white/2">
            <Logo />
            <button
              onClick={closeMenu}
              className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-xl border border-white/10"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-grow py-8 px-4 overflow-y-auto">
            <div className="space-y-1">
              {navLinks.map((link, idx) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) => `flex items-center px-6 py-4.5 rounded-2xl text-[17px] font-bold transition-all duration-300 ${isActive ? 'bg-[#B89544] text-[#0F172A] shadow-lg shadow-[#B89544]/20' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="p-6 border-t border-white/5 bg-white/2 pb-10">
            <button
              onClick={() => { onOpenModal(); closeMenu(); }}
              className="w-full bg-gradient-to-r from-[#B89544] to-[#D4AF37] text-[#0F172A] py-5 rounded-2xl font-black text-center shadow-xl mb-6 active:scale-95 transition-all"
            >
              طلب استشارة فورية
            </button>
            <div className="flex justify-center space-x-6 rtl:space-x-reverse opacity-40">
              <span className="text-[10px] font-black tracking-widest text-[#B89544] uppercase">مكتب مشعل بادغيش للمحاماة</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;