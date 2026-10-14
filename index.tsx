import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
}

// ==========================================
// تتبع نقرات أزرار التواصل لـ Microsoft Clarity + GA4
// ==========================================
declare global {
  interface Window {
    clarity?: any;
    gtag?: (...args: any[]) => void;
  }
}

// The firm's WhatsApp number — used to distinguish genuine contact links
// from article-sharing links (which use wa.me without a phone number).
const FIRM_WA_NUMBER = '966568000085';

document.addEventListener('click', function (e: any) {
  try {
    var target = e.target.closest('a, button');
    if (!target) return;

    var href = (target.getAttribute('href') || '').trim();
    var text = (target.textContent || '').trim().replace(/\s+/g, ' ');

    var location = 'page_content';
    if (target.closest('header') || target.closest('nav')) {
      location = 'header_navbar';
    } else if (target.closest('footer')) {
      location = 'footer';
    } else if (target.classList.contains('floating') || target.closest('.floating') || target.closest('.fixed')) {
      location = 'floating_button';
    }

    if (href.includes('wa.me') || href.includes('whatsapp.com')) {
      // ─── Exclude article-share links from lead-intent tracking ────────────
      // Article-share links use wa.me/?text=... with NO phone number.
      // Firm-contact links all contain the firm's WhatsApp number in the href.
      // We must not count an article share as a lead signal in either platform.
      var isFirmContact = href.includes(FIRM_WA_NUMBER);

      if (isFirmContact) {
        // Clarity — unchanged behavior for genuine firm-contact links
        if (window.clarity) {
          window.clarity("set", "contact_channel", "whatsapp");
          window.clarity("set", "btn_location", location);
          window.clarity("set", "page_path", window.location.pathname);
          window.clarity("event", "whatsapp_click");
        }
        // GA4 — contact intent (click ≠ conversation started)
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'contact', {
            method: 'whatsapp',
            location: location,
            page_path: window.location.pathname,
          });
        }
      }
      // Article-share links: no tracking fires — preserving share behavior only.

    } else if (href.startsWith('tel:')) {
      // Clarity — unchanged
      if (window.clarity) {
        window.clarity("set", "contact_channel", "phone_call");
        window.clarity("set", "btn_location", location);
        window.clarity("set", "page_path", window.location.pathname);
        window.clarity("event", "phone_click");
      }
      // GA4 — contact intent (click ≠ completed call)
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'contact', {
          method: 'phone_call',
          location: location,
          page_path: window.location.pathname,
        });
      }

    } else if (text.includes('الخدمات السريعة') || href.includes('#services') || href.includes('services')) {
      if (window.clarity) {
        window.clarity("set", "btn_name", "quick_services");
        window.clarity("set", "btn_location", location);
        window.clarity("event", "quick_services_click");
      }
    }
  } catch (err) {
    // تجاهل أي خطأ بصمت لضمان عدم تعطل واجهة الموقع
  }
});
