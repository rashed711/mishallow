import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '../data/team';

interface TeamMemberModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Logic to handle back button closing the modal
      window.history.pushState({ modalOpen: true }, "");
      
      const handlePopState = (e: PopStateEvent) => {
        onClose();
      };

      window.addEventListener("popstate", handlePopState);
      
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener("popstate", handlePopState);
        // If modal is closed manually (not via back button), remove the history entry
        if (window.history.state?.modalOpen) {
          window.history.back();
        }
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!member) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 md:p-6" dir="rtl">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F172A]/98 backdrop-blur-md"
          ></motion.div>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] md:max-h-[85vh] z-10"
          >
            {/* Close Button - Repositioned for Mobile Visibility */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 md:top-6 md:left-6 z-50 w-10 h-10 rounded-full bg-[#0F172A]/10 md:bg-black/5 hover:bg-[#B89544] text-[#0F172A] hover:text-white transition-all flex items-center justify-center backdrop-blur-md border border-white/20"
              aria-label="إغلاق"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left: Image (Top on Mobile) */}
            <div className="w-full md:w-[45%] h-64 md:h-auto relative bg-slate-100 flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 md:from-transparent to-transparent"></div>
              
              {/* Mobile Float Detail */}
              <div className="absolute bottom-6 right-6 md:hidden">
                <h2 className="text-2xl font-black text-white mb-0.5">{member.name}</h2>
                <p className="text-slate-300 text-sm font-bold opacity-90">{member.role}</p>
              </div>
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-[55%] p-6 sm:p-8 md:p-12 overflow-y-auto text-right custom-scrollbar bg-white">
              <div className="hidden md:block mb-8">
                <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-2 block">عضو فريق العمل</span>
                <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-2">{member.name}</h2>
                <p className="text-slate-400 font-bold text-lg">{member.role}</p>
                <div className="w-16 h-1.5 bg-[#B89544] mt-4 rounded-full"></div>
              </div>

              {/* Mobile-only separator/title */}
              <div className="md:hidden mt-2 mb-6">
                <div className="w-12 h-1 bg-[#B89544] mb-4 rounded-full"></div>
                <span className="text-[#B89544] font-black tracking-widest uppercase text-[11px] block mb-1">السيرة المهنية</span>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <h3 className="hidden md:flex text-lg md:text-xl font-black text-[#0F172A] mb-3 md:mb-4 items-center gap-3">
                    عن المستشار
                    <span className="h-[1px] flex-grow bg-slate-100"></span>
                  </h3>
                  <p className="text-slate-600 text-[15px] md:text-lg leading-relaxed md:leading-loose font-medium">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-6 border-r-4 border-[#B89544]/20 pr-4">
                  <p className="text-slate-500 italic text-[13px] md:text-base leading-relaxed">
                    مكرس لتقديم أفضل الحلول القانونية وحماية حقوق الموكلين بأعلى معايير الأمانة والمهنية تحت ظل القضاء السعودي.
                  </p>
                </div>
              </div>
              
              {/* Luxury Footer Detail */}
              <div className="mt-10 md:mt-12 flex justify-start opacity-10 pointer-events-none grayscale">
                <img src="https://www2.0zz0.com/2025/12/25/07/347380644.png" alt="Logo" className="h-10 md:h-14" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default TeamMemberModal;
