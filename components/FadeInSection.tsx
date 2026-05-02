import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
    children: ReactNode;
    delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0 }) => {
    // Optimization: Avoid per-instance useEffect/resize listeners.
    // Instead of state, we use a simpler check or allow CSS to handle the "no animation" part.
    // However, to keep the logic for Framer Motion, we check it once on mount.
    const [shouldAnimate, setShouldAnimate] = React.useState(true);

    React.useEffect(() => {
        if (window.innerWidth < 768) {
            setShouldAnimate(false);
        }
    }, []);

    if (!shouldAnimate) {
        return <div className="opacity-100 transform-none">{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export default FadeInSection;
