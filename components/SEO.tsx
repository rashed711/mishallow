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
    faqs
}) => {
    // Ensure image is an absolute URL
    const imageUrl = image.startsWith('http') ? image : `https://mishallow.vercel.app${image}`;

    // Determine canonical URL
    const canonicalUrl = url.endsWith('/') ? url : `${url}/`;

    // Memoize multiple schemas generation for performance
    const schemas = React.useMemo(() => {
        const globalOrganization = {
            "@context": "https://schema.org",
            "@type": "LegalService",
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
                    "item": "https://mishallow.vercel.app"
                }
            ]
        };

        const pageSchemas: any[] = [globalOrganization];

        // 1. Article / BlogPosting Schema
        if (type === 'article') {
            breadcrumbs.itemListElement.push(
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "المقالات",
                    "item": "https://mishallow.vercel.app/articles"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": title,
                    "item": canonicalUrl
                }
            );
            pageSchemas.push(breadcrumbs);

            pageSchemas.push({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title,
                "description": description,
                "url": canonicalUrl,
                "image": imageUrl,
                "author": {
                    "@type": "Person",
                    "name": authorName
                },
                "publisher": globalOrganization,
                "datePublished": datePublished || new Date().toISOString()
            });
        }

        // 2. Service Schema
        if (type === 'service') {
            breadcrumbs.itemListElement.push(
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "الخدمات",
                    "item": "https://mishallow.vercel.app/services"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": title,
                    "item": canonicalUrl
                }
            );
            pageSchemas.push(breadcrumbs);

            pageSchemas.push({
                "@context": "https://schema.org",
                "@type": "Service",
                "name": title,
                "description": description,
                "serviceType": serviceType,
                "provider": globalOrganization,
                "areaServed": areaServed.map(city => ({
                    "@type": "City",
                    "name": city
                }))
            });
        }

        // 3. FAQ Schema (Always link to main content)
        if (faqs && faqs.length > 0) {
            pageSchemas.push({
                "@context": "https://schema.org",
                "@type": "FAQPage",
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
