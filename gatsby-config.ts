import type { GatsbyConfig } from 'gatsby';

require('dotenv').config({
	// path: `.env.${process.env.NODE_ENV}`,
	path: `.env`,
});

const siteMetadata = {
	title: `Eternity Percussion`,
	slogan: `The Leaders of Tomorrow`,
	description: `Eternity is een culturele instelling die zich bezighoudt met activiteiten, projecten en evenementen op het gebied van muzikale vorming en performance.`,

	siteUrl: `https://eternitydrum.netlify.app`, // tijdens ontwikkeling
	image: `/images/logo/ep-logo.png`,

	twitterUsername: `@eternitydrum`,
	facebookUrl: `https://www.facebook.com/EternityDrum/`,
	instagramUrl: `https://www.instagram.com/percussionband_eternity/`,
	linkedinUrl: `#!`,
	youtubeUrl: `https://www.youtube.com/@eternitydrum`,

	telephone: `+31 (0)20 311 39 33`,
	phoneRaw: `+31203113933`,
	email: `info@eternitydrum.com`,
	address: `Anton de Komplein 240`,
	postalCode: `1104 DR`,
	city: `Amsterdam`,

	companyName: `Stichting Eternity Percussion`,
	kvk: `34284743`,
	btw: `NL818556286B01`,

	bgWebColor: `#181a37`,
	bgThemeColor: `#f6ce0e`,
}

const { siteUrl, companyName, title, bgWebColor, bgThemeColor } = siteMetadata;

const config: GatsbyConfig = {
	siteMetadata: siteMetadata,

	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		{
			resolve: 'gatsby-source-contentful',
			options: {
				accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				host: process.env.CONTENTFUL_HOST,
			},
		},
		'gatsby-plugin-mdx',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: './src/images/',
			},
			__key: 'images',
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: './src/pages/',
			},
			__key: 'pages',
		},
		{
			resolve: 'gatsby-plugin-nprogress',
			options: {
				color: bgThemeColor,
				showSpinner: true,
				minimum: 0.1,
			},
		},
		'gatsby-plugin-image',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sass',
		// 'gatsby-plugin-google-gtag',
		'gatsby-plugin-catch-links',
		{
			resolve: 'gatsby-plugin-canonical-urls',
			options: {
				siteUrl: siteUrl,
			},
		},
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				sitemap: siteUrl + '/sitemap-index.xml',
				policy: [{ userAgent: '*', allow: '/' }],
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: companyName,
				short_name: title,
				description: 'Ervaar onze Eternity Percussion webapplicatie geintegregreerd op uw toestel',
				start_url: '/',
				background_color: bgThemeColor,
				lang: 'nl',
				theme_color: bgWebColor,
				display: 'standalone',
				icon: 'src/images/logo/ep-logo-yellow.png',
				icon_options: {
					purpose: 'any maskable',
				},
				crossOrigin: 'use-credentials',
			},
		},
		'gatsby-plugin-offline',
	],
};

export default config;
