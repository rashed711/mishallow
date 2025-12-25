
import React from 'react';
import { motion } from 'framer-motion';
import { WhatsAppIcon } from './icons/ServiceIcons';

const WhatsAppButton: React.FC = () => {
    return (
        <React.Fragment>
            <motion.a
                href="https://wa.me/966568000085"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-6 left-6 z-[999] flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] cursor-pointer group hover:shadow-[0_4px_30px_rgba(37,211,102,0.8)] transition-shadow"
            >
                {/* Ping animation ring */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping duration-1000"></span>

                {/* Inner ring pulse */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-20 animate-pulse duration-2000"></span>

                <WhatsAppIcon className="w-7 h-7 md:w-9 md:h-9 text-white relative z-10" />

                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-white text-slate-800 text-sm font-bold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap hidden md:block">
                    <span className="absolute right-full top-1/2 -translate-y-1/2 -mr-1.5 w-3 h-3 bg-white rotate-45"></span>
                    تواصل معنا عبر واتساب
                </div>
            </motion.a>
        </React.Fragment>
    );
};

export default WhatsAppButton;
