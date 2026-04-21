import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import FloatingShapes from './components/FloatingShapes';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import { ServiceRequestModal } from './components/ServiceRequestModal';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <WhatsAppButton />
      <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 relative">
        <FloatingShapes />
        <Header onOpenModal={handleOpenModal} />
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            {/* @ts-ignore */}
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/services" element={<PageTransition><ServicesPage onOpenModal={handleOpenModal} /></PageTransition>} />
              <Route path="/:slug" element={<PageTransition><ServiceDetailPage onOpenModal={handleOpenModal} /></PageTransition>} />
              <Route path="/articles" element={<PageTransition><ArticlesPage /></PageTransition>} />
              <Route path="/articles/:slug" element={<PageTransition><ArticleDetailPage onOpenModal={handleOpenModal} /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
              <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
              <Route path="*" element={<PageTransition><Home /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer onOpenModal={handleOpenModal} />
        <ServiceRequestModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
}

export default App;