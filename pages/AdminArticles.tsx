import React, { useState, useEffect } from 'react';
import { apiFetch } from '../data/api';
import { ARTICLE_CATEGORIES } from '../data/articles';

interface ArticleFormState {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  image: string;
  readTime: string;
}

const initialFormState: ArticleFormState = {
  slug: '',
  title: '',
  excerpt: '',
  content: [''],
  category: 'ثقافة قانونية',
  image: '',
  readTime: '5 دقائق',
};

const AdminArticles: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<ArticleFormState>(initialFormState);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    const res = await apiFetch('/articles.php');
    if (res.success && res.articles) {
      setArticles(res.articles);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleOpenAdd = () => {
    setForm(initialFormState);
    setEditMode(false);
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (art: any) => {
    setForm({
      id: art.id,
      slug: art.slug,
      title: art.title,
      excerpt: art.excerpt || '',
      content: Array.isArray(art.content) ? art.content : [''],
      category: art.category || 'ثقافة قانونية',
      image: art.image || '',
      readTime: art.readTime || '5 دقائق',
    });
    setEditMode(true);
    setError('');
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من رغبتك في حذف هذا المقال نهائياً؟')) return;

    const res = await apiFetch(`/articles.php?id=${id}`, {
      method: 'DELETE',
    });

    if (res.success) {
      fetchArticles();
    } else {
      alert(res.message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    setError('');

    try {
      const res = await fetch('/backend/upload.php', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      setUploading(false);

      if (data.success) {
        setForm((prev) => ({ ...prev, image: data.url }));
      } else {
        setError(data.message || 'فشل رفع الصورة');
      }
    } catch {
      setUploading(false);
      setError('حدث خطأ بالاتصال أثناء رفع الصورة');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const filteredForm = {
      ...form,
      content: form.content.filter((x) => x.trim() !== ''),
    };

    const res = await apiFetch('/articles.php', {
      method: editMode ? 'PUT' : 'POST',
      body: JSON.stringify(filteredForm),
    });

    if (res.success) {
      setShowModal(false);
      fetchArticles();
    } else {
      setError(res.message || 'فشل حفظ المقال');
    }
  };

  const updateParagraph = (index: number, value: string) => {
    setForm((prev) => {
      const arr = [...prev.content];
      arr[index] = value;
      return { ...prev, content: arr };
    });
  };

  const addParagraph = () => {
    setForm((prev) => ({ ...prev, content: [...prev.content, ''] }));
  };

  const removeParagraph = (index: number) => {
    setForm((prev) => {
      const arr = [...prev.content];
      arr.splice(index, 1);
      return { ...prev, content: arr.length > 0 ? arr : [''] };
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#0F172A]">إدارة المقالات والأخبار</h2>
          <p className="text-xs text-slate-400 font-bold mt-1">كتابة، تعديل، وحذف المقالات القانونية</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black px-6 py-3.5 rounded-xl shadow-lg transition-all text-sm"
        >
          ➕ إضافة مقال جديد
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 font-bold">جاري تحميل المقالات...</div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-black">
                <th className="p-6">المقال</th>
                <th className="p-6">القسم</th>
                <th className="p-6">تاريخ النشر</th>
                <th className="p-6 text-center">المشاهدات</th>
                <th className="p-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={art.image || '/images/logo/logo.webp'}
                        alt=""
                        className="w-14 h-10 object-cover rounded-lg border border-slate-100"
                      />
                      <div>
                        <div className="font-bold text-sm text-[#0F172A] line-clamp-1">{art.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{art.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full">
                      {art.category}
                    </span>
                  </td>
                  <td className="p-6 text-slate-500 font-medium text-xs">{art.date}</td>
                  <td className="p-6 text-center text-slate-600 font-bold text-sm">{art.views || 0}</td>
                  <td className="p-6 text-center flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleOpenEdit(art)}
                      className="px-4 py-2 rounded-lg bg-[#B89544]/10 text-[#B89544] font-bold text-xs hover:bg-[#B89544] hover:text-white transition-all"
                    >
                      📝 تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(art.id)}
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
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-10 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 left-6 text-2xl text-slate-400 hover:text-[#0F172A]"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-[#0F172A] mb-2">
              {editMode ? '📝 تعديل المقال القانوني' : '➕ إضافة مقال قانوني جديد'}
            </h3>
            <p className="text-xs text-slate-400 font-bold mb-8">يرجى ملء الحقول التالية لتحديث مدونة الموقع المعرفية</p>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-500 px-5 py-4 rounded-xl text-xs font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 text-right">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-slate-700 block">عنوان المقال</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                    placeholder="أدخل عنوان المقال..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">رابط الصفحة الفرعي (Slug)</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm ltr text-left"
                    placeholder="مثال: custom-slug-for-article"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">قسم المقال</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                  >
                    {ARTICLE_CATEGORIES.filter((c) => c !== 'الكل').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">وقت القراءة المقدر</label>
                  <input
                    type="text"
                    required
                    value={form.readTime}
                    onChange={(e) => setForm((prev) => ({ ...prev, readTime: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                    placeholder="مثال: 5 دقائق"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">صورة المقال الرئيسية</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                      className="flex-grow bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                      placeholder="/images/articles/xxx.webp"
                    />
                    <label className="bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black px-5 py-3.5 rounded-xl cursor-pointer shadow transition-all text-xs flex items-center justify-center whitespace-nowrap">
                      {uploading ? 'جاري الرفع...' : '📂 رفع صورة'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-slate-700 block">مقتطف مختصر (يظهر في القائمة)</label>
                  <textarea
                    rows={2}
                    required
                    value={form.excerpt}
                    onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                    placeholder="اكتب خلاصة المقال..."
                  />
                </div>
              </div>

              {/* Dynamic array: Article Content paragraphs */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#0F172A]">محتوى المقال (فقرات نصية تفصيلية)</h4>
                  <button
                    type="button"
                    onClick={addParagraph}
                    className="text-xs font-black text-[#B89544] hover:underline"
                  >
                    ➕ إضافة فقرة جديدة
                  </button>
                </div>
                {form.content.map((para, idx) => (
                  <div key={idx} className="flex gap-3">
                    <textarea
                      rows={3}
                      required
                      value={para}
                      onChange={(e) => updateParagraph(idx, e.target.value)}
                      className="flex-grow bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                      placeholder={`محتوى الفقرة رقم ${idx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeParagraph(idx)}
                      className="text-red-500 hover:text-red-700 font-bold px-3"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-8 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-all text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black shadow-lg transition-all text-sm"
                >
                  💾 نشر وحفظ المقال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticles;
