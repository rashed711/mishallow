import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

import { articles, ARTICLE_CATEGORIES } from '../data/articles';

const ArticlesPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState('الكل');
  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');
  const navigate = useNavigate();

  const categories = ARTICLE_CATEGORIES;

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
    <div className="bg-white min-h-screen font-sans">
      <SEO
        title="المركز المعرفي | مكتب مشعل بادغيش للمحاماة"
        description="استكشف أحدث المقالات والدراسات القانونية التي تغطي الأنظمة السعودية، رؤية 2030، وقضايا العمل والاستثمار."
      />

      {/* Simplified Elegant Hero */}
      <div className="bg-[#0F172A] pt-32 pb-20 md:pt-44 md:pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
             <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-[#B89544] font-black tracking-[0.3em] uppercase text-xs mb-6 block"
             >
               المركز المعرفي
             </motion.span>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight"
             >
               رؤى قانونية لمستقبل <span className="text-[#B89544]">واثق</span>
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium"
             >
               تزويدكم بالوعي النظامي اللازم لمواكبة التحول التشريعي في المملكة وحماية مصالح أعمالكم.
             </motion.p>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#B89544]/10 blur-[120px] rounded-full"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[50%] bg-blue-500/5 blur-[100px] rounded-full"></div>
        </div>
      </div>

      {/* Ultra-Minimalist Professional Filter Bar */}
      <div className="sticky top-16 md:top-24 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between py-6 gap-8">
            
            {/* Category Pills - Clean & Centered */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide w-full lg:w-auto scroll-smooth">
               {categories.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setCategoryFilter(cat)}
                   className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap border ${
                     categoryFilter === cat 
                     ? 'bg-[#B89544] border-[#B89544] text-white shadow-lg shadow-[#B89544]/20' 
                     : 'bg-white border-slate-200 text-slate-500 hover:border-[#B89544] hover:text-[#B89544]'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>

            {/* Sort Controls - Integrated Style */}
            <div className="flex items-center gap-6 w-full lg:w-auto justify-center lg:justify-end">
               <div className="flex items-center gap-3">
                 <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">الترتيب حسب:</span>
                 <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button 
                      onClick={() => setSortBy('date')}
                      className={`px-5 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                        sortBy === 'date' ? 'bg-white text-[#B89544] shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      التاريخ
                    </button>
                    <button 
                      onClick={() => setSortBy('popularity')}
                      className={`px-5 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                        sortBy === 'popularity' ? 'bg-white text-[#B89544] shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      التفاعل
                    </button>
                 </div>
               </div>
               
               <div className="h-6 w-[1px] bg-slate-200 hidden lg:block"></div>
               
               <div className="hidden md:flex items-center gap-2 text-slate-500 font-bold text-xs whitespace-nowrap">
                  <span className="text-[#B89544]">{processedArticles.length}</span>
                  <span>مقال متاح</span>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            >
              {processedArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col group h-full"
                >
                  <div 
                    className="aspect-[16/10] overflow-hidden relative cursor-pointer"
                    onClick={() => handleSelectArticle(article.slug)}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-black text-[#0F172A] uppercase tracking-wider shadow-sm">
                      {article.category}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold mb-5">
                       <span className="flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#B89544]"></div>
                         {article.date}
                       </span>
                       <span className="flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                         {article.readTime}
                       </span>
                    </div>
                    
                    <h3 
                      className="text-xl font-black text-[#0F172A] mb-4 group-hover:text-[#B89544] transition-colors leading-snug cursor-pointer line-clamp-2"
                      onClick={() => handleSelectArticle(article.slug)}
                    >
                      {article.title}
                    </h3>
                    
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium line-clamp-2">
                       {article.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-slate-50">
                      <button 
                        onClick={() => handleSelectArticle(article.slug)}
                        className="w-full py-3 rounded-2xl bg-slate-50 text-[#0F172A] font-black text-xs hover:bg-[#B89544] hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        <span>اقرأ التفاصيل</span>
                        <span className="transition-transform group-hover/btn:translate-x-[-4px]">←</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {processedArticles.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 text-slate-300 text-4xl mb-6">
                ∅
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">لا توجد نتائج</h3>
              <p className="text-slate-500">جرب اختيار قسم آخر أو تصفح كافة المقالات.</p>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Newsletter / Contact Section - Subdued Elegant */}
      <section className="py-24 bg-white border-t border-slate-100 overflow-hidden relative">
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-black text-slate-900 mb-6">نوافيكم بكل جديد في الأنظمة</h2>
            <p className="text-slate-500 text-lg mb-12">اشترك في قائمتنا البريدية لتصلك آخر الدراسات والتحليلات القانونية فور صدورها.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
               <input 
                 type="email" 
                 placeholder="البريد الإلكتروني" 
                 className="flex-grow px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#B89544] transition-all text-sm font-medium"
               />
               <button className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-[#0F172A]/20 transition-all">اشتراك</button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ArticlesPage;