import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { quickServicesData } from '../data/quickServices';
import { WhatsAppIcon } from '../components/icons/ServiceIcons';

const QuickServiceDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    // Find the service across all categories
    let service = null;
    let categoryName = '';
    for (const category of quickServicesData) {
        const found = category.services.find(s => s.slug === slug);
        if (found) {
            service = found;
            categoryName = category.name;
            break;
        }
    }

    if (!service) {
        return <Navigate to="/quick-services" replace />;
    }

    const handleBack = () => navigate('/quick-services');

    const whatsappMessage = encodeURIComponent(`أهلاً بك، أرغب في طلب خدمة: ${service.title}`);

    return (
        <div className="bg-slate-50 min-h-screen">
            <SEO
                title={`${service.title} | خدمات سريعة - مكتب مشعل بادغيش`}
                description={service.description}
            />

            <div className="relative pt-40 pb-28 bg-[#0F172A] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="detail-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="30" cy="30" r="1.5" fill="#B89544" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#detail-grid)" />
                    </svg>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 text-[#B89544] font-bold text-sm mb-12 hover:text-white transition-colors group"
                    >
                        <span>→</span>
                        <span className="group-hover:translate-x-1 transition-transform">العودة للخدمات السريعة</span>
                    </button>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">{categoryName}</span>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
                            {service.title}
                        </h1>
                        <div className="w-20 h-1.5 bg-[#B89544] mx-auto rounded-full"></div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-8 md:p-16">
                        <div className="mb-16">
                            <h2 className="text-2xl font-black text-[#0F172A] mb-6 flex items-center gap-4">
                                <span className="w-2 h-8 bg-[#B89544] rounded-full"></span>
                                وصف الخدمة
                            </h2>
                            <p className="text-slate-600 text-xl leading-loose font-medium">
                                {service.description}
                            </p>
                        </div>

                        <div className="mb-16">
                            <h2 className="text-2xl font-black text-[#0F172A] mb-8 flex items-center gap-4">
                                <span className="w-2 h-8 bg-[#B89544] rounded-full"></span>
                                ما تضمنه الخدمة
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-[#B89544]/30 transition-colors">
                                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-700 font-bold">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-12 border-t border-slate-100 text-center">
                            <h3 className="text-xl font-black text-[#0F172A] mb-8">هل أنت جاهز للبدء؟</h3>
                            <a
                                href={`https://wa.me/966568000085?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 bg-[#0F172A] text-white px-12 py-5 rounded-3xl font-black shadow-2xl hover:bg-[#B89544] transition-all transform hover:-translate-y-1 group"
                            >
                                <WhatsAppIcon className="w-6 h-6 fill-[#25D366] group-hover:fill-white transition-colors" />
                                <span>طلب الخدمة عبر الواتساب</span>
                            </a>
                            <p className="mt-8 text-slate-400 text-sm font-medium">سيقوم فريقنا بالرد عليكم في أقرب وقت ممكن</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickServiceDetailPage;
