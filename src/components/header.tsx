import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import * as styles from '../styles/modules/header.module.scss';

const Header: React.FC = () => {
	// Define the GraphQL query to retrieve author data
	const data = useStaticQuery(graphql`
		query {
			contentfulAuthor {
				naam
			}
		}
	`);

	const author = data.contentfulAuthor;

	console.log(author);

	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerWrapper}>
				<div className={styles.headerLogo}>
					<StaticImage
						src='../images/logo/ep-logo.png'
						alt='Logo'
						placeholder='dominantColor'
					/>
				</div>
				<nav className={styles.menuContainer}>
					<ul>
						<li>Home</li>
						<li>Boeken</li>
						<li>Over ons</li>
						<li>Vacatures</li>
						<li>Contact</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
