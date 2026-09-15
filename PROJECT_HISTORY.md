# Project History & SEO/GEO/AEO Baseline
# شركة مشعل بادغيش للمحاماة والاستشارات القانونية

---

## 1. Project Identity

* **Repository:** `rashed711/mishallow`
* **Production Website:** https://mishal-lawfirm.com
* **Production Platform:** Cloudflare Pages (Automated Deployment via `main` branch)
* **Technology Stack:**
  * **Core:** React 18, TypeScript, Tailwind CSS, Vanilla CSS
  * **Build Tool:** Vite 5
  * **Routing:** `react-router-dom` (v6)
  * **Animations:** `framer-motion`
  * **Meta Management:** `react-helmet-async`
  * **Pre-rendering Engine:** Custom Static Site Generation (`scripts/generate-static.cjs` + `entry-server.tsx`)
  * **Serverless Functions:** Cloudflare Pages Functions (`functions/_middleware.js`, `functions/send.js`)

---

## 2. Current Production Baseline

* **Active Production Branch:** `main`
* **Production HEAD SHA:** `ce255738f8bee72391276911c58b2490b9083872`
* **Release Status:** `PRODUCTION RELEASE SUCCESS` (State Verified & Live on Cloudflare)
* **Total Indexable Static Routes:** `54 / 54` routes pre-rendered with complete initial HTML body and JSON-LD schema.

---

## 3. Git & Branch History

1. **Development & Hardening on `V1`:**
   * A dedicated hardening branch (`V1`) was utilized to implement deep technical SEO, GEO entity alignment, AEO structured responses, and content quality refactoring.
   * Safety reference created: `backup/V1-before-seo-hardening` at commit `9e4c80f`.
   * `V1` was synchronized cleanly on top of `origin/main` via safe rebase without any architectural regressions.
2. **Pre-Merge Audit & Merge into `main`:**
   * Full pre-merge audit verified 0 conflicts, 0 regressions, and a clean direct ancestor relationship.
   * Fast-forward merge executed (`git merge --ff-only V1`), promoting `main` directly to commit `ce255738f8bee72391276911c58b2490b9083872` without merge commits.
   * `main` was verified through automated builds and 2,936 SEO tests before being pushed normally (`git push origin main`).
3. **Branch Cleanup (Main-Only Architecture):**
   * Non-main branches (`V1`, `backup/V1-before-seo-hardening`) were deleted locally and remotely.
   * The repository strictly maintains `main` as the single authoritative branch.
   * `origin/main` SHA remained byte-for-byte identical before and after cleanup (`ce255738f8bee72391276911c58b2490b9083872`).

---

## 4. SEO, GEO & AEO Work Completed

### أ. الهيكل الدلالي والمخططات البرمجية الموحدة (Schema.org Entity Graph)
* **المصدر المرجعي الموحد:** تم توحيد كافة بيانات الكيان والمؤسس والموقع في [data/siteSchema.ts](file:///d:/Programs/Androide/websites/mishallow/data/siteSchema.ts).
* **اسم الموقع المفضل (Preferred Site Name):**
  * `WebSite.name`: `"شركة مشعل بادغيش للمحاماة والاستشارات القانونية"`
  * `Organization.name`: `"شركة مشعل بادغيش للمحاماة والاستشارات القانونية"`
  * `og:site_name`: `"شركة مشعل بادغيش للمحاماة والاستشارات القانونية"`
  * `<title>`: يبدأ دائماً باسم الشركة الكامل.
* **الرسم البياني المتشابك (`@graph`):**
  * `LegalService / Organization` (`#organization`) مرتبط بـ `Person` المؤسس مشعل بادغيش (`#mishal-badghish`).
  * `WebSite` (`#website`) مرتبط بـ `WebPage` (`#webpage`) و `Service` / `BlogPosting` و `FAQPage`.
* **الحسابات الرسمية الموثقة (`sameAs`):** TikTok, LinkedIn, Facebook (مرتبطة بالمنشأة فقط وليس بكيان المؤسس الشخصي).

### ب. الضبط الجغرافي والكيان المكاني (GEO & Local Entity Authority)
* **المقر الفعلي والمادي الوحيد:** مكة المكرمة (`شارع عبدالله بن عباس - بجوار نادي ستار تراك - مكة المكرمة - 24353`).
* **نطاق التغطية والتمثيل القضائي المعلن:** مكة المكرمة ومحافظة جدة (`areaServed: ['Makkah', 'Jeddah']`).
* **عدم الإيهام بفروع وهمية:** منع أي إشارة توحي بوجود مقر أو فرع مادي منفصل في جدة.
* **الإحداثيات الجغرافية الرسمية:**
  * خط العرض (Latitude): `21.3719559`
  * خط الطول (Longitude): `39.7920768`
  * Plus Code: `9QCR+QR Makkah, Saudi Arabia`
  * وسوم الميتا: `geo.position`, `ICBM`, `geo.placename: Makkah`, `geo.region: SA-02`.
* **رابط خرائط جوجل المعتمد للمستخدمين:**
  * https://maps.app.goo.gl/3pHtRrMiMs4LA931A (مؤكد ومعتمد من المالك في زر الاتجاهات بصفحة التواصل).

### ج. تعميق المحتوى والأسئلة الإجرائية (AEO & Legal Content QA)
* **إزالة الحشو العشوائي (Keyword Stuffing Removal):** تنظيف التكرار الميكانيكي لأسماء الوزارات والمنصات (ناجز، قوى، وزارة العدل) وتحويلها إلى ذكر سياقي طبيعي وذي قيمة.
* **الأسئلة الشائعة العميقة (Deep FAQs):** إضافة وتدقيق 52 سؤالاً وجواباً إجرائياً عبر الـ 13 خدمة قانونية رئيسية، مربوطة برمجياً بـ `FAQPage` ومطابقة تماماً للمحتوى المرئي.
* **المقالات القانونية (28 مقالاً تخصصياً):**
  * تقسيم كل مقال عبر 3 إلى 5 عناوين H2 دلالية حقيقية داخل جسم النص.
  * إضافة روابط داخلية سياقية دقيقة (Contextual Internal Links) تربط المقالات بالخدمات التخصصية والصفحات الإجرائية.
* **تأهيل وكلاء الذكاء الاصطناعي (AI Search & Agent-Ready AEO):**
  * تفعيل استجابة Markdown مهيكلة عبر Cloudflare Middleware (`functions/_middleware.js`) للطلبات الحاملة لترويسة `Accept: text/markdown`.

### د. البنية التحتية للفهرسة والأمان التقني (Technical SEO Infrastructure)
* **التوليد الثابت (Static Prerendering):** بناء 54 ملف HTML حقيقي في مجلد `dist/` مع كامل وسوم `<h1>` والفقرات و JSON-LD.
* **الروابط الدائمة (Canonicals):** رابط كانونيكال ذاتي لكل صفحة بدون لواحق زائدة أو سلاش مكرر.
* **خريطة الموقع الموثوقة (`public/sitemap.xml`):** توليد تلقائي بـ 54 مساراً مع تواريخ `lastmod` حقيقية مستخرجة من تاريخ Git.
* **ملف الروبوتات (`public/robots.txt`):** ربط خريطة الموقع الرسمية وحماية المسارات الإدارية.
* **فاحص الجودة الشامل (`scripts/validate-seo.cjs`):** جناح فحص آلي يختبر 2,936 معياراً دلالياً وهيكلياً قبل كل عملية نشر.

---

## 5. Verified Business Data Summary

| الحقل | القيمة المعتمدة |
| :--- | :--- |
| **اسم المنشأة القانوني** | شركة مشعل بادغيش للمحاماة والاستشارات القانونية |
| **المؤسس والمدير العام** | المحامي والمستشار القانوني مشعل بادغيش |
| **المقر الرئيسي الفعلي** | شارع عبدالله بن عباس - بجوار نادي ستار تراك - مكة المكرمة - المملكة العربية السعودية |
| **الرمز البريدي** | 24353 |
| **الإحداثيات الجغرافية** | `21.3719559, 39.7920768` |
| **الرمز الإضافي (Plus Code)** | `9QCR+QR Makkah, Saudi Arabia` |
| **رابط خرائط جوجل** | `https://maps.app.goo.gl/3pHtRrMiMs4LA931A` |
| **نطاق تقديم الخدمات** | مكة المكرمة، ومحافظة جدة |
| **رقم الهاتف الموحد** | `+966568000085` |
| **البريد الإلكتروني الرسمي** | `info@mishal-lawfirm.com` |
| **الموقع الإلكتروني** | `https://mishal-lawfirm.com` |
| **العملة المقبولة** | `SAR` (ريال سعودي) |
| **ساعات العمل الرسمية** | الأحد - الخميس: 09:00 ص - 05:00 م |

---

## 6. Google Search Console Baseline

> [!NOTE]
> هذه الأرقام تمثل خط الأساس التاريخي المرصود من سجلات الفحص، وليست ضمانات دائمة:

* **فهرسة الصفحة الرئيسية:** مفهرسة ومثبتة برابط كانونيكال مطابق `https://mishal-lawfirm.com/`.
* **خريطة الموقع في GSC:** مقبولة ومرصودة بإجمالي 54 مساراً مكتشفاً.
* **فحص النتائج المنسقة (Rich Results):** صالح ومطابق لـ `Organization` و `LocalBusiness / LegalService` و `FAQPage`.
* **إحصائيات الأداء الأساسية:**
  * إجمالي النقرات (Clicks): `45`
  * إجمالي الظهور (Impressions): `1.46K`
  * متوسط نسبة النقر (CTR): `3.1%`
  * متوسط الترتيب (Average Position): `6.4`

---

## 7. Approved SEO Growth Roadmap

* **المرحلة 0 (Baseline & Data Cleanup):** توحيد بيانات الكيان، إزالة الحشو، ضبط المخططات، وتأكيد الإحداثيات (مكتملة 100%).
* **المرحلة 1 (Entity + Local Authority):** تعزيز التواجد الجغرافي الموثق في مكة وتغطية جدة، وضبط اسم الموقع لدى جوجل.
* **المرحلة 2 (Priority Money Pages):** التركيز على صفحات الخدمات التجارية والعمالية الأكثر طلباً:
  * `/commercial-lawyer-makkah`
  * `/commercial-lawyer-jeddah`
  * `/labor-lawyer-makkah`
  * `/labor-lawyer-jeddah`
  * `/family-lawyer-makkah`
* **المرحلة 3 (Topical Authority):** إثراء المقالات التخصصية وربطها بالأنظمة السعودية الحديثة (نظام الشركات، المعاملات المدنية، الإفلاس).
* **المرحلة 4 (GEO / AEO / AI Search):** تعزيز الهيكلة الدلالية لإجابات محركات البحث المعتمدة على الذكاء الاصطناعي (AI Overviews, SearchGPT).
* **المرحلة 5 (Local Authority without Doorway Pages):** تعميق المحتوى التخصصي لجدة ومكة بطريقة إجرائية حقيقية دون إنشاء صفحات بوابة (Doorway Pages) مكررة.
* **المرحلة 6 (Continuous Search Console Growth Loop):** مراجعة استعلامات GSC الدورية وتوسيع المحتوى وفق النوايا البحثية الناشئة.

---

## 8. Permanent Technical & Editorial Rules

1. **الالتزام بالأنظمة القضائية السعودية:** لا يجوز ذكر مواد نظامية أو مهل قانونية أو إجراءات قضائية دون الاستناد لمصادر رسمية معتمدة (وزارة العدل، قوى، المحاكم التجارية، ديوان المظالم).
2. **منع صفحات البوابة والحشو الجغرافي:** عدم تكرار صفحات مكررة المحتوى لاستهداف المدن (Doorway Pages)، وعدم ادعاء وجود مقر مادي في جدة.
3. **ثبات البنية البرمجية:** عدم تعديل بنية الرندرة المسبقة (Prerendering)، أو محرك Vite، أو هيكل التوجيه دون مبرر تقني موثق.
4. **التحقق المستمر:** تشغيل `npm run validate` واجتياز كافة الفحوصات الـ 2,936 بنسبة 100% قبل أي اعتماد.
5. **سلامة مستودع Git:** فرع `main` هو الفرع الإنتاجي الوحيد المحمي؛ وعدم استخدام `force-push` مطلقاً.

---

## 9. Content Integrity Review (ملاحظات التدقيق الداخلي للمحتوى)

تم رصد بعض العبارات الترويجية العامة الموروثة في بعض المكونات، والتي يوصى بمراجعتها مستقبلاً من قِبل إدارة الشركة لمطابقة الواقع المهني بدقة:

| الملف | النص المرصود | سبب الملاحظة | الأثر والتوصية |
| :--- | :--- | :--- | :--- |
| [components/Hero.tsx](file:///d:/Programs/Androide/websites/mishallow/components/Hero.tsx#L199) | `10+ أعوام من التميز` | إحصائية تسويقية عامة تحتاج إلى توثيق رسمي أو استبدالها برقم ترخيص المحاماة المعتمد. | يفضل مستقبلاً استبدالها بـ "محامون مرخصون وممارسون" لتعزيز الثقة المهنية. |
| [components/Hero.tsx](file:///d:/Programs/Androide/websites/mishallow/components/Hero.tsx#L217) | `98% نسبة الإنجاز` | نسب النجاح الإحصائية في المحاماة تخضع لضوابط الهيئة السعودية للمحامين لمنع الوعود الجازمة. | يفضل استبدالها بـ "تمثيل قضائي واستشارات متكاملة". |

---

## 10. Repository Inventory & Safety Classification

### أ. ملفات تم حذفها بأمان بعد التأكد القاطع من عدم استخدامها (Safe Deleted Files):
1. `data/services_clean.ts`: ملف مؤقت مهجور كان يحتوي على نسخة قديمة غير مستخدمة من الخدمات.
2. `scratch_articles.cjs`: سكريبت ترحيل مؤقت مهجور في المجلد الرئيسي.
3. `public/images/team/team-1 - Copy.webp`: صورة مكررة بالخطأ باسم غير نظامي.

### ب. ملفات البنية التحتية المحمية والمعتمدة (Core Maintained Files):
* **المسارات والصفحات:** `pages/` (12 صفحة تغطي كافة الخدمات والمقالات والسياسات والمجمع).
* **المكونات التفاعلية:** `components/` (واجهات المستخدم، شريط التنقل، التذييل، بطاقات الخدمات والمقالات، أيقونات SVG).
* **البيانات المركزية الموثوقة:** `data/` (`articles.ts`, `services.ts`, `quickServices.ts`, `siteSchema.ts`, `team.ts`).
* **أدوات البناء والفحص:** `scripts/` (`generate-static.cjs`, `validate-seo.cjs`, `validate-production.cjs`).
* **دوال السيرفر السحابي:** `functions/` (`_middleware.js`, `send.js`).
* **الأصول العامة وملفات الفهرسة:** `public/` (`sitemap.xml`, `robots.txt`, `404.html`, `_headers`, `_redirects`, `.well-known/`).
