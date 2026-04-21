import React, { useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { servicesData } from '../data/services';
import Contact from '../components/Contact';

interface ServiceDetailPageProps {
    onOpenModal: () => void;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenModal }) => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const service = servicesData.find(s => s.slug === slug);

    const handleBack = () => navigate('/services');

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    // Use icon component
    const Icon = service.icon;

    return (
        <div className="bg-slate-50 min-h-screen">
            <SEO
                title={service.seoTitle}
                description={service.seoDescription}
                image={service.image}
                type="website"
            />

            {/* Hero Section */}
            <div className="relative pt-40 pb-20 bg-[#0F172A] overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover blur-sm" />
                    <div className="absolute inset-0 bg-[#0F172A]/80 mix-blend-multiply"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 text-[#B89544] font-bold text-sm mb-10 hover:text-white transition-colors"
                    >
                        <span>→</span>
                        <span>العودة للخدمات</span>
                    </button>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-8">
                            <Icon className="w-12 h-12 text-[#B89544]" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight max-w-4xl mx-auto">
                            {service.title}
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                            {service.shortDescription}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Full Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100"
                        >
                            <h2 className="text-2xl font-black text-[#0F172A] mb-6">نظرة عامة على الخدمة</h2>
                            <div className="space-y-6 text-slate-600 text-lg leading-loose font-medium">
                                {service.fullDescription.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </motion.div>

                        {/* Features List */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100"
                        >
                            <h2 className="text-2xl font-black text-[#0F172A] mb-8">ماذا نقدم لكم؟</h2>
                            <ul className="grid gap-6">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#B89544]/10 flex items-center justify-center mt-1">
                                            <svg className="w-4 h-4 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        </span>
                                        <span className="text-slate-700 font-bold text-lg">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* FAQ Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-black text-[#0F172A] mb-8 pr-4">أسئلة شائعة</h2>
                            <div className="space-y-6">
                                {service.faq.map((item, idx) => (
                                    <div key={idx} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                                        <h3 className="text-lg font-black text-[#0F172A] mb-3">{item.question}</h3>
                                        <p className="text-slate-600 font-medium">{item.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* CTA Card */}
                        <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-center sticky top-24">
                            <h3 className="text-2xl font-black text-white mb-4">هل تحتاج لمساعدة في هذه القضية؟</h3>
                            <p className="text-slate-400 mb-8 font-medium">تواصل معنا الآن للحصول على استشارة أولية مجانية وتقييم شامل لوضعك القانوني.</p>
                            <Link
                                to="/contact"
                                className="block w-full py-4 bg-gradient-to-r from-[#B89544] to-[#D4AF37] text-[#0F172A] font-black rounded-xl hover:shadow-[0_0_20px_rgba(184,149,68,0.4)] transition-all transform hover:-translate-y-1"
                            >
                                طلب استشارة مجانية
                            </Link>
                            <div className="mt-6 pt-6 border-t border-white/10 flex justify-center gap-6">
                                <Link to="/contact" className="text-white font-bold text-sm hover:text-[#B89544] transition-colors">اتصل بنا</Link>
                                <span className="text-slate-600">|</span>
                                <a href="https://wa.me/966568000085" className="text-white font-bold text-sm hover:text-[#B89544] transition-colors">واتساب</a>
                            </div>
                        </div>

                        {/* Target Audience */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-black text-[#0F172A] mb-6">نخدم في هذا المجال:</h3>
                            <div className="flex flex-wrap gap-3">
                                {service.targetAudience.map((audi, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-slate-50 rounded-lg text-slate-600 text-sm font-bold border border-slate-200">
                                        {audi}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;
