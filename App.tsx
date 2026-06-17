import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import FloatingShapes from './components/FloatingShapes';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const QuickServicesPage = lazy(() => import('./pages/QuickServicesPage'));
const QuickServiceDetailPage = lazy(() => import('./pages/QuickServiceDetailPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminServices = lazy(() => import('./pages/AdminServices'));
const AdminArticles = lazy(() => import('./pages/AdminArticles'));

import { ServiceRequestModal } from './components/ServiceRequestModal';

const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[#0F172A]">
    <div className="relative">
      <div className="absolute inset-0 bg-[#B89544] blur-3xl opacity-20 rounded-full animate-pulse"></div>
      <img
        src="/images/logo/logo.webp"
        alt="Logo"
        width={128}
        height={128}
        className="relative w-32 h-32 object-contain drop-shadow-[0_0_20px_rgba(184,149,68,0.4)] animate-pulse"
      />
    </div>
  </div>
);

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
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    // WebMCP Integration for AI Agents
    const nav = navigator as any;
    if (nav.modelContext && typeof nav.modelContext.provideContext === 'function') {
      nav.modelContext.provideContext({
        tools: [
          {
            name: 'contact_office',
            description: 'Get contact information or open the contact form for the law firm.',
            parameters: { type: 'object', properties: {} },
            execute: () => { window.location.href = '/contact'; }
          },
          {
            name: 'browse_services',
            description: 'Navigate to the legal services page to see all legal specialties.',
            parameters: { type: 'object', properties: {} },
            execute: () => { window.location.href = '/services'; }
          }
        ]
      });
    }

    // ─── تحميل Microsoft Clarity بشكل متأخر ذكي لعدم التأثير على الأداء ────────────────
    let clarityInitialized = false;

    const initClarity = () => {
      if (clarityInitialized) return;
      clarityInitialized = true;

      // إزالة مستمعي الأحداث فور بدء التحميل
      window.removeEventListener('scroll', initClarity);
      window.removeEventListener('mousemove', initClarity);
      window.removeEventListener('touchstart', initClarity);
      window.removeEventListener('keydown', initClarity);

      // تهيئة Clarity
      (window as any).clarity = (window as any).clarity || function() {
        ((window as any).clarity.q = (window as any).clarity.q || []).push(arguments);
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://www.clarity.ms/tag/uctykanxrf';
      document.head.appendChild(script);
    };

    // الاستماع لأي حركة من الزائر الفعلي لتشغيل الكود فوراً
    window.addEventListener('scroll', initClarity, { passive: true });
    window.addEventListener('mousemove', initClarity, { passive: true });
    window.addEventListener('touchstart', initClarity, { passive: true });
    window.addEventListener('keydown', initClarity, { passive: true });

    // مؤقت أمان لتشغيل السكريبت بعد 4 ثوانٍ إذا لم يتحرك المستخدم
    const clarityTimeout = setTimeout(initClarity, 4000);

    return () => {
      clearTimeout(clarityTimeout);
      window.removeEventListener('scroll', initClarity);
      window.removeEventListener('mousemove', initClarity);
      window.removeEventListener('touchstart', initClarity);
      window.removeEventListener('keydown', initClarity);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <WhatsAppButton />}
      <div className={`${isAdminRoute ? '' : 'bg-[#F8FAFC]'} min-h-screen font-sans text-slate-800 relative`}>
        {!isAdminRoute && <FloatingShapes />}
        {!isAdminRoute && <Header onOpenModal={handleOpenModal} />}
        <main className="relative z-10">
          <Suspense fallback={<LoadingFallback />}>
            <AnimatePresence mode="wait">
              {/* @ts-ignore */}
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                <Route path="/services" element={<PageTransition><ServicesPage onOpenModal={handleOpenModal} /></PageTransition>} />
                <Route path="/articles" element={<PageTransition><ArticlesPage /></PageTransition>} />
                <Route path="/articles/:slug" element={<PageTransition><ArticleDetailPage onOpenModal={handleOpenModal} /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                <Route path="/quick-services" element={<PageTransition><QuickServicesPage /></PageTransition>} />
                <Route path="/quick-services/:slug" element={<PageTransition><QuickServiceDetailPage /></PageTransition>} />
                <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
                
                {/* لوحة التحكم */}
                <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="articles" element={<AdminArticles />} />
                </Route>

                <Route path="/:slug" element={<PageTransition><ServiceDetailPage onOpenModal={handleOpenModal} /></PageTransition>} />
                <Route path="*" element={<PageTransition><Home /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        {!isAdminRoute && <Footer onOpenModal={handleOpenModal} />}
        {!isAdminRoute && <ServiceRequestModal isOpen={isModalOpen} onClose={handleCloseModal} />}
      </div>
    </>
  );
}

export default App;