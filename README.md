# شركة مشعل بادغيش للمحاماة والاستشارات القانونية

المستودع الرسمي للموقع الإلكتروني والبنية الرقمية لشركة مشعل بادغيش للمحاماة والاستشارات القانونية (مكة المكرمة وجدة).

---

## Overview

This repository contains the source code, static pre-rendering pipeline, automated SEO validation suite, and deployment infrastructure for the official production website of **Mishal Badghish Law Firm** ([https://mishal-lawfirm.com](https://mishal-lawfirm.com)).

The project is built as a high-performance, statically pre-rendered React application engineered for optimal crawlability, structured data integrity, fast page load speeds, and compliance with modern Search and Answer Engine standards (SEO/GEO/AEO).

---

## Website

* **Official Domain:** [https://mishal-lawfirm.com](https://mishal-lawfirm.com)
* **Hosting Platform:** Cloudflare Pages (Automated Production Pipeline)

---

## Technology Stack

* **Frontend Framework:** React 18 (`react`, `react-dom`)
* **Build System:** Vite (`vite`, `@vitejs/plugin-react`)
* **Language:** TypeScript (`typescript`)
* **Routing:** React Router v6 (`react-router-dom`)
* **Styling:** Tailwind CSS & PostCSS (`tailwindcss`, `@tailwindcss/postcss`, `autoprefixer`)
* **Animations:** Framer Motion (`framer-motion`)
* **Metadata & Head Management:** React Helmet Async (`react-helmet-async`)
* **Static Site Generation (SSG):** Custom SSR Pre-rendering engine (`entry-server.tsx` + `scripts/generate-static.cjs`)
* **Serverless Edge Layer:** Cloudflare Pages Functions (`functions/_middleware.js`, `functions/send.js`)

---

## Project Structure

```text
├── components/          # Reusable UI components, layout, header, footer, modals, and SVG icons
│   └── icons/           # Specialized legal practice SVG icons
├── data/                # Authoritative data sources and single source of truth
│   ├── articles.ts      # 28 comprehensive legal articles with semantic H2 headings
│   ├── quickServices.ts # 7 quick advisory services
│   ├── services.ts      # 13 core specialized legal services and 52 procedural FAQs
│   ├── siteSchema.ts    # Single authoritative Schema.org entity graph and business metadata
│   └── team.ts          # Leadership and legal team data
├── functions/           # Cloudflare Pages Functions (Edge middleware & contact handling)
├── pages/               # Route components (Home, About, Services, Articles, Contact, Legal)
├── public/              # Static public assets, sitemap.xml, robots.txt, 404.html, headers/redirects
│   ├── .well-known/     # Agent skills, MCP cards, and API catalog descriptors
│   └── images/          # Optimized WebP assets (articles, services, hero, team, logo)
├── scripts/             # Build and quality assurance scripts
│   ├── generate-static.cjs    # Static pre-rendering engine (generates 54 HTML routes)
│   ├── validate-seo.cjs       # Deep route-aware SEO & Schema validation suite (2,936 tests)
│   └── validate-production.cjs # Live HTTP/endpoint production verification suite
├── App.tsx              # Application root and route mapping
├── entry-server.tsx     # SSR entry point for build-time static generation
├── index.html           # HTML template with critical preloads and fallback schema
├── index.tsx            # Client-side hydration and DOM mount entry point
├── package.json         # Project metadata, dependencies, and npm scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite build and plugin configuration
```

---

## SEO / GEO / AEO Architecture

The website implements an advanced technical SEO and semantic entity graph architecture:

* **Centralized Entity Graph (`data/siteSchema.ts`):** Single authoritative source of truth for Schema.org `@graph` combining `LegalService`, `Organization`, `Person` (Founder: Mishal Badghish), `WebSite`, `WebPage`, `Service`, `BlogPosting`, and `FAQPage`.
* **Consistent Preferred Site Name:** Unified representation across `WebSite.name`, `Organization.name`, `og:site_name`, and `<title>` (`شركة مشعل بادغيش للمحاماة والاستشارات القانونية`).
* **Authoritative Physical Headquarters:** Makkah (`شارع عبدالله بن عباس - بجوار نادي ستار تراك - مكة المكرمة - 24353`).
* **Authoritative Service Area:** Makkah and Jeddah (`areaServed: ['Makkah', 'Jeddah']`).
* **Exact Coordinates & Geo Tags:** Latitude: `21.3719559`, Longitude: `39.7920768` configured in Schema, `geo.position`, and `ICBM`.
* **Verified Google Maps Link:** [https://maps.app.goo.gl/3pHtRrMiMs4LA931A](https://maps.app.goo.gl/3pHtRrMiMs4LA931A) linked directly in user-facing navigation.
* **Agent-Ready AEO Layer:** Cloudflare middleware (`functions/_middleware.js`) dynamically serves clean, structured Markdown for AI agents and LLM scrapers requesting `Accept: text/markdown`.
* **Social Verification (`sameAs`):** Official verified company profiles on TikTok, LinkedIn, and Facebook.

---

## Static Generation

The project prerenders all public indexable routes into static HTML files containing full semantic markup (`<h1>`, body content, FAQ accordions, JSON-LD schema) at build time:

* **Pre-rendered Routes:** **54 static routes** (Core pages, 13 Specialized Services, 28 Legal Articles, 7 Quick Advisory Services).
* **Generation Engine:** `scripts/generate-static.cjs` invoked automatically during `npm run build`.
* **Dynamic Sitemap:** `public/sitemap.xml` generated with truthful `lastmod` dates extracted from Git commit history.

---

## Local Development

Prerequisites: **Node.js** (v18+ recommended) and **npm**.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Build & Validation

The build and quality assurance pipeline consists of the following verified npm scripts:

* **Production Build:**
  ```bash
  npm run build
  ```
  Executes Vite production bundling, generates 54 static HTML files with full body content, builds `public/sitemap.xml`, and automatically runs the automated SEO validator.

* **SEO & Semantic QA Validation:**
  ```bash
  npm run validate
  ```
  Executes `scripts/validate-seo.cjs`, running 2,936 automated checks validating route existence, HTML body integrity, canonical exactness, Schema.org graph structures, GPS coordinates, site names, and internal linking.

* **Live Production QA:**
  ```bash
  npm run validate:production
  ```
  Tests live HTTP status codes, HTTPS redirects, canonical consistency, robots.txt, sitemap accessibility, and SSR payloads against the live domain.

* **TypeScript Check:**
  ```bash
  npx tsc --noEmit
  ```

---

## Production

* **Platform:** Cloudflare Pages
* **Production Domain:** [https://mishal-lawfirm.com](https://mishal-lawfirm.com)
* **Production Baseline Commit:** `ce255738f8bee72391276911c58b2490b9083872`

---

## SEO & Production Baseline

* **Static Route Count:** 54 / 54 routes generated
* **Automated SEO Tests:** 2,936 / 2,936 tests passing (100% PASS)
* **Canonical URL Structure:** Single, HTTPS, apex domain (`https://mishal-lawfirm.com/`)
* **Sitemap Status:** Active, 54 canonical URLs with accurate `lastmod` dates
* **Robots Status:** Active, canonical sitemap reference, private path protection

---

## Repository Rules

1. **Deliberate Changes:** All changes must be tested locally using `npm run build` and `npm run validate` before deployment.
2. **Entity Consistency:** Preserve authoritative headquarters in Makkah and declared service coverage in Makkah and Jeddah without creating false branch claims.
3. **No Doorway Pages:** Do not generate repetitive, low-value location pages.
4. **No Keyword Stuffing:** Maintain natural, professional Arabic prose suitable for a licensed law firm.
5. **Verified Saudi Legal Standards:** Base all legal, statutory, and procedural statements on authoritative Saudi sources (Ministry of Justice, Najiz, Qiwa, Commercial Courts).
6. **Architecture Integrity:** Preserve the static pre-rendering, schema data flow, and Cloudflare Pages Functions configuration.

---

## License

License information is not currently specified in this repository.
