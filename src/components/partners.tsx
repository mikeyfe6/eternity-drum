import * as React from 'react';

import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from '../styles/modules/partners.module.scss';

const Partners: React.FC = () => {
	const data = useStaticQuery(graphql`
		query {
			allFile(filter: { relativeDirectory: { eq: "partners" } }) {
				nodes {
					relativePath
					childImageSharp {
						gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
					}
				}
			}
		}
	`);

	const partnerImages = data.allFile.nodes;

	const partners = [
		{
			url: 'https://www.going-social.nl',
			img: 'goingsocial.png',
			name: 'Going Social',
		},
		{
			url: 'http://www.ebony-steelband-trust.co.uk',
			img: 'ebony.png',
			name: 'Ebony Steelband',
		},
		{
			url: 'https://untold.nl',
			img: 'untold.jpg',
			name: 'Theatergezelschap Untold',
		},
		{
			url: 'https://www.kalentura.com',
			img: 'kalentura.jpeg',
			name: 'KalentuRa Drums',
		},
		{
			url: 'https://acedanceandmusic.com',
			img: 'ace.png',
			name: 'ACE Dance and Music (UK)',
		},
		{
			url: 'https://blackharmony.nl',
			img: 'blackharmony.png',
			name: 'Black Harmony',
		},
	];

	return (
		<section className={styles.partnersContainer}>
			<h2>Partners</h2>

			<ul>
				{partners.map((partner, index) => {
					const partnerImage = partnerImages.find(
						(image: { relativePath: string }) =>
							image.relativePath === `partners/${partner.img}`
					);
					const image = partnerImage?.childImageSharp?.gatsbyImageData;

					if (!image) {
						return null;
					}

					return (
						<li key={index}>
							<a href={partner.url} rel='noopener noreferrer' target='_blank'>
								<GatsbyImage
									image={image}
									alt={partner.name}
									objectFit='contain'
									className={styles.partnersLogo}
								/>
							</a>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default Partners;
