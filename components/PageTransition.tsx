import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: ReactNode;
}

const blackBox = {
    initial: {
        height: "100vh",
        bottom: 0,
    },
    animate: {
        height: 0,
        transition: {
            when: "afterChildren",
            duration: 1.5,
            ease: [0.87, 0, 0.13, 1],
        },
    },
};

const textContainer = {
    initial: {
        opacity: 1,
    },
    animate: {
        opacity: 0,
        transition: {
            duration: 0.3,
            when: "afterChildren",
        },
    },
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    return (
        <>
            <motion.div
                initial="initial"
                animate="animate"
                variants={blackBox}
                className="fixed inset-0 z-[200] w-full bg-[#0F172A] flex items-center justify-center overflow-hidden"
            >
                <motion.div variants={textContainer} className="relative z-50">
                    <img
                        src="https://www2.0zz0.com/2025/12/25/07/347380644.png"
                        alt="Logo"
                        className="w-24 h-24 md:w-32 md:h-32 object-contain animate-pulse"
                    />
                </motion.div>
                {/* Decorative gold stripe */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-[#B89544]"></div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                {children}
            </motion.div>
        </>
    );
};

export default PageTransition;
