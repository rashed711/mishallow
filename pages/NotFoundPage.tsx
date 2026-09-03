import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ScaleIcon } from '../components/icons/ServiceIcons';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
            <SEO
                title="404 - الصفحة غير موجودة | شركة مشعل بادغيش للمحاماة"
                description="عذراً، الرابط الذي حاولت الوصول إليه غير موجود أو تم نقله. يمكنك العودة إلى الصفحة الرئيسية أو التواصل معنا."
                noindex={true}
            />

            {/* Background luxury gradient accents */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B89544]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-lg w-full text-center">
                {/* 404 Badge */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-[#B89544]/30 mb-8 shadow-2xl backdrop-blur-sm">
                    <ScaleIcon className="w-10 h-10 text-[#B89544]" />
                </div>

                <div className="text-7xl font-bold tracking-tight text-[#B89544] mb-4 font-mono">
                    404
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    الصفحة المطلوبة غير موجودة
                </h1>

                <p className="text-slate-300 text-base leading-relaxed mb-8">
                    عذراً، يبدو أن الرابط الذي تبحث عنه قد تم نقله أو حذفه، أو أن العنوان الذي تم إدخاله غير صحيح.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#B89544] text-[#0F172A] font-bold text-sm hover:bg-[#c9a756] transition-all shadow-lg hover:shadow-[#B89544]/20"
                    >
                        العودة للرئيسية
                    </Link>
                    <Link
                        to="/services"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-all border border-white/10"
                    >
                        تصفح الخدمات القانونية
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
