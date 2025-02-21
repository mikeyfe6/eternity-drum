import type { GatsbyConfig } from 'gatsby';

require('dotenv').config({
	// path: `.env.${process.env.NODE_ENV}`,
	path: `.env`,
});

const siteMetadata = {
	title: `Eternity Percussion`,
	slogan: `The Leaders of Tomorrow`,
	description: `Eternity is een culturele instelling die zich bezighoudt met activiteiten, projecten en evenementen op het gebied van muzikale vorming en performance.`,

	siteUrl: `https://eternitydrum.com`,
	image: `/ep-logo.png`,

	twitterUsername: `@eternitydrum`,
	facebookUrl: `https://www.facebook.com/EternityDrum/`,
	instagramUrl: `https://www.instagram.com/percussionband_eternity/`,
	linkedinUrl: `#!`,
	youtubeUrl: `https://www.youtube.com/@eternitydrum`,

	telephoneBpt: `+31 (0)20 311 39 33`,
	telephoneSeda: `+31 (0)20 773 38 88`,
	mobile: `+31 (0)6 242 55 391`,
	phoneRawBpt: `31203113933`,
	phoneRawSeda: `31207733888`,
	mobileRaw: `31624255391`,

	email: `info@eternitydrum.com`,
	visitingAddress: `Kruitbergstraat 18`,
	visitingPostalCode: `1104 CH`,
	mailingAddress: `Anton de Komplein 240`,
	mailingPostalCode: `1102 DR`,
	city: `Amsterdam-Zuidoost`,

	companyName: `Stichting Eternity Percussion`,
	kvk: `34284743`,
	btw: `NL818556286B01`,
	bank: `NL53 ABNA 0591 433 923`,

	bgWebColor: `#181a37`,
	bgThemeColor: `#f6ce0e`,
}

const { siteUrl, title, bgWebColor, bgThemeColor, companyName, description } = siteMetadata;

const config: GatsbyConfig = {
	siteMetadata: siteMetadata,

	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		{
			resolve: 'gatsby-plugin-google-tagmanager',
			options: {
				id: 'GTM-MR6HHSRT',
				includeInDevelopment: false,
				defaultDataLayer: { platform: 'gatsby' },

				// Specify optional GTM environment details.
				// gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
				// gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
			},
		},
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
				path: `${__dirname}/src/images/`,
			},
			__key: 'images',
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: `${__dirname}/src/pages/`,
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
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				implementation: require('sass'),
				sassOptions: {
					silenceDeprecations: ['legacy-js-api'],
				},
			},
		},
		'gatsby-plugin-catch-links',
		{
			resolve: 'gatsby-plugin-canonical-urls',
			options: {
				siteUrl: siteUrl,
			},
		},
		{
			resolve: 'gatsby-plugin-sitemap',
			options: {
				query: `
				{
					allSitePage {
						nodes {
							path
						}
					}
					allContentfulPost {
						nodes {
							slug
							updatedAt
						}
					}
					allContentfulVacancy {
						nodes {
							slug
							updatedAt
						}
					}
				}
				`,
				resolveSiteUrl: () => siteUrl,
				resolvePages: ({
					allSitePage,
					allContentfulPost,
					allContentfulVacancy,
				}: {
					allSitePage: { nodes: { path: string }[] };
					allContentfulPost: { nodes: { slug: string; updatedAt: string }[] };
					allContentfulVacancy: { nodes: { slug: string; updatedAt: string }[] };
				}) => {
					const postsMap = allContentfulPost.nodes.reduce((acc: Record<string, any>, post) => {
						const { slug, updatedAt } = post;
						acc[`/${slug}/`] = { path: `/${slug}/`, updatedAt };
						return acc;
					}, {});

					const vacanciesMap = allContentfulVacancy.nodes.reduce((acc: Record<string, any>, vacancy) => {
						const { slug, updatedAt } = vacancy;
						acc[`/over-ons/vacatures/${slug}/`] = { path: `/over-ons/vacatures/${slug}/`, updatedAt };
						return acc;
					}, {});

					const combinedPages = allSitePage.nodes.map((page) => {
						return (
							postsMap[page.path] ||
							vacanciesMap[page.path] ||
							{ path: page.path }
						);
					});

					return [
						...Object.values(postsMap),
						...Object.values(vacanciesMap),
						...combinedPages.filter(
							(page) =>
								!postsMap[page.path] && !vacanciesMap[page.path]
						),
					];
				},
				serialize: ({ path, updatedAt }: { path: string; updatedAt?: string }) => {
					return {
						url: path,
						lastmod: updatedAt || new Date().toISOString(),
						changefreq: 'daily',
						priority: 0.7,
					};
				},
			},
		},
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
				description: description,
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
