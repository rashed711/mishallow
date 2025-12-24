
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import Footer from './components/Footer';

export type PageType = 'home' | 'about' | 'services' | 'contact' | 'privacy' | 'terms' | 'articles' | 'article-detail';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedArticleId]);

  const handleSelectArticle = (id: number) => {
    setSelectedArticleId(id);
    setCurrentPage('article-detail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage onNavigate={setCurrentPage} />;
      case 'contact': return <ContactPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'articles': return <ArticlesPage onSelectArticle={handleSelectArticle} />;
      case 'article-detail': 
        return selectedArticleId ? (
          <ArticleDetailPage 
            articleId={selectedArticleId} 
            onBack={() => setCurrentPage('articles')} 
            onSelectArticle={handleSelectArticle}
          />
        ) : <ArticlesPage onSelectArticle={handleSelectArticle} />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col antialiased">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
