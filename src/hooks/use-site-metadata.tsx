import { graphql, useStaticQuery } from 'gatsby';

interface SiteMetadata {
	title: string;
	description: string;
	slogan: string;

	siteUrl: string;
	image: string;

	twitterUsername: string;
	facebookUrl: string;
	instagramUrl: string;
	linkedinUrl: string;
	youtubeUrl: string;

	telephoneSeda: string;
	telephoneBpt: string;
	phoneRawSeda: string;
	phoneRawBpt: string;
	mobile: string;

	email: string;
	address: string;
	postalCode: string;
	city: string;

	companyName: string;
	kvk: string;
	btw: string;
	bank: string;

	bgWebColor: string;
	bgThemeColor: string;
}

export const useSiteMetadata = (): SiteMetadata => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					slogan

					siteUrl
					image

					twitterUsername
					facebookUrl
					instagramUrl
					linkedinUrl
					youtubeUrl

					telephoneSeda
					telephoneBpt
					phoneRawSeda
					phoneRawBpt
					mobile

					email
					address
					postalCode
					city

					companyName
					kvk
					btw
					bank

					bgWebColor
					bgThemeColor
				}
			}
		}
	`);

	return data.site.siteMetadata as SiteMetadata;
};
