import React from 'react';
import { Helmet } from 'react-helmet-async';
import { buildSchemaGraph, BUSINESS_INFO, FAQItem } from '../data/siteSchema';

interface BreadcrumbItem {
    name: string;
    url: string;
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
    noindex?: boolean;
    breadcrumbs?: BreadcrumbItem[];
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    name = BUSINESS_INFO.brandName,
    type = "website",
    url = BUSINESS_INFO.url,
    image = BUSINESS_INFO.image,
    serviceType,
    datePublished,
    authorName = BUSINESS_INFO.founder.name,
    faqs,
    quickServiceName,
    noindex = false,
    breadcrumbs
}) => {
    // Ensure image is an absolute URL
    const imageUrl = image.startsWith('http') ? image : `${BUSINESS_INFO.url}${image.startsWith('/') ? '' : '/'}${image}`;

    // Canonical URL: clean path without trailing slash (except root domain)
    const cleanUrl = (url || BUSINESS_INFO.url).replace(/\/+$/, '');
    const canonicalUrl = cleanUrl === BUSINESS_INFO.url ? `${BUSINESS_INFO.url}/` : cleanUrl;

    // Single unified schema graph
    const schemaGraph = React.useMemo(() => {
        return buildSchemaGraph({
            pageUrl: canonicalUrl,
            pageTitle: title,
            pageDescription: description,
            pageType: type as 'website' | 'article' | 'service' | 'faq',
            imageUrl: imageUrl,
            datePublished: datePublished,
            authorName: authorName,
            serviceType: serviceType,
            breadcrumbs: breadcrumbs,
            faqs: faqs,
            quickServiceName: quickServiceName
        });
    }, [title, description, canonicalUrl, imageUrl, type, datePublished, authorName, faqs, serviceType, quickServiceName, breadcrumbs]);

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name="robots" content={noindex ? "noindex, nofollow, noarchive" : "index, follow"} />
            <meta name="language" content="Arabic" />
            <meta name="author" content={authorName} />

            {/* GEO tags matching authoritative location in Makkah */}
            <meta name="geo.region" content="SA-02" />
            <meta name="geo.placename" content="Makkah" />
            <meta name="geo.position" content={`${BUSINESS_INFO.geo.latitude};${BUSINESS_INFO.geo.longitude}`} />
            <meta name="ICBM" content={`${BUSINESS_INFO.geo.latitude}, ${BUSINESS_INFO.geo.longitude}`} />

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

            {/* Canonical tag */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Single Coherent Schema.org JSON-LD Graph */}
            {!noindex && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schemaGraph)
                    }}
                />
            )}
        </Helmet>
    );
};

export default SEO;
