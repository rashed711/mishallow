import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
    children: ReactNode;
    delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export default FadeInSection;
