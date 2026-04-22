import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    name?: string;
    type?: string;
    url?: string;
    image?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    name = "مكتب مشعل بادغيش للمحاماة",
    type = "website",
    url = "https://mishallow.vercel.app",
    image = "https://mishallow.vercel.app/logo.png"
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

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": type === 'article' ? 'Article' : 'LegalService',
                    "name": title,
                    "description": description,
                    "url": canonicalUrl,
                    "image": imageUrl,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Makkah",
                        "addressCountry": "SA"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": "21.4225",
                        "longitude": "39.8262"
                    },
                    "telephone": "+966568000085"
                })}
            </script>
        </Helmet>
    );
}

export default SEO;
