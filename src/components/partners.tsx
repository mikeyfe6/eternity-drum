import * as React from 'react';

import { StaticImage } from 'gatsby-plugin-image';

import * as styles from '../styles/modules/partners.module.scss';

const Partners: React.FC = () => {
	return (
		<section className={styles.partnersContainer}>
			<h2>Partners</h2>
			<ul>
				<li>
					<a href='#!'>
						<StaticImage
							src='../images/logo/ep-logo.png'
							alt='Logo'
							placeholder='dominantColor'
							objectFit='contain'
							imgClassName={styles.partnersLogo}
						/>
					</a>
				</li>
				<li>
					<a
						href='https://blackharmony.nl'
						rel='noopener noreferrer'
						target='_blank'
					>
						<StaticImage
							src='../images/partners/blackharmony.png'
							alt='Logo'
							placeholder='dominantColor'
							objectFit='contain'
							imgClassName={styles.partnersLogo}
						/>
					</a>
				</li>
				<li>
					<a
						href='https://menefex.nl'
						rel='noopener noreferrer'
						target='_blank'
					>
						<StaticImage
							src='../images/partners/menefex.png'
							alt='Logo'
							placeholder='dominantColor'
							objectFit='contain'
							imgClassName={styles.partnersLogo}
						/>{' '}
					</a>
				</li>
				<li>
					<a href='https://untold.nl' rel='noopener noreferrer' target='_blank'>
						<StaticImage
							src='../images/partners/untold.jpg'
							alt='Logo'
							placeholder='dominantColor'
							objectFit='contain'
							imgClassName={styles.partnersLogo}
						/>
					</a>
				</li>
				<li>
					<a href='#!'>Partner 5</a>
				</li>
			</ul>
		</section>
	);
};

export default Partners;
