import React, { useEffect, useState } from 'react';
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
			url: 'https://blackharmony.nl',
			img: 'blackharmony.png',
			name: 'Black Harmony',
		},
		{
			url: 'https://www.ebony-steelband-trust.co.uk',
			img: 'ebony.png',
			name: 'Ebony Steelband (UK)',
		},
		{
			url: 'https://acedanceandmusic.com',
			img: 'ace.png',
			name: 'ACE Dance and Music (UK)',
		},
		{
			url: 'https://manhoodacademyofficial.com',
			img: 'manhood-academy.jpg',
			name: 'Manhood Academy (UK)',
		},
		{
			url: 'https://www.vapstudios.com',
			img: 'vap-dance-academy-studios.jpg',
			name: 'VAP Dance Academy & Studios (South Africa)',
		},
		{
			url: 'https://www.instagram.com/ilfbarbados/',
			img: 'israel-lovell-foundation.jpg',
			name: 'Israel Lovell Foundation (Barbados)',
		},
		{
			url: 'https://www.instagram.com/izavybe/',
			img: 'izavybe.jpg',
			name: 'Izavybe (Barbados)',
		},
	];

	const shuffleArray = (array: any[]) => {
		let currentIndex = array.length;
		let temporaryValue;
		let randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	};

	const [shuffledPartners, setShuffledPartners] = useState(partners);

	useEffect(() => {
		setShuffledPartners(shuffleArray([...partners]));
	}, []);

	return (
		<section className={styles.partnersContainer}>
			<h2>Partners</h2>
			<ul>
				{shuffledPartners.map((partner, index) => {
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
									className={styles.partnersLogo}
									objectFit='contain'
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
