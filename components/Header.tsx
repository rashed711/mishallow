
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: any) => void;
}

const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="flex items-center space-x-3 rtl:space-x-reverse focus:outline-none group">
        <div className="bg-gradient-to-br from-[#B89544] to-[#D4AF37] p-2 rounded-xl shadow-lg shadow-[#B89544]/20 transition-transform duration-300 group-hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.12-3.06M12 14L5.88 10.94M6 10l6-3 6 3M6 10V18L12 21L18 18V10" />
          </svg>
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-xl font-black text-white tracking-tight">مشعل بادغيش</span>
          <span className="text-[9px] tracking-[0.15em] text-[#B89544] font-bold uppercase mt-1">للمحاماة والاستشارات</span>
        </div>
    </button>
);

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', text: 'الرئيسية' },
    { id: 'about', text: 'من نحن' },
    { id: 'services', text: 'خدماتنا' },
    { id: 'articles', text: 'المقالات' },
    { id: 'contact', text: 'تواصل معنا' },
  ];

  const handleNav = (id: any) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
      ? 'bg-[#0F172A]/95 backdrop-blur-md shadow-2xl py-3 border-b border-white/5' 
      : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex-shrink-0">
            <Logo onClick={() => handleNav('home')} />
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-sm font-bold transition-all relative py-2 ${
                    currentPage === link.id ? 'text-[#B89544]' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.text}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#B89544] transform origin-right transition-transform duration-300 ${
                    currentPage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
              <button 
                onClick={() => handleNav('contact')}
                className="bg-gradient-to-r from-[#B89544] to-[#D4AF37] text-[#0F172A] px-7 py-2.5 rounded-xl text-sm font-black hover:brightness-110 transition-all shadow-lg shadow-[#B89544]/20"
              >
                طلب استشارة
              </button>
            </div>
          </div>
          
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white focus:outline-none"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 pt-4 pb-10 space-y-3 bg-[#0F172A] border-b border-white/10 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`block w-full text-right px-4 py-4 rounded-xl text-base font-bold transition-colors ${
                currentPage === link.id ? 'bg-[#B89544]/10 text-[#B89544]' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {link.text}
            </button>
          ))}
          <div className="pt-4">
            <button 
              onClick={() => handleNav('contact')}
              className="w-full bg-[#B89544] text-[#0F172A] py-4 rounded-xl font-black text-center"
            >
              طلب استشارة الآن
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
