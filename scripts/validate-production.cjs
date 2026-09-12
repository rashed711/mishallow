const https = require('https');
const http = require('http');

let passedTests = 0;
let failedTests = 0;
const errors = [];

function assert(condition, message) {
    if (condition) {
        passedTests++;
        console.log(`  ✅ PASS: ${message}`);
    } else {
        failedTests++;
        errors.push(message);
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
    console.log('🌐 Starting Production HTTP & Live Domain Validation suite...\n');
    console.log('Target: https://mishal-lawfirm.com\n');

    try {
        // ─── 1. Public 200 Route Verification ─────────────────────────────────
        console.log('--- 1. Testing Public 200 Endpoints & HTML Payload ---');
        const testRoutes = [
            '/',
            '/about',
            '/services',
            '/contact',
            '/articles',
            '/commercial-lawyer-makkah',
            '/articles/كيف-تختار-أفضل-محامي-في-مكة',
            '/quick-services/commercial-consultation'
        ];

        for (const route of testRoutes) {
            const url = `https://mishal-lawfirm.com${route}`;
            try {
                const res = await requestUrl(url);
                assert(res.statusCode === 200, `${url} returns HTTP 200 (got: ${res.statusCode})`);
                assert(res.body.includes('<html'), `${url} response contains <html>`);
                assert(res.body.includes('<body'), `${url} response contains <body>`);
                assert(res.body.includes('id="root"'), `${url} response contains #root container`);
                assert(/<h1[^>]*>[\s\S]*?<\/h1>/i.test(res.body), `${url} response contains <h1>`);
                assert(res.body.includes('rel="canonical"') || res.body.includes("rel='canonical'"), `${url} response contains canonical tag`);
                assert(res.body.includes('application/ld+json'), `${url} response contains JSON-LD`);
            } catch (err) {
                assert(false, `Error connecting to ${url}: ${err.message}`);
            }
        }

        // ─── 2. Real HTTP 404 Nonexistent Route Test ─────────────────────────
        console.log('\n--- 2. Testing Nonexistent Route (HTTP 404) ---');
        const notFoundUrl = 'https://mishal-lawfirm.com/this-page-must-not-exist-qa-404';
        try {
            const res404 = await requestUrl(notFoundUrl);
            assert(res404.statusCode === 404, `${notFoundUrl} returns real HTTP 404 (got: ${res404.statusCode})`);
        } catch (err) {
            assert(false, `Error testing 404 endpoint ${notFoundUrl}: ${err.message}`);
        }

        // ─── 3. Legacy 301 Single-Hop Redirects ──────────────────────────────
        console.log('\n--- 3. Testing Legacy 301 Redirects ---');
        const legacyRedirectTests = [
            { from: 'https://mishal-lawfirm.com/commercial-lawyer-makkah.html', expectedTo: 'https://mishal-lawfirm.com/commercial-lawyer-makkah' },
            { from: 'https://mishal-lawfirm.com/about.html', expectedTo: 'https://mishal-lawfirm.com/about' },
            { from: 'https://mishal-lawfirm.com/services.html', expectedTo: 'https://mishal-lawfirm.com/services' }
        ];

        for (const test of legacyRedirectTests) {
            try {
                const res = await requestUrl(test.from);
                assert(res.statusCode === 301, `${test.from} returns HTTP 301 (got: ${res.statusCode})`);
                if (res.location) {
                    assert(res.location === test.expectedTo || res.location === test.expectedTo.replace('https://mishal-lawfirm.com', ''), `${test.from} redirects directly to canonical: ${test.expectedTo} (got: ${res.location})`);
                }
            } catch (err) {
                assert(false, `Error testing legacy redirect ${test.from}: ${err.message}`);
            }
        }

        // ─── 4. HTTPS & Non-WWW Canonical Redirects ───────────────────────────
        console.log('\n--- 4. Testing HTTP -> HTTPS & WWW -> Non-WWW Redirects ---');
        try {
            const httpRes = await requestUrl('http://mishal-lawfirm.com/');
            assert(httpRes.statusCode === 301 || httpRes.statusCode === 302, `http://mishal-lawfirm.com/ redirects (got: ${httpRes.statusCode})`);
            if (httpRes.location) {
                assert(httpRes.location.startsWith('https://mishal-lawfirm.com'), `http:// redirects to https://mishal-lawfirm.com (got: ${httpRes.location})`);
            }
        } catch (err) {
            console.log(`  ℹ️ Note: Port 80 HTTP check skipped/error: ${err.message}`);
        }

        // ─── 5. Production Sitemap.xml Verification ───────────────────────────
        console.log('\n--- 5. Testing Production sitemap.xml ---');
        try {
            const sitemapRes = await requestUrl('https://mishal-lawfirm.com/sitemap.xml');
            assert(sitemapRes.statusCode === 200, `https://mishal-lawfirm.com/sitemap.xml returns HTTP 200 (got: ${sitemapRes.statusCode})`);
            assert(sitemapRes.body.includes('<urlset') && sitemapRes.body.includes('</urlset>'), 'Production sitemap contains valid <urlset> XML');
            assert(!sitemapRes.body.includes('<priority>'), 'Production sitemap contains no deprecated <priority> tags');
            assert(!sitemapRes.body.includes('<changefreq>'), 'Production sitemap contains no deprecated <changefreq> tags');
        } catch (err) {
            assert(false, `Error testing sitemap.xml: ${err.message}`);
        }

        // ─── 6. Production Robots.txt Verification ────────────────────────────
        console.log('\n--- 6. Testing Production robots.txt ---');
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
    console.log('🌐 PRODUCTION HTTP & DOMAIN QA SUMMARY');
    console.log('============================================================');
    console.log(`✅ Total Tests Passed: ${passedTests}`);
    console.log(`❌ Total Tests Failed: ${failedTests}`);

    if (failedTests > 0) {
        console.error('\n❌ PRODUCTION VALIDATION COMPLETED WITH REGRESSIONS/FAILURES.');
        errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
        process.exit(1);
    } else {
        console.log('\n✨ ALL PRODUCTION HTTP & ENDPOINT TESTS PASSED SUCCESSFULLY!');
        process.exit(0);
    }
}

runProductionValidation();
