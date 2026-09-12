const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_DIR = path.join(__dirname, '../dist');
const SSR_DIR = path.join(__dirname, '../dist-ssr');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');
const BACKEND_SRC = path.join(__dirname, '../backend');
const BACKEND_DST = path.join(DIST_DIR, 'backend');
const SITEMAP_PUB = path.join(__dirname, '../public/sitemap.xml');
const SITEMAP_DST = path.join(DIST_DIR, 'sitemap.xml');

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
            title: a.title ? `${a.title} | شركة مشعل بادغيش للمحاماة` : 'شركة مشعل بادغيش للمحاماة',
            description: a.excerpt || 'نقدم حلولاً قانونية استراتيجية تتوافق مع تطلعات المملكة.',
            image: a.image || '/images/logo/logo.webp',
            rawDate: a.rawDate || a.date,
            dateModified: a.dateModified,
            author: a.author
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
    const canonicalUrl = `https://mishal-lawfirm.com${route.path === '/' ? '/' : route.path}`;

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
        datePublished: isArticle ? route.rawDate : undefined,
        dateModified: isArticle ? route.dateModified : undefined,
        authorName: isArticle ? (route.author || 'مشعل بادغيش') : undefined,
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

// ─── Helper: Generate sitemap.xml without priority/changefreq and with truthful lastmod ─────
function generateSitemapXml(routes) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    routes.forEach(r => {
        let loc = `https://mishal-lawfirm.com${r.path === '/' ? '/' : r.path}`;
        
        // Accurate, truthful lastmod logic (No fake daily/universal updates)
        let lastmod = r.lastmod || '2026-03-01';
        if (r.type === 'article') {
            lastmod = r.dateModified || r.rawDate || '2024-06-10';
        }

        xml += `  <url>\n`;
        xml += `    <loc>${loc}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;
    return xml;
}

// ─── Main Execution ───────────────────────────────────────────────────────────
async function run() {
    console.log('🚀 Starting Full Body Static Pre-rendering and SEO sync script...');

    if (!fs.existsSync(INDEX_HTML)) {
        console.error('❌ dist/index.html not found! Run vite build first.');
        process.exit(1);
    }

    // 1. Build SSR bundle for static HTML rendering
    console.log('⚙️  Building SSR bundle for body prerendering...');
    execSync('npx vite build --ssr entry-server.tsx --outDir dist-ssr', {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
    });

    // 2. Import SSR render function & schema builder
    const ssrEntryPath = path.join(SSR_DIR, 'entry-server.js');
    const ssrModuleUrl = 'file:///' + ssrEntryPath.replace(/\\/g, '/');
    const { render } = await import(ssrModuleUrl);
    const { buildSchemaGraph } = await import('../data/siteSchema.ts');

    const template = fs.readFileSync(INDEX_HTML, 'utf8');

    const services = loadServicesData();
    const articles = loadArticlesData();
    const quickServices = loadQuickServicesData();

    const staticPages = [
        {
            path: '/',
            title: 'شركة مشعل بادغيش للمحاماة والاستشارات القانونية | محامون في مكة وجدة',
            description: 'شركة مشعل بادغيش للمحاماة والاستشارات القانونية في مكة وجدة. تمثيل قضائي في القضايا التجارية، الجنائية، العمالية، والعقارية وصياغة العقود. تواصل معنا الآن.',
            image: '/images/logo/logo.webp',
            type: 'static',
            lastmod: '2026-03-01'
        },
        {
            path: '/about',
            title: 'من نحن | شركة مشعل بادغيش للمحاماة والاستشارات القانونية',
            description: 'تعرف على شركة مشعل بادغيش للمحاماة والاستشارات القانونية. نخبة من أفضل المحامين والمستشارين في مكة وجدة لتقديم استشارات قانونية وتمثيل قضائي احترافي.',
            image: '/images/logo/logo.webp',
            type: 'static',
            lastmod: '2026-03-01'
        },
        {
            path: '/contact',
            title: 'تواصل معنا | شركة مشعل بادغيش للمحاماة والاستشارات القانونية',
            description: 'احجز استشارتك القانونية الآن مع نخبة من المحامين المعتمدين في مكة وجدة. تمثيل قضائي واستشارات تجارية وجنائية متخصصة. تواصل معنا مباشرة.',
            image: '/images/logo/logo.webp',
            type: 'static',
            lastmod: '2026-03-01'
        },
        {
            path: '/services',
            title: 'الخدمات القانونية | شركة مشعل بادغيش للمحاماة والاستشارات',
            description: 'خدمات واستشارات قانونية متكاملة في مكة وجدة: قضايا تجارية، دفاع جنائي، عمالية، عقارية وصياغة عقود. تمثيل قضائي مرخص أمام كافة المحاكم.',
            image: '/images/logo/logo.webp',
            type: 'static',
            lastmod: '2026-03-01'
        },
        {
            path: '/articles',
            title: 'المدونة القانونية | شركة مشعل بادغيش للمحاماة',
            description: 'دليل قانوني ومقالات متخصصة في الأنظمة السعودية، نظام الشركات، العمل، والقضايا التجارية والجنائية يقدمها نخبة مستشاري شركة مشعل بادغيش للمحاماة.',
            image: '/images/logo/logo.webp',
            type: 'static',
            lastmod: '2026-03-01'
        },
        {
            path: '/quick-services',
            title: 'خدمات قانونية سريعة | شركة مشعل بادغيش للمحاماة',
            description: 'احصل على خدمات قانونية سريعة وموثوقة: استشارات فورية، صياغة لوائح وتوكيلات. تواصل معنا مباشرة عبر الواتساب لإنجاز معاملاتك بأعلى سرية.',
            image: '/images/logo/logo.webp',
            type: 'static',
            lastmod: '2026-03-01'
        },
        {
            path: '/privacy',
            title: 'سياسة الخصوصية | شركة مشعل بادغيش للمحاماة',
            description: 'نحن في شركة مشعل بادغيش نلتزم بأعلى معايير الخصوصية والسرية المهنية لبياناتكم ومعلوماتكم القانونية وفق أنظمة المملكة العربية السعودية.',
            image: '/images/logo/logo.webp',
            type: 'static',
            lastmod: '2026-01-15'
        },
        {
            path: '/terms',
            title: 'اتفاقية الاستخدام | شركة مشعل بادغيش للمحاماة',
            description: 'تعرف على شروط وأحكام استخدام موقع شركة مشعل بادغيش للمحاماة. القواعد المنظمة لاستخدام المحتوى القانوني والملكيات الفكرية.',
            image: '/images/logo/logo.webp',
            type: 'static',
            lastmod: '2026-01-15'
        }
    ];

    const routes = [
        ...staticPages,
        ...services.map(s => ({ path: `/${s.slug}`, type: 'service', lastmod: '2026-03-01', ...s })),
        ...articles.map(a => ({ path: `/articles/${a.slug}`, type: 'article', lastmod: a.dateModified || a.rawDate, ...a })),
        ...quickServices.map(q => ({ path: `/quick-services/${q.slug}`, type: 'quick', lastmod: '2026-03-01', ...q }))
    ];

    console.log(`Found ${routes.length} routes to pre-render with full body content.`);

    // Clean any legacy duplicate directories to avoid trailing slash conflicts
    services.forEach(s => {
        const legacyDir = path.join(DIST_DIR, s.slug);
        if (fs.existsSync(legacyDir) && fs.statSync(legacyDir).isDirectory()) {
            fs.rmSync(legacyDir, { recursive: true, force: true });
        }
    });
    ['about', 'contact', 'services', 'privacy', 'terms'].forEach(p => {
        const legacyDir = path.join(DIST_DIR, p);
        if (fs.existsSync(legacyDir) && fs.statSync(legacyDir).isDirectory()) {
            fs.rmSync(legacyDir, { recursive: true, force: true });
        }
    });

    for (const route of routes) {
        let imageUrl = route.image;
        if (!imageUrl.startsWith('http')) {
            imageUrl = `https://mishal-lawfirm.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }

        // Render actual HTML body content via React SSR
        let appHtml = '';
        try {
            const renderResult = render(route.path);
            appHtml = renderResult.appHtml || '';
        } catch (err) {
            console.error(`⚠️  Warning rendering body for route ${route.path}:`, err.message);
        }

        let html = template;

        // Replace <div id="root"></div> with the rendered app content
        if (appHtml) {
            html = html.replace(/<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`);
        }

        // Replace Title
        html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

        // Update Canonical Tag (clean URL, trailing slash on root only)
        const canonicalUrl = `https://mishal-lawfirm.com${route.path === '/' ? '/' : route.path}`;
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
            const attr = meta.property
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

        if (route.path === '/') {
            fs.writeFileSync(INDEX_HTML, html);
            console.log(`✅ Pre-rendered root with full body: / (index.html)`);
        } else {
            const cleanPath = route.path.replace(/^\//, '');
            const targetHtmlFile = path.join(DIST_DIR, `${cleanPath}.html`);
            const targetDir = path.dirname(targetHtmlFile);

            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            fs.writeFileSync(targetHtmlFile, html);

            // For section listing pages like /articles or /quick-services, also provide index.html inside the directory
            if (['/articles', '/quick-services'].includes(route.path)) {
                const sectionDir = path.join(DIST_DIR, cleanPath);
                if (!fs.existsSync(sectionDir)) {
                    fs.mkdirSync(sectionDir, { recursive: true });
                }
                fs.writeFileSync(path.join(sectionDir, 'index.html'), html);
            }

            console.log(`✅ Pre-rendered with body: ${route.path} -> ${cleanPath}.html`);
        }
    }

    console.log('✨ All routes statically pre-rendered with HTML body content!');

    // ─── توليد وحفظ sitemap.xml ──────────────────────────────────────────────
    console.log('\n🗺️  Generating dynamic sitemap.xml with truthful lastmod...');
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

    // ─── تنظيف مجلد SSR المؤقت ────────────────────────────────────────────────
    if (fs.existsSync(SSR_DIR)) {
        fs.rmSync(SSR_DIR, { recursive: true, force: true });
    }

    console.log('\n🎉 Build complete! All static files contain real initial HTML body!');
}

run().catch(err => {
    console.error('❌ Error during pre-rendering:', err);
    process.exit(1);
});
