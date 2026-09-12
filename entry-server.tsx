import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactPage from './pages/ContactPage';
import QuickServicesPage from './pages/QuickServicesPage';
import QuickServiceDetailPage from './pages/QuickServiceDetailPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

import Header from './components/Header';
import Footer from './components/Footer';
import FloatingShapes from './components/FloatingShapes';
import WhatsAppButton from './components/WhatsAppButton';

function ServerApp({ url }: { url: string }) {
  const dummyFn = () => {};
  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 relative">
      <WhatsAppButton />
      <FloatingShapes />
      <Header onOpenModal={dummyFn} />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage onOpenModal={dummyFn} />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage onOpenModal={dummyFn} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/quick-services" element={<QuickServicesPage />} />
          <Route path="/quick-services/:slug" element={<QuickServiceDetailPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/:slug" element={<ServiceDetailPage onOpenModal={dummyFn} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer onOpenModal={dummyFn} />
    </div>
  );
}

export function render(url: string) {
  const helmetContext: any = {};
  const appHtml = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <ServerApp url={url} />
      </StaticRouter>
    </HelmetProvider>
  );
  return { appHtml, helmet: helmetContext.helmet };
}
