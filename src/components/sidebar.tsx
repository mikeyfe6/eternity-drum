import * as React from 'react';
// import { graphql, useStaticQuery } from 'gatsby';
// import { StaticImage } from 'gatsby-plugin-image';

import * as styles from '../styles/modules/sidebar.module.scss';

const Sidebar: React.FC = () => {
	// Define the GraphQL query to retrieve author data
	// const data = useStaticQuery(graphql`
	// 	query {
	// 		contentfulAuthor {
	// 			naam
	// 		}
	// 	}
	// `);

	// const author = data.contentfulAuthor;

	// console.log(author);

	return (
		<aside className={styles.sidebarContainer}>
			<div>Aside/Sidebar Block</div>

			<p>
				The standard chunk of Lorem Ipsum used since the 1500s is reproduced
				below for those interested. Sections 1.10.32 and 1.10.33 from "de
				Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
				original form, accompanied by English versions from the 1914 translation
				by H. Rackham.
			</p>
		</aside>
	);
};

export default Sidebar;
