import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: ReactNode;
}

const transition = { duration: 0.8, ease: [0.87, 0, 0.13, 1] };

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const transition = { duration: isMobile ? 0.4 : 0.8, ease: [0.87, 0, 0.13, 1] };

    if (isMobile) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
            >
                {children}
            </motion.div>
        );
    }

    return (
        <div className="relative w-full">
            {/* Top Panel */}
            <motion.div
                initial={{ height: "50vh" }}
                animate={{ height: 0 }}
                exit={{ height: "50vh" }}
                transition={transition}
                className="fixed top-0 left-0 right-0 z-[200] bg-[#0F172A] w-full"
            >
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#B89544] to-transparent shadow-[0_0_15px_#B89544]"></div>
            </motion.div>

            {/* Bottom Panel */}
            <motion.div
                initial={{ height: "50vh" }}
                animate={{ height: 0 }}
                exit={{ height: "50vh" }}
                transition={transition}
                className="fixed bottom-0 left-0 right-0 z-[200] bg-[#0F172A] w-full"
            >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#B89544] to-transparent shadow-[0_0_15px_#B89544]"></div>
            </motion.div>

            {/* Logo Overlay */}
            <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 0.8 }}
                exit={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-[210] flex items-center justify-center pointer-events-none"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-[#B89544] blur-3xl opacity-20 rounded-full"></div>
                    <img
                        src="https://www2.0zz0.com/2025/12/25/07/347380644.png"
                        alt="Logo"
                        className="relative w-32 h-32 object-contain drop-shadow-[0_0_20px_rgba(184,149,68,0.4)]"
                    />
                </div>
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default PageTransition;
