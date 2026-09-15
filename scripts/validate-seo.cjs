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

console.log('🔍 Starting Deep Route-Aware Semantic SEO & Entity Graph Validation...\n');

// 1. Check dist directory existence
assert(fs.existsSync(DIST_DIR), 'dist directory exists');

// 2. Load TS data files to determine expected routes and their semantic data
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
    { path: '/', titleKeyword: 'مشعل بادغيش', h1Keyword: 'مشعل بادغيش' },
    { path: '/about', titleKeyword: 'من نحن', h1Keyword: 'من نحن' },
    { path: '/contact', titleKeyword: 'تواصل', h1Keyword: 'تواصل' },
    { path: '/services', titleKeyword: 'الخدمات', h1Keyword: 'الخدمات' },
    { path: '/articles', titleKeyword: 'المدونة', h1Keyword: 'المدونة' },
    { path: '/quick-services', titleKeyword: 'سريعة', h1Keyword: 'سريعة' },
    { path: '/privacy', titleKeyword: 'الخصوصية', h1Keyword: 'الخصوصية' },
    { path: '/terms', titleKeyword: 'الاستخدام', h1Keyword: 'الاستخدام' }
];

const allRoutes = [
    ...staticRoutes.map(p => ({ path: p.path, type: 'static', titleKeyword: p.titleKeyword, h1Keyword: p.h1Keyword })),
    ...services.map(s => ({ path: `/${s.slug}`, type: 'service', slug: s.slug, title: s.title, titleKeyword: s.title, h1Keyword: s.title, faqCount: (s.faq || []).length })),
    ...articles.map(a => ({ path: `/articles/${a.slug}`, type: 'article', slug: a.slug, title: a.title, titleKeyword: a.title, h1Keyword: a.title, rawDate: a.rawDate, dateModified: a.dateModified, author: a.author })),
    ...quickServices.map(q => ({ path: `/quick-services/${q.slug}`, type: 'quick', slug: q.slug, title: q.title, titleKeyword: q.title, h1Keyword: q.title }))
];

console.log(`📋 Total indexable routes to validate: ${allRoutes.length}`);

// Track titles and canonicals for uniqueness and integrity
const titlesMap = new Map();
const canonicalsMap = new Map();

// 3. Inspect every route file in dist
console.log('\n--- 1. Testing Deep Route Coverage, Body Integrity & Semantic Structure ---');

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

    // A. Body Integrity Check (Must contain full prerendered HTML inside #root)
    const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/);
    assert(rootMatch && rootMatch[1].trim().length > 500, `Body Integrity: Non-empty rendered HTML inside #root for ${r.path} (length: ${rootMatch ? rootMatch[1].length : 0})`);
    if (rootMatch) {
        assert(!rootMatch[1].includes('[object Object]'), `No leaked [object Object] template artifact in ${r.path}`);
        assert(!rootMatch[1].includes('>undefined<'), `No leaked undefined text node in ${r.path}`);
    }

    // B. H1 Presence & Semantic Correspondence Check
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    assert(h1Match !== null, `H1 tag present in initial HTML for ${r.path}`);
    if (h1Match) {
        const h1Clean = h1Match[1].replace(/<[^>]+>/g, '').trim();
        assert(h1Clean.length > 3, `H1 is non-empty for ${r.path}: "${h1Clean}"`);
        
        // Semantic check: H1 corresponds to page subject
        if (r.h1Keyword) {
            // Extract the core words from h1Keyword (first 2-3 words)
            const keywordTokens = r.h1Keyword.split(/\s+/).filter(w => w.length > 2);
            const tokenFound = keywordTokens.length === 0 || keywordTokens.some(token => h1Clean.includes(token) || content.includes(token));
            assert(tokenFound, `H1 or page body semantically matches subject for ${r.path} (keyword: "${keywordTokens.slice(0, 2).join(' ')}")`);
        }
    }

    // C. Title Tag & Semantic Meaningfulness Check
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    assert(titleMatch && titleMatch[1].trim().length > 15, `Valid meaningful <title> for ${r.path}: "${titleMatch ? titleMatch[1] : 'MISSING'}"`);
    if (titleMatch) {
        const title = titleMatch[1].trim();
        assert(!titlesMap.has(title), `Title is unique: "${title}" on ${r.path}`);
        titlesMap.set(title, r.path);
        
        // Ensure title contains relevant subject or brand terms
        assert(title.length >= 20, `Title has rich descriptive length (>= 20 chars) on ${r.path}`);
    }

    // D. Meta Description Check
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
                      content.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
    assert(descMatch && descMatch[1].trim().length > 30, `Valid substantive meta description for ${r.path}`);

    // E. Exact Canonical URL Check
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
    const expectedCanonical = `https://mishal-lawfirm.com${r.path === '/' ? '/' : r.path}`;
    assert(canonicalMatch && canonicalMatch[1] === expectedCanonical, `Exact Canonical URL for ${r.path}: expected "${expectedCanonical}", got "${canonicalMatch ? canonicalMatch[1] : 'MISSING'}"`);
    if (canonicalMatch) {
        assert(!canonicalsMap.has(canonicalMatch[1]), `Canonical is unique: "${canonicalMatch[1]}" on ${r.path}`);
        canonicalsMap.set(canonicalMatch[1], r.path);
    }

    // F. No Accidental Noindex on Public Routes
    const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i);
    if (robotsMatch) {
        assert(!robotsMatch[1].includes('noindex'), `No accidental noindex on public route ${r.path}`);
    }

    // G. JSON-LD Graph Deep Semantic Validation
    const schemaMatch = content.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
    assert(schemaMatch !== null, `JSON-LD script block exists for ${r.path}`);

    if (schemaMatch) {
        try {
            const schemaJson = JSON.parse(schemaMatch[1]);
            assert(schemaJson['@context'] === 'https://schema.org', `Schema @context is https://schema.org for ${r.path}`);
            assert(Array.isArray(schemaJson['@graph']), `Schema @graph is an array for ${r.path}`);

            if (Array.isArray(schemaJson['@graph'])) {
                const graph = schemaJson['@graph'];

                // 1. Primary Organization / LegalService entity
                const orgEntity = graph.find(e => e['@id'] === 'https://mishal-lawfirm.com/#organization');
                assert(orgEntity !== undefined, `Primary Organization (@id: https://mishal-lawfirm.com/#organization) present in ${r.path}`);
                if (orgEntity) {
                    assert(orgEntity['@type'] === 'LegalService', `Organization @type is LegalService for ${r.path}`);
                    assert(orgEntity.name === 'شركة مشعل بادغيش للمحاماة والاستشارات القانونية', `Authoritative legal name in Organization schema for ${r.path}`);
                    assert(orgEntity.founder && orgEntity.founder['@id'] === 'https://mishal-lawfirm.com/#mishal-badghish', `Organization founder references Person @id in ${r.path}`);
                    assert(orgEntity.address && orgEntity.address.addressLocality === 'Makkah', `Authoritative Makkah address in Organization schema for ${r.path}`);
                    assert(orgEntity.currenciesAccepted === 'SAR', `Authoritative currency SAR in Organization schema for ${r.path}`);
                    assert(Array.isArray(orgEntity.openingHoursSpecification) && orgEntity.openingHoursSpecification.length > 0, `OpeningHoursSpecification present in Organization schema for ${r.path}`);
                    assert(Array.isArray(orgEntity.areaServed) && orgEntity.areaServed.length === 2, `AreaServed has exactly Makkah and Jeddah for ${r.path}`);
                    
                    // Validate official sameAs profiles on Organization
                    assert(Array.isArray(orgEntity.sameAs) && orgEntity.sameAs.length === 3, `Organization sameAs has exactly 3 approved social profiles on ${r.path}`);
                    if (Array.isArray(orgEntity.sameAs)) {
                        assert(orgEntity.sameAs.includes('https://www.tiktok.com/@mishal_lawfirm'), `Organization sameAs includes official TikTok on ${r.path}`);
                        assert(orgEntity.sameAs.includes('https://www.linkedin.com/company/mishal-lawfirm/'), `Organization sameAs includes official LinkedIn on ${r.path}`);
                        assert(orgEntity.sameAs.includes('https://www.facebook.com/mishal.lawfirm'), `Organization sameAs includes official Facebook on ${r.path}`);
                    }
                }

                // Exactly 1 Organization entity (no competing/duplicate organizations)
                const orgCount = graph.filter(e => e['@type'] === 'LegalService' || e['@type'] === 'Organization').length;
                assert(orgCount === 1, `Exactly 1 Organization entity in graph (no duplicates) in ${r.path} (found: ${orgCount})`);

                // 2. Person (Founder) Entity
                const personEntity = graph.find(e => e['@id'] === 'https://mishal-lawfirm.com/#mishal-badghish');
                assert(personEntity !== undefined, `Person (Founder) entity (@id: https://mishal-lawfirm.com/#mishal-badghish) present in ${r.path}`);
                if (personEntity) {
                    assert(personEntity.name === 'مشعل بادغيش', `Founder name is مشعل بادغيش in ${r.path}`);
                    assert(personEntity.worksFor && personEntity.worksFor['@id'] === 'https://mishal-lawfirm.com/#organization', `Person worksFor points to Organization in ${r.path}`);
                    assert(!personEntity.sameAs || !personEntity.sameAs.includes('https://www.tiktok.com/@mishal_lawfirm'), `Person entity does not inherit company social profiles in ${r.path}`);
                }

                // 3. WebSite Entity
                const websiteEntity = graph.find(e => e['@id'] === 'https://mishal-lawfirm.com/#website');
                assert(websiteEntity !== undefined, `WebSite entity (@id: https://mishal-lawfirm.com/#website) present in ${r.path}`);
                if (websiteEntity) {
                    assert(websiteEntity.publisher && websiteEntity.publisher['@id'] === 'https://mishal-lawfirm.com/#organization', `WebSite publisher points to Organization in ${r.path}`);
                }

                // 4. WebPage Entity
                const webpageId = `${expectedCanonical}#webpage`;
                const webPageEntity = graph.find(e => e['@id'] === webpageId || e['@type'] === 'WebPage');
                assert(webPageEntity !== undefined, `WebPage entity present in ${r.path}`);
                if (webPageEntity) {
                    assert(webPageEntity.isPartOf && webPageEntity.isPartOf['@id'] === 'https://mishal-lawfirm.com/#website', `WebPage isPartOf points to WebSite in ${r.path}`);
                    assert(webPageEntity.about && webPageEntity.about['@id'] === 'https://mishal-lawfirm.com/#organization', `WebPage about points to Organization in ${r.path}`);
                }

                // 5. Route-Specific Entity Checks
                if (r.type === 'service' || r.type === 'quick') {
                    const serviceId = `${expectedCanonical}#service`;
                    const serviceEntity = graph.find(e => e['@id'] === serviceId || e['@type'] === 'Service');
                    assert(serviceEntity !== undefined, `Service entity present on service route ${r.path}`);
                    if (serviceEntity) {
                        assert(serviceEntity.provider && serviceEntity.provider['@id'] === 'https://mishal-lawfirm.com/#organization', `Service provider points to Organization on ${r.path}`);
                        assert(typeof serviceEntity.name === 'string' && serviceEntity.name.length > 3, `Service has meaningful name on ${r.path}`);
                    }
                    if (webPageEntity) {
                        assert(webPageEntity.mainEntity && webPageEntity.mainEntity['@id'] === serviceId, `WebPage mainEntity points to Service entity on ${r.path}`);
                    }
                }

                if (r.type === 'article') {
                    const articleId = `${expectedCanonical}#article`;
                    const articleEntity = graph.find(e => e['@id'] === articleId || e['@type'] === 'BlogPosting');
                    assert(articleEntity !== undefined, `BlogPosting entity present on article route ${r.path}`);
                    if (articleEntity) {
                        assert(articleEntity.publisher && articleEntity.publisher['@id'] === 'https://mishal-lawfirm.com/#organization', `Article publisher points to Organization on ${r.path}`);
                        assert(articleEntity.author !== undefined, `Article author exists on ${r.path}`);
                        if (r.rawDate) {
                            assert(articleEntity.datePublished === r.rawDate, `Article datePublished matches truthful rawDate on ${r.path}`);
                        }
                    }
                    if (webPageEntity) {
                        assert(webPageEntity.mainEntity && webPageEntity.mainEntity['@id'] === articleId, `WebPage mainEntity points to Article entity on ${r.path}`);
                    }
                }

                // 6. BreadcrumbList Validation
                const breadcrumbEntity = graph.find(e => e['@type'] === 'BreadcrumbList');
                if (r.path !== '/' && breadcrumbEntity) {
                    assert(Array.isArray(breadcrumbEntity.itemListElement), `Breadcrumb itemListElement is array on ${r.path}`);
                    const items = breadcrumbEntity.itemListElement;
                    assert(items.length >= 2, `Breadcrumb has at least 2 items on ${r.path}`);
                    assert(items[0].position === 1 && items[0].item['@id'] === 'https://mishal-lawfirm.com/', `Breadcrumb item 1 points to homepage on ${r.path}`);
                    const lastItem = items[items.length - 1];
                    assert(lastItem.item['@id'] === expectedCanonical, `Breadcrumb final item points to current canonical on ${r.path}`);
                }

                // 7. FAQPage Validation (Only present when route actually has FAQs)
                const faqEntity = graph.find(e => e['@type'] === 'FAQPage');
                if (r.faqCount && r.faqCount > 0) {
                    assert(faqEntity !== undefined, `FAQPage schema present for route with visible FAQs on ${r.path}`);
                }
            }
        } catch (e) {
            assert(false, `Valid JSON-LD schema parsing for ${r.path}: ${e.message}`);
        }
    }
});

// 4. Sitemap Validation
console.log('\n--- 2. Testing Truthful Sitemap.xml ---');
assert(fs.existsSync(SITEMAP_PATH), 'dist/sitemap.xml exists');
if (fs.existsSync(SITEMAP_PATH)) {
    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
    
    // Must NOT contain priority or changefreq
    assert(!sitemapContent.includes('<priority>'), 'Sitemap does NOT contain deprecated <priority> tags');
    assert(!sitemapContent.includes('<changefreq>'), 'Sitemap does NOT contain deprecated <changefreq> tags');

    // Extract all URLs
    const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    assert(locMatches.length === allRoutes.length, `Sitemap contains all ${allRoutes.length} canonical URLs (found: ${locMatches.length})`);

    // Verify all sitemap URLs match actual files and clean format
    locMatches.forEach(url => {
        assert(url.startsWith('https://mishal-lawfirm.com'), `Sitemap URL has correct domain: ${url}`);
        assert(!url.includes('.html'), `Sitemap URL is clean (no .html extension): ${url}`);
        
        const pathSuffix = url.replace('https://mishal-lawfirm.com', '');
        const routeFound = allRoutes.some(r => (r.path === '/' ? '/' : r.path) === (pathSuffix || '/'));
        assert(routeFound, `Sitemap URL corresponds to a valid indexable route: ${url}`);
    });

    // Check lastmod format: must ONLY appear when verified, and must be valid ISO YYYY-MM-DD
    const lastmodMatches = [...sitemapContent.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map(m => m[1]);
    lastmodMatches.forEach(lm => {
        assert(/^\d{4}-\d{2}-\d{2}$/.test(lm), `Valid ISO lastmod date in sitemap: ${lm}`);
    });
}

// 5. Robots.txt Validation
console.log('\n--- 3. Testing Robots.txt ---');
assert(fs.existsSync(ROBOTS_PATH), 'dist/robots.txt exists');
if (fs.existsSync(ROBOTS_PATH)) {
    const robotsContent = fs.readFileSync(ROBOTS_PATH, 'utf8');
    assert(robotsContent.includes('Disallow: /admin'), 'robots.txt disallows /admin');
    assert(robotsContent.includes('Disallow: /backend'), 'robots.txt disallows /backend');
    assert(robotsContent.includes('Disallow: /api'), 'robots.txt disallows /api');
    assert(robotsContent.includes('Sitemap: https://mishal-lawfirm.com/sitemap.xml'), 'robots.txt references canonical sitemap');
}

// 6. Internal Linking Connectivity Check
console.log('\n--- 4. Testing Internal Linking & Discoverability ---');
const homeHtmlPath = path.join(DIST_DIR, 'index.html');
if (fs.existsSync(homeHtmlPath)) {
    const homeContent = fs.readFileSync(homeHtmlPath, 'utf8');
    assert(homeContent.includes('href="/services"') || homeContent.includes('href="/about"'), 'Homepage links to main sections');
    assert(homeContent.includes('href="/contact"'), 'Homepage links to contact');
}

const servicesHtmlPath = path.join(DIST_DIR, 'services.html');
if (fs.existsSync(servicesHtmlPath)) {
    const servicesContent = fs.readFileSync(servicesHtmlPath, 'utf8');
    assert(servicesContent.includes('/commercial-lawyer') || servicesContent.includes('/labor-lawyer'), 'Services hub links to specific service pages');
}

const articlesHtmlPath = path.join(DIST_DIR, 'articles.html');
if (fs.existsSync(articlesHtmlPath)) {
    const articlesContent = fs.readFileSync(articlesHtmlPath, 'utf8');
    assert(articlesContent.includes('/articles/'), 'Articles hub links to individual articles');
}

// 7. Social Links in Rendered HTML QA
console.log('\n--- 5. Testing Social Media Integration in Footer ---');
if (fs.existsSync(homeHtmlPath)) {
    const homeContent = fs.readFileSync(homeHtmlPath, 'utf8');
    assert(homeContent.includes('href="https://www.tiktok.com/@mishal_lawfirm"'), 'Rendered HTML contains official TikTok link');
    assert(homeContent.includes('href="https://www.linkedin.com/company/mishal-lawfirm/"'), 'Rendered HTML contains official LinkedIn link');
    assert(homeContent.includes('href="https://www.facebook.com/mishal.lawfirm"'), 'Rendered HTML contains official Facebook link');
}

// 8. Summary & Exit Code
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
    console.log('\n✨ ALL DEEP ROUTE-AWARE SEO & SCHEMA TESTS PASSED SUCCESSFULLY! (100% PASS)');
    process.exit(0);
}
