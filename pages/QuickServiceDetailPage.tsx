import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { quickServicesData } from '../data/quickServices';
import { WhatsAppIcon } from '../components/icons/ServiceIcons';
import { apiFetch } from '../data/api';

const QuickServiceDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [service, setService] = useState<any>(null);
    const [categoryName, setCategoryName] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            try {
                // 1. Try fetching from dynamic SQLite API
                const data = await apiFetch(`/quick-services.php?slug=${slug}`);
                if (data.success && data.service) {
                    setService(data.service);
                    
                    // Get category name dynamically
                    if (data.service.category_name) {
                        setCategoryName(data.service.category_name);
                    } else if (data.service.category_id) {
                        // Fallback category name if available
                        const staticCat = quickServicesData.find(c => c.id === data.service.category_id);
                        setCategoryName(staticCat ? staticCat.name : 'خدمة سريعة');
                    } else {
                        setCategoryName('خدمة سريعة');
                    }
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.error("Error fetching dynamic service detail:", err);
            }

            // 2. Fallback to static data if API fails or doesn't find the service
            let foundService = null;
            let foundCategoryName = '';
            for (const category of quickServicesData) {
                const found = category.services.find(s => s.slug === slug);
                if (found) {
                    foundService = found;
                    foundCategoryName = category.name;
                    break;
                }
            }

            if (foundService) {
                setService(foundService);
                setCategoryName(foundCategoryName);
            } else {
                // If not found anywhere, redirect to list
                navigate('/quick-services', { replace: true });
            }
            setLoading(false);
        };

        fetchService();
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#B89544] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-bold">جاري تحميل تفاصيل الخدمة...</p>
                </div>
            </div>
        );
    }

    if (!service) {
        return null;
    }

    const handleBack = () => navigate('/quick-services');

    const whatsappMessage = encodeURIComponent(`أهلاً بك، أرغب في طلب خدمة: ${service.title}`);

    // Helper to render text with markdown links [text](/path)
    const renderContent = (text: string) => {
        if (!text) return '';
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            parts.push(
                <Link key={match.index} to={match[2]} className="text-[#B89544] hover:underline font-bold">
                    {match[1]}
                </Link>
            );
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    const featuresList = Array.isArray(service.features) ? service.features : [];

    return (
        <div className="bg-slate-50 min-h-screen">
            <SEO
                title={`${service.title} | خدمات سريعة - شركة مشعل بادغيش`}
                description={service.description}
                url={`https://mishallow.vercel.app/quick-services/${service.slug}`}
            />

            <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0F172A] overflow-hidden">
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
                <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-6 md:p-16">
                        <div className="mb-16">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <h2 className="text-2xl font-black text-[#0F172A] flex items-center gap-4">
                                    <span className="w-2 h-8 bg-[#B89544] rounded-full"></span>
                                    وصف الخدمة
                                </h2>
                                {service.priceRange && (
                                    <div className="bg-[#B89544]/10 px-6 py-3 rounded-2xl border border-[#B89544]/20 flex items-center gap-4">
                                        <span className="text-xs font-bold text-[#0F172A]/60">التكلفة المتوقعة:</span>
                                        <span className="text-lg font-black text-[#B89544]">{service.priceRange}</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-slate-600 text-xl leading-loose font-medium">
                                {renderContent(service.description)}
                            </p>
                        </div>

                        {featuresList.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-black text-[#0F172A] mb-8 flex items-center gap-4">
                                    <span className="w-2 h-8 bg-[#B89544] rounded-full"></span>
                                    ما تضمنه الخدمة
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {featuresList.map((feature: string, idx: number) => (
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
                        )}

                        <div className="pt-12 border-t border-slate-100 text-center">
                            <h3 className="text-xl font-black text-[#0F172A] mb-8">هل أنت جاهز للبدء؟</h3>
                            <a
                                href={`https://wa.me/966568000085?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 bg-[#B89544] text-[#0F172A] px-12 py-5 rounded-3xl font-black shadow-2xl hover:bg-[#0F172A] hover:text-white transition-all transform hover:-translate-y-1 group"
                            >
                                <WhatsAppIcon className="w-6 h-6 fill-[#0F172A] group-hover:fill-white transition-colors" />
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
