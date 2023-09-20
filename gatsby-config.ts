import type { GatsbyConfig } from 'gatsby';

require('dotenv').config({
	// path: `.env.${process.env.NODE_ENV}`,
	path: `.env`,
});

const config: GatsbyConfig = {
	siteMetadata: {
		title: `Eternity Percussion`,
		slogan: `The Leaders of Tomorrow`,
		description: `Eternity Percussion is a competitive indoor percussion ensemble based in the Dallas-Fort Worth area.`,

		siteUrl: `https://www.yourdomain.tld`,
		image: `/images/eternity-logo.png`,

		twitterUsername: `@eternityperc`,
		facebookUrl: `https://www.facebook.com/eternityperc`,
		instagramUrl: `https://www.instagram.com/eternityperc`,
		linkedinUrl: `https://www.linkedin.com/eternityperc`,
		youtubeUrl: `https://www.facebook.com/eternityperc`,

		telephone: `+31 (0)20 311 39 33`,
		phoneRaw: `+31203113933`,
		email: `info@eternitydrum.com`,
		address: `Anton de Komplein 240`,
		postalCode: `1104 DR`,
		city: `Amsterdam`,

		companyName: `Stichting Eternity Percussion`,
		kvk: `34284743`,
		btw: `NL818556286B01`,
	},
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
		'gatsby-plugin-image',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sass',
		// 'gatsby-plugin-google-gtag',
		'gatsby-plugin-catch-links',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'src/images/icon.png',
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
	],
};

export default config;
