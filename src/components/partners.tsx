import * as React from 'react';

import { StaticImage } from 'gatsby-plugin-image';

import * as styles from '../styles/modules/partners.module.scss';

const Partners: React.FC = () => {
	return (
		<section className={styles.partnersContainer}>
			<h2>Partners</h2>
			<ul>
				<li>
					<StaticImage
						src='../images/logo/ep-logo.png'
						alt='Logo'
						placeholder='dominantColor'
						objectFit='contain'
						imgClassName={styles.partnersLogo}
					/>
				</li>
				<li>
					<StaticImage
						src='../images/partners/blackharmony.png'
						alt='Logo'
						placeholder='dominantColor'
						objectFit='contain'
						imgClassName={styles.partnersLogo}
					/>
				</li>
				<li>
					<StaticImage
						src='../images/partners/menefex.png'
						alt='Logo'
						placeholder='dominantColor'
						objectFit='contain'
						imgClassName={styles.partnersLogo}
					/>
				</li>
				<li>
					<StaticImage
						src='../images/partners/untold.jpg'
						alt='Logo'
						placeholder='dominantColor'
						objectFit='contain'
						imgClassName={styles.partnersLogo}
					/>
				</li>
				<li>Partner 5</li>
			</ul>
		</section>
	);
};

export default Partners;
