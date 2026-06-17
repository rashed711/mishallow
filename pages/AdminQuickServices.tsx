import React, { useState, useEffect } from 'react';
import { apiFetch } from '../data/api';

interface Category {
  id: string;
  name: string;
}

interface QuickService {
  id: string;
  category_id: string;
  category_name?: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  priceRange: string;
}

const AdminQuickServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'categories'>('services');
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<QuickService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Form states
  const [serviceForm, setServiceForm] = useState({
    id: '',
    category_id: '',
    slug: '',
    title: '',
    description: '',
    features: [''],
    priceRange: '',
  });

  const [categoryForm, setCategoryForm] = useState({
    id: '',
    name: '',
  });

  const fetchData = async () => {
    setLoading(true);
    const catRes = await apiFetch('/quick-categories.php');
    const srvRes = await apiFetch('/quick-services.php?flat=1');

    if (catRes.success && srvRes.success) {
      setCategories(catRes.categories || []);
      setServices(srvRes.services || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Category Actions
  const handleOpenAddCategory = () => {
    setCategoryForm({ id: '', name: '' });
    setEditMode(false);
    setError('');
    setShowCategoryModal(true);
  };

  const handleOpenEditCategory = (cat: Category) => {
    setCategoryForm({ id: cat.id, name: cat.name });
    setEditMode(true);
    setError('');
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا التصنيف؟ سيؤدي ذلك لحذف جميع الخدمات المرتبطة به تلقائياً!')) return;

    const res = await apiFetch(`/quick-categories.php?id=${id}`, {
      method: 'DELETE',
    });

    if (res.success) {
      fetchData();
    } else {
      alert(res.message);
    }
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await apiFetch('/quick-categories.php', {
      method: editMode ? 'PUT' : 'POST',
      body: JSON.stringify(categoryForm),
    });

    if (res.success) {
      setShowCategoryModal(false);
      fetchData();
    } else {
      setError(res.message || 'فشل حفظ التصنيف');
    }
  };

  // Service Actions
  const handleOpenAddService = () => {
    setServiceForm({
      id: '',
      category_id: categories[0]?.id || '',
      slug: '',
      title: '',
      description: '',
      features: [''],
      priceRange: '',
    });
    setEditMode(false);
    setError('');
    setShowServiceModal(true);
  };

  const handleOpenEditService = (srv: QuickService) => {
    setServiceForm({
      id: srv.id,
      category_id: srv.category_id,
      slug: srv.slug,
      title: srv.title,
      description: srv.description || '',
      features: Array.isArray(srv.features) ? srv.features : [''],
      priceRange: srv.priceRange || '',
    });
    setEditMode(true);
    setError('');
    setShowServiceModal(true);
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الخدمة السريعة؟')) return;

    const res = await apiFetch(`/quick-services.php?id=${id}`, {
      method: 'DELETE',
    });

    if (res.success) {
      fetchData();
    } else {
      alert(res.message);
    }
  };

  const handleSubmitService = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const filteredForm = {
      ...serviceForm,
      features: serviceForm.features.filter((f) => f.trim() !== ''),
    };

    const res = await apiFetch('/quick-services.php', {
      method: editMode ? 'PUT' : 'POST',
      body: JSON.stringify(filteredForm),
    });

    if (res.success) {
      setShowServiceModal(false);
      fetchData();
    } else {
      setError(res.message || 'فشل حفظ الخدمة');
    }
  };

  // Dynamic Features fields
  const updateFeature = (index: number, value: string) => {
    setServiceForm((prev) => {
      const arr = [...prev.features];
      arr[index] = value;
      return { ...prev, features: arr };
    });
  };

  const addFeature = () => {
    setServiceForm((prev) => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    setServiceForm((prev) => {
      const arr = [...prev.features];
      arr.splice(index, 1);
      return { ...prev, features: arr.length > 0 ? arr : [''] };
    });
  };

  return (
    <div className="space-y-8">
      {/* Header and Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-[#0F172A]">إدارة الخدمات السريعة والتصنيفات</h2>
          <p className="text-xs text-slate-400 font-bold mt-1">تعديل وإضافة باقات الخدمات والتصنيفات في الموقع</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 rounded-lg text-xs font-black transition-all ${
              activeTab === 'services' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-500 hover:text-[#0F172A]'
            }`}
          >
            💼 الخدمات السريعة
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-5 py-2.5 rounded-lg text-xs font-black transition-all ${
              activeTab === 'categories' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-500 hover:text-[#0F172A]'
            }`}
          >
            📁 تصنيفات الخدمات
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 font-bold">جاري تحميل البيانات...</div>
      ) : activeTab === 'services' ? (
        // SERVICES TAB
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={handleOpenAddService}
              className="bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black px-6 py-3.5 rounded-xl shadow-lg transition-all text-sm"
            >
              ➕ إضافة خدمة سريعة
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-black">
                  <th className="p-6">الخدمة</th>
                  <th className="p-6">التصنيف</th>
                  <th className="p-6">الرابط الفرعي (Slug)</th>
                  <th className="p-6">نطاق السعر</th>
                  <th className="p-6 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((srv) => (
                  <tr key={srv.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-bold text-sm text-[#0F172A]">{srv.title}</td>
                    <td className="p-6">
                      <span className="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full">
                        {srv.category_name}
                      </span>
                    </td>
                    <td className="p-6 text-slate-500 font-mono text-xs">{srv.slug}</td>
                    <td className="p-6 text-[#B89544] font-black text-xs">{srv.priceRange}</td>
                    <td className="p-6 text-center flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleOpenEditService(srv)}
                        className="px-4 py-2 rounded-lg bg-[#B89544]/10 text-[#B89544] font-bold text-xs hover:bg-[#B89544] hover:text-white transition-all"
                      >
                        📝 تعديل
                      </button>
                      <button
                        onClick={() => handleDeleteService(srv.id)}
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 font-bold text-xs hover:bg-red-500 hover:text-white transition-all"
                      >
                        🗑️ حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // CATEGORIES TAB
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={handleOpenAddCategory}
              className="bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black px-6 py-3.5 rounded-xl shadow-lg transition-all text-sm"
            >
              ➕ إضافة تصنيف جديد
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-black">
                  <th className="p-6">معرف التصنيف (ID)</th>
                  <th className="p-6">اسم التصنيف</th>
                  <th className="p-6 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-mono text-xs text-slate-500">{cat.id}</td>
                    <td className="p-6 font-bold text-sm text-[#0F172A]">{cat.name}</td>
                    <td className="p-6 text-center flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleOpenEditCategory(cat)}
                        className="px-4 py-2 rounded-lg bg-[#B89544]/10 text-[#B89544] font-bold text-xs hover:bg-[#B89544] hover:text-white transition-all"
                      >
                        📝 تعديل
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 font-bold text-xs hover:bg-red-500 hover:text-white transition-all"
                      >
                        🗑️ حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-md w-full p-10 shadow-2xl relative">
            <button
              onClick={() => setShowCategoryModal(false)}
              className="absolute top-6 left-6 text-2xl text-slate-400 hover:text-[#0F172A]"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-[#0F172A] mb-2">
              {editMode ? '📝 تعديل التصنيف' : '➕ إضافة تصنيف جديد'}
            </h3>
            <p className="text-xs text-slate-400 font-bold mb-8">يرجى كتابة الاسم والمعرف الفريد للتصنيف</p>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-500 px-5 py-4 rounded-xl text-xs font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitCategory} className="space-y-6 text-right">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 block">المعرف الإنجليزي الفريد (ID)</label>
                <input
                  type="text"
                  required
                  disabled={editMode}
                  value={categoryForm.id}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, id: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm ltr text-left disabled:opacity-50"
                  placeholder="مثال: consultations"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 block">اسم التصنيف بالكامل</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                  placeholder="مثال: الاستشارات القانونية المتخصصة..."
                />
              </div>

              <div className="border-t border-slate-100 pt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-all text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black shadow-lg transition-all text-sm"
                >
                  💾 حفظ التصنيف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-10 shadow-2xl relative">
            <button
              onClick={() => setShowServiceModal(false)}
              className="absolute top-6 left-6 text-2xl text-slate-400 hover:text-[#0F172A]"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-[#0F172A] mb-2">
              {editMode ? '📝 تعديل الخدمة السريعة' : '➕ إضافة خدمة سريعة جديدة'}
            </h3>
            <p className="text-xs text-slate-400 font-bold mb-8">يرجى كتابة تفاصيل الخدمة والباقة المخصصة لها</p>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-500 px-5 py-4 rounded-xl text-xs font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitService} className="space-y-6 text-right">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">المعرف الفريد للخدمة (ID)</label>
                  <input
                    type="text"
                    required
                    disabled={editMode}
                    value={serviceForm.id}
                    onChange={(e) => setServiceForm((prev) => ({ ...prev, id: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm ltr text-left disabled:opacity-50"
                    placeholder="مثال: c1"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">التصنيف التابع له</label>
                  <select
                    value={serviceForm.category_id}
                    onChange={(e) => setServiceForm((prev) => ({ ...prev, category_id: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-slate-700 block">عنوان الخدمة السريعة</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                    placeholder="أدخل عنوان الخدمة..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">رابط الصفحة الفرعي (Slug)</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.slug}
                    onChange={(e) => setServiceForm((prev) => ({ ...prev, slug: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm ltr text-left"
                    placeholder="مثال: labor-consultation"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">نطاق السعر المقدر</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.priceRange}
                    onChange={(e) => setServiceForm((prev) => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                    placeholder="مثال: 200 - 500 ريال"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-slate-700 block">الوصف التفصيلي للخدمة</label>
                  <textarea
                    rows={4}
                    required
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                    placeholder="اكتب تفاصيل الخدمة..."
                  />
                </div>
              </div>

              {/* Dynamic Features list */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#0F172A]">عناصر وبنود الباقة</h4>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-xs font-black text-[#B89544] hover:underline"
                  >
                    ➕ إضافة بند للباقة
                  </button>
                </div>
                {serviceForm.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input
                      type="text"
                      required
                      value={feat}
                      onChange={(e) => updateFeature(idx, e.target.value)}
                      className="flex-grow bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                      placeholder={`البند رقم ${idx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="text-red-500 hover:text-red-700 font-bold px-3"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-8 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-all text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black shadow-lg transition-all text-sm"
                >
                  💾 حفظ الخدمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuickServices;
