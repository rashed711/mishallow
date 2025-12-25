import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Gold Orb */}
            <motion.div
                className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#B89544]/5 rounded-full blur-3xl"
                animate={{
                    y: [0, 50, 0],
                    x: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Blue Orb */}
            <motion.div
                className="absolute top-[40%] right-[10%] w-96 h-96 bg-[#0F172A]/5 rounded-full blur-3xl"
                animate={{
                    y: [0, -60, 0],
                    x: [0, -40, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            {/* Small Gold Accent */}
            <motion.div
                className="absolute bottom-[15%] left-[20%] w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-2xl"
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
};

export default FloatingShapes;
