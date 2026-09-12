const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
const ROBOTS_PATH = path.join(DIST_DIR, 'robots.txt');

let passedTests = 0;
let failedTests = 0;
const errors = [];

function assert(condition, message) {
    if (condition) {
        passedTests++;
    } else {
        failedTests++;
        errors.push(message);
        console.error(`  ❌ FAIL: ${message}`);
    }
}

console.log('🔍 Starting Comprehensive SEO, Body Integrity & Schema Validation...\n');

// 1. Check dist directory existence
assert(fs.existsSync(DIST_DIR), 'dist directory exists');

// 2. Load TS data files to determine expected routes
const servicesFile = path.join(__dirname, '../data/services.ts');
const articlesFile = path.join(__dirname, '../data/articles.ts');
const quickFile = path.join(__dirname, '../data/quickServices.ts');

const servicesContent = fs.readFileSync(servicesFile, 'utf8');
const servicesMatch = servicesContent.match(/export\s+const\s+servicesData(?::\s*\w+(?:\[\])?)?\s*=\s*(\[[\s\S]*?\n\];)/);
const cleanServicesJs = servicesMatch[1].replace(/;\s*$/, '').replace(/icon:\s*([A-Za-z0-9_]+)/g, 'icon: "$1"');
const services = (new Function('return ' + cleanServicesJs))();

const articlesContent = fs.readFileSync(articlesFile, 'utf8');
const articlesMatch = articlesContent.match(/export\s+const\s+articles(?::\s*\w+(?:\[\])?)?\s*=\s*(\[[\s\S]*?\n\];)/);
const cleanArticlesJs = articlesMatch[1].replace(/;\s*$/, '');
const articles = (new Function('return ' + cleanArticlesJs))();

const quickContent = fs.readFileSync(quickFile, 'utf8');
const quickMatch = quickContent.match(/export\s+const\s+quickServicesData(?::\s*\w+(?:\[\])?)?\s*=\s*(\[[\s\S]*?\n\];)/);
const cleanQuickJs = quickMatch[1].replace(/;\s*$/, '');
const quickCategories = (new Function('return ' + cleanQuickJs))();
const quickServices = [];
quickCategories.forEach(cat => {
    if (Array.isArray(cat.services)) {
        cat.services.forEach(s => quickServices.push(s));
    }
});

const staticRoutes = [
    '/',
    '/about',
    '/contact',
    '/services',
    '/articles',
    '/quick-services',
    '/privacy',
    '/terms'
];

const allRoutes = [
    ...staticRoutes.map(p => ({ path: p, type: 'static' })),
    ...services.map(s => ({ path: `/${s.slug}`, type: 'service', slug: s.slug })),
    ...articles.map(a => ({ path: `/articles/${a.slug}`, type: 'article', slug: a.slug })),
    ...quickServices.map(q => ({ path: `/quick-services/${q.slug}`, type: 'quick', slug: q.slug }))
];

console.log(`📋 Total indexable routes to validate: ${allRoutes.length}`);

// Track titles and canonicals for uniqueness
const titlesMap = new Map();
const canonicalsMap = new Map();

// 3. Inspect every route file in dist
console.log('\n--- 1. Testing Route Coverage & Body Integrity ---');

allRoutes.forEach(r => {
    let filePath = '';
    if (r.path === '/') {
        filePath = path.join(DIST_DIR, 'index.html');
    } else {
        const clean = r.path.replace(/^\//, '');
        filePath = path.join(DIST_DIR, `${clean}.html`);
    }

    const fileExists = fs.existsSync(filePath);
    assert(fileExists, `HTML file exists for route: ${r.path} -> ${filePath}`);

    if (!fileExists) return;

    const content = fs.readFileSync(filePath, 'utf8');

    // Body Integrity Check
    const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/);
    assert(rootMatch && rootMatch[1].trim().length > 500, `Body Integrity: Non-empty rendered HTML inside #root for ${r.path} (length: ${rootMatch ? rootMatch[1].length : 0})`);

    // H1 Check
    const hasH1 = /<h1[^>]*>[\s\S]*?<\/h1>/i.test(content);
    assert(hasH1, `H1 tag present in initial HTML for ${r.path}`);

    // Title Check
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    assert(titleMatch && titleMatch[1].trim().length > 10, `Valid <title> for ${r.path}: "${titleMatch ? titleMatch[1] : 'MISSING'}"`);
    if (titleMatch) {
        const title = titleMatch[1].trim();
        titlesMap.set(r.path, title);
    }

    // Meta Description Check
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
                      content.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
    assert(descMatch && descMatch[1].trim().length > 20, `Valid meta description for ${r.path}`);

    // Canonical Tag Check
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
    const expectedCanonical = `https://mishal-lawfirm.com${r.path === '/' ? '/' : r.path}`;
    assert(canonicalMatch && canonicalMatch[1] === expectedCanonical, `Exact Canonical URL for ${r.path}: expected "${expectedCanonical}", got "${canonicalMatch ? canonicalMatch[1] : 'MISSING'}"`);
    if (canonicalMatch) {
        canonicalsMap.set(r.path, canonicalMatch[1]);
    }

    // No accidental noindex on public routes
    const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i);
    if (robotsMatch) {
        assert(!robotsMatch[1].includes('noindex'), `No accidental noindex on public route ${r.path}`);
    }

    // 4. Schema JSON-LD Graph Validation
    const schemaMatch = content.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
    assert(schemaMatch !== null, `JSON-LD script block exists for ${r.path}`);

    if (schemaMatch) {
        try {
            const schemaJson = JSON.parse(schemaMatch[1]);
            assert(schemaJson['@context'] === 'https://schema.org', `Schema @context is https://schema.org for ${r.path}`);
            assert(Array.isArray(schemaJson['@graph']), `Schema @graph is an array for ${r.path}`);

            if (Array.isArray(schemaJson['@graph'])) {
                const orgEntity = schemaJson['@graph'].find(e => e['@id'] === 'https://mishal-lawfirm.com/#organization');
                assert(orgEntity !== undefined, `Organization entity with @id https://mishal-lawfirm.com/#organization present in ${r.path}`);

                const personEntity = schemaJson['@graph'].find(e => e['@id'] === 'https://mishal-lawfirm.com/#mishal-badghish');
                assert(personEntity !== undefined, `Person (Founder) entity with @id https://mishal-lawfirm.com/#mishal-badghish present in ${r.path}`);

                const websiteEntity = schemaJson['@graph'].find(e => e['@id'] === 'https://mishal-lawfirm.com/#website');
                assert(websiteEntity !== undefined, `WebSite entity with @id https://mishal-lawfirm.com/#website present in ${r.path}`);

                const webPageEntity = schemaJson['@graph'].find(e => e['@type'] === 'WebPage');
                assert(webPageEntity !== undefined, `WebPage entity present in ${r.path}`);

                // Count organization entities (must be exactly 1, no duplicates)
                const orgCount = schemaJson['@graph'].filter(e => e['@type'] === 'LegalService' || e['@type'] === 'Organization').length;
                assert(orgCount === 1, `Exactly 1 Organization entity (no duplicates) in ${r.path} (found: ${orgCount})`);
            }
        } catch (e) {
            assert(false, `Valid JSON-LD schema parsing for ${r.path}: ${e.message}`);
        }
    }
});

// 5. Sitemap Validation
console.log('\n--- 2. Testing Sitemap Correctness ---');
assert(fs.existsSync(SITEMAP_PATH), 'dist/sitemap.xml exists');
if (fs.existsSync(SITEMAP_PATH)) {
    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
    
    // Must NOT contain priority or changefreq
    assert(!sitemapContent.includes('<priority>'), 'Sitemap does NOT contain deprecated <priority> tags');
    assert(!sitemapContent.includes('<changefreq>'), 'Sitemap does NOT contain deprecated <changefreq> tags');

    // Extract all URLs
    const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    assert(locMatches.length === allRoutes.length, `Sitemap contains all ${allRoutes.length} canonical URLs (found: ${locMatches.length})`);

    // Verify all sitemap URLs match actual files
    locMatches.forEach(url => {
        assert(url.startsWith('https://mishal-lawfirm.com'), `Sitemap URL has correct domain: ${url}`);
        assert(!url.includes('.html'), `Sitemap URL is clean (no .html extension): ${url}`);
        
        const pathSuffix = url.replace('https://mishal-lawfirm.com', '');
        const routeFound = allRoutes.some(r => (r.path === '/' ? '/' : r.path) === (pathSuffix || '/'));
        assert(routeFound, `Sitemap URL corresponds to a valid indexable route: ${url}`);
    });

    // Check lastmod format
    const lastmodMatches = [...sitemapContent.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map(m => m[1]);
    lastmodMatches.forEach(lm => {
        assert(/^\d{4}-\d{2}-\d{2}$/.test(lm), `Valid ISO lastmod date in sitemap: ${lm}`);
    });
}

// 6. Robots.txt Validation
console.log('\n--- 3. Testing Robots.txt ---');
assert(fs.existsSync(ROBOTS_PATH), 'dist/robots.txt exists');
if (fs.existsSync(ROBOTS_PATH)) {
    const robotsContent = fs.readFileSync(ROBOTS_PATH, 'utf8');
    assert(robotsContent.includes('Disallow: /admin'), 'robots.txt disallows /admin');
    assert(robotsContent.includes('Disallow: /backend'), 'robots.txt disallows /backend');
    assert(robotsContent.includes('Disallow: /api'), 'robots.txt disallows /api');
    assert(robotsContent.includes('Sitemap: https://mishal-lawfirm.com/sitemap.xml'), 'robots.txt references canonical sitemap');
}

// 7. Summary & Exit Code
console.log('\n============================================================');
console.log('🎯 SEO & BODY INTEGRITY VALIDATION SUMMARY');
console.log('============================================================');
console.log(`✅ Total Tests Passed: ${passedTests}`);
console.log(`❌ Total Tests Failed: ${failedTests}`);

if (failedTests > 0) {
    console.error('\n❌ SEO VALIDATION FAILED WITH ERRORS:');
    errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
    process.exit(1);
} else {
    console.log('\n✨ ALL SEO, BODY INTEGRITY & SCHEMA TESTS PASSED SUCCESSFULLY! (100% PASS)');
    process.exit(0);
}
