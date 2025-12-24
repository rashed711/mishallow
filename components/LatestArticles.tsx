import React from 'react';
import { Link } from 'react-router-dom';

const LatestArticles: React.FC = () => {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">المركز المعرفي</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A]">آخر الرؤى القانونية</h2>
          </div>
          <Link 
            to="/articles"
            className="mt-8 md:mt-0 px-10 py-4 bg-white border border-slate-200 text-[#0F172A] font-bold rounded-2xl hover:bg-[#0F172A] hover:text-white transition-all shadow-sm"
          >
            استعرض كافة المقالات
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <Link to="/articles/1" className="group">
            <div className="h-72 rounded-[2.5rem] overflow-hidden mb-8 relative shadow-lg">
              <img src="https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=600" alt="Article 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#0F172A]">رؤية 2030</div>
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#B89544] transition-colors mb-4 leading-tight">أثر رؤية المملكة 2030 على تطور الأنظمة التجارية</h3>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">استعراض شامل للتحولات الجوهرية في البيئة النظامية السعودية وكيف ساهمت في جذب الاستثمارات...</p>
          </Link>

          <Link to="/articles/2" className="group">
            <div className="h-72 rounded-[2.5rem] overflow-hidden mb-8 relative shadow-lg">
              <img src="https://images.unsplash.com/photo-1454165833767-0266b19677c8?q=80&w=600" alt="Article 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#0F172A]">قانون العمل</div>
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#B89544] transition-colors mb-4 leading-tight">تعديلات نظام العمل الجديد: ما يجب أن تعرفه الشركات</h3>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">دليل عملي لأصحاب الأعمال والمدراء التنفيذيين حول أحدث التعديلات في نظام العمل والعمال السعودي...</p>
          </Link>

          <Link to="/articles/3" className="group">
            <div className="h-72 rounded-[2.5rem] overflow-hidden mb-8 relative shadow-lg">
              <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600" alt="Article 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#0F172A]">الملكية الفكرية</div>
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#B89544] transition-colors mb-4 leading-tight">حماية الملكية الفكرية في العصر الرقمي</h3>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">كيف تحمي علامتك التجارية وبراءات اختراعك في ظل التطور التكنولوجي السريع بالمملكة...</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
