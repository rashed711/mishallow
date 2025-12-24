
import React from 'react';
import { PhoneIcon } from './icons/ServiceIcons';

const WhatsAppIcon: React.FC<{className?: string}> = (props) => (
    <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M16 2.5C8.558 2.5 2.5 8.558 2.5 16s6.058 13.5 13.5 13.5S29.5 23.442 29.5 16 23.442 2.5 16 2.5zm0 24.531c-6.075 0-11.031-4.956-11.031-11.031S9.925 4.969 16 4.969s11.031 4.956 11.031 11.031-4.956 11.031-11.031 11.031z"/><path d="M21.656 19.581c-.273-.125-.992-.494-1.148-.553-.156-.059-.273-.088-.39.088-.118.176-.438.553-.532.67-.093.117-.187.147-.333.058-.147-.088-.633-.225-1.203-.742-.445-.402-.742-.897-.836-1.043-.094-.147-.01-.225.078-.304.078-.068.176-.176.255-.264.078-.088.107-.147.166-.255.059-.107.029-.195-.01-.273-.04-.078-.39-.94-.532-1.281-.137-.321-.282-.273-.39-.273-.107 0-.225 0-.342.009-.118.009-.304.049-.469.244-.165.195-.633.622-.633 1.516s.642 1.758.736 1.875c.093.117 1.27 1.93 3.078 2.71.42.185.742.292.992.37.43.125.828.107.1.088.332-.019.992-.399 1.129-.785.137-.386.137-.718.098-.785-.04-.068-.156-.107-.273-.234z"/></svg>
);

const Contact: React.FC = () => {
  return (
    <div className="bg-[#0F172A] p-10 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl">
      <form action="#" method="POST" className="space-y-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-black text-slate-300 pr-2">الاسم الكامل</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 text-white py-4.5 px-6 rounded-2xl focus:ring-2 focus:ring-[#B89544] focus:border-transparent transition-all outline-none placeholder:text-slate-600" 
              placeholder="اكتب اسمك الثلاثي..." 
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-black text-slate-300 pr-2">رقم الجوال أو البريد</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 text-white py-4.5 px-6 rounded-2xl focus:ring-2 focus:ring-[#B89544] focus:border-transparent transition-all outline-none placeholder:text-slate-600" 
              placeholder="05xxxxxxx" 
            />
          </div>
          <div className="md:col-span-2 space-y-3">
            <label className="text-sm font-black text-slate-300 pr-2">طبيعة الاستشارة</label>
            <textarea 
              rows={4} 
              className="w-full bg-white/5 border border-white/10 text-white py-4.5 px-6 rounded-2xl focus:ring-2 focus:ring-[#B89544] focus:border-transparent transition-all outline-none resize-none placeholder:text-slate-600" 
              placeholder="اشرح لنا باختصار موضوعك القانوني..."
            ></textarea>
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-[#B89544] to-[#E2C670] text-[#0F172A] font-black py-5 rounded-2xl shadow-xl hover:brightness-110 transition-all transform hover:-translate-y-1 active:scale-95"
        >
          إرسال طلب الاستشارة
        </button>
      </form>

      <div className="mt-12 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6">
        <a href="https://wa.me/966000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#B89544] font-black text-sm hover:text-white transition-colors">
          <WhatsAppIcon className="w-5 h-5" />
          <span>مراسلة عبر واتساب</span>
        </a>
        <div className="w-1.5 h-1.5 bg-white/20 rounded-full hidden sm:block"></div>
        <a href="tel:+966000000000" className="flex items-center gap-3 text-white font-black text-sm hover:text-[#B89544] transition-colors">
          <PhoneIcon className="w-5 h-5" />
          <span>اتصال هاتفي مباشر</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
