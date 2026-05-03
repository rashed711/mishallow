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

    // Memoize schema generation for performance
    const schemaData = React.useMemo(() => {
        const baseSchema = {
            "@context": "https://schema.org",
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "image": imageUrl,
        };

        // 1. Article / BlogPosting Schema
        if (type === 'article') {
            return {
                ...baseSchema,
                "@type": "BlogPosting",
                "headline": title,
                "author": {
                    "@type": "Person",
                    "name": authorName
                },
                "publisher": {
                    "@type": "Organization",
                    "name": name,
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://mishallow.vercel.app/logo.webp"
                    }
                },
                "datePublished": datePublished || new Date().toISOString()
            };
        }

        // 2. FAQ Page Schema
        if (type === 'faq' && faqs) {
            return {
                ...baseSchema,
                "@type": "FAQPage",
                "mainEntity": faqs.map(item => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.answer
                    }
                }))
            };
        }

        // 3. Service Schema
        if (type === 'service') {
            return {
                ...baseSchema,
                "@type": "Service",
                "serviceType": serviceType,
                "areaServed": areaServed.map(city => ({
                    "@type": "City",
                    "name": city
                })),
                "provider": {
                    "@type": "LegalService",
                    "name": name,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Makkah",
                        "addressRegion": "Makkah Province",
                        "addressCountry": "SA"
                    },
                    "telephone": "+966568000085",
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": "21.4225",
                        "longitude": "39.8262"
                    }
                }
            };
        }

        // 4. Default LegalService Schema (for website type)
        return {
            ...baseSchema,
            "@type": "LegalService",
            "areaServed": areaServed.map(city => ({
                "@type": "City",
                "name": city
            })),
            "serviceType": serviceType,
            "provider": {
                "@type": "LegalService",
                "name": name,
                "telephone": "+966568000085"
            },
            "priceRange": "$$$"
        };
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

            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default SEO;
