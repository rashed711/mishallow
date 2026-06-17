import React, { useState, useEffect } from 'react';
import { apiFetch } from '../data/api';
import { serviceIconsMap } from '../data/services.ts';

interface LegalSystem {
  name: string;
  link: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFormState {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  icon: string;
  image: string;
  shortDescription: string;
  fullDescription: string[];
  features: string[];
  targetAudience: string[];
  legalSystems: LegalSystem[];
  faq: FAQ[];
}

const initialFormState: ServiceFormState = {
  id: '',
  slug: '',
  title: '',
  seoTitle: '',
  seoDescription: '',
  icon: 'ScaleIcon',
  image: '',
  shortDescription: '',
  fullDescription: [''],
  features: [''],
  targetAudience: [''],
  legalSystems: [{ name: '', link: '' }],
  faq: [{ question: '', answer: '' }]
};

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<ServiceFormState>(initialFormState);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    const res = await apiFetch('/services.php');
    if (res.success && res.services) {
      setServices(res.services);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setForm(initialFormState);
    setEditMode(false);
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (srv: any) => {
    setForm({
      id: srv.id,
      slug: srv.slug,
      title: srv.title,
      seoTitle: srv.seoTitle || '',
      seoDescription: srv.seoDescription || '',
      icon: srv.icon || 'ScaleIcon',
      image: srv.image || '',
      shortDescription: srv.shortDescription || '',
      fullDescription: Array.isArray(srv.fullDescription) ? srv.fullDescription : [''],
      features: Array.isArray(srv.features) ? srv.features : [''],
      targetAudience: Array.isArray(srv.targetAudience) ? srv.targetAudience : [''],
      legalSystems: Array.isArray(srv.legalSystems) ? srv.legalSystems : [{ name: '', link: '' }],
      faq: Array.isArray(srv.faq) ? srv.faq : [{ question: '', answer: '' }]
    });
    setEditMode(true);
    setError('');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من رغبتك في حذف هذه الخدمة نهائياً؟')) return;

    const res = await apiFetch(`/services.php?id=${id}`, {
      method: 'DELETE'
    });

    if (res.success) {
      fetchServices();
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
        credentials: 'include'
      });
      const data = await res.json();
      setUploading(false);

      if (data.success) {
        setForm(prev => ({ ...prev, image: data.url }));
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

    // تصفية المصفوفات الفارغة
    const filteredForm = {
      ...form,
      fullDescription: form.fullDescription.filter(x => x.trim() !== ''),
      features: form.features.filter(x => x.trim() !== ''),
      targetAudience: form.targetAudience.filter(x => x.trim() !== ''),
      legalSystems: form.legalSystems.filter(x => x.name.trim() !== ''),
      faq: form.faq.filter(x => x.question.trim() !== '')
    };

    const res = await apiFetch('/services.php', {
      method: editMode ? 'PUT' : 'POST',
      body: JSON.stringify(filteredForm)
    });

    if (res.success) {
      setShowModal(false);
      fetchServices();
    } else {
      setError(res.message || 'فشل حفظ الخدمة');
    }
  };

  // وظائف لتعديل حقول المصفوفة الديناميكية
  const updateArrayField = (field: 'fullDescription' | 'features' | 'targetAudience', index: number, value: string) => {
    setForm(prev => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayField = (field: 'fullDescription' | 'features' | 'targetAudience') => {
    setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayField = (field: 'fullDescription' | 'features' | 'targetAudience', index: number) => {
    setForm(prev => {
      const arr = [...prev[field]];
      arr.splice(index, 1);
      return { ...prev, [field]: arr.length > 0 ? arr : [''] };
    });
  };

  // وظائف لتعديل حقول الكائنات الديناميكية
  const updateLegalSystem = (index: number, key: keyof LegalSystem, value: string) => {
    setForm(prev => {
      const arr = [...prev.legalSystems];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, legalSystems: arr };
    });
  };

  const updateFAQ = (index: number, key: keyof FAQ, value: string) => {
    setForm(prev => {
      const arr = [...prev.faq];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, faq: arr };
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#0F172A]">إدارة الخدمات القانونية</h2>
          <p className="text-xs text-slate-400 font-bold mt-1">عرض وتحديث وحذف الخدمات المعروضة على الموقع</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black px-6 py-3.5 rounded-xl shadow-lg transition-all text-sm"
        >
          ➕ إضافة خدمة جديدة
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 font-bold">جاري تحميل الخدمات...</div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-black">
                <th className="p-6">العنوان</th>
                <th className="p-6">الرابط المعرف (Slug)</th>
                <th className="p-6">أيقونة الخدمة</th>
                <th className="p-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 font-bold text-sm text-[#0F172A]">{srv.title}</td>
                  <td className="p-6 text-slate-500 font-mono text-xs">{srv.slug}</td>
                  <td className="p-6 text-slate-500 text-xs">{srv.icon}</td>
                  <td className="p-6 text-center flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleOpenEdit(srv)}
                      className="px-4 py-2 rounded-lg bg-[#B89544]/10 text-[#B89544] font-bold text-xs hover:bg-[#B89544] hover:text-white transition-all"
                    >
                      📝 تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(srv.id)}
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
              {editMode ? '📝 تعديل الخدمة القانونية' : '➕ إضافة خدمة قانونية جديدة'}
            </h3>
            <p className="text-xs text-slate-400 font-bold mb-8">يرجى ملء الحقول التالية لتحديث بيانات الموقع</p>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-500 px-5 py-4 rounded-xl text-xs font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 text-right">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">المعرف الإنجليزي (ID)</label>
                  <input
                    type="text"
                    required
                    disabled={editMode}
                    value={form.id}
                    onChange={e => setForm(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm disabled:opacity-50"
                    placeholder="مثال: military"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">رابط الصفحة الفرعي (Slug)</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm ltr text-left"
                    placeholder="مثال: military-cases-makkah"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-slate-700 block">عنوان الخدمة</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                    placeholder="أدخل عنوان الخدمة..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">عنوان الـ SEO (الظاهر بالبحث)</label>
                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={e => setForm(prev => ({ ...prev, seoTitle: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">وصف الـ SEO</label>
                  <input
                    type="text"
                    value={form.seoDescription}
                    onChange={e => setForm(prev => ({ ...prev, seoDescription: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">الأيقونة (الرمز)</label>
                  <select
                    value={form.icon}
                    onChange={e => setForm(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                  >
                    {Object.keys(serviceIconsMap).map(iconName => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">صورة الخلفية (رابط أو رفع ملف)</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={form.image}
                      onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))}
                      className="flex-grow bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                      placeholder="/images/services/xxx.webp"
                    />
                    <label className="bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black px-5 py-3.5 rounded-xl cursor-pointer shadow transition-all text-xs flex items-center justify-center whitespace-nowrap">
                      {uploading ? 'جاري الرفع...' : '📂 رفع صورة'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-slate-700 block">الوصف المختصر</label>
                  <textarea
                    rows={2}
                    value={form.shortDescription}
                    onChange={e => setForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                  />
                </div>
              </div>

              {/* Dynamic array: Full Description */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#0F172A]">المحتوى الكامل (فقرات نصية)</h4>
                  <button type="button" onClick={() => addArrayField('fullDescription')} className="text-xs font-black text-[#B89544] hover:underline">➕ إضافة فقرة</button>
                </div>
                {form.fullDescription.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <textarea
                      rows={2}
                      value={item}
                      onChange={e => updateArrayField('fullDescription', idx, e.target.value)}
                      className="flex-grow bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                      placeholder={`الفقرة رقم ${idx + 1}`}
                    />
                    <button type="button" onClick={() => removeArrayField('fullDescription', idx)} className="text-red-500 hover:text-red-700 font-bold px-3">✕</button>
                  </div>
                ))}
              </div>

              {/* Dynamic array: Features */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#0F172A]">ماذا نقدم لكم؟ (المميزات)</h4>
                  <button type="button" onClick={() => addArrayField('features')} className="text-xs font-black text-[#B89544] hover:underline">➕ إضافة ميزة</button>
                </div>
                {form.features.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input
                      type="text"
                      value={item}
                      onChange={e => updateArrayField('features', idx, e.target.value)}
                      className="flex-grow bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                      placeholder="مثال: تمثيل قانوني حاسم أمام اللجان العسكرية المختصة"
                    />
                    <button type="button" onClick={() => removeArrayField('features', idx)} className="text-red-500 hover:text-red-700 font-bold px-3">✕</button>
                  </div>
                ))}
              </div>

              {/* Dynamic array: Target Audience */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#0F172A]">لمن نقدم هذه الخدمة؟ (الجمهور المستهدف)</h4>
                  <button type="button" onClick={() => addArrayField('targetAudience')} className="text-xs font-black text-[#B89544] hover:underline">➕ إضافة فئة</button>
                </div>
                {form.targetAudience.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input
                      type="text"
                      value={item}
                      onChange={e => updateArrayField('targetAudience', idx, e.target.value)}
                      className="flex-grow bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                      placeholder="مثال: المتقاعدين العسكريين"
                    />
                    <button type="button" onClick={() => removeArrayField('targetAudience', idx)} className="text-red-500 hover:text-red-700 font-bold px-3">✕</button>
                  </div>
                ))}
              </div>

              {/* Dynamic objects: Legal Systems */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#0F172A]">الأنظمة والروابط الرسمية</h4>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, legalSystems: [...prev.legalSystems, { name: '', link: '' }] }))}
                    className="text-xs font-black text-[#B89544] hover:underline"
                  >
                    ➕ إضافة نظام
                  </button>
                </div>
                {form.legalSystems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-100 p-4 rounded-2xl relative">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">اسم النظام / المنصة</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={e => updateLegalSystem(idx, 'name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-2.5 px-4 rounded-lg focus:bg-white focus:border-[#B89544] transition-all outline-none text-xs"
                        placeholder="مثال: ديوان المظالم"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">رابط المنصة (اختياري)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={item.link}
                          onChange={e => updateLegalSystem(idx, 'link', e.target.value)}
                          className="flex-grow bg-slate-50 border border-slate-200 text-[#0F172A] py-2.5 px-4 rounded-lg focus:bg-white focus:border-[#B89544] transition-all outline-none text-xs"
                          placeholder="https://example.com"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const arr = [...form.legalSystems];
                            arr.splice(idx, 1);
                            setForm(prev => ({ ...prev, legalSystems: arr.length > 0 ? arr : [{ name: '', link: '' }] }));
                          }}
                          className="text-red-500 hover:text-red-700 font-bold px-2"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dynamic objects: FAQs */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#0F172A]">الأسئلة الشائعة للخدمة</h4>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, faq: [...prev.faq, { question: '', answer: '' }] }))}
                    className="text-xs font-black text-[#B89544] hover:underline"
                  >
                    ➕ إضافة سؤال
                  </button>
                </div>
                {form.faq.map((item, idx) => (
                  <div key={idx} className="border border-slate-100 p-6 rounded-2xl space-y-4 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-[#0F172A]">سؤال وجواب رقم {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const arr = [...form.faq];
                          arr.splice(idx, 1);
                          setForm(prev => ({ ...prev, faq: arr.length > 0 ? arr : [{ question: '', answer: '' }] }));
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-bold"
                      >
                        ✕ حذف السؤال
                      </button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">السؤال</label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={e => updateFAQ(idx, 'question', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-2.5 px-4 rounded-lg focus:bg-white focus:border-[#B89544] transition-all outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">الإجابة</label>
                      <textarea
                        rows={3}
                        value={item.answer}
                        onChange={e => updateFAQ(idx, 'answer', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-2.5 px-4 rounded-lg focus:bg-white focus:border-[#B89544] transition-all outline-none text-xs"
                      />
                    </div>
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
                  💾 حفظ البيانات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
