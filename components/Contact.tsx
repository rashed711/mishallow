import React, { useState } from 'react';
import { PhoneIcon, WhatsAppIcon } from './icons/ServiceIcons';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const BACKEND_URL = '/backend/contact-form.php';
// في بيئة التطوير المحلية لا يوجد PHP server، نستخدم WhatsApp كبديل
const IS_DEV = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
     window.location.hostname === '127.0.0.1');

const Contact: React.FC = () => {
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === 'loading') return;

    setFormState('loading');
    setResponseMsg('');

    // ─── وضع التطوير المحلي: لا يوجد PHP server، نفتح واتساب مباشرة ──────────
    if (IS_DEV) {
      const text = `أهلاً، أود التواصل بخصوص استشارة قانونية:\n- الاسم: ${name}\n- الهاتف: ${phone}\n- التفاصيل: ${message}`;
      window.open(`https://wa.me/966568000085?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      setFormState('success');
      setResponseMsg('تم فتح واتساب لإرسال رسالتك (وضع التطوير)');
      setName(''); setPhone(''); setMessage('');
      return;
    }

    // ─── الإنتاج: إرسال عبر الباك إند PHP ───────────────────────────────────
    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message }),
      });

      const data = await res.json();

      if (data.success) {
        setFormState('success');
        setResponseMsg(data.message);
        setName(''); setPhone(''); setMessage('');
      } else {
        setFormState('error');
        setResponseMsg(data.message || 'حدث خطأ، يرجى المحاولة مجدداً');
      }
    } catch {
      setFormState('error');
      setResponseMsg('تعذر الاتصال بالخادم، يرجى التواصل معنا مباشرة عبر الواتساب');
    }
  };

  return (
    <div className="bg-[#0F172A] p-6 md:p-16 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl">
      {/* Direct Contact Options Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
        <a
          href="https://wa.me/966568000085"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-[#B89544]/10 hover:border-[#B89544]/30 transition-all duration-500"
        >
          <div className="flex items-center gap-4 md:gap-6 relative z-10">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#B89544]/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8 text-[#B89544]" />
            </div>
            <div>
              <h4 className="text-white font-black text-base md:text-lg mb-1">مراسلة فورية</h4>
              <p className="text-slate-400 text-xs md:text-sm font-medium">ابدأ المحادثة عبر واتساب</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <WhatsAppIcon className="w-20 h-20 md:w-24 md:h-24" />
          </div>
        </a>

        <a
          href="tel:0568000085"
          className="group relative overflow-hidden bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white/10 hover:border-white/20 transition-all duration-500"
        >
          <div className="flex items-center gap-4 md:gap-6 relative z-10">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <PhoneIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h4 className="text-white font-black text-base md:text-lg mb-1">اتصال هاتفي</h4>
              <p className="text-slate-400 text-xs md:text-sm font-medium">تحدث مباشرة مع مستشار</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <PhoneIcon className="w-20 h-20 md:w-24 md:h-24" />
          </div>
        </a>
      </div>

      <div className="flex items-center gap-6 mb-10 md:mb-12">
        <div className="h-[1px] bg-white/10 flex-grow"></div>
        <span className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">أو اترك رسالتك هنا</span>
        <div className="h-[1px] bg-white/10 flex-grow"></div>
      </div>

      {/* ─── Success Message ─── */}
      {formState === 'success' && (
        <div className="mb-8 flex items-start gap-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-6 py-5 rounded-2xl font-medium text-sm">
          <span className="text-xl mt-0.5">✅</span>
          <p>{responseMsg}</p>
        </div>
      )}

      {/* ─── Error Message ─── */}
      {formState === 'error' && (
        <div className="mb-8 flex items-start gap-4 bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-5 rounded-2xl font-medium text-sm">
          <span className="text-xl mt-0.5">⚠️</span>
          <p>{responseMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2">
          {/* Name Field */}
          <div className="group space-y-3">
            <label className="text-[10px] md:text-xs font-black text-slate-400 group-focus-within:text-[#B89544] uppercase tracking-widest transition-colors pr-1">
              الاسم الكامل
            </label>
            <div className="relative">
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={formState === 'loading'}
                className="w-full bg-[#1E293B]/30 border border-white/5 text-white py-4 md:py-5 px-6 md:px-8 rounded-[1.1rem] md:rounded-[1.3rem] focus:bg-[#1E293B]/50 focus:border-[#B89544]/50 focus:ring-4 focus:ring-[#B89544]/10 transition-all duration-300 outline-none placeholder:text-slate-600 font-medium disabled:opacity-50"
                placeholder="اكتب اسمك..."
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="group space-y-3">
            <label className="text-[10px] md:text-xs font-black text-slate-400 group-focus-within:text-[#B89544] uppercase tracking-widest transition-colors pr-1">
              رقم الهاتف / الجوال
            </label>
            <div className="relative">
              <input
                id="contact-phone"
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                disabled={formState === 'loading'}
                className="w-full bg-[#1E293B]/30 border border-white/5 text-white py-4 md:py-5 px-6 md:px-8 rounded-[1.1rem] md:rounded-[1.3rem] focus:bg-[#1E293B]/50 focus:border-[#B89544]/50 focus:ring-4 focus:ring-[#B89544]/10 transition-all duration-300 outline-none placeholder:text-slate-600 font-medium disabled:opacity-50"
                placeholder="+966 5x xxx xxxx | +1 555 xxx xxxx"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="md:col-span-2 group space-y-3">
            <label className="text-[10px] md:text-xs font-black text-slate-400 group-focus-within:text-[#B89544] uppercase tracking-widest transition-colors pr-1">
              تفاصيل الاستشارة القانونية
            </label>
            <div className="relative">
              <textarea
                id="contact-message"
                rows={5}
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={formState === 'loading'}
                className="w-full bg-[#1E293B]/30 border border-white/5 text-white py-4 md:py-5 px-6 md:px-8 rounded-[1.1rem] md:rounded-[1.3rem] focus:bg-[#1E293B]/50 focus:border-[#B89544]/50 focus:ring-4 focus:ring-[#B89544]/10 transition-all duration-300 outline-none resize-none placeholder:text-slate-600 font-medium disabled:opacity-50"
                placeholder="اشرح لنا باختصار موضوعك القانوني ليتسنى لنا خدمتك بشكل أفضل..."
              ></textarea>
            </div>
          </div>
        </div>

        <button
          id="contact-submit"
          type="submit"
          disabled={formState === 'loading' || formState === 'success'}
          className="relative group overflow-hidden w-full bg-gradient-to-r from-[#B89544] via-[#D4AF37] to-[#B89544] bg-[length:200%_auto] text-[#0F172A] font-black py-5 md:py-6 rounded-2xl shadow-2xl shadow-[#B89544]/20 hover:shadow-[#B89544]/40 transition-all transform hover:-translate-y-1 active:scale-95 animate-gradient-move disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {formState === 'loading' ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span>جارٍ الإرسال...</span>
              </>
            ) : formState === 'success' ? (
              <>
                <span>✅</span>
                <span>تم الإرسال بنجاح</span>
              </>
            ) : (
              <>
                إرسال طلب الاستشارة القانونية
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-[-4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </>
            )}
          </span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-luxury-shimmer"></span>
        </button>
      </form>
    </div>
  );
};

export default Contact;
