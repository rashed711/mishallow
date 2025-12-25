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
    image = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800"
}) => {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />

            {/* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={name} />
            <meta property="og:image" content={image} />

            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}

export default SEO;
