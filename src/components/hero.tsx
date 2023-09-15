import * as React from 'react';
// import { graphql, useStaticQuery } from 'gatsby';
// import { StaticImage } from 'gatsby-plugin-image';

import * as styles from '../styles/modules/hero.module.scss';

const Hero: React.FC = () => {
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
		<div>
			<img src='https://dummyimage.com/1920x1080/808080/fff' alt='' />
		</div>
	);
};

export default Hero;
