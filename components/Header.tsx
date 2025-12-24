import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

interface HeaderProps {
  onOpenModal: () => void;
}

const Logo: React.FC<{ light?: boolean }> = ({ light = true }) => (
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse focus:outline-none group">
        <div className="bg-gradient-to-br from-[#B89544] to-[#D4AF37] p-1.5 md:p-2 rounded-xl shadow-lg shadow-[#B89544]/20 transition-transform duration-300 group-hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.12-3.06M12 14L5.88 10.94M6 10l6-3 6 3M6 10V18L12 21L18 18V10" />
          </svg>
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
    
    // Prevent scrolling when mobile menu is open
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-16 md:h-24 ${
      scrolled 
      ? 'bg-[#0F172A]/90 backdrop-blur-xl shadow-2xl border-b border-white/5' 
      : 'bg-[#0F172A]/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `text-sm font-bold transition-all relative py-2 group ${
                    isActive ? 'text-[#B89544]' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.text}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B89544] transform origin-right transition-transform duration-300 scale-x-0 group-hover:scale-x-100 group-[.active]:scale-x-100"></span>
                </NavLink>
              ))}
              <button 
                onClick={onOpenModal}
                className="bg-gradient-to-r from-[#B89544] to-[#D4AF37] text-[#0F172A] px-6 py-2.5 rounded-xl text-xs font-black hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-lg"
              >
                طلب استشارة
              </button>
            </div>
          </div>
          
          {/* Mobile Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-white bg-white/10 rounded-lg"
              aria-label="فتح القائمة"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Sidebar Mobile Menu */}
      <div className={`fixed inset-0 z-[60] transition-visibility duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop overlay */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMenu}
        ></div>
        
        {/* Sidebar Drawer */}
        <div className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-[#0F172A] shadow-2xl transition-transform duration-500 ease-out border-l border-white/10 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex items-center justify-between border-b border-white/5">
            <Logo />
            <button 
              onClick={closeMenu}
              className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex-grow py-10 px-6">
            <div className="space-y-2">
              {navLinks.map((link, idx) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                  className={({ isActive }) => `flex items-center px-6 py-4 rounded-2xl text-lg font-bold transition-all ${
                    isActive ? 'bg-[#B89544] text-[#0F172A]' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  } ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          </nav>
          
          <div className={`p-6 border-t border-white/5 mb-safe ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-500 delay-300`}>
            <button 
              onClick={() => { onOpenModal(); closeMenu(); }}
              className="w-full bg-gradient-to-r from-[#B89544] to-[#D4AF37] text-[#0F172A] py-5 rounded-2xl font-black text-center shadow-xl mb-4"
            >
              طلب استشارة فورية
            </button>
            <p className="text-center text-slate-500 text-[10px] font-bold tracking-widest uppercase">
              مكتب مشعل بادغيش للمحاماة
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;