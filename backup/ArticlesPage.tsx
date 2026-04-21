import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string; // Format: DD MMMM YYYY
  rawDate: string; // ISO format for sorting
  image: string;
  readTime: string;
  views: number;
}

export const articles: Article[] = [
  {
    id: 1,
    slug: "كيف-تختار-أفضل-محامي-في-مكة",
    title: "كيف تختار أفضل محامي في مكة؟",
    excerpt: "دليلك الشامل لمعرفة معايير اختيار المحامي المناسب لقضيتك التجارية أو الشخصية في مكة المكرمة...",
    content: [
      "اختيار المحامي ليس مجرد بحث عن اسم، بل هو بحث عن شريك استراتيجي يحمي مصالحك.",
      "عند البحث عن محامي في مكة، يجب التأكد من تخصصه الدقيق في نوع قضيتك، سواء كانت تجارية، عمالية، أو أحوال شخصية.",
      "نقدم لك في هذا المقال ٥ معايير أساسية لتقييم خبرة المحامي وسمعته قبل التوكل."
    ],
    category: "استشارات قانونية",
    date: "10 يونيو 2024",
    rawDate: "2024-06-10",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800",
    readTime: "5 دقائق",
    views: 1560
  },
  {
    id: 2,
    slug: "كم-أتعاب-المحامي-في-السعودية",
    title: "كم أتعاب المحامي في السعودية؟",
    excerpt: "تعرف على آلية تحديد أتعاب المحاماة في القضايا المختلفة والفرق بين المبلغ المقطوع والنسبة...",
    content: [
      "تختلف أتعاب المحاماة بناءً على نوع القضية، تعقيدها، والجهد المتوقع بذله.",
      "في القضايا التجارية، غالباً ما يتم الاتفاق على نسبة من المبلغ المحصل، بينما في الاستشارات قد تكون التكلفة بالساعة.",
      "الشفافية في تحديد الأتعاب هي أساس التعامل في مكتب مشعل بادغيش، حيث نضمن لك وضوحاً تاماً قبل البدء."
    ],
    category: "دليل العملاء",
    date: "05 يونيو 2024",
    rawDate: "2024-06-05",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800",
    readTime: "4 دقائق",
    views: 3200
  },
  {
    id: 3,
    slug: "الفرق-بين-الاستشارة-القانونية-والتوكيل",
    title: "الفرق بين الاستشارة القانونية والتوكيل",
    excerpt: "متى تكتفي باستشارة قانونية ومتى يجب عليك توكيل محامي لتمثيلك أمام المحاكم؟...",
    content: [
      "الكثير يخلط بين طلب الرأي القانوني (الاستشارة) وبين تفويض المحامي للترافع (التوكيل).",
      "الاستشارة هي خطوة وقائية تمنحك خارطة طريق، بينما التوكيل هو إجراء تنفيذي للدفاع عن حقوقك.",
      "في مكتبنا في مكة، نقدم لك استشارة أولية تساعدك على تحديد المسار الأنسب لقضيتك."
    ],
    category: "ثقافة قانونية",
    date: "28 مايو 2024",
    rawDate: "2024-05-28",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800",
    readTime: "3 دقائق",
    views: 980
  },
  {
    id: 4,
    slug: "خطوات-رفع-قضية-تجارية-في-المحكمة",
    title: "خطوات رفع قضية تجارية في المحكمة",
    excerpt: "شرح مفصل للإجراءات النظامية لرفع الدعاوى التجارية في المملكة العربية السعودية...",
    content: [
      "يتطلب رفع الدعوى التجارية تحضيراً دقيقاً للمستدات والأسانيد القانونية.",
      "تبدأ الخطوات بتبادل المذكرات، ثم القيد في المحكمة التجارية، وتحديد الجلسات.",
      "فريقنا المتخصص في القضايا التجارية في مكة يضمن لك صياغة صحيفة دعوى متقنة تزيد من فرص نجاحك."
    ],
    category: "القضاء التجاري",
    date: "15 مايو 2024",
    rawDate: "2024-05-15",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800",
    readTime: "6 دقائق",
    views: 2100
  }
];

const ArticlesPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState('الكل');
  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');
  const navigate = useNavigate();

  const categories = ['الكل', 'استشارات قانونية', 'دليل العملاء', 'ثقافة قانونية', 'القضاء التجاري'];

  const processedArticles = useMemo(() => {
    let filtered = categoryFilter === 'الكل'
      ? [...articles]
      : articles.filter(a => a.category === categoryFilter);

    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime();
      } else {
        return b.views - a.views;
      }
    });
  }, [categoryFilter, sortBy]);

  const handleSelectArticle = (articleSlug: string) => {
    navigate(`/articles/${articleSlug}`);
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0F172A] pt-40 pb-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">المركز المعرفي</span>
            <SEO
              title="استشارات قانونية في مكة | أسئلة شائعة – مكتب محاماة"
              description="إجابات قانونية موثوقة على أكثر الأسئلة شيوعًا حول القضايا والاستشارات القانونية في مكة، مع إمكانية الحصول على استشارة أولية مجانية."
            />
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">رؤى ودراسات قانونية</h1>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
              نحن نؤمن بنشر الوعي النظامي ومواكبة آخر التطورات التشريعية في المملكة العربية السعودية لتعزيز بيئة الأعمال.
            </p>
          </motion.div>
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

      {/* Advanced Filters UI */}
      <div className="bg-white border-b border-slate-100 sticky top-16 md:top-24 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            {/* Category Filter */}
            <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${categoryFilter === cat
                    ? 'bg-[#B89544] text-[#0F172A] shadow-md'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100 w-fit">
              <button
                onClick={() => setSortBy('date')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black transition-all ${sortBy === 'date'
                  ? 'bg-white text-[#B89544] shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                الأحدث
              </button>
              <button
                onClick={() => setSortBy('popularity')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black transition-all ${sortBy === 'popularity'
                  ? 'bg-white text-[#B89544] shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                الأكثر قراءة
              </button>
            </div>

          </div>
        </div>
      </div>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Key on grid forces animation reset on filter/sort change */}
          <div
            key={`${categoryFilter}-${sortBy}`}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {processedArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-slate-100 flex flex-col h-full"
              >
                <div className="h-64 overflow-hidden relative cursor-pointer" onClick={() => handleSelectArticle(article.slug)}>
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
                  <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold mb-6">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {article.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {article.readTime}
                      </span>
                    </div>
                    {sortBy === 'popularity' && (
                      <span className="text-[#B89544] bg-[#B89544]/5 px-3 py-1 rounded-lg">
                        {article.views.toLocaleString()} مشاهدة
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-2xl font-black text-[#0F172A] mb-4 group-hover:text-[#B89544] transition-colors leading-tight cursor-pointer"
                    onClick={() => handleSelectArticle(article.slug)}
                  >
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto">
                    <button
                      onClick={() => handleSelectArticle(article.slug)}
                      className="text-[#0F172A] font-black text-sm inline-flex items-center gap-3 group/btn"
                    >
                      <span>اقرأ المقال كاملاً</span>
                      <span className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-[#B89544] group-hover/btn:text-[#0F172A] transition-all transform rotate-180 shadow-sm">←</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {processedArticles.length === 0 && (
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