import React from 'react';
import { PhoneIcon, WhatsAppIcon } from './icons/ServiceIcons';

const Contact: React.FC = () => {
  return (
    <div className="bg-[#0F172A] p-6 md:p-16 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl">
      {/* Direct Contact Options Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
        <a
          href="https://wa.me/966568000085"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-[#B89544]/10 hover:border-[#B89544]/30 transition-all duration-500"
        >
          <div className="flex items-center gap-4 md:gap-6 relative z-10">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#B89544]/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8 text-[#B89544]" />
            </div>
            <div>
              <h4 className="text-white font-black text-base md:text-lg mb-1">مراسلة فورية</h4>
              <p className="text-slate-400 text-xs md:text-sm font-medium">ابدأ المحادثة عبر واتساب</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <WhatsAppIcon className="w-20 h-20 md:w-24 md:h-24" />
          </div>
        </a>

        <a
          href="tel:0568000085"
          className="group relative overflow-hidden bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white/10 hover:border-white/20 transition-all duration-500"
        >
          <div className="flex items-center gap-4 md:gap-6 relative z-10">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <PhoneIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h4 className="text-white font-black text-base md:text-lg mb-1">اتصال هاتفي</h4>
              <p className="text-slate-400 text-xs md:text-sm font-medium">تحدث مباشرة مع مستشار</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <PhoneIcon className="w-20 h-20 md:w-24 md:h-24" />
          </div>
        </a>
      </div>

      <div className="flex items-center gap-6 mb-10 md:mb-12">
        <div className="h-[1px] bg-white/10 flex-grow"></div>
        <span className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">أو اترك رسالتك هنا</span>
        <div className="h-[1px] bg-white/10 flex-grow"></div>
      </div>
      <form action="#" method="POST" className="space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2">
          {/* Name Field */}
          <div className="group space-y-3">
            <label className="text-[10px] md:text-xs font-black text-slate-400 group-focus-within:text-[#B89544] uppercase tracking-widest transition-colors pr-1">
              الاسم الكامل
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-[#1E293B]/30 border border-white/5 text-white py-4 md:py-5 px-6 md:px-8 rounded-[1.1rem] md:rounded-[1.3rem] focus:bg-[#1E293B]/50 focus:border-[#B89544]/50 focus:ring-4 focus:ring-[#B89544]/10 transition-all duration-300 outline-none placeholder:text-slate-600 font-medium"
                placeholder="اكتب اسمك..."
              />
            </div>
          </div>

          {/* Contact Field */}
          <div className="group space-y-3">
            <label className="text-[10px] md:text-xs font-black text-slate-400 group-focus-within:text-[#B89544] uppercase tracking-widest transition-colors pr-1">
              رقم الجوال
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-[#1E293B]/30 border border-white/5 text-white py-4 md:py-5 px-6 md:px-8 rounded-[1.1rem] md:rounded-[1.3rem] focus:bg-[#1E293B]/50 focus:border-[#B89544]/50 focus:ring-4 focus:ring-[#B89544]/10 transition-all duration-300 outline-none placeholder:text-slate-600 font-medium"
                placeholder="05xxxxxxx"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="md:col-span-2 group space-y-3">
            <label className="text-[10px] md:text-xs font-black text-slate-400 group-focus-within:text-[#B89544] uppercase tracking-widest transition-colors pr-1">
              تفاصيل الاستشارة القانونية
            </label>
            <div className="relative">
              <textarea
                rows={5}
                className="w-full bg-[#1E293B]/30 border border-white/5 text-white py-4 md:py-5 px-6 md:px-8 rounded-[1.1rem] md:rounded-[1.3rem] focus:bg-[#1E293B]/50 focus:border-[#B89544]/50 focus:ring-4 focus:ring-[#B89544]/10 transition-all duration-300 outline-none resize-none placeholder:text-slate-600 font-medium"
                placeholder="اشرح لنا باختصار موضوعك القانوني ليتسنى لنا خدمتك بشكل أفضل..."
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="relative group overflow-hidden w-full bg-gradient-to-r from-[#B89544] via-[#D4AF37] to-[#B89544] bg-[length:200%_auto] text-[#0F172A] font-black py-5 md:py-6 rounded-2xl shadow-2xl shadow-[#B89544]/20 hover:shadow-[#B89544]/40 transition-all transform hover:-translate-y-1 active:scale-95 animate-gradient-move"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            إرسال طلب الاستشارة القانونية
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-[-4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-luxury-shimmer"></span>
        </button>
      </form>


    </div>
  );
};

export default Contact;
