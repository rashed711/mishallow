import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '../data/team';

interface TeamMemberModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, isOpen, onClose }) => {
  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm"
          ></motion.div>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-4xl rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh] md:max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 rounded-full bg-white/20 md:bg-black/10 hover:bg-[#B89544] text-white md:text-[#0F172A] hover:text-white transition-all flex items-center justify-center backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left: Image (Top on Mobile) */}
            <div className="w-full md:w-5/12 h-56 md:h-auto relative bg-slate-100 flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 md:from-[#0F172A]/40 to-transparent"></div>
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-7/12 p-6 md:p-12 overflow-y-auto text-right custom-scrollbar">
              <div className="mb-6 md:mb-8">
                <span className="text-[#B89544] font-black tracking-widest uppercase text-[10px] md:text-xs mb-2 block">عضو فريق العمل</span>
                <h2 className="text-2xl md:text-4xl font-black text-[#0F172A] mb-1 md:mb-2">{member.name}</h2>
                <p className="text-slate-400 font-bold text-sm md:text-lg">{member.role}</p>
                <div className="w-16 md:w-20 h-1 md:h-1.5 bg-[#B89544] mt-3 md:mt-4 rounded-full"></div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-lg md:text-xl font-black text-[#0F172A] mb-2 md:mb-3">السيرة المهنية</h3>
                  <p className="text-slate-600 text-sm md:text-lg leading-relaxed font-medium">
                    {member.bio}
                  </p>
                </div>

                {member.bio.length < 150 && (
                  <p className="text-slate-500 italic text-xs md:text-sm border-r-4 border-slate-100 pr-4 mt-6 md:mt-8">
                    مكرس لتقديم أفضل الحلول القانونية وحماية حقوق الموكلين بأعلى معايير الأمانة والمهنية.
                  </p>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TeamMemberModal;
