import React, { ReactNode } from 'react';
import { useSiteMetadata } from '../hooks/use-site-metadata';

interface SEOProps {
	title?: string;
	description?: string;
	pathname?: string;
	children?: ReactNode;
}

export const SEO: React.FC<SEOProps> = ({
	title,
	description,
	pathname,
	children,
}: SEOProps) => {
	const {
		title: siteTitle,
		description: defaultDescription,
		image,
		siteUrl,
		twitterUsername,
	} = useSiteMetadata();

	const seo = {
		title: title ? `${title} · ${siteTitle}` : siteTitle,
		description: description ?? defaultDescription,
		image: `${siteUrl}${image}`,
		url: `${siteUrl}${pathname ?? ''}`,
		twitterUsername,
	};

	return (
		<>
			<title>{seo.title}</title>

			{/* METATAGS */}
			<meta name='description' content={seo.description} />
			<meta name='image' content={seo.image} />
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={seo.title} />
			<meta name='twitter:url' content={seo.url} />
			<meta name='twitter:description' content={seo.description} />
			<meta name='twitter:image' content={seo.image} />
			<meta name='twitter:creator' content={seo.twitterUsername} />

			{/* LINKS */}
			<link
				rel='icon'
				href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">✨</text></svg>'
			/>

			{/* FONTS */}
			<link
				href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap'
				rel='stylesheet'
			/>

			{/* ICONS */}
			<link
				rel='stylesheet'
				href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
			/>

			{/* SCRIPTS */}

			{children}
		</>
	);
};
