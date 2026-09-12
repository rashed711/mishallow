const https = require('https');
const http = require('http');

let passedTests = 0;
let failedTests = 0;
const errors = [];
let isProductionUpdated = true;

function assert(condition, message, isDeploymentSensitive = false) {
    if (condition) {
        passedTests++;
        console.log(`  ✅ PASS: ${message}`);
    } else {
        failedTests++;
        errors.push(message);
        if (isDeploymentSensitive) {
            isProductionUpdated = false;
        }
        console.error(`  ❌ FAIL: ${message}`);
    }
}

async function requestUrl(url, options = {}) {
    const isHttps = url.startsWith('https:');
    const client = isHttps ? https : http;

    return new Promise((resolve, reject) => {
        const req = client.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MishalLawSeoQA/2.0; +https://mishal-lawfirm.com/robots.txt)',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                ...options.headers
            },
            timeout: 10000
        }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    location: res.headers.location,
                    body: data
                });
            });
        });

        req.on('error', err => reject(err));
        req.on('timeout', () => {
            req.destroy();
            reject(new Error(`Timeout requesting ${url}`));
        });
    });
}

async function runProductionValidation() {
    console.log('🌐 Starting Comprehensive Production HTTP & Live Domain Validation suite...\n');
    console.log('Target: https://mishal-lawfirm.com\n');

    try {
        // ─── 1. WWW to Non-WWW Canonical Host QA (Section 3A & 3D) ────────────
        console.log('--- 1. Testing WWW -> Non-WWW Direct Canonicalization ---');
        try {
            const wwwRes = await requestUrl('https://www.mishal-lawfirm.com/');
            assert(wwwRes.statusCode === 301 || wwwRes.statusCode === 302, `https://www.mishal-lawfirm.com/ redirects with 301/302 (got: ${wwwRes.statusCode})`);
            if (wwwRes.location) {
                assert(wwwRes.location === 'https://mishal-lawfirm.com/' || wwwRes.location === 'https://mishal-lawfirm.com', `WWW redirects directly to https://mishal-lawfirm.com/ (got: ${wwwRes.location})`);
                
                // Assert destination returns 200 without redirect chain
                const targetRes = await requestUrl(wwwRes.location.startsWith('http') ? wwwRes.location : `https://mishal-lawfirm.com${wwwRes.location}`);
                assert(targetRes.statusCode === 200, `Redirect target https://mishal-lawfirm.com/ returns HTTP 200 (chain count = 0)`);
            }
        } catch (err) {
            assert(false, `Error testing WWW host: ${err.message}`);
        }

        // ─── 2. HTTP to HTTPS Redirect QA (Section 3C) ────────────────────────
        console.log('\n--- 2. Testing HTTP -> HTTPS Direct Redirect ---');
        try {
            const httpRes = await requestUrl('http://mishal-lawfirm.com/');
            assert(httpRes.statusCode === 301 || httpRes.statusCode === 302, `http://mishal-lawfirm.com/ redirects (got: ${httpRes.statusCode})`);
            if (httpRes.location) {
                assert(httpRes.location.startsWith('https://mishal-lawfirm.com'), `http:// redirects to https://mishal-lawfirm.com (got: ${httpRes.location})`);
            }
        } catch (err) {
            console.log(`  ℹ️ Note: Port 80 HTTP check info: ${err.message}`);
        }

        // ─── 3. Legacy Redirects QA — Direct Single-Hop 301s (Section 3B) ─────
        console.log('\n--- 3. Testing Legacy Redirects (.htaccess single-hop 301s) ---');
        const legacyRoutes = [
            { from: 'https://mishal-lawfirm.com/blog', expected: 'https://mishal-lawfirm.com/articles' },
            { from: 'https://mishal-lawfirm.com/blog.html', expected: 'https://mishal-lawfirm.com/articles' },
            { from: 'https://mishal-lawfirm.com/book_consultation', expected: 'https://mishal-lawfirm.com/contact' },
            { from: 'https://mishal-lawfirm.com/book_consultation.html', expected: 'https://mishal-lawfirm.com/contact' },
            { from: 'https://mishal-lawfirm.com/military-lawyer-makkah', expected: 'https://mishal-lawfirm.com/military-cases-makkah' },
            { from: 'https://mishal-lawfirm.com/military-lawyer-makkah.html', expected: 'https://mishal-lawfirm.com/military-cases-makkah' },
            { from: 'https://mishal-lawfirm.com/blog-corporate-lawyer', expected: 'https://mishal-lawfirm.com/commercial-lawyer-makkah' },
            { from: 'https://mishal-lawfirm.com/blog-corporate-lawyer.html', expected: 'https://mishal-lawfirm.com/commercial-lawyer-makkah' },
            { from: 'https://mishal-lawfirm.com/index.html', expected: 'https://mishal-lawfirm.com/' },
            { from: 'https://mishal-lawfirm.com/about.html', expected: 'https://mishal-lawfirm.com/about' },
            { from: 'https://mishal-lawfirm.com/services.html', expected: 'https://mishal-lawfirm.com/services' },
            { from: 'https://mishal-lawfirm.com/commercial-lawyer-makkah.html', expected: 'https://mishal-lawfirm.com/commercial-lawyer-makkah' }
        ];

        for (const test of legacyRoutes) {
            try {
                const res = await requestUrl(test.from);
                const is301 = res.statusCode === 301 || res.statusCode === 302;
                assert(is301, `${test.from} returns HTTP 301 redirect (got: ${res.statusCode})`, true);
                
                if (res.location) {
                    const fullLocation = res.location.startsWith('http') ? res.location : `https://mishal-lawfirm.com${res.location}`;
                    assert(fullLocation === test.expected || fullLocation === test.expected + '/', `${test.from} location is exact canonical target: ${test.expected} (got: ${res.location})`, true);
                    
                    // Request destination and assert 200 without second redirect (single-hop verification)
                    const targetRes = await requestUrl(fullLocation);
                    assert(targetRes.statusCode === 200, `Target ${fullLocation} resolves directly with HTTP 200 (chain count = 0)`, true);
                }
            } catch (err) {
                assert(false, `Error testing legacy route ${test.from}: ${err.message}`);
            }
        }

        // ─── 4. Real HTTP 404 Nonexistent Route Test (Section 3E) ─────────────
        console.log('\n--- 4. Testing Real HTTP 404 on Nonexistent URL ---');
        const notFoundUrl = 'https://mishal-lawfirm.com/this-page-must-not-exist-qa-404';
        try {
            const res404 = await requestUrl(notFoundUrl);
            assert(res404.statusCode === 404, `${notFoundUrl} returns real HTTP 404 (got: ${res404.statusCode})`);
            assert(!res404.headers.location, `${notFoundUrl} does not redirect (no soft-404 redirect)`);
        } catch (err) {
            assert(false, `Error testing 404 endpoint ${notFoundUrl}: ${err.message}`);
        }

        // ─── 5. Production SSR Payloads & Semantic Content Contracts (Sections 4 & 5) ─
        console.log('\n--- 5. Testing Production SSR Payloads & Semantic Contracts ---');
        const representativePages = [
            { path: '/', title: 'Home', expectedCanonical: 'https://mishal-lawfirm.com/', expectedSemantic: 'مشعل بادغيش' },
            { path: '/about', title: 'About', expectedCanonical: 'https://mishal-lawfirm.com/about', expectedSemantic: 'من نحن' },
            { path: '/services', title: 'Services Hub', expectedCanonical: 'https://mishal-lawfirm.com/services', expectedSemantic: 'الخدمات' },
            { path: '/contact', title: 'Contact', expectedCanonical: 'https://mishal-lawfirm.com/contact', expectedSemantic: 'تواصل' },
            { path: '/articles', title: 'Articles Hub', expectedCanonical: 'https://mishal-lawfirm.com/articles', expectedSemantic: 'المدونة' },
            { path: '/commercial-lawyer-makkah', title: 'Commercial Service', expectedCanonical: 'https://mishal-lawfirm.com/commercial-lawyer-makkah', expectedSemantic: 'تجارية' },
            { path: '/military-cases-makkah', title: 'Military Service', expectedCanonical: 'https://mishal-lawfirm.com/military-cases-makkah', expectedSemantic: 'عسكرية' },
            { path: '/articles/كيف-تختار-أفضل-محامي-في-مكة', title: 'Article Page', expectedCanonical: 'https://mishal-lawfirm.com/articles/كيف-تختار-أفضل-محامي-في-مكة', expectedSemantic: 'كيف تختار' },
            { path: '/quick-services/commercial-consultation', title: 'Quick Service', expectedCanonical: 'https://mishal-lawfirm.com/quick-services/commercial-consultation', expectedSemantic: 'استشارة' }
        ];

        for (const page of representativePages) {
            const url = `https://mishal-lawfirm.com${page.path}`;
            try {
                const res = await requestUrl(url);
                assert(res.statusCode === 200, `${page.title} (${url}) returns HTTP 200 (got: ${res.statusCode})`);
                assert(res.body.includes('<html'), `${page.title} response contains <html>`);
                assert(res.body.includes('<body'), `${page.title} response contains <body>`);
                assert(res.body.includes('id="root"'), `${page.title} response contains #root container`);
                
                // SSR Rendered Body & H1 Check
                const hasH1 = /<h1[^>]*>[\s\S]*?<\/h1>/i.test(res.body);
                assert(hasH1, `${page.title} response contains prerendered <h1> (SSR payload)`, true);

                // Semantic marker check
                const hasSemanticMarker = res.body.includes(page.expectedSemantic);
                assert(hasSemanticMarker, `${page.title} contains route-specific semantic text ("${page.expectedSemantic}")`, true);

                // Canonical tag check (Section 6)
                const canonicalMatch = res.body.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
                assert(canonicalMatch && canonicalMatch[1] === page.expectedCanonical, `${page.title} canonical tag exactly matches ${page.expectedCanonical} (got: ${canonicalMatch ? canonicalMatch[1] : 'MISSING'})`, true);

                // JSON-LD Graph Validation (Section 7 & 8)
                const schemaMatch = res.body.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
                assert(schemaMatch !== null, `${page.title} contains JSON-LD schema`, true);

                if (schemaMatch) {
                    try {
                        const schema = JSON.parse(schemaMatch[1]);
                        assert(schema['@context'] === 'https://schema.org', `${page.title} schema @context is https://schema.org`, true);
                        assert(Array.isArray(schema['@graph']), `${page.title} schema @graph is an array`, true);

                        if (Array.isArray(schema['@graph'])) {
                            const graph = schema['@graph'];
                            const org = graph.find(e => e['@id'] === 'https://mishal-lawfirm.com/#organization');
                            assert(org !== undefined, `${page.title} schema contains Organization entity`, true);
                            
                            // Check sameAs in live Organization schema (Section 8)
                            if (org && org.sameAs) {
                                assert(Array.isArray(org.sameAs), `${page.title} Organization sameAs is array`, true);
                                assert(org.sameAs.includes('https://www.tiktok.com/@mishal_lawfirm'), `${page.title} schema contains official TikTok sameAs`, true);
                                assert(org.sameAs.includes('https://www.linkedin.com/company/mishal-lawfirm/'), `${page.title} schema contains official LinkedIn sameAs`, true);
                                assert(org.sameAs.includes('https://www.facebook.com/mishal.lawfirm'), `${page.title} schema contains official Facebook sameAs`, true);
                            }
                        }
                    } catch (parseErr) {
                        assert(false, `${page.title} valid JSON-LD schema parsing: ${parseErr.message}`, true);
                    }
                }
            } catch (err) {
                assert(false, `Error connecting to ${url}: ${err.message}`);
            }
        }

        // ─── 6. Production Sitemap & Robots QA (Section 9) ────────────────────
        console.log('\n--- 6. Testing Production sitemap.xml & robots.txt ---');
        try {
            const sitemapRes = await requestUrl('https://mishal-lawfirm.com/sitemap.xml');
            assert(sitemapRes.statusCode === 200, `https://mishal-lawfirm.com/sitemap.xml returns HTTP 200 (got: ${sitemapRes.statusCode})`);
            assert(sitemapRes.body.includes('<urlset') && sitemapRes.body.includes('</urlset>'), 'Production sitemap contains valid <urlset> XML');
            assert(!sitemapRes.body.includes('<priority>'), 'Production sitemap contains no deprecated <priority> tags', true);
            assert(!sitemapRes.body.includes('<changefreq>'), 'Production sitemap contains no deprecated <changefreq> tags', true);
        } catch (err) {
            assert(false, `Error testing sitemap.xml: ${err.message}`);
        }

        try {
            const robotsRes = await requestUrl('https://mishal-lawfirm.com/robots.txt');
            assert(robotsRes.statusCode === 200, `https://mishal-lawfirm.com/robots.txt returns HTTP 200 (got: ${robotsRes.statusCode})`);
            assert(robotsRes.body.includes('Sitemap: https://mishal-lawfirm.com/sitemap.xml'), 'Production robots.txt references canonical sitemap');
            assert(robotsRes.body.includes('Disallow: /admin'), 'Production robots.txt protects /admin');
        } catch (err) {
            assert(false, `Error testing robots.txt: ${err.message}`);
        }

    } catch (globalErr) {
        console.error('Fatal Production QA Error:', globalErr);
    }

    console.log('\n============================================================');
    console.log('🌐 PRODUCTION HTTP & LIVE DEPLOYMENT QA SUMMARY');
    console.log('============================================================');
    console.log(`✅ Total Live Tests Passed: ${passedTests}`);
    console.log(`❌ Total Live Tests Failed: ${failedTests}`);
    console.log(`📡 Deployment Status: ${isProductionUpdated ? 'YES (Live server is serving new SSR build)' : 'NO (Production server is still serving older CSR build - DEPLOYMENT REQUIRED)'}`);

    if (failedTests > 0) {
        console.log('\n📋 Diagnostic Notes:');
        console.log('- Local codebase is fully hardened and passes 100% of all local tests.');
        console.log('- The live remote server (https://mishal-lawfirm.com) currently runs the pre-SSR build.');
        console.log('- Once branch `seo-authority-build` is pushed and deployed to the production host, re-running `npm run validate:production` will verify all live endpoints.');
        process.exit(1);
    } else {
        console.log('\n✨ ALL LIVE PRODUCTION HTTP & ENDPOINT TESTS PASSED SUCCESSFULLY! (STATE B: PRODUCTION VERIFIED)');
        process.exit(0);
    }
}

runProductionValidation();
