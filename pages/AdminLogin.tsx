import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../data/api';
import SEO from '../components/SEO';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');

    const res = await apiFetch('/auth.php', {
      method: 'POST',
      body: JSON.stringify({ action: 'login', username, password }),
    });

    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center relative overflow-hidden px-4">
      <SEO title="تسجيل الدخول - لوحة التحكم | شركة مشعل بادغيش" description="صفحة تسجيل الدخول المخصصة لمدراء النظام ومسؤولي المحتوى." image="/images/logo/logo.webp" />
      
      {/* Background Decorative Blur Rings */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#B89544]/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <img
            src="/images/logo/logo.webp"
            alt="Logo"
            className="w-24 h-24 mx-auto object-contain mb-4 drop-shadow-[0_0_15px_rgba(184,149,68,0.2)]"
          />
          <h1 className="text-2xl font-black text-white">لوحة تحكم الإدارة</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">سجل دخولك لإدارة الخدمات والمقالات والمحتوى</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
          {error && (
            <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl text-xs font-bold">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-300 uppercase tracking-wider block pr-1">
                اسم المستخدم
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1E293B]/40 border border-white/10 text-white py-4 px-5 rounded-xl focus:border-[#B89544]/60 focus:ring-4 focus:ring-[#B89544]/10 transition-all outline-none font-medium text-sm text-right"
                placeholder="أدخل اسم المستخدم..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-300 uppercase tracking-wider block pr-1">
                كلمة المرور
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1E293B]/40 border border-white/10 text-white py-4 px-5 rounded-xl focus:border-[#B89544]/60 focus:ring-4 focus:ring-[#B89544]/10 transition-all outline-none font-medium text-sm text-right"
                placeholder="أدخل كلمة المرور..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#B89544] via-[#D4AF37] to-[#B89544] bg-[length:200%_auto] text-[#0F172A] font-black py-4.5 rounded-xl shadow-xl hover:shadow-[#B89544]/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                <span>دخول لوحة التحكم</span>
              )}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <a href="/" className="text-slate-500 hover:text-[#B89544] text-xs font-bold transition-colors">
            ← العودة للموقع الرئيسي
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
