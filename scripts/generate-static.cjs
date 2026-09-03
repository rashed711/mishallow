const fs   = require('fs');
const path = require('path');

const DIST_DIR    = path.join(__dirname, '../dist');
const INDEX_HTML  = path.join(DIST_DIR,  'index.html');
const BACKEND_SRC = path.join(__dirname, '../backend');
const BACKEND_DST = path.join(DIST_DIR,  'backend');

// ─── Helper: Copy directory recursively (يدعم الملفات المخفية كـ .htaccess) ──
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

// Helper to extract data from TS files using Regex
function extractData(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const items = [];

    const blockRegex = /\{[\s\S]*?slug:\s*['\"](.*?)['\"][\s\S]*?\}/g;
    let match;

    while ((match = blockRegex.exec(content)) !== null) {
        const block = match[0];

        const slugMatch  = block.match(/slug:\s*['\"](.*?)['\"]/);
        const seoTitleMatch = block.match(/seoTitle:\s*['\"](.*?)['\"]/);
        const titleMatch = seoTitleMatch || block.match(/title:\s*['\"](.*?)['\"]/);

        const seoDescMatch = block.match(/seoDescription:\s*['\"](.*?)['\"]/);
        const descMatch = seoDescMatch || block.match(/(excerpt|description):\s*['\"](.*?)['\"]/);
        const imageMatch = block.match(/image:\s*['\"](.*?)['\"]/);

        if (slugMatch) {
            items.push({
                slug:        slugMatch[1],
                title:       titleMatch ? titleMatch[1] : 'شركة مشعل بادغيش للمحاماة',
                description: descMatch  ? (seoDescMatch ? seoDescMatch[1] : descMatch[2] || descMatch[1]) : 'نقدم حلولاً قانونية استراتيجية تتوافق مع تطلعات المملكة.',
                image:       imageMatch ? imageMatch[1]  : 'https://mishal-lawfirm.com/images/logo/logo.webp'
            });
        }
    }
    return items;
}

async function run() {
    console.log('🚀 Starting Pre-rendering script...');

    if (!fs.existsSync(INDEX_HTML)) {
        console.error('❌ dist/index.html not found! Run npm run build first.');
        process.exit(1);
    }

    const template = fs.readFileSync(INDEX_HTML, 'utf8');

    const services = extractData(path.join(__dirname, '../data/services.ts'));
    const articles = extractData(path.join(__dirname, '../data/articles.ts'));

    const staticPages = [
        {
            path: '/about',
            title: 'من نحن | مكتب المحامي مشعل | نخبة محامين في مكة وجدة',
            description: 'تعرف على شركة المحامي مشعل بادغيش. نخبة من أفضل المحامين والمستشارين في مكة وجدة لتقديم استشارات قانونية وتمثيل قضائي احترافي للأفراد والشركات.',
            image: 'https://mishal-lawfirm.com/images/logo/logo.webp'
        },
        {
            path: '/contact',
            title: 'تواصل مع مكتب المحامي مشعل | استشارات قانونية في مكة وجدة',
            description: 'احجز استشارتك القانونية الآن مع نخبة من المحامين المعتمدين في مكة وجدة. تمثيل قضائي واستشارات تجارية وجنائية متخصصة. تواصل معنا مباشرة.',
            image: 'https://mishal-lawfirm.com/images/logo/logo.webp'
        },
        {
            path: '/services',
            title: 'الخدمات القانونية | مكتب المحامي مشعل في مكة وجدة',
            description: 'خدمات واستشارات قانونية متكاملة في مكة وجدة: قضايا تجارية، دفاع جنائي، عمالية، عقارية وصياغة عقود. تمثيل قضائي مرخص أمام كافة المحاكم.',
            image: 'https://mishal-lawfirm.com/images/logo/logo.webp'
        },
        {
            path: '/articles',
            title: 'المدونة القانونية | مقالات واستشارات الأنظمة السعودية',
            description: 'دليل قانوني ومقالات متخصصة في الأنظمة السعودية، نظام الشركات، العمل، والقضايا التجارية والجنائية يقدمها نخبة مستشاري مكتب المحامي مشعل.',
            image: 'https://mishal-lawfirm.com/images/logo/logo.webp'
        },
        {
            path: '/quick-services',
            title: 'خدمات قانونية سريعة | استشارات فورية في مكة وجدة',
            description: 'احصل على خدمات قانونية سريعة وموثوقة: استشارات فورية، صياغة لوائح وتوكيلات. تواصل معنا مباشرة عبر الواتساب لإنجاز معاملاتك بأعلى سرية.',
            image: 'https://mishal-lawfirm.com/images/logo/logo.webp'
        },
        {
            path: '/privacy',
            title: 'سياسة الخصوصية | شركة مشعل بادغيش للمحاماة',
            description: 'نحن في شركة مشعل بادغيش نلتزم بأعلى معايير الخصوصية والسرية المهنية لبياناتكم ومعلوماتكم القانونية وفق أنظمة المملكة العربية السعودية.',
            image: 'https://mishal-lawfirm.com/images/logo/logo.webp'
        },
        {
            path: '/terms',
            title: 'اتفاقية الاستخدام | شركة مشعل بادغيش للمحاماة',
            description: 'تعرف على شروط وأحكام استخدام موقع شركة مشعل بادغيش للمحاماة. القواعد المنظمة لاستخدام المحتوى القانوني والملكيات الفكرية.',
            image: 'https://mishal-lawfirm.com/images/logo/logo.webp'
        }
    ];

    const routes = [
        ...staticPages,
        ...services.map(s => ({ path: `/${s.slug}`, ...s })),
        ...articles.map(a => ({ path: `/articles/${a.slug}`, ...a }))
    ];

    console.log(`Found ${routes.length} routes to pre-render.`);

    for (const route of routes) {
        const routeDir = path.join(DIST_DIR, route.path);

        if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
        }

        let imageUrl = route.image;
        if (!imageUrl.startsWith('http')) {
            imageUrl = `https://mishal-lawfirm.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }

        let html = template;

        html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

        // Update Canonical Tag for exact page path
        const canonicalTag = `<link rel="canonical" href="https://mishal-lawfirm.com${route.path}" />`;
        const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i;
        if (html.match(canonicalRegex)) {
            html = html.replace(canonicalRegex, canonicalTag);
        } else {
            html = html.replace('</head>', `  ${canonicalTag}\n</head>`);
        }

        const metaTags = [
            { property: 'og:title',       content: route.title },
            { property: 'og:description', content: route.description },
            { property: 'og:image',       content: imageUrl },
            { property: 'og:url',         content: `https://mishal-lawfirm.com${route.path}` },
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

        fs.writeFileSync(path.join(routeDir, 'index.html'), html);
        console.log(`✅ Pre-rendered: ${route.path}`);
    }

    console.log('✨ Pre-rendering complete!');

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
