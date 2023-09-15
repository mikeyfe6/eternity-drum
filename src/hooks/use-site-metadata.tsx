import { graphql, useStaticQuery } from 'gatsby';

interface SiteMetadata {
	title: string;
	description: string;
	twitterUsername: string;
	image: string;
	siteUrl: string;
}

export const useSiteMetadata = (): SiteMetadata => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					twitterUsername
					image
					siteUrl
				}
			}
		}
	`);

	return data.site.siteMetadata as SiteMetadata;
};
