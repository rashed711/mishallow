import React from 'react';
import { ScaleIcon, PhoneIcon } from './icons/ServiceIcons';

const WhatsAppIcon: React.FC<{className?: string}> = (props) => (
    <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M16 2.5C8.558 2.5 2.5 8.558 2.5 16s6.058 13.5 13.5 13.5S29.5 23.442 29.5 16 23.442 2.5 16 2.5zm0 24.531c-6.075 0-11.031-4.956-11.031-11.031S9.925 4.969 16 4.969s11.031 4.956 11.031 11.031-4.956 11.031-11.031 11.031z"/><path d="M21.656 19.581c-.273-.125-.992-.494-1.148-.553-.156-.059-.273-.088-.39.088-.118.176-.438.553-.532.67-.093.117-.187.147-.333.058-.147-.088-.633-.225-1.203-.742-.445-.402-.742-.897-.836-1.043-.094-.147-.01-.225.078-.304.078-.068.176-.176.255-.264.078-.088.107-.147.166-.255.059-.107.029-.195-.01-.273-.04-.078-.39-.94-.532-1.281-.137-.321-.282-.273-.39-.273-.107 0-.225 0-.342.009-.118.009-.304.049-.469.244-.165.195-.633.622-.633 1.516s.642 1.758.736 1.875c.093.117 1.27 1.93 3.078 2.71.42.185.742.292.992.37.43.125.828.107.1.088.332-.019.992-.399 1.129-.785.137-.386.137-.718.098-.785-.04-.068-.156-.107-.273-.234z"/></svg>
);

export const ServiceRequestModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-[#0F172A] w-full max-w-md rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-300">
        <div className="p-8 md:p-10 text-center">
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors"
            aria-label="إغلاق"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="w-20 h-20 bg-[#B89544]/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-[#B89544]/20">
             <ScaleIcon className="w-10 h-10 text-[#B89544]" />
          </div>
          
          <h3 className="text-2xl font-black text-white mb-4">كيف تود التواصل معنا؟</h3>
          <p className="text-slate-400 text-sm mb-10 font-medium leading-relaxed">
            اختر الوسيلة الأنسب لك وسيقوم أحد مستشارينا بالرد عليك في أقرب وقت ممكن.
          </p>
          
          <div className="space-y-4">
            <a 
              href="https://wa.me/966000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 w-full bg-[#25D366] text-white py-5 rounded-2xl font-black shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-1"
            >
              <WhatsAppIcon className="w-6 h-6" />
              <span>محادثة فورية عبر واتساب</span>
            </a>
            
            <a 
              href="tel:+966000000000" 
              className="flex items-center justify-center gap-4 w-full bg-[#B89544] text-[#0F172A] py-5 rounded-2xl font-black shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-1"
            >
              <PhoneIcon className="w-6 h-6" />
              <span>اتصال هاتفي مباشر</span>
            </a>

            <button 
              onClick={onClose}
              className="w-full bg-white/5 text-slate-300 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all mt-4"
            >
              إلغاء
            </button>
          </div>
        </div>
        
        <div className="bg-[#B89544] h-1.5 w-full"></div>
      </div>
    </div>
  );
};
