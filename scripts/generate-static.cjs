const fs   = require('fs');
const path = require('path');

const DIST_DIR    = path.join(__dirname, '../dist');
const INDEX_HTML  = path.join(DIST_DIR,  'index.html');
const BACKEND_SRC = path.join(__dirname, '../backend');
const BACKEND_DST = path.join(DIST_DIR,  'backend');
const SITEMAP_PUB = path.join(__dirname, '../public/sitemap.xml');
const SITEMAP_DST = path.join(DIST_DIR,  'sitemap.xml');

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

// ─── Helpers: Accurate Data Loaders for TS Data Files ────────────────────────
function loadServicesData() {
    const filePath = path.join(__dirname, '../data/services.ts');
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayMatch = content.match(/export\s+const\s+servicesData(?::\s*\w+(?:\[\])?)?\s*=\s*(\[[\s\S]*?\n\];)/);
    if (!arrayMatch) return [];
    const cleanJs = arrayMatch[1].replace(/;\s*$/, '').replace(/icon:\s*([A-Za-z0-9_]+)/g, 'icon: "$1"');
    try {
        const services = (new Function('return ' + cleanJs))();
        return services.map(s => ({
            slug: s.slug,
            title: s.seoTitle || s.title || 'شركة مشعل بادغيش للمحاماة',
            description: s.seoDescription || s.shortDescription || 'نقدم حلولاً قانونية استراتيجية تتوافق مع تطلعات المملكة.',
            image: s.image || '/images/logo/logo.webp',
            faq: s.faq || []
        }));
    } catch (e) {
        console.error('Error parsing servicesData:', e);
        return [];
    }
}

function loadArticlesData() {
    const filePath = path.join(__dirname, '../data/articles.ts');
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayMatch = content.match(/export\s+const\s+articles(?::\s*\w+(?:\[\])?)?\s*=\s*(\[[\s\S]*?\n\];)/);
    if (!arrayMatch) return [];
    const cleanJs = arrayMatch[1].replace(/;\s*$/, '');
    try {
        const articles = (new Function('return ' + cleanJs))();
        return articles.map(a => ({
            slug: a.slug,
            title: a.title ? `${a.title} | شركة مشعل بادغيش` : 'شركة مشعل بادغيش للمحاماة',
            description: a.excerpt || 'نقدم حلولاً قانونية استراتيجية تتوافق مع تطلعات المملكة.',
            image: a.image || '/images/logo/logo.webp',
            rawDate: a.rawDate || a.date
        }));
    } catch (e) {
        console.error('Error parsing articles:', e);
        return [];
    }
}

function loadQuickServicesData() {
    const filePath = path.join(__dirname, '../data/quickServices.ts');
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayMatch = content.match(/export\s+const\s+quickServicesData(?::\s*\w+(?:\[\])?)?\s*=\s*(\[[\s\S]*?\n\];)/);
    if (!arrayMatch) return [];
    const cleanJs = arrayMatch[1].replace(/;\s*$/, '');
    try {
        const categories = (new Function('return ' + cleanJs))();
        const items = [];
        categories.forEach(cat => {
            if (Array.isArray(cat.services)) {
                cat.services.forEach(s => {
                    items.push({
                        slug: s.slug,
                        title: `${s.title} | شركة مشعل بادغيش للمحاماة`,
                        description: (s.description || '').replace(/\n/g, ' ').substring(0, 160),
                        image: '/images/logo/logo.webp'
                    });
                });
            }
        });
        return items;
    } catch (e) {
        console.error('Error parsing quickServicesData:', e);
        return [];
    }
}

// ─── Helper: Generate JSON-LD Graph for a specific route ───────────────────────
function generatePageSchema(route, buildSchemaGraph) {
    const canonicalUrl = `https://mishal-lawfirm.com${route.path === '/' ? '' : route.path}`;

    let imageUrl = route.image;
    if (!imageUrl.startsWith('http')) {
        imageUrl = `https://mishal-lawfirm.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    }

    const isService = route.type === 'service' || route.type === 'quick';
    const isArticle = route.type === 'article';
    const isQuick = route.type === 'quick';

    const schemaGraph = buildSchemaGraph({
        pageUrl: canonicalUrl,
        pageTitle: route.title,
        pageDescription: route.description,
        pageType: isService ? 'service' : (isArticle ? 'article' : 'website'),
        imageUrl: imageUrl,
        datePublished: isArticle ? (route.rawDate || route.date) : undefined,
        serviceType: route.type === 'service' ? route.title : undefined,
        quickServiceName: isQuick ? route.title.split('|')[0].trim() : undefined,
        faqs: (route.faq && route.faq.length > 0) ? route.faq : (route.faqs && route.faqs.length > 0 ? route.faqs : undefined),
        breadcrumbs: isQuick ? [
            { name: 'خدمات سريعة', url: 'https://mishal-lawfirm.com/quick-services' },
            { name: route.title.split('|')[0].trim(), url: canonicalUrl }
        ] : undefined
    });

    return JSON.stringify(schemaGraph, null, 2);
}

// ─── Helper: Generate sitemap.xml ─────────────────────────────────────────────
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
        if (r.type === 'article' && r.rawDate) {
            xml += `    <lastmod>${r.rawDate}</lastmod>\n`;
        }
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;
    return xml;
}

// ─── Main Execution ───────────────────────────────────────────────────────────
async function run() {
    console.log('🚀 Starting Pre-rendering and SEO sync script...');

    const { buildSchemaGraph } = await import('../data/siteSchema.ts');

    if (!fs.existsSync(INDEX_HTML)) {
        console.error('❌ dist/index.html not found! Run npm run build first.');
        process.exit(1);
    }

    const template = fs.readFileSync(INDEX_HTML, 'utf8');

    const services = loadServicesData();
    const articles = loadArticlesData();
    const quickServices = loadQuickServicesData();

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

        // Update Canonical Tag (avoid trailing slashes on non-root pages)
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
        const pageSchema = generatePageSchema(route, buildSchemaGraph);
        const schemaBlock = `<script type="application/ld+json">\n${pageSchema}\n  </script>`;
        const schemaRegex = /<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i;
        if (html.match(schemaRegex)) {
            html = html.replace(schemaRegex, schemaBlock);
        }

        fs.writeFileSync(path.join(routeDir, 'index.html'), html);
        console.log(`✅ Pre-rendered: ${route.path}`);
    }

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
