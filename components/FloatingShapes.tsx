import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FloatingShapes: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 50 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const goldX = useTransform(springX, [0, 1920], [20, -20]);
    const goldY = useTransform(springY, [0, 1080], [20, -20]);
    const blueX = useTransform(springX, [0, 1920], [-30, 30]);
    const blueY = useTransform(springY, [0, 1080], [-30, 30]);
    const accentX = useTransform(springX, [0, 1920], [50, -50]);
    const accentY = useTransform(springY, [0, 1080], [50, -50]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth >= 768) {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        if (window.innerWidth >= 768) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY]);

    if (isMobile) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden hidden md:block" aria-hidden="true">
            {/* Gold Orb */}
            <motion.div
                className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#B89544]/5 rounded-full blur-3xl will-change-transform"
                style={{ x: goldX, y: goldY }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Blue Orb */}
            <motion.div
                className="absolute top-[40%] right-[10%] w-96 h-96 bg-[#0F172A]/5 rounded-full blur-3xl will-change-transform"
                style={{ x: blueX, y: blueY }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            {/* Small Gold Accent */}
            <motion.div
                className="absolute bottom-[15%] left-[20%] w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-2xl will-change-transform"
                style={{ x: accentX, y: accentY }}
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
};

export default FloatingShapes;
