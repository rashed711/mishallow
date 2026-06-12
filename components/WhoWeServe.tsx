import React from 'react';
import { motion } from 'framer-motion';

const WhoWeServe: React.FC = () => {
    const clients = [
        'الأفراد في مختلف القضايا القانونية',
        'الشركات والمؤسسات التجارية',
        'رواد الأعمال والمنشآت الناشئة'
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section className="py-24 bg-[#0F172A] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="serve-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="#B89544" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#serve-pattern)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                        نخدم من؟
                    </h2>
                    <div className="h-1.5 w-24 bg-[#B89544] mx-auto rounded-full"></div>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-8 text-center"
                >
                    {clients.map((client, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ scale: 1.05, y: -8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:bg-[#B89544]/10 hover:border-[#B89544]/30 transition-all duration-300 group cursor-default"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#B89544] transition-colors">
                                {client}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-center mt-12"
                >
                    <p className="text-xl md:text-2xl text-slate-300 font-bold max-w-3xl mx-auto leading-relaxed">
                        بحلول قانونية عملية، واضحة، وقابلة للتنفيذ.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default WhoWeServe;
