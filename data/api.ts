const API_BASE = '/backend';

// تحديد إذا كنا في بيئة التطوير المحلية
export const IS_DEV = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
     window.location.hostname === '127.0.0.1');

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  
  // دمج credentials بشكل دائم لضمان إرسال الكوكيز وجلسة العمل (Sessions)
  const defaultOptions: RequestInit = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Fetch error:', error);
    return { success: false, message: 'تعذر الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت' };
  }
}
