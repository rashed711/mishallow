import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FloatingShapes: React.FC = () => {
    // Mouse position state
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Spring physics for smooth movement
    const springConfig = { damping: 25, stiffness: 50 };
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transform mouse position to opposite movement for parallax effect
    // Gold Orb moves opposite to mouse
    const goldX = useTransform(springX, [0, window.innerWidth], [20, -20]);
    const goldY = useTransform(springY, [0, window.innerHeight], [20, -20]);

    // Blue Orb moves with mouse but slower
    const blueX = useTransform(springX, [0, window.innerWidth], [-30, 30]);
    const blueY = useTransform(springY, [0, window.innerHeight], [-30, 30]);

    // Accent moves more dramatically
    const accentX = useTransform(springX, [0, window.innerWidth], [50, -50]);
    const accentY = useTransform(springY, [0, window.innerHeight], [50, -50]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update motion values
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Gold Orb */}
            <motion.div
                className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#B89544]/5 rounded-full blur-3xl"
                style={{ x: goldX, y: goldY }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Blue Orb */}
            <motion.div
                className="absolute top-[40%] right-[10%] w-96 h-96 bg-[#0F172A]/5 rounded-full blur-3xl"
                style={{ x: blueX, y: blueY }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            {/* Small Gold Accent */}
            <motion.div
                className="absolute bottom-[15%] left-[20%] w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-2xl"
                style={{ x: accentX, y: accentY }}
                animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
};

export default FloatingShapes;
