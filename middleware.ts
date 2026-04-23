export default function middleware(request: Request) {
  const acceptHeader = request.headers.get('accept');
  
  if (acceptHeader && acceptHeader.includes('text/markdown')) {
    const markdown = `# مكتب مشعل بادغيش للمحاماة والاستشارات القانونية

مرحباً بك في النسخة المخصصة للوكلاء (Agent-Ready Version).

## نبذة عن المكتب
مكتب متخصص في تقديم الاستشارات القانونية والترافع أمام كافة المحاكم في المملكة العربية السعودية، مقرنا الرئيسي في مكة المكرمة.

## التخصصات والخدمات
- **القضايا العسكرية**: تظلمات وقضايا منسوبي القطاعات العسكرية.
- **القضايا التجارية**: تأسيس شركات، عقود، ونزاعات تجارية.
- **القضايا العمالية**: نزاعات العمل وحقوق الموظفين.
- **الأحوال الشخصية**: طلاق، حضانة، تركات وميراث.
- **القضايا الجنائية**: دفاع جنائي وجرائم معلوماتية.
- **صياغة العقود**: مراجعة وإعداد الاتفاقيات القانونية.
- **الاستشارات القانونية**: رأي قانوني متخصص.
- **تحصيل الديون**: استرداد الحقوق المالية.

## روابط سريعة
- [الرئيسية](https://mishallow.vercel.app/)
- [الخدمات القانونية](https://mishallow.vercel.app/services)
- [من نحن](https://mishallow.vercel.app/about)
- [اتصل بنا](https://mishallow.vercel.app/contact)
- [المقالات القانونية](https://mishallow.vercel.app/articles)

---
جميع الحقوق محفوظة لمكتب مشعل بادغيش للمحاماة © 2026`;

    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    });
  }
}

export const config = {
  matcher: '/',
};
