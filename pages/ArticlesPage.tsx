import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  image: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "أثر رؤية المملكة 2030 على تطور الأنظمة التجارية",
    excerpt: "استعراض شامل للتحولات الجوهرية في البيئة النظامية السعودية وكيف ساهمت في جذب الاستثمارات الأجنبية...",
    content: [
      "منذ انطلاق رؤية المملكة 2030، شهدت البيئة التشريعية في المملكة العربية السعودية تحولات جذرية تهدف إلى تعزيز جاذبية السوق المحلي للاستثمارات العالمية وتسهيل ممارسة الأعمال.",
      "تعد التعديلات الأخيرة على نظام الشركات ونظام الاستثمار الأجنبي حجر الزاوية في هذه المرحلة، حيث أتاحت مرونة أكبر في تأسيس الشركات وحماية حقوق الأقلية من المساهمين.",
      "كما ساهم التحول الرقمي في وزارة العدل ووزارة التجارة في تقليص المدد الزمنية للتقاضي التجاري وإصدار التراخيص، مما رفع تصنيف المملكة في مؤشرات سهولة ممارسة الأعمال العالمية."
    ],
    category: "رؤية 2030",
    date: "15 مايو 2024",
    image: "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=800",
    readTime: "5 دقائق"
  },
  {
    id: 2,
    title: "تعديلات نظام العمل الجديد: ما يجب أن تعرفه الشركات",
    excerpt: "دليل عملي لأصحاب الأعمال والمدراء التنفيذيين حول أحدث التعديلات في نظام العمل والعمال السعودي...",
    content: [
      "تأتي التعديلات الأخيرة على نظام العمل السعودي لتوازن بين حقوق العامل ومتطلبات أصحاب العمل، مع التركيز على زيادة كفاءة سوق العمل الوطني.",
      "من أبرز ملامح هذه التعديلات تنظيم ساعات العمل الإضافية، وتطوير آليات إنهاء العقود بما يحفظ حقوق الطرفين، بالإضافة إلى تعزيز ضوابط التدريب والتأهيل للكوادر الوطنية.",
      "يجب على الشركات والمؤسسات مراجعة لوائحها الداخلية وتحديثها بما يتوافق مع هذه المتطلبات النظامية لتجنب المخالفات القانونية وضمان بيئة عمل مستدامة."
    ],
    category: "قانون العمل",
    date: "10 مايو 2024",
    image: "https://images.unsplash.com/photo-1454165833767-0266b19677c8?q=80&w=800",
    readTime: "7 دقائق"
  },
  {
    id: 3,
    title: "حماية الملكية الفكرية في العصر الرقمي",
    excerpt: "كيف تحمي علامتك التجارية وبراءات اختراعك في ظل التطور التكنولوجي السريع بالمملكة العربية السعودية...",
    content: [
      "في ظل التحول الرقمي السريع، أصبحت حماية الأصول المعنوية والملكية الفكرية تحدياً كبيراً يتطلب فهماً عميقاً للأنظمة المحلية والاتفاقيات الدولية.",
      "تقدم الهيئة السعودية للملكية الفكرية منظومة متكاملة لحماية العلامات التجارية، براءات الاختراع، وحقوق المؤلف، مما يضمن للمبدعين والشركات حماية ابتكاراتهم من القرصنة أو الاستخدام غير المشروع.",
      "نحن في مكتب مشعل بادغيش نساعد عملائنا في تسجيل أصولهم الفكرية وإدارة النزاعات المتعلقة بها أمام اللجان القضائية المتخصصة، لضمان استمرارية تميزهم في السوق."
    ],
    category: "الملكية الفكرية",
    date: "02 مايو 2024",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800",
    readTime: "4 دقائق"
  },
  {
    id: 4,
    title: "إجراءات تأسيس الشركات الأجنبية في المملكة",
    excerpt: "خطوة بخطوة: الدليل الكامل للمستثمر الأجنبي الراغب في بدء نشاطه التجاري عبر وزارة الاستثمار...",
    content: [
      "تفتح المملكة أبوابها للمستثمرين الأجانب من خلال إجراءات مبسطة وتسهيلات غير مسبوقة تمنحهم الحق في التملك الكامل لشركاتهم في معظم القطاعات الاقتصادية.",
      "تبدأ الرحلة بالحصول على رخصة استثمار من وزارة الاستثمار، تليها إجراءات التأسيس عبر المنصة الموحدة، وفتح الحسابات البنكية، وتسجيل الكوادر البشرية.",
      "الدعم القانوني في هذه المرحلة يعد حيوياً لاختيار الكيان القانوني الأنسب (شركة ذات مسؤولية محدودة، فرع شركة أجنبية، أو شركة مساهمة) بما يتوافق مع استراتيجية المستثمر طويلة المدى."
    ],
    category: "استثمار أجنبي",
    date: "28 أبريل 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    readTime: "8 دقائق"
  }
];

const ArticlesPage: React.FC = () => {
  const [filter, setFilter] = useState('الكل');
  const navigate = useNavigate();
  const categories = ['الكل', 'رؤية 2030', 'قانون العمل', 'الملكية الفكرية', 'استثمار أجنبي'];

  const filteredArticles = filter === 'الكل' 
    ? articles 
    : articles.filter(a => a.category === filter);
    
  const handleSelectArticle = (articleId: number) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0F172A] pt-40 pb-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">المركز المعرفي</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">رؤى ودراسات قانونية</h1>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            نحن نؤمن بنشر الوعي النظامي ومواكبة آخر التطورات التشريعية في المملكة العربية السعودية لتعزيز بيئة الأعمال.
          </p>
        </div>
        <div className="absolute inset-0 opacity-5">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="article-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#B89544" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#article-pattern)" />
          </svg>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-20 md:top-[92px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-x-auto">
          <div className="flex space-x-4 rtl:space-x-reverse min-w-max justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2.5 rounded-2xl text-sm font-black transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-[#B89544] text-[#0F172A] shadow-lg shadow-[#B89544]/20' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredArticles.map(article => (
              <article 
                key={article.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-slate-100 flex flex-col h-full"
              >
                <div className="h-64 overflow-hidden relative cursor-pointer" onClick={() => handleSelectArticle(article.id)}>
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-5 py-2 rounded-2xl text-[10px] font-black text-[#0F172A] uppercase tracking-widest shadow-sm">
                    {article.category}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-6 text-slate-400 text-xs font-bold mb-6">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      {article.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      {article.readTime}
                    </span>
                  </div>
                  <h3 
                    className="text-2xl font-black text-[#0F172A] mb-4 group-hover:text-[#B89544] transition-colors leading-tight cursor-pointer"
                    onClick={() => handleSelectArticle(article.id)}
                  >
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto">
                    <button 
                      onClick={() => handleSelectArticle(article.id)}
                      className="text-[#0F172A] font-black text-sm inline-flex items-center gap-3 group/btn"
                    >
                      <span>اقرأ المقال كاملاً</span>
                      <span className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-[#B89544] group-hover/btn:text-[#0F172A] transition-all transform rotate-180 shadow-sm">←</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-24">
              <div className="text-6xl mb-6">🔍</div>
              <p className="text-slate-400 text-xl font-medium">لا توجد مقالات في هذا القسم حالياً.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticlesPage;