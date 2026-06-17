import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { apiFetch } from '../data/api';

const AdminLayout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await apiFetch('/auth.php');
      if (res.success && res.user) {
        setUser(res.user);
        setLoading(false);
      } else {
        navigate('/admin/login', { replace: true });
      }
    };
    checkAuth();
  }, [navigate, location.pathname]);

  const handleLogout = async () => {
    const res = await apiFetch('/auth.php', {
      method: 'POST',
      body: JSON.stringify({ action: 'logout' })
    });
    if (res.success) {
      navigate('/admin/login', { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0F172A]">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#B89544] blur-3xl opacity-20 rounded-full animate-pulse"></div>
          <img
            src="/images/logo/logo.webp"
            alt="Logo"
            className="relative w-24 h-24 object-contain animate-spin"
            style={{ animationDuration: '3s' }}
          />
        </div>
        <div className="text-[#B89544] font-black text-sm tracking-wider animate-pulse">جاري التحقق من الصلاحيات...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row text-right" dir="rtl">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-[#0F172A] text-white flex flex-col border-l border-white/5 z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-4 justify-between lg:justify-start">
          <img src="/images/logo/logo.webp" alt="Logo" className="w-12 h-12 object-contain" />
          <div>
            <h2 className="font-black text-sm text-white">بوابة الإدارة</h2>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">مشعل بادغيش للمحاماة</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-6 flex-grow space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-sm transition-all ${
                isActive
                  ? 'bg-[#B89544] text-white shadow-lg shadow-[#B89544]/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="text-lg">📊</span>
            <span>لوحة الإحصائيات</span>
          </NavLink>

          <NavLink
            to="/admin/services"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-sm transition-all ${
                isActive
                  ? 'bg-[#B89544] text-white shadow-lg shadow-[#B89544]/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="text-lg">💼</span>
            <span>إدارة الخدمات</span>
          </NavLink>

          <NavLink
            to="/admin/articles"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-sm transition-all ${
                isActive
                  ? 'bg-[#B89544] text-white shadow-lg shadow-[#B89544]/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="text-lg">✍️</span>
            <span>إدارة المقالات</span>
          </NavLink>

          <NavLink
            to="/admin/quick-services"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-sm transition-all ${
                isActive
                  ? 'bg-[#B89544] text-white shadow-lg shadow-[#B89544]/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="text-lg">⚡</span>
            <span>إدارة الخدمات السريعة</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-sm transition-all ${
                isActive
                  ? 'bg-[#B89544] text-white shadow-lg shadow-[#B89544]/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="text-lg">👥</span>
            <span>إدارة المستخدمين</span>
          </NavLink>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <span className="text-lg">🌐</span>
            <span>زيارة الموقع العام</span>
          </a>
        </nav>

        {/* User profile & Logout */}
        <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B89544]/20 flex items-center justify-center text-lg text-[#B89544] font-black">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-xs font-black text-white">{user?.username}</div>
              <div className="text-[9px] text-[#B89544] font-bold uppercase tracking-wider mt-0.5">
                {user?.role === 'admin' ? 'مدير النظام' : 'محرر'}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
            title="تسجيل الخروج"
          >
            🚪
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow min-h-screen flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-slate-100 py-6 px-8 flex items-center justify-between z-10">
          <div>
            <h1 className="text-xl font-black text-[#0F172A]">لوحة التحكم</h1>
            <p className="text-xs text-slate-400 font-bold mt-1">مرحباً بك مجدداً في لوحة إدارة المحتوى</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-emerald-500/10 text-emerald-600 font-black px-4 py-2 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              قاعدة البيانات متصلة (SQLite)
            </span>
          </div>
        </header>

        <div className="p-8 flex-grow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
