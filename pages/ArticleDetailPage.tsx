import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { articles as staticArticles, Article } from '../data/articles';
import NotFoundPage from './NotFoundPage';

interface ArticleDetailPageProps {
  onOpenModal: () => void;
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ onOpenModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const article = staticArticles.find(a => a.slug === slug);
  const articles: Article[] = staticArticles;

  if (!article) {
    return <NotFoundPage />;
  }

  const sameCategory = articles.filter(a => a.id !== article.id && a.category === article.category);
  const relatedArticles = sameCategory.slice(0, 3);

  const handleBack = () => navigate('/articles');

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://mishal-lawfirm.com/articles/${article.slug}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = article ? encodeURIComponent(article.title) : '';

  // Helper to render text with markdown links [text](/path)
  const renderContent = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <Link key={match.index} to={match[2]} className="text-[#B89544] hover:underline font-bold">
          {match[1]}
        </Link>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={`${article.title} | شركة مشعل بادغيش للمحاماة`}
        description={article.excerpt}
        image={article.image}
        type="article"
        url={`https://mishal-lawfirm.com/articles/${article.slug}`}
        datePublished={article.rawDate}
        dateModified={article.dateModified}
        authorName={article.author || 'مشعل بادغيش'}
      />
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale">
          <img src={article.image} alt="" aria-hidden="true" loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
              {article.readTime}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#B89544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              {article.author || 'مشعل بادغيش'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-10">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-50">
              <img src={article.image} alt={article.title} width={800} height={450} loading="eager" decoding="async" className="w-full object-cover max-h-[500px]" />
            </div>

            <div className="prose prose-lg max-w-none text-slate-700 leading-loose space-y-8 font-medium">
              <p className="text-xl text-[#0F172A] font-bold border-r-4 border-[#B89544] pr-6 py-2 bg-slate-50 rounded-l-2xl">
                {renderContent(article.excerpt)}
              </p>

              {article.content.map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl md:text-3xl font-black text-[#0F172A] mt-12 mb-6 flex items-center gap-3">
                      <span className="w-2.5 h-8 bg-[#B89544] rounded-full inline-block"></span>
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                return (
                  <p key={idx} className="text-slate-600 text-lg">
                    {renderContent(paragraph)}
                  </p>
                );
              })}
            </div>

            <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-[#0F172A] font-black text-sm">
                <span>مشاركة المقال:</span>
                <div className="flex gap-2">
                  <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#B89544] hover:text-white transition-colors" aria-label="Share on X">
                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#B89544] hover:text-white transition-colors" aria-label="Share on LinkedIn">
                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#B89544] hover:text-white transition-colors" aria-label="Share on WhatsApp">
                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  </a>
                </div>
              </div>

              <button
                onClick={onOpenModal}
                className="inline-flex items-center gap-3 bg-[#B89544] text-[#0F172A] px-8 py-4 rounded-2xl font-black shadow-xl shadow-[#B89544]/10 hover:shadow-2xl hover:shadow-[#B89544]/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>طلب استشارة حول هذا الموضوع</span>
                <span>←</span>
              </button>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
              <h2 className="text-xl font-black text-[#0F172A] mb-6 relative">
                مقالات ذات صلة
                <span className="absolute -bottom-2 right-0 w-8 h-1 bg-[#B89544] rounded-full"></span>
              </h2>
              <div className="space-y-8">
                {relatedArticles.map(rel => (
                  <Link
                    key={rel.id}
                    to={`/articles/${rel.slug}`}
                    className="group flex gap-4 items-start"
                  >
                    <div className="w-24 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                      <img src={rel.image} alt={rel.title} width={96} height={80} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-[#B89544] text-[10px] font-black uppercase mb-1 block">{rel.category}</span>
                      <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#B89544] transition-colors leading-snug">
                        {rel.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#0F172A] p-10 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="relative z-10 text-center">
                <div className="w-16 h-1 bg-[#B89544] mx-auto mb-6 rounded-full"></div>
                <h2 className="text-2xl font-black mb-4">احمِ أعمالك اليوم</h2>
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