import { graphql, useStaticQuery } from "gatsby";

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
	mobile: string;
	phoneRawSeda: string;
	phoneRawBpt: string;
	mobileRaw: string;

	email: string;
	visitingAddress: string;
	visitingPostalCode: string;
	mailingAddress: string;
	mailingPostalCode: string;
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
					mobile
					phoneRawSeda
					phoneRawBpt
					mobileRaw

					email
					visitingAddress
					visitingPostalCode
					mailingAddress
					mailingPostalCode
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
