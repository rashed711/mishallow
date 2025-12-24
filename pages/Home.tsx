
import React from 'react';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';

interface HomeProps {
  onNavigate: (page: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8FAFC]">
      <Hero onNavigate={onNavigate} />
      
      {/* Short Summary Section */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#B89544]/5 rounded-full blur-3xl"></div>
               <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-50">
                 <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200" 
                  alt="Law Library" 
                  className="w-full object-cover h-[550px] grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                 />
               </div>
               <div className="absolute -bottom-8 -left-8 bg-[#0F172A] p-10 rounded-[2rem] shadow-2xl border border-white/5 hidden md:block">
                 <span className="block text-4xl font-black text-[#B89544] mb-1">98%</span>
                 <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">نسبة رضا الموكلين</span>
               </div>
            </div>
            <div className="lg:w-1/2 text-right">
              <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">شريكك القانوني الاستراتيجي</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-8 leading-[1.2]">
                نلتزم بصيانة حقوقكم <br /> وصناعة الأمان لأعمالكم
              </h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
                في مكتب مشعل بادغيش، ندمج بين الخبرة العميقة في الأنظمة السعودية وبين الرؤية الحديثة للممارسة القانونية. نحن هنا لنكون المستشار الذي تثق به في كل خطوة تخطوها.
              </p>
              <button 
                onClick={() => onNavigate('about')}
                className="inline-flex items-center text-[#0F172A] font-black text-lg group"
              >
                <span>تعرف على منهجيتنا</span>
                <span className="mr-4 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#B89544] group-hover:text-[#0F172A] transition-all transform rotate-180 shadow-sm">←</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <WhyUs />

      {/* Articles Preview Section */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">المركز المعرفي</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0F172A]">آخر الرؤى القانونية</h2>
            </div>
            <button 
              onClick={() => onNavigate('articles')}
              className="mt-8 md:mt-0 px-10 py-4 bg-white border border-slate-200 text-[#0F172A] font-bold rounded-2xl hover:bg-[#0F172A] hover:text-white transition-all shadow-sm"
            >
              استعرض كافة المقالات
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="group cursor-pointer" onClick={() => onNavigate('articles')}>
              <div className="h-72 rounded-[2.5rem] overflow-hidden mb-8 relative shadow-lg">
                <img src="https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#0F172A]">رؤية 2030</div>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#B89544] transition-colors mb-4 leading-tight">أثر رؤية المملكة 2030 على تطور الأنظمة التجارية</h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">استعراض شامل للتحولات الجوهرية في البيئة النظامية السعودية وكيف ساهمت في جذب الاستثمارات...</p>
            </div>

            <div className="group cursor-pointer" onClick={() => onNavigate('articles')}>
              <div className="h-72 rounded-[2.5rem] overflow-hidden mb-8 relative shadow-lg">
                <img src="https://images.unsplash.com/photo-1454165833767-0266b19677c8?q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#0F172A]">قانون العمل</div>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#B89544] transition-colors mb-4 leading-tight">تعديلات نظام العمل الجديد: ما يجب أن تعرفه الشركات</h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">دليل عملي لأصحاب الأعمال والمدراء التنفيذيين حول أحدث التعديلات في نظام العمل والعمال السعودي...</p>
            </div>

            <div className="group cursor-pointer" onClick={() => onNavigate('articles')}>
              <div className="h-72 rounded-[2.5rem] overflow-hidden mb-8 relative shadow-lg">
                <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#0F172A]">الملكية الفكرية</div>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#B89544] transition-colors mb-4 leading-tight">حماية الملكية الفكرية في العصر الرقمي</h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">كيف تحمي علامتك التجارية وبراءات اختراعك في ظل التطور التكنولوجي السريع بالمملكة...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services CTA Section */}
      <section className="py-32 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c8?q=80&w=1600" 
            className="w-full h-full object-cover opacity-10" 
            alt="Saudi Business" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-20 h-1 bg-[#B89544] mx-auto rounded-full mb-10"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">نطاق خدماتنا <span className="text-[#B89544]">القانونية</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg leading-relaxed font-medium">
            نجمع بين المعرفة العميقة بالأنظمة المحلية وأفضل الممارسات الدولية لنقدم استشارات قانونية تصنع قيمة مضافة حقيقية.
          </p>
          <button 
            onClick={() => onNavigate('services')}
            className="bg-gradient-to-r from-[#B89544] to-[#E2C670] text-[#0F172A] px-14 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-2xl shadow-[#B89544]/20 active:scale-95"
          >
            استعرض كافة الخدمات الاحترافية
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
