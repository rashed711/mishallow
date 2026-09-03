/**
 * Single Authoritative Source of Truth for Entity Data, GEO, Local SEO, and Schema.org Graph
 * شركة مشعل بادغيش للمحاماة والاستشارات القانونية
 */

export const BUSINESS_INFO = {
  legalName: "شركة مشعل بادغيش للمحاماة والاستشارات القانونية",
  brandName: "شركة مشعل بادغيش للمحاماة",
  alternateNames: [
    "شركة مشعل بادغيش للمحاماة والاستشارات القانونية",
    "شركة مشعل بادغيش للمحاماة",
    "مكتب المحامي مشعل بادغيش",
    "شركة محاماة في مكة وجدة"
  ],
  url: "https://mishal-lawfirm.com",
  logo: "https://mishal-lawfirm.com/images/logo/logo.webp",
  image: "https://mishal-lawfirm.com/images/logo/logo.webp",
  telephone: "+966568000085",
  email: "info@mishal-lawfirm.com",
  priceRange: "$$",
  founder: {
    "@type": "Person",
    name: "مشعل بادغيش",
    jobTitle: "محامي ومستشار قانوني مرخص"
  },
  // Physical Office Location (Makkah Only)
  address: {
    "@type": "PostalAddress",
    streetAddress: "شارع عبدالله بن عباس، بجوار نادي ستار تراك",
    addressLocality: "Makkah",
    addressRegion: "Makkah Province",
    postalCode: "24353",
    addressCountry: "SA"
  },
  // Single Authoritative Coordinates
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.3508,
    longitude: 39.8821
  },
  // Service Areas (Distinguished from physical office)
  areaServed: [
    {
      "@type": "City",
      name: "Makkah",
      sameAs: "https://en.wikipedia.org/wiki/Mecca"
    },
    {
      "@type": "City",
      name: "Jeddah",
      sameAs: "https://en.wikipedia.org/wiki/Jeddah"
    }
  ],
  // Legal domain expertise and official regulatory references
  knowsAbout: [
    "الأنظمة واللوائح القضائية في المملكة العربية السعودية",
    "نظام المعاملات المدنية السعودي",
    "نظام الشركات السعودي الجديد",
    "نظام العمل والتأمينات الاجتماعية",
    "نظام الإجراءات الجزائية ومكافحة الجرائم المعلوماتية",
    "منظومة القضاء التجاري وإعادة التنظيم المالي",
    "بوابة ناجز وخدمات وزارة العدل السعودية",
    "منصة معين الرقمية بديوان المظالم",
    "منصة قوى لوزارة الموارد البشرية والتنمية الاجتماعية"
  ],
  // Verified third-party profiles ONLY (No government portals)
  sameAs: [] as string[]
};

export const ORG_ID = `${BUSINESS_INFO.url}/#organization`;
export const WEBSITE_ID = `${BUSINESS_INFO.url}/#website`;

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GenerateGraphParams {
  pageUrl: string;
  pageTitle: string;
  pageDescription: string;
  pageType?: 'website' | 'article' | 'service' | 'faq';
  imageUrl?: string;
  datePublished?: string;
  authorName?: string;
  serviceType?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  quickServiceName?: string;
}

/**
 * Builds a single, unified, valid JSON-LD @graph matching Google & Schema.org specifications
 */
export function buildSchemaGraph(params: GenerateGraphParams) {
  const {
    pageUrl,
    pageTitle,
    pageDescription,
    pageType = 'website',
    imageUrl = BUSINESS_INFO.image,
    datePublished,
    authorName = BUSINESS_INFO.founder.name,
    serviceType = "خدمات واستشارات قانونية",
    breadcrumbs = [],
    faqs = [],
    quickServiceName
  } = params;

  // Clean canonical URL
  const cleanUrl = pageUrl.replace(/\/+$/, '') || BUSINESS_INFO.url;
  const canonicalUrl = cleanUrl === BUSINESS_INFO.url ? `${BUSINESS_INFO.url}/` : cleanUrl;
  const webpageId = `${canonicalUrl}#webpage`;

  // 1. Organization / LegalService (Single Entity Definition)
  const organizationEntity = {
    "@type": "LegalService",
    "@id": ORG_ID,
    "name": BUSINESS_INFO.legalName,
    "alternateName": BUSINESS_INFO.alternateNames,
    "url": BUSINESS_INFO.url,
    "logo": BUSINESS_INFO.logo,
    "image": BUSINESS_INFO.image,
    "telephone": BUSINESS_INFO.telephone,
    "email": BUSINESS_INFO.email,
    "address": BUSINESS_INFO.address,
    "geo": BUSINESS_INFO.geo,
    "areaServed": BUSINESS_INFO.areaServed,
    "founder": BUSINESS_INFO.founder,
    "knowsAbout": BUSINESS_INFO.knowsAbout,
    ...(BUSINESS_INFO.sameAs.length > 0 ? { "sameAs": BUSINESS_INFO.sameAs } : {})
  };

  // 2. WebSite Entity
  const websiteEntity = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    "url": BUSINESS_INFO.url,
    "name": BUSINESS_INFO.brandName,
    "alternateName": BUSINESS_INFO.alternateNames,
    "publisher": { "@id": ORG_ID },
    "inLanguage": "ar"
  };

  // 3. WebPage Entity
  const webPageEntity: any = {
    "@type": "WebPage",
    "@id": webpageId,
    "url": canonicalUrl,
    "name": pageTitle,
    "description": pageDescription,
    "isPartOf": { "@id": WEBSITE_ID },
    "about": { "@id": ORG_ID },
    "inLanguage": "ar"
  };

  const graph: any[] = [organizationEntity, websiteEntity, webPageEntity];

  // 4. BreadcrumbList
  const breadcrumbElements = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "الرئيسية",
      "item": {
        "@id": `${BUSINESS_INFO.url}/`
      }
    }
  ];

  if (breadcrumbs.length > 0) {
    breadcrumbs.forEach((b, idx) => {
      breadcrumbElements.push({
        "@type": "ListItem",
        "position": idx + 2,
        "name": b.name,
        "item": {
          "@id": b.url
        }
      });
    });
  } else if (pageType === 'service') {
    breadcrumbElements.push(
      {
        "@type": "ListItem",
        "position": 2,
        "name": "الخدمات",
        "item": {
          "@id": `${BUSINESS_INFO.url}/services`
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": pageTitle,
        "item": {
          "@id": canonicalUrl
        }
      }
    );
  } else if (pageType === 'article') {
    breadcrumbElements.push(
      {
        "@type": "ListItem",
        "position": 2,
        "name": "المقالات",
        "item": {
          "@id": `${BUSINESS_INFO.url}/articles`
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": pageTitle,
        "item": {
          "@id": canonicalUrl
        }
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

  // 5. Service Entity (When on a service page)
  if (pageType === 'service') {
    const serviceId = `${canonicalUrl}#service`;
    webPageEntity.mainEntity = { "@id": serviceId };

    const serviceEntity: any = {
      "@type": "Service",
      "@id": serviceId,
      "name": pageTitle,
      "description": pageDescription,
      "serviceType": serviceType,
      "provider": { "@id": ORG_ID },
      "areaServed": BUSINESS_INFO.areaServed,
      ...(quickServiceName && {
        "offers": {
          "@type": "Offer",
          "name": quickServiceName,
          "offeredBy": { "@id": ORG_ID }
        }
      })
    };
    graph.push(serviceEntity);
  }

  // 6. Article / BlogPosting Entity (When on an article page)
  if (pageType === 'article') {
    const articleId = `${canonicalUrl}#article`;
    webPageEntity.mainEntity = { "@id": articleId };

    const articleEntity: any = {
      "@type": "BlogPosting",
      "@id": articleId,
      "headline": pageTitle,
      "description": pageDescription,
      "url": canonicalUrl,
      "image": imageUrl.startsWith('http') ? imageUrl : `${BUSINESS_INFO.url}${imageUrl}`,
      "author": {
        "@type": "Person",
        "name": authorName || BUSINESS_INFO.founder.name,
        "jobTitle": BUSINESS_INFO.founder.jobTitle
      },
      "publisher": { "@id": ORG_ID },
      "isPartOf": { "@id": WEBSITE_ID },
      "inLanguage": "ar"
    };

    // Only include datePublished if provided and valid - NEVER fabricate a date
    if (datePublished && datePublished.trim() !== '') {
      articleEntity.datePublished = datePublished;
    }

    graph.push(articleEntity);
  }

  // 7. FAQPage / Questions (When valid FAQs exist)
  if (faqs && faqs.length > 0) {
    const faqId = `${canonicalUrl}#faq`;
    graph.push({
      "@type": "FAQPage",
      "@id": faqId,
      "mainEntity": faqs.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}
