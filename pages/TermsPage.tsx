
import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#0F172A] pt-40 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">اتفاقية الاستخدام</h1>
          <div className="h-1.5 w-20 bg-[#B89544] mx-auto rounded-full"></div>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 p-12 md:p-20 rounded-[3rem] border border-slate-100 shadow-sm text-right">
            <div className="prose prose-lg prose-slate max-w-none space-y-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-[#0F172A]">1. القبول بالشروط</h2>
                <p className="text-slate-600 font-medium text-lg leading-relaxed">
                  باستخدامك لموقع مكتب مشعل بادغيش، فإنك تقر بالموافقة الكاملة على الشروط والأحكام. المحتوى المنشور هو لأغراض توعوية فقط ولا يغني عن الاستشارة المهنية المباشرة.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-black text-[#0F172A]">2. الملكية الفكرية</h2>
                <p className="text-slate-600 font-medium text-lg leading-relaxed">
                  جميع حقوق الملكية الفكرية للمحتوى والتصاميم والشعارات الموجودة في هذا الموقع مملوكة حصرياً لمكتب مشعل بادغيش للمحاماة.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-black text-[#0F172A]">3. القانون الواجب التطبيق</h2>
                <p className="text-slate-600 font-medium text-lg leading-relaxed">
                  تخضع هذه الاتفاقية واستخدام الموقع لأنظمة وقوانين المملكة العربية السعودية، وتختص محاكم المملكة بالنظر في أي نزاع.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
