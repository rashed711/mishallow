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
// تتبع نقرات أزرار التواصل لـ Microsoft Clarity
// ==========================================
declare global {
  interface Window {
    clarity?: any;
  }
}

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
      if (window.clarity) {
        window.clarity("set", "contact_channel", "whatsapp");
        window.clarity("set", "btn_location", location);
        window.clarity("set", "page_path", window.location.pathname);
        window.clarity("event", "whatsapp_click");
      }
    } else if (href.startsWith('tel:')) {
      if (window.clarity) {
        window.clarity("set", "contact_channel", "phone_call");
        window.clarity("set", "btn_location", location);
        window.clarity("set", "page_path", window.location.pathname);
        window.clarity("event", "phone_click");
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