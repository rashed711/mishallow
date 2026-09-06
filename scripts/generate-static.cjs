const fs   = require('fs');
const path = require('path');

const DIST_DIR    = path.join(__dirname, '../dist');
const INDEX_HTML  = path.join(DIST_DIR,  'index.html');
const BACKEND_SRC = path.join(__dirname, '../backend');
const BACKEND_DST = path.join(DIST_DIR,  'backend');
const SITEMAP_PUB = path.join(__dirname, '../public/sitemap.xml');
const SITEMAP_DST = path.join(DIST_DIR,  'sitemap.xml');
const NOT_FOUND_PUB = path.join(__dirname, '../public/404.html');
const NOT_FOUND_DST = path.join(DIST_DIR,  '404.html');

// ─── Helper: Copy directory recursively ───────────────────────────────────────
function copyDirSync(src, dst) {
    if (!fs.existsSync(dst)) {
        fs.mkdirSync(dst, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const dstPath = path.join(dst, entry.name);
        if (entry.isDirectory()) {
            copyDirSync(srcPath, dstPath);
        } else {
            fs.copyFileSync(srcPath, dstPath);
        }
    }
}

// ─── Helper: Extract data from TS files using Regex ───────────────────────────
function extractData(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    const items = [];

    const blockRegex = /\{[\s\S]*?slug:\s*['\"](.*?)['\"][\s\S]*?\}/g;
    let match;

    while ((match = blockRegex.exec(content)) !== null) {
        const block = match[0];

        const slugMatch     = block.match(/slug:\s*['\"](.*?)['\"]/);
        const seoTitleMatch = block.match(/seoTitle:\s*['\"](.*?)['\"]/);
        const titleMatch    = seoTitleMatch || block.match(/title:\s*['\"](.*?)['\"]/);
        const seoDescMatch  = block.match(/seoDescription:\s*['\"](.*?)['\"]/);
        const descMatch     = seoDescMatch || block.match(/(excerpt|description):\s*['\"](.*?)['\"]/);
        const imageMatch    = block.match(/image:\s*['\"](.*?)['\"]/);
        const rawDateMatch  = block.match(/rawDate:\s*['\"](.*?)['\"]/);
        const dateMatch     = block.match(/date:\s*['\"](.*?)['\"]/);

        // Extract FAQs if present
        const faqs = [];
        const faqBlockMatch = block.match(/faq:\s*\[([\s\S]*?)\]/);
        if (faqBlockMatch) {
            const faqItemsRegex = /\{[\s\S]*?question:\s*['\"](.*?)['\"][\s\S]*?answer:\s*['\"]([\s\S]*?)['\"][\s\S]*?\}/g;
            let faqMatch;
            while ((faqMatch = faqItemsRegex.exec(faqBlockMatch[1])) !== null) {
                faqs.push({
                    question: faqMatch[1],
                    answer: faqMatch[2].replace(/\\n/g, ' ').trim()
                });
            }
        }

        if (slugMatch) {
            items.push({
                slug:        slugMatch[1],
                title:       titleMatch ? titleMatch[1] : 'شركة مشعل بادغيش للمحاماة',
                description: descMatch  ? (seoDescMatch ? seoDescMatch[1] : descMatch[2] || descMatch[1]) : 'نقدم حلولاً قانونية استراتيجية تتوافق مع تطلعات المملكة.',
                image:       imageMatch ? imageMatch[1]  : '/images/logo/logo.webp',
                rawDate:     rawDateMatch ? rawDateMatch[1] : (dateMatch && /^\d{4}-\d{2}-\d{2}$/.test(dateMatch[1]) ? dateMatch[1] : null),
                faqs:        faqs
            });
        }
    }
    return items;
}

// Extract Quick Services
function extractQuickServices(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    const items = [];
    const blockRegex = /\{[\s\S]*?slug:\s*['\"](.*?)['\"][\s\S]*?title:\s*['\"](.*?)['\"][\s\S]*?description:\s*['\"]([\s\S]*?)['\"][\s\S]*?\}/g;
    let match;

    while ((match = blockRegex.exec(content)) !== null) {
        const slug = match[1];
        const title = match[2];
        const desc = match[3].replace(/\\n/g, ' ').substring(0, 160);
        items.push({
            slug,
            title: `${title} | شركة مشعل بادغيش للمحاماة`,
            serviceName: title,
            description: desc,
            image: '/images/logo/logo.webp'
        });
    }
    return items;
}

// ─── Helper: Generate Unified JSON-LD Graph (Matching data/siteSchema.ts) ──────
function generatePageSchema(route) {
    const canonicalUrl = `https://mishal-lawfirm.com${route.path === '/' ? '' : route.path}`;

    let imageUrl = route.image || '/images/logo/logo.webp';
    if (!imageUrl.startsWith('http')) {
        imageUrl = `https://mishal-lawfirm.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    }

    const orgId = "https://mishal-lawfirm.com/#organization";
    const websiteId = "https://mishal-lawfirm.com/#website";
    const webpageId = `${canonicalUrl}#webpage`;

    const organizationEntity = {
        "@type": "LegalService",
        "@id": orgId,
        "name": "شركة مشعل بادغيش للمحاماة والاستشارات القانونية",
        "alternateName": [
            "شركة مشعل بادغيش للمحاماة والاستشارات القانونية",
            "شركة مشعل بادغيش للمحاماة",
            "مكتب المحامي مشعل بادغيش",
            "شركة محاماة في مكة وجدة"
        ],
        "url": "https://mishal-lawfirm.com",
        "logo": "https://mishal-lawfirm.com/images/logo/logo.webp",
        "image": "https://mishal-lawfirm.com/images/logo/logo.webp",
        "telephone": "+966568000085",
        "email": "info@mishal-lawfirm.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "شارع عبدالله بن عباس، بجوار نادي ستار تراك",
            "addressLocality": "Makkah",
            "addressRegion": "Makkah Province",
            "postalCode": "24353",
            "addressCountry": "SA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 21.3508,
            "longitude": 39.8821
        },
        "areaServed": [
            { "@type": "City", "name": "Makkah", "sameAs": "https://en.wikipedia.org/wiki/Mecca" },
            { "@type": "City", "name": "Jeddah", "sameAs": "https://en.wikipedia.org/wiki/Jeddah" }
        ],
        "founder": {
            "@type": "Person",
            "name": "مشعل بادغيش",
            "jobTitle": "محامي ومستشار قانوني مرخص"
        },
        "knowsAbout": [
            "الأنظمة واللوائح القضائية في المملكة العربية السعودية",
            "نظام المعاملات المدنية السعودي",
            "نظام الشركات السعودي الجديد",
            "نظام العمل والتأمينات الاجتماعية",
            "نظام الإجراءات الجزائية ومكافحة الجرائم المعلوماتية",
            "منظومة القضاء التجاري وإعادة التنظيم المالي",
            "بوابة ناجز وخدمات وزارة العدل السعودية",
            "منصة معين الرقمية بديوان المظالم",
            "منصة قوى لوزارة الموارد البشرية والتنمية الاجتماعية"
        ]
    };

    const websiteEntity = {
        "@type": "WebSite",
        "@id": websiteId,
        "url": "https://mishal-lawfirm.com",
        "name": "شركة مشعل بادغيش للمحاماة",
        "alternateName": [
            "شركة مشعل بادغيش للمحاماة والاستشارات القانونية",
            "شركة مشعل بادغيش للمحاماة",
            "مكتب المحامي مشعل بادغيش",
            "شركة محاماة في مكة وجدة"
        ],
        "publisher": { "@id": orgId },
        "inLanguage": "ar"
    };

    const webPageEntity = {
        "@type": "WebPage",
        "@id": webpageId,
        "url": canonicalUrl,
        "name": route.title,
        "description": route.description,
        "isPartOf": { "@id": websiteId },
        "about": { "@id": orgId },
        "inLanguage": "ar"
    };

    const graph = [organizationEntity, websiteEntity, webPageEntity];

    // Breadcrumbs
    const breadcrumbElements = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "الرئيسية",
            "item": { "@id": "https://mishal-lawfirm.com/" }
        }
    ];

    if (route.type === 'service') {
        breadcrumbElements.push(
            {
                "@type": "ListItem",
                "position": 2,
                "name": "الخدمات",
                "item": { "@id": "https://mishal-lawfirm.com/services" }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": route.title,
                "item": { "@id": canonicalUrl }
            }
        );
    } else if (route.type === 'article') {
        breadcrumbElements.push(
            {
                "@type": "ListItem",
                "position": 2,
                "name": "المقالات",
                "item": { "@id": "https://mishal-lawfirm.com/articles" }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": route.title,
                "item": { "@id": canonicalUrl }
            }
        );
    } else if (route.type === 'quick') {
        breadcrumbElements.push(
            {
                "@type": "ListItem",
                "position": 2,
                "name": "الخدمات السريعة",
                "item": { "@id": "https://mishal-lawfirm.com/quick-services" }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": route.title,
                "item": { "@id": canonicalUrl }
            }
        );
    }

    if (breadcrumbElements.length > 1) {
        graph.push({
            "@type": "BreadcrumbList",
            "@id": `${canonicalUrl}#breadcrumb`,
            "itemListElement": breadcrumbElements
        });
    }

    // Service entity (for main services and quick services)
    if (route.type === 'service' || route.type === 'quick') {
        const serviceId = `${canonicalUrl}#service`;
        webPageEntity.mainEntity = { "@id": serviceId };

        const serviceEntity = {
            "@type": "Service",
            "@id": serviceId,
            "name": route.title,
            "description": route.description,
            "serviceType": route.type === 'quick' ? 'خدمات قانونية سريعة' : 'خدمات واستشارات قانونية',
            "provider": { "@id": orgId },
            "areaServed": [
                { "@type": "City", "name": "Makkah", "sameAs": "https://en.wikipedia.org/wiki/Mecca" },
                { "@type": "City", "name": "Jeddah", "sameAs": "https://en.wikipedia.org/wiki/Jeddah" }
            ],
            ...(route.serviceName && {
                "offers": {
                    "@type": "Offer",
                    "name": route.serviceName,
                    "offeredBy": { "@id": orgId }
                }
            })
        };
        graph.push(serviceEntity);

        if (route.faqs && route.faqs.length > 0) {
            graph.push({
                "@type": "FAQPage",
                "@id": `${canonicalUrl}#faq`,
                "mainEntity": route.faqs.map(item => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.answer
                    }
                }))
            });
        }
    }

    // Article entity (Real dates only - NO fabricated dates)
    if (route.type === 'article') {
        const articleId = `${canonicalUrl}#article`;
        webPageEntity.mainEntity = { "@id": articleId };

        const articleEntity = {
            "@type": "BlogPosting",
            "@id": articleId,
            "headline": route.title,
            "description": route.description,
            "url": canonicalUrl,
            "image": imageUrl,
            "author": {
                "@type": "Person",
                "name": "مشعل بادغيش",
                "jobTitle": "محامي ومستشار قانوني مرخص"
            },
            "publisher": { "@id": orgId },
            "isPartOf": { "@id": websiteId },
            "inLanguage": "ar"
        };

        if (route.rawDate) {
            articleEntity.datePublished = route.rawDate;
        }

        graph.push(articleEntity);
    }

    return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

// ─── Helper: Generate sitemap.xml (Real modification dates only) ──────────────
function generateSitemapXml(routes) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    routes.forEach(r => {
        let loc = `https://mishal-lawfirm.com${r.path === '/' ? '/' : r.path}`;
        let priority = '0.7';
        let changefreq = 'monthly';

        if (r.path === '/') {
            priority = '1.0';
            changefreq = 'daily';
        } else if (['/about', '/services', '/articles', '/contact'].includes(r.path)) {
            priority = '0.9';
            changefreq = 'weekly';
        } else if (r.type === 'service') {
            priority = '0.8';
            changefreq = 'monthly';
        } else if (r.type === 'article') {
            priority = '0.7';
            changefreq = 'monthly';
        } else if (['/privacy', '/terms'].includes(r.path)) {
            priority = '0.3';
            changefreq = 'yearly';
        }

        xml += `  <url>\n`;
        xml += `    <loc>${loc}</loc>\n`;
        // ONLY include lastmod when a REAL date exists (e.g. article rawDate). Omit otherwise.
        if (r.rawDate && /^\d{4}-\d{2}-\d{2}$/.test(r.rawDate)) {
            xml += `    <lastmod>${r.rawDate}</lastmod>\n`;
        }
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;
    return xml;
}

// ─── Helper: Generate 404 HTML ────────────────────────────────────────────────
function generate404Html(template) {
    let html = template;
    const title = '404 - الصفحة غير موجودة | شركة مشعل بادغيش للمحاماة';
    const description = 'عذراً، الرابط الذي حاولت الوصول إليه غير موجود أو تم نقله. يمكنك العودة إلى الصفحة الرئيسية أو التواصل معنا.';

    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    html = html.replace(/<meta\s+name=["']robots["']\s+content=".*?"\s*\/?>/i, '<meta name="robots" content="noindex, nofollow, noarchive" />');
    html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, '');

    const metaTags = [
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { name: 'description', content: description },
        { name: 'robots', content: 'noindex, nofollow, noarchive' }
    ];

    metaTags.forEach(meta => {
        const attr = meta.property ? `property="${meta.property}"` : `name="${meta.name}"`;
        const regex = new RegExp(`<meta\\s+${attr.replace(/"/g, '[\"\']')}\\s+content=".*?"\\s*/?>`, 'i');
        if (html.match(regex)) {
            html = html.replace(regex, `<meta ${attr} content="${meta.content}" />`);
        } else {
            html = html.replace('</title>', `</title>\n  <meta ${attr} content="${meta.content}" />`);
        }
    });

    // Remove JSON-LD from 404 page
    html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i, '');

    const notFoundPrerender = `
    <div id="root">
      <div class="min-h-screen bg-[#0F172A] text-white flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div class="text-7xl font-bold text-[#B89544] mb-4 font-mono">404</div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white mb-4">الصفحة المطلوبة غير موجودة</h1>
        <p class="text-slate-300 text-base leading-relaxed mb-8 max-w-lg">عذراً، يبدو أن الرابط الذي تبحث عنه قد تم نقله أو حذفه، أو أن العنوان الذي تم إدخاله غير صحيح.</p>
        <div class="flex gap-4">
          <a href="/" class="px-6 py-3 rounded-lg bg-[#B89544] text-[#0F172A] font-bold text-sm">العودة للرئيسية</a>
          <a href="/services" class="px-6 py-3 rounded-lg bg-white/10 text-white font-medium text-sm">تصفح الخدمات</a>
        </div>
      </div>
    </div>`;

    html = html.replace(/<div id="root"><\/div>/, notFoundPrerender.trim());
    return html;
}

// ─── Main Execution ───────────────────────────────────────────────────────────
async function run() {
    console.log('🚀 Starting Pre-rendering and SEO sync script...');

    if (!fs.existsSync(INDEX_HTML)) {
        console.error('❌ dist/index.html not found! Run npm run build first.');
        process.exit(1);
    }

    const template = fs.readFileSync(INDEX_HTML, 'utf8');

    const services = extractData(path.join(__dirname, '../data/services.ts'));
    const articles = extractData(path.join(__dirname, '../data/articles.ts'));
    const quickServices = extractQuickServices(path.join(__dirname, '../data/quickServices.ts'));

    const staticPages = [
        {
            path: '/',
            title: 'المحامي مشعل بادغيش | مكتب محاماة معتمد في مكة وجدة',
            description: 'مكتب المحامي مشعل بادغيش للمحاماة والاستشارات في مكة وجدة. تمثيل قضائي في القضايا التجارية، الجنائية، العمالية، والعقارية. تواصل معنا الآن.',
            image: '/images/logo/logo.webp',
            type: 'static'
        },
        {
            path: '/about',
            title: 'من نحن | مكتب المحامي مشعل | نخبة محامين في مكة وجدة',
            description: 'تعرف على شركة المحامي مشعل بادغيش. نخبة من أفضل المحامين والمستشارين في مكة وجدة لتقديم استشارات قانونية وتمثيل قضائي احترافي للأفراد والشركات.',
            image: '/images/logo/logo.webp',
            type: 'static'
        },
        {
            path: '/contact',
            title: 'تواصل مع مكتب المحامي مشعل | استشارات قانونية في مكة وجدة',
            description: 'احجز استشارتك القانونية الآن مع نخبة من المحامين المعتمدين في مكة وجدة. تمثيل قضائي واستشارات تجارية وجنائية متخصصة. تواصل معنا مباشرة.',
            image: '/images/logo/logo.webp',
            type: 'static'
        },
        {
            path: '/services',
            title: 'الخدمات القانونية | مكتب المحامي مشعل في مكة وجدة',
            description: 'خدمات واستشارات قانونية متكاملة في مكة وجدة: قضايا تجارية، دفاع جنائي، عمالية، عقارية وصياغة عقود. تمثيل قضائي مرخص أمام كافة المحاكم.',
            image: '/images/logo/logo.webp',
            type: 'static'
        },
        {
            path: '/articles',
            title: 'المدونة القانونية | مقالات واستشارات الأنظمة السعودية',
            description: 'دليل قانوني ومقالات متخصصة في الأنظمة السعودية، نظام الشركات، العمل، والقضايا التجارية والجنائية يقدمها نخبة مستشاري مكتب المحامي مشعل.',
            image: '/images/logo/logo.webp',
            type: 'static'
        },
        {
            path: '/quick-services',
            title: 'خدمات قانونية سريعة | استشارات فورية في مكة وجدة',
            description: 'احصل على خدمات قانونية سريعة وموثوقة: استشارات فورية، صياغة لوائح وتوكيلات. تواصل معنا مباشرة عبر الواتساب لإنجاز معاملاتك بأعلى سرية.',
            image: '/images/logo/logo.webp',
            type: 'static'
        },
        {
            path: '/privacy',
            title: 'سياسة الخصوصية | شركة مشعل بادغيش للمحاماة',
            description: 'نحن في شركة مشعل بادغيش نلتزم بأعلى معايير الخصوصية والسرية المهنية لبياناتكم ومعلوماتكم القانونية وفق أنظمة المملكة العربية السعودية.',
            image: '/images/logo/logo.webp',
            type: 'static'
        },
        {
            path: '/terms',
            title: 'اتفاقية الاستخدام | شركة مشعل بادغيش للمحاماة',
            description: 'تعرف على شروط وأحكام استخدام موقع شركة مشعل بادغيش للمحاماة. القواعد المنظمة لاستخدام المحتوى القانوني والملكيات الفكرية.',
            image: '/images/logo/logo.webp',
            type: 'static'
        }
    ];

    const routes = [
        ...staticPages,
        ...services.map(s => ({ path: `/${s.slug}`, type: 'service', ...s })),
        ...articles.map(a => ({ path: `/articles/${a.slug}`, type: 'article', ...a })),
        ...quickServices.map(q => ({ path: `/quick-services/${q.slug}`, type: 'quick', ...q }))
    ];

    console.log(`Found ${routes.length} routes to process.`);

    for (const route of routes) {
        // Skip '/' directory writing since index.html already is the root
        if (route.path === '/') continue;

        const routeDir = path.join(DIST_DIR, route.path);

        if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
        }

        let imageUrl = route.image;
        if (!imageUrl.startsWith('http')) {
            imageUrl = `https://mishal-lawfirm.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }

        let html = template;

        // Replace Title
        html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

        // Update Canonical Tag (clean URL without trailing slashes on non-root pages)
        const canonicalUrl = `https://mishal-lawfirm.com${route.path}`;
        const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
        const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i;
        if (html.match(canonicalRegex)) {
            html = html.replace(canonicalRegex, canonicalTag);
        } else {
            html = html.replace('</head>', `  ${canonicalTag}\n</head>`);
        }

        // Meta tags
        const metaTags = [
            { property: 'og:title',       content: route.title },
            { property: 'og:description', content: route.description },
            { property: 'og:image',       content: imageUrl },
            { property: 'og:url',         content: canonicalUrl },
            { name: 'twitter:title',       content: route.title },
            { name: 'twitter:description', content: route.description },
            { name: 'twitter:image',       content: imageUrl },
            { name: 'description',         content: route.description },
            { itemprop: 'image',           content: imageUrl }
        ];

        metaTags.forEach(meta => {
            const attr  = meta.property
                ? `property="${meta.property}"`
                : (meta.name ? `name="${meta.name}"` : `itemprop="${meta.itemprop}"`);
            const regex = new RegExp(`<meta\\s+${attr.replace(/"/g, '[\"\']')}\\s+content=".*?"\\s*/?>`, 'i');

            if (html.match(regex)) {
                html = html.replace(regex, `<meta ${attr} content="${meta.content}" />`);
            } else {
                html = html.replace('</title>', `</title>\n  <meta ${attr} content="${meta.content}" />`);
            }
        });

        // Inject Page-Specific JSON-LD Schema
        const pageSchema = generatePageSchema(route);
        const schemaBlock = `<script type="application/ld+json">\n${pageSchema}\n  </script>`;
        const schemaRegex = /<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i;
        if (html.match(schemaRegex)) {
            html = html.replace(schemaRegex, schemaBlock);
        }

        // Inject Clean Semantic Initial HTML inside #root (No display:none / aria-hidden hacks)
        const staticPrerenderMarkup = `
    <div id="root">
      <header class="sr-only">
        <h1>${route.title}</h1>
        <p>${route.description}</p>
      </header>
    </div>`;
        html = html.replace(/<div id="root"><\/div>/, staticPrerenderMarkup.trim());

        fs.writeFileSync(path.join(routeDir, 'index.html'), html);
        console.log(`✅ Pre-rendered: ${route.path}`);
    }

    // ─── توليد وحفظ 404.html المستقل ──────────────────────────────────────────
    console.log('\n📄 Generating standalone 404.html...');
    const notFoundHtml = generate404Html(template);
    fs.writeFileSync(NOT_FOUND_PUB, notFoundHtml);
    fs.writeFileSync(NOT_FOUND_DST, notFoundHtml);
    console.log('✅ 404.html generated successfully.');

    console.log('✨ Pre-rendering complete!');

    // ─── توليد وحفظ sitemap.xml ──────────────────────────────────────────────
    console.log('\n🗺️  Generating dynamic sitemap.xml...');
    const sitemapContent = generateSitemapXml(routes);
    fs.writeFileSync(SITEMAP_PUB, sitemapContent);
    fs.writeFileSync(SITEMAP_DST, sitemapContent);
    console.log(`✅ sitemap.xml generated with ${routes.length} verified URLs.`);

    // ─── نسخ مجلد backend/ كاملاً إلى dist/backend/ ───────────────────────────
    if (fs.existsSync(BACKEND_SRC)) {
        console.log('\n📦 Copying backend/ → dist/backend/ ...');
        copyDirSync(BACKEND_SRC, BACKEND_DST);
        console.log('✅ backend/ copied to dist/backend/');
    } else {
        console.warn('⚠️  backend/ folder not found – skipping copy.');
    }

    console.log('\n🎉 Build complete! Upload everything inside dist/ to public_html/');
}

run().catch(err => {
    console.error('❌ Error during pre-rendering:', err);
    process.exit(1);
});
