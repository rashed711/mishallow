
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#0F172A] pt-40 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">سياسة الخصوصية</h1>
          <div className="h-1.5 w-20 bg-[#B89544] mx-auto rounded-full"></div>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 p-12 md:p-20 rounded-[3rem] border border-slate-100 shadow-sm text-right">
            <div className="prose prose-lg prose-slate max-w-none space-y-12">
              <p className="text-slate-600 font-medium text-lg leading-relaxed">
                في مكتب مشعل بادغيش للمحاماة، ندرك تماماً أهمية خصوصية بياناتكم وسرية معلوماتكم القانونية. تهدف هذه السياسة إلى توضيح كيفية التعامل مع المعلومات في إطار أنظمة المملكة.
              </p>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-[#0F172A]">1. جمع المعلومات</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  نقوم بجمع المعلومات الشخصية التي تقدمونها طواعية عند طلب الاستشارة، وتشمل (الاسم، الجوال، وطبيعة الاستشارة).
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-black text-[#0F172A]">2. استخدام المعلومات</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  تُستخدم المعلومات حصراً للرد على استفساراتكم القانونية وتقديم الخدمات المهنية المطلوبة، مع الالتزام التام بالسرية المهنية للمحاماة.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-black text-[#0F172A]">3. سرية المعلومات</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  بصفتنا مكتب محاماة مرخص، فإننا نطبق أعلى معايير الأمان لحماية بياناتكم، ولا نقوم بمشاركة أي معلومات مع أطراف ثالثة إلا في الحدود النظامية الصارمة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
