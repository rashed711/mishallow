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

        const slugMatch  = block.match(/slug:\s*['\"](.*?)['\"]/);;
        const titleMatch = block.match(/(seoTitle|title):\s*['\"](.*?)['\"]/);;
        const descMatch  = block.match(/(seoDescription|excerpt|description):\s*['\"](.*?)['\"]/);;
        const imageMatch = block.match(/image:\s*['\"](.*?)['\"]/);;

        if (slugMatch) {
            items.push({
                slug:        slugMatch[1],
                title:       titleMatch ? titleMatch[2] : 'مكتب مشعل بادغيش للمحاماة',
                description: descMatch  ? descMatch[2]  : 'نقدم حلولاً قانونية استراتيجية تتوافق مع تطلعات المملكة.',
                image:       imageMatch ? imageMatch[1]  : 'https://mishallow.vercel.app/images/logo/logo.webp'
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

    const routes = [
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
            imageUrl = `https://mishallow.vercel.app${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }

        let html = template;

        html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

        const metaTags = [
            { property: 'og:title',       content: route.title },
            { property: 'og:description', content: route.description },
            { property: 'og:image',       content: imageUrl },
            { property: 'og:url',         content: `https://mishallow.vercel.app${route.path}` },
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
