import React from 'react';
import { ScaleIcon, PhoneIcon, WhatsAppIcon } from './icons/ServiceIcons';

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
              href="https://wa.me/966568000085"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 w-full bg-[#25D366] text-white py-5 rounded-2xl font-black shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-1"
            >
              <WhatsAppIcon className="w-6 h-6" />
              <span>محادثة فورية عبر واتساب</span>
            </a>

            <a
              href="tel:0568000085"
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
