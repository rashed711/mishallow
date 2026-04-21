import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { quickServicesData } from '../data/quickServices';
import { WhatsAppIcon } from '../components/icons/ServiceIcons';

const QuickServicesPage: React.FC = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(quickServicesData[0].id);
    const navigate = useNavigate();

    const selectedCategory = quickServicesData.find(cat => cat.id === selectedCategoryId) || quickServicesData[0];

    const handleViewDetail = (slug: string) => {
        navigate(`/quick-services/${slug}`);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <SEO
                title="خدمات سريعة | مكتب مشعل بادغيش للمحاماة"
                description="اطلب خدماتنا القانونية السريعة مباشرة عبر الواتساب. استشارات، لوائح، دعاوي، صياغة قانونية، وتوكيلات."
            />

            <div className="bg-[#0F172A] pt-32 pb-12 md:pt-40 md:pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B89544" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">خدماتنا الإلكترونية</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">الخدمات السريعة</h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                            اختر الخدمة المطلوبة وسنقوم بالرد عليكم وتلبية طلبكم مباشرة عبر الواتساب بأعلى معايير السرعة والاحترافية.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-12 gap-10">

                    {/* Sidebar Tabs (Right side in RTL) */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 shadow-sm border border-slate-100 sticky top-28">
                            <h2 className="text-xl font-black text-[#0F172A] mb-8 pr-4 relative inline-block">
                                التصنيفات
                                <span className="absolute -bottom-2 right-0 w-8 h-1 bg-[#B89544] rounded-full"></span>
                            </h2>
                            <div className="space-y-4">
                                {quickServicesData.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategoryId(category.id)}
                                        className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl font-bold transition-all duration-300 text-right ${selectedCategoryId === category.id
                                                ? 'bg-[#B89544] text-[#0F172A] shadow-lg shadow-[#B89544]/20 scale-[1.02]'
                                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                            }`}
                                    >
                                        <span>{category.name}</span>
                                        <span className={`w-2 h-2 rounded-full ${selectedCategoryId === category.id ? 'bg-[#0F172A]' : 'bg-slate-300'}`}></span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Area (Left side in RTL) */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategoryId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 shadow-sm border border-slate-100"
                                >
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-[#B89544]/10 flex items-center justify-center">
                                            <span className="text-[#B89544] font-black text-xl">#</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-[#0F172A]">{selectedCategory.name}</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {selectedCategory.services.map((service, index) => (
                                            <motion.div
                                                key={service.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="group relative bg-white rounded-[2rem] p-6 pb-7 transition-all duration-500 border border-[#B89544]/30 shadow-xl shadow-[#B89544]/5 flex flex-col h-full overflow-hidden hover:scale-[1.02] hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#B89544]/30 hover:border-[#B89544]"
                                            >
                                                {/* Shine Effect Sweep */}
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

                                                {/* Permanent top gold accent line */}
                                                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-[#B89544] via-[#B89544] to-[#B89544]/30 group-hover:h-2 transition-all"></div>

                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="w-12 h-12 rounded-xl bg-[#B89544]/10 group-hover:bg-[#B89544] group-hover:text-white shadow-inner flex items-center justify-center font-black text-[#B89544] text-lg transition-all duration-300">
                                                        {index + 1}
                                                    </div>
                                                    <div className="text-[9px] font-black text-[#B89544] opacity-50 uppercase tracking-widest group-hover:opacity-100 transition-opacity">
                                                        {selectedCategory.name}
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-black text-[#B89544] mb-3 leading-tight group-hover:text-[#0F172A] transition-colors">
                                                    {service.title}
                                                </h3>

                                                <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium line-clamp-2 group-hover:text-slate-700 transition-colors">
                                                    {service.description}
                                                </p>

                                                <div className="mt-auto space-y-4">
                                                    <a
                                                        href={`https://wa.me/966568000085?text=${encodeURIComponent(`أهلاً بك، أرغب في طلب خدمة: ${service.title}`)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 bg-[#0F172A] text-white px-5 py-4 rounded-xl font-black text-xs hover:bg-[#B89544] hover:shadow-lg transition-all w-full justify-center group/wa overflow-hidden relative"
                                                    >
                                                        <WhatsAppIcon className="w-4 h-4 fill-[#25D366] group-hover/wa:fill-white transition-colors" />
                                                        <span>اطلب الخدمة</span>
                                                    </a>

                                                    <button
                                                        onClick={() => handleViewDetail(service.slug)}
                                                        className="w-full flex items-center justify-center gap-2 text-[#0F172A] font-black text-[10px] opacity-40 hover:opacity-100 transition-all hover:gap-3"
                                                    >
                                                        <span>استكشف تفاصيل الخدمة</span>
                                                        <span className="text-sm">←</span>
                                                    </button>
                                                </div>

                                                <style>{`
                                                    @keyframes shimmer {
                                                        0% { transform: translateX(-100%) skewX(-15deg); }
                                                        100% { transform: translateX(200%) skewX(-15deg); }
                                                    }
                                                `}</style>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                <div className="bg-[#B89544]/5 border border-[#B89544]/10 rounded-[2.5rem] p-10 text-center">
                                    <h3 className="text-xl font-bold text-[#0F172A] mb-4">لم تجد الخدمة المطلوبة؟</h3>
                                    <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                                        يمكنكم التواصل معنا مباشرة وطلب أي استشارة مخصصة أو خدمة قانونية غير مدرجة، نحن هنا لخدمتكم.
                                    </p>
                                    <a
                                        href="https://wa.me/966568000085?text=أهلاً بك، أرغب في استشارة قانونية مخصصة"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 text-[#B89544] font-black hover:underline"
                                    >
                                        تواصل معنا مباشرة
                                        <span className="text-xl">←</span>
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuickServicesPage;
