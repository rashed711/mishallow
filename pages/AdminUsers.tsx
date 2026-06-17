import React, { useState, useEffect } from 'react';
import { apiFetch } from '../data/api';

interface User {
  id: number;
  username: string;
  role: string;
  created_at: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    id: 0,
    username: '',
    password: '',
    role: 'editor',
  });

  const fetchUsers = async () => {
    setLoading(true);
    const res = await apiFetch('/users.php');
    if (res.success && res.users) {
      setUsers(res.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenAdd = () => {
    setForm({ id: 0, username: '', password: '', role: 'editor' });
    setEditMode(false);
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (user: User) => {
    setForm({ id: user.id, username: user.username, password: '', role: user.role });
    setEditMode(true);
    setError('');
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المشرف؟')) return;

    const res = await apiFetch(`/users.php?id=${id}`, {
      method: 'DELETE',
    });

    if (res.success) {
      fetchUsers();
    } else {
      alert(res.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await apiFetch('/users.php', {
      method: editMode ? 'PUT' : 'POST',
      body: JSON.stringify(form),
    });

    if (res.success) {
      setShowModal(false);
      fetchUsers();
    } else {
      setError(res.message || 'فشل حفظ بيانات المشرف');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#0F172A]">إدارة المشرفين والمستخدمين</h2>
          <p className="text-xs text-slate-400 font-bold mt-1">إضافة مشرفين وتحديد صلاحياتهم للتحكم باللوحة</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black px-6 py-3.5 rounded-xl shadow-lg transition-all text-sm"
        >
          ➕ إضافة مشرف جديد
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 font-bold">جاري تحميل المستخدمين...</div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-black">
                <th className="p-6">اسم المستخدم</th>
                <th className="p-6">الصلاحية</th>
                <th className="p-6">تاريخ الإنشاء</th>
                <th className="p-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#B89544]/10 text-[#B89544] flex items-center justify-center font-black text-sm">
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-sm text-[#0F172A]">{u.username}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`text-xs font-black px-3.5 py-1.5 rounded-full ${
                      u.role === 'admin'
                        ? 'bg-red-500/10 text-red-600'
                        : 'bg-blue-500/10 text-blue-600'
                    }`}>
                      {u.role === 'admin' ? 'مدير كامل الصلاحية' : 'محرر محتوى'}
                    </span>
                  </td>
                  <td className="p-6 text-slate-500 font-medium text-xs">{u.created_at}</td>
                  <td className="p-6 text-center flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleOpenEdit(u)}
                      className="px-4 py-2 rounded-lg bg-[#B89544]/10 text-[#B89544] font-bold text-xs hover:bg-[#B89544] hover:text-white transition-all"
                    >
                      📝 تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
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
          <div className="bg-white rounded-[2.5rem] max-w-md w-full p-10 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 left-6 text-2xl text-slate-400 hover:text-[#0F172A]"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-[#0F172A] mb-2">
              {editMode ? '📝 تعديل بيانات المشرف' : '➕ إضافة مشرف جديد'}
            </h3>
            <p className="text-xs text-slate-400 font-bold mb-8">يرجى كتابة البيانات وتحديد الصلاحية</p>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-500 px-5 py-4 rounded-xl text-xs font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-right">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 block">اسم المستخدم</label>
                <input
                  type="text"
                  required
                  disabled={editMode}
                  value={form.username}
                  onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm disabled:opacity-50"
                  placeholder="أدخل اسم المستخدم..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 block">
                  {editMode ? 'كلمة المرور الجديدة (اتركها فارغة لعدم التعديل)' : 'كلمة المرور'}
                </label>
                <input
                  type="password"
                  required={!editMode}
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                  placeholder={editMode ? 'اتركها فارغة...' : 'أدخل كلمة المرور...'}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 block">الصلاحية</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#B89544] transition-all outline-none font-medium text-sm"
                >
                  <option value="admin">مدير كامل الصلاحية (Admin)</option>
                  <option value="editor">محرر محتوى فقط (Editor)</option>
                </select>
              </div>

              <div className="border-t border-slate-100 pt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-all text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-[#B89544] text-white hover:text-[#0F172A] font-black shadow-lg transition-all text-sm"
                >
                  💾 حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
