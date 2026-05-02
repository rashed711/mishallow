import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    name?: string;
    type?: string;
    url?: string;
    image?: string;
    areaServed?: string[];
    serviceType?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    name = "مكتب مشعل بادغيش للمحاماة",
    type = "website",
    url = "https://mishallow.vercel.app",
    image = "https://mishallow.vercel.app/logo.webp",
    areaServed = ["Makkah", "Jeddah"],
    serviceType = "Legal Services"
}) => {
    // Ensure image is an absolute URL
    const imageUrl = image.startsWith('http') ? image : `https://mishallow.vercel.app${image}`;

    // Determine canonical URL: if url is just the domain, use current path
    const canonicalUrl = url.endsWith('/') ? url : `${url}/`;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="Arabic" />
            <meta name="author" content={name} />

            {/* Facebook / Open Graph tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content={name} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:secure_url" content={imageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:locale" content="ar_SA" />
            <meta itemprop="image" content={imageUrl} />

            {/* Twitter tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@mishallow" />
            <meta name="twitter:creator" content="@mishallow" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:image:alt" content={title} />

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Structured Data (JSON-LD) for GEO/Entity Authority */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": type === 'article' ? 'Article' : 'LegalService',
                    "name": title,
                    "description": description,
                    "url": canonicalUrl,
                    "image": imageUrl,
                    "areaServed": [
                        {
                            "@type": "City",
                            "name": "Makkah",
                            "sameAs": "https://en.wikipedia.org/wiki/Mecca"
                        },
                        {
                            "@type": "City",
                            "name": "Jeddah",
                            "sameAs": "https://en.wikipedia.org/wiki/Jeddah"
                        }
                    ],
                    "serviceType": serviceType,
                    "provider": {
                        "@type": "LegalService",
                        "name": "مكتب مشعل بادغيش للمحاماة",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Makkah",
                            "addressRegion": "Makkah Province",
                            "addressCountry": "SA"
                        },
                        "telephone": "+966568000085"
                    },
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "خدمات قانونية سعودية",
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "الترافع أمام المحاكم التجارية"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "التمثيل القضائي عبر منصة ناجز"
                                }
                            }
                        ]
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": "21.4225",
                        "longitude": "39.8262"
                    },
                    "priceRange": "$$$"
                })}
            </script>
        </Helmet>
    );
}

export default SEO;
