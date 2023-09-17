import * as React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
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
				<div className={styles.headerTopBanner}>
					<div className={styles.headerTopBannerWrapper}>
						<p>The Leaders of Tomorrow</p>
						<ul>
							<li>
								<i className='fab fa-facebook fa-inverse'></i>
							</li>
							<li>
								<i className='fab fa-instagram fa-inverse'></i>
							</li>
							<li>
								<i className='fab fa-youtube fa-inverse'></i>
							</li>
						</ul>
					</div>
				</div>
				<nav className={styles.headerMenu}>
					<ul className={styles.menuItems}>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/boeken/'>Boeken</Link>
						</li>
						<li>
							<Link to='/drumworkshops/'>Drumworkshops</Link>
						</li>
						<li>
							<a href='#'>Cultuureducatie</a>
						</li>
						<li className={styles.epLogo}>
							<StaticImage
								src='../images/logo/ep-logo.png'
								alt='Logo'
								placeholder='dominantColor'
							/>
						</li>
						<li>
							<a href='#'>Projecten</a>
						</li>
						<li>
							<a href='#'>Vacatures</a>
						</li>
						<li>
							<a href='#'>Media</a>
						</li>
						<li>
							<a href='#'>Over ons</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
