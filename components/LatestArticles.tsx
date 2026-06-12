import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';

const LatestArticles: React.FC = () => {
  // Get latest 3 articles based on date
  const latestArticles = React.useMemo(() => {
    return [...articles]
      .sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime())
      .slice(0, 3);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 text-center md:text-right"
        >
          <div>
            <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">المركز المعرفي</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A]">آخر الرؤى القانونية</h2>
          </div>
          <Link
            to="/articles"
            title="استعرض كافة المقالات والدراسات القانونية في مركزنا المعرفي"
            className="mt-10 md:mt-0 px-10 py-4 bg-white border border-slate-200 text-[#0F172A] font-bold rounded-2xl hover:bg-[#0F172A] hover:text-white transition-all shadow-sm"
          >
            استعرض كافة المقالات
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-10"
        >
          {latestArticles.map((article) => (
            <motion.div
              key={article.id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Link 
                to={`/articles/${article.slug}`} 
                className="group block"
                title={`اقرأ المقال: ${article.title}`}
              >
                <div className="h-72 rounded-[2.5rem] overflow-hidden mb-8 relative shadow-lg">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    width={400}
                    height={288}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#0F172A]">
                    {article.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#B89544] transition-colors mb-4 leading-tight">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArticles;
