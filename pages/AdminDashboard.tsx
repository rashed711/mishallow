import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../data/api';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    servicesCount: 0,
    articlesCount: 0,
    totalViews: 0,
  });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const servicesRes = await apiFetch('/services.php');
      const articlesRes = await apiFetch('/articles.php');

      if (servicesRes.success && articlesRes.success) {
        const services = servicesRes.services || [];
        const articles = articlesRes.articles || [];
        
        const totalViews = articles.reduce((sum: number, art: any) => sum + (art.views || 0), 0);

        setStats({
          servicesCount: services.length,
          articlesCount: articles.length,
          totalViews,
        });

        setRecentArticles(articles.slice(0, 5));
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#B89544] font-bold animate-pulse">جاري تحميل بيانات الإحصائيات...</div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-black uppercase tracking-wider block mb-2">إجمالي الخدمات</span>
            <span className="text-4xl font-black text-[#0F172A]">{stats.servicesCount}</span>
          </div>
          <div className="w-16 h-16 bg-[#B89544]/10 rounded-2xl flex items-center justify-center text-3xl">💼</div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-black uppercase tracking-wider block mb-2">إجمالي المقالات</span>
            <span className="text-4xl font-black text-[#0F172A]">{stats.articlesCount}</span>
          </div>
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-3xl">✍️</div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-black uppercase tracking-wider block mb-2">قراءات المقالات</span>
            <span className="text-4xl font-black text-[#0F172A]">{stats.totalViews}</span>
          </div>
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-3xl">👁️</div>
        </div>
      </div>

      {/* Grid: Actions & Recent Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Quick Actions */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-[#0F172A] mb-2">إجراءات سريعة</h3>
            <p className="text-xs text-slate-400 font-bold mb-8">قم بتعديل وإضافة المحتوى بنقرة واحدة</p>
          </div>
          <div className="space-y-4">
            <Link
              to="/admin/services"
              className="block text-center py-4 bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black rounded-xl shadow-lg transition-all"
            >
              ➕ إضافة خدمة جديدة
            </Link>
            <Link
              to="/admin/articles"
              className="block text-center py-4 bg-slate-50 hover:bg-[#B89544]/20 text-slate-800 hover:text-[#0F172A] font-black rounded-xl border border-slate-200 hover:border-transparent transition-all"
            >
              ➕ كتابة مقال جديد
            </Link>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-[#0F172A]">أحدث المقالات المضافة</h3>
              <p className="text-xs text-slate-400 font-bold mt-1">المقالات المنشورة مؤخراً على الموقع</p>
            </div>
            <Link to="/admin/articles" className="text-xs font-bold text-[#B89544] hover:underline">
              عرض الكل ←
            </Link>
          </div>

          {recentArticles.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-bold text-sm">
              لا توجد مقالات منشورة حالياً.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentArticles.map((art) => (
                <div key={art.id} className="py-5 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <img
                      src={art.image || '/images/logo/logo.webp'}
                      alt=""
                      className="w-16 h-12 object-cover rounded-xl shadow-sm border border-slate-100 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#0F172A] line-clamp-1">{art.title}</h4>
                      <span className="text-[10px] text-slate-400 font-medium block mt-1">
                        📅 {art.date} | 👁️ {art.views} مشاهدة
                      </span>
                    </div>
                  </div>
                  <span className="text-xs bg-slate-50 border border-slate-200 text-slate-600 font-black px-3.5 py-1.5 rounded-full">
                    {art.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
