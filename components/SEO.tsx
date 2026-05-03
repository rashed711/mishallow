import React from 'react';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
    question: string;
    answer: string;
}

interface SEOProps {
    title: string;
    description: string;
    name?: string;
    type?: 'website' | 'article' | 'service' | 'faq';
    url?: string;
    image?: string;
    areaServed?: string[];
    serviceType?: string;
    datePublished?: string;
    authorName?: string;
    faqs?: FAQItem[];
    quickServiceName?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    name = "مكتب مشعل بادغيش للمحاماة",
    type = "website",
    url = "https://mishallow.vercel.app",
    image = "https://mishallow.vercel.app/logo.webp",
    areaServed = ["Makkah", "Jeddah"],
    serviceType = "Legal Services",
    datePublished,
    authorName = "مشعل بادغيش",
    faqs,
    quickServiceName
}) => {
    // Ensure image is an absolute URL
    const imageUrl = image.startsWith('http') ? image : `https://mishallow.vercel.app${image}`;

    // Determine canonical URL
    const canonicalUrl = url.endsWith('/') ? url : `${url}/`;

    // Memoize multiple schemas generation for performance
    const schemas = React.useMemo(() => {
        const orgId = "https://mishallow.vercel.app/#organization";
        const globalOrganization = {
            "@context": "https://schema.org",
            "@type": "LegalService",
            "@id": orgId,
            "name": name,
            "url": "https://mishallow.vercel.app",
            "logo": "https://mishallow.vercel.app/logo.webp",
            "image": "https://mishallow.vercel.app/logo.webp",
            "telephone": "+966568000085",
            "areaServed": areaServed.map(city => ({
                "@type": "City",
                "name": city
            })),
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "21.4225",
                "longitude": "39.8262"
            },
            "sameAs": [
                "https://najiz.sa",
                "https://www.moj.gov.sa"
            ]
        };

        const breadcrumbs = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "الرئيسية",
                    "item": {
                        "@id": "https://mishallow.vercel.app"
                    }
                }
            ]
        };

        const pageSchemas: any[] = [globalOrganization];

        // 1. Article / BlogPosting Schema
        if (type === 'article') {
            const articleId = `${canonicalUrl}#article`;
            breadcrumbs.itemListElement.push(
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "المقالات",
                    "item": {
                        "@id": "https://mishallow.vercel.app/articles"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": title,
                    "item": {
                        "@id": articleId
                    }
                }
            );
            pageSchemas.push(breadcrumbs);

            pageSchemas.push({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "@id": articleId,
                "headline": title,
                "description": description,
                "url": canonicalUrl,
                "image": imageUrl,
                "author": {
                    "@type": "Person",
                    "name": authorName
                },
                "publisher": { "@id": orgId },
                "isPartOf": { "@id": "https://mishallow.vercel.app/#website" },
                "about": {
                    "@type": "Service",
                    "name": serviceType
                },
                "datePublished": datePublished || new Date().toISOString()
            });
        }

        // 2. Service Schema
        if (type === 'service') {
            const serviceId = `${canonicalUrl}#service`;
            breadcrumbs.itemListElement.push(
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "الخدمات",
                    "item": {
                        "@id": "https://mishallow.vercel.app/services"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": title,
                    "item": {
                        "@id": serviceId
                    }
                }
            );
            pageSchemas.push(breadcrumbs);

            pageSchemas.push({
                "@context": "https://schema.org",
                "@type": "Service",
                "@id": serviceId,
                "name": title,
                "description": description,
                "serviceType": serviceType,
                "provider": { "@id": orgId },
                "areaServed": areaServed.map(city => ({
                    "@type": "City",
                    "name": city
                })),
                ...(quickServiceName && {
                    "offers": {
                        "@type": "Offer",
                        "name": quickServiceName,
                        "offeredBy": { "@id": orgId }
                    }
                })
            });
        }

        // 3. FAQ Schema (Always link to main content)
        if (faqs && faqs.length > 0) {
            pageSchemas.push({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "about": {
                    "@type": "Service",
                    "name": serviceType
                },
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

        return pageSchemas;
    }, [title, description, canonicalUrl, imageUrl, type, datePublished, authorName, faqs, serviceType, areaServed, name]);

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="Arabic" />
            <meta name="author" content={authorName} />

            {/* Open Graph tags */}
            <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content={name} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:locale" content="ar_SA" />

            {/* Twitter tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />

            <link rel="canonical" href={canonicalUrl} />

            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema)
                    }}
                />
            ))}
        </Helmet>
    );
};

export default SEO;
