import React, { ReactNode } from "react";

import { useSiteMetadata } from "../hooks/use-site-metadata";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    pathname?: string;
    children?: ReactNode;
    image?: string;
    article?: boolean;
    noindex?: boolean;
}

export const Seo: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    pathname,
    image,
    children,
    article = false,
    noindex = false,
}: SEOProps) => {
    const {
        title: siteTitle,
        description: defaultDescription,
        image: defaultImage,
        siteUrl,
        slogan,
        twitterUsername,
    } = useSiteMetadata();

    const seo = {
        title: title ? `${title} · ${siteTitle}` : `${siteTitle} · ${slogan}`,
        description: description ?? defaultDescription,
        image: article ? `${image}` : `${siteUrl}${image ?? defaultImage}`,
        url: `${siteUrl}${pathname ?? ""}`,
        twitterUsername,
    };

    return (
        <>
            <html lang="nl" />

            {/* BASE METATAGS */}
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* OPEN GRAPH META TAGS */}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
                <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}
            <meta property="og:site_name" content={siteTitle} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            <meta property="og:locale" content="nl_NL" />
            <meta
                property="og:type"
                content={article ? "article" : "website"}
            />

            {/* TWITTER META TAGS */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            {seo.url && <meta name="twitter:url" content={seo.url} />}
            {seo.twitterUsername && (
                <meta name="twitter:site" content={seo.twitterUsername} />
            )}
            {seo.twitterUsername && (
                <meta name="twitter:creator" content={seo.twitterUsername} />
            )}

            {/* ROBOTS META TAG */}
            {noindex && <meta name="robots" content="noindex" />}

            {/* TODO: add schemaMarkupData */}
            {children}
        </>
    );
};
