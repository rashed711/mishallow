import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { articles } from '../data/articles';

interface ArticleDetailPageProps {
  onOpenModal: () => void;
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ onOpenModal }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <div className="pt-40 text-center text-xl font-bold">عذراً، هذا المقال غير موجود.</div>;
  }

  const relatedArticles = articles.filter(a => a.id !== article.id).slice(0, 3);

  const handleSelectArticle = (selectedSlug: string) => {
    navigate(`/articles/${selectedSlug}`);
  };

  const handleBack = () => navigate('/articles');

  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = article ? encodeURIComponent(article.title) : '';

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={`${article.title} | مكتب مشعل بادغيش`}
        description={article.excerpt}
        image={article.image}
        type="article"
      />
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale">
          <img src={article.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-[#0F172A]/80"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-[#B89544] font-bold text-sm mb-10 hover:text-white transition-colors"
          >
            <span>→</span>
            <span>العودة للمقالات</span>
          </button>

          <div className="inline-block px-5 py-2 bg-[#B89544]/10 border border-[#B89544]/20 rounded-full text-[#B89544] text-[10px] font-black uppercase tracking-widest mb-8">
            {article.category}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-10 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-center gap-8 text-slate-400 text-sm font-bold">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {article.readTime} للقراءة
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-12 gap-20">

          <div className="lg:col-span-8">
            <div className="prose prose-lg prose-slate max-w-none text-right">
              <div className="rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl mb-12 md:mb-16 aspect-video">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              <div className="space-y-10">
                {article.content.map((paragraph, i) => (
                  <p key={i} className="text-slate-600 text-xl leading-relaxed font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-slate-900 font-black text-sm">مشاركة المقال:</span>
                  <div className="flex gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition-all"
                      title="مشاركة على X (تويتر)"
                    >
                      𝕏
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all"
                      title="مشاركة على LinkedIn"
                    >
                      in
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1877f2] hover:text-white transition-all"
                      title="مشاركة على Facebook"
                    >
                      f
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodedUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#25D366] hover:text-white transition-all"
                      title="مشاركة على WhatsApp"
                    >
                      W
                    </a>
                  </div>
                </div>
                <button onClick={handleBack} className="text-slate-500 font-bold hover:text-[#0F172A] transition-colors">إغلاق المقال</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-xl font-black text-[#0F172A] mb-8 relative inline-block">
                مقالات ذات صلة
                <span className="absolute -bottom-2 right-0 w-8 h-1 bg-[#B89544] rounded-full"></span>
              </h3>
              <div className="space-y-8">
                {relatedArticles.map(rel => (
                  <div
                    key={rel.id}
                    className="group cursor-pointer flex gap-4 items-start"
                    onClick={() => handleSelectArticle(rel.slug)}
                  >
                    <div className="w-24 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                      <img src={rel.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-[#B89544] text-[10px] font-black uppercase mb-1 block">{rel.category}</span>
                      <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#B89544] transition-colors leading-snug">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0F172A] p-10 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="relative z-10 text-center">
                <div className="w-16 h-1 bg-[#B89544] mx-auto mb-6 rounded-full"></div>
                <h3 className="text-2xl font-black mb-4">احمِ أعمالك اليوم</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">فريقنا القانوني جاهز لتقديم المشورة المخصصة لاحتياجاتك.</p>
                <Link to="/contact" className="block text-center w-full bg-[#B89544] text-[#0F172A] font-black py-4 rounded-2xl shadow-xl shadow-[#B89544]/10">احجز استشارتك</Link>
              </div>
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0 L100 0 L100 100 Z" fill="white" fillOpacity="0.1" /></svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;