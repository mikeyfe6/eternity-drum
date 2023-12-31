import React from 'react';

import { Link } from 'gatsby';

import * as styles from '../styles/modules/cta.module.scss';

const CtaButtons: React.FC = () => {
	return (
		<section className={styles.ctaContainer}>
			<Link to='/boeken/'>Direct Boeken</Link>
			<Link to='/drumworkshops/'>Aanmelden Drumworkshops</Link>
			<Link to='/seda/' className={styles.specialButton}>
				SEDA
			</Link>
		</section>
	);
};

export default CtaButtons;
