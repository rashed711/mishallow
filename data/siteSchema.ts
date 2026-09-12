/**
 * Single Authoritative Source of Truth for Entity Data, GEO, Local SEO, and Schema.org Graph
 * شركة مشعل بادغيش للمحاماة والاستشارات القانونية
 */

export const BUSINESS_INFO = {
  legalName: "شركة مشعل بادغيش للمحاماة والاستشارات القانونية",
  brandName: "مشعل بادغيش للمحاماة والاستشارات القانونية",
  alternateNames: [
    "شركة مشعل بادغيش للمحاماة والاستشارات القانونية",
    "شركة مشعل بادغيش للمحاماة",
    "مكتب مشعل بادغيش للمحاماة"
  ],
  url: "https://mishal-lawfirm.com",
  logo: "https://mishal-lawfirm.com/images/logo/logo.webp",
  image: "https://mishal-lawfirm.com/images/logo/logo.webp",
  telephone: "+966568000085",
  email: "info@mishal-lawfirm.com",
  priceRange: "$$",
  openingHours: "Su-Th 09:00-17:00",
  founder: {
    name: "مشعل بادغيش",
    jobTitle: "المؤسس والمدير العام - محامٍ ومستشار قانوني مرخص"
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
export const PERSON_ID = `${BUSINESS_INFO.url}/#mishal-badghish`;

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
  dateModified?: string;
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
    dateModified,
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

  // 1. Person Entity (Founder)
  const personEntity = {
    "@type": "Person",
    "@id": PERSON_ID,
    "name": BUSINESS_INFO.founder.name,
    "jobTitle": BUSINESS_INFO.founder.jobTitle,
    "image": `${BUSINESS_INFO.url}/images/team/team-1.webp`,
    "url": `${BUSINESS_INFO.url}/about`,
    "worksFor": { "@id": ORG_ID }
  };

  // 2. Organization / LegalService (Single Entity Definition)
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
    "priceRange": BUSINESS_INFO.priceRange,
    "address": BUSINESS_INFO.address,
    "geo": BUSINESS_INFO.geo,
    "areaServed": BUSINESS_INFO.areaServed,
    "founder": { "@id": PERSON_ID },
    "knowsAbout": BUSINESS_INFO.knowsAbout,
    "openingHours": BUSINESS_INFO.openingHours,
    ...(BUSINESS_INFO.sameAs.length > 0 ? { "sameAs": BUSINESS_INFO.sameAs } : {})
  };

  // 3. WebSite Entity
  const websiteEntity = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    "url": BUSINESS_INFO.url,
    "name": BUSINESS_INFO.brandName,
    "alternateName": BUSINESS_INFO.alternateNames,
    "publisher": { "@id": ORG_ID },
    "inLanguage": "ar"
  };

  // 4. WebPage Entity
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

  const graph: any[] = [organizationEntity, personEntity, websiteEntity, webPageEntity];

  // 5. BreadcrumbList
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
  } else if (canonicalUrl !== `${BUSINESS_INFO.url}/` && canonicalUrl !== BUSINESS_INFO.url) {
    breadcrumbElements.push({
      "@type": "ListItem",
      "position": 2,
      "name": pageTitle.split('|')[0].trim(),
      "item": {
        "@id": canonicalUrl
      }
    });
  }

  if (breadcrumbElements.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      "itemListElement": breadcrumbElements
    });
  }

  // 6. Service Entity (When on a service page)
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

  // 7. Article / BlogPosting Entity (When on an article page)
  if (pageType === 'article') {
    const articleId = `${canonicalUrl}#article`;
    webPageEntity.mainEntity = { "@id": articleId };

    const isFounder = !authorName || authorName === BUSINESS_INFO.founder.name;

    const articleEntity: any = {
      "@type": "BlogPosting",
      "@id": articleId,
      "headline": pageTitle,
      "description": pageDescription,
      "url": canonicalUrl,
      "image": imageUrl.startsWith('http') ? imageUrl : `${BUSINESS_INFO.url}${imageUrl}`,
      "author": isFounder ? { "@id": PERSON_ID } : {
        "@type": "Person",
        "name": authorName,
        "worksFor": { "@id": ORG_ID }
      },
      "publisher": { "@id": ORG_ID },
      "isPartOf": { "@id": WEBSITE_ID },
      "inLanguage": "ar"
    };

    // Only include dates if provided and truthful
    if (datePublished && datePublished.trim() !== '') {
      articleEntity.datePublished = datePublished;
    }
    if (dateModified && dateModified.trim() !== '') {
      articleEntity.dateModified = dateModified;
    }

    graph.push(articleEntity);
  }

  // 8. FAQPage / Questions (When valid FAQs exist)
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
